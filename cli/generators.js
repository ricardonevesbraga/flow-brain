'use strict';

const fs = require('fs-extra');
const path = require('path');

function today() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function replacePlaceholders(content, config) {
  const areasYaml = config.areas.map((a) => `  - ${a}`).join('\n');
  const areasInline = config.areas.join(', ');
  return content
    .replace(/\{\{NOME\}\}/g, config.name)
    .replace(/\{\{NAME\}\}/g, config.name)
    .replace(/\{\{AREAS_YAML\}\}/g, areasYaml)
    .replace(/\{\{AREAS_INLINE\}\}/g, areasInline)
    .replace(/\{\{DATA\}\}/g, config.date)
    .replace(/\{\{LANG\}\}/g, config.language);
}

async function replacePlaceholdersInDir(dir, config) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const itemPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      await replacePlaceholdersInDir(itemPath, config);
    } else if (item.name.endsWith('.md') || item.name === 'cap' || item.name === 'cap.ps1') {
      const content = await fs.readFile(itemPath, 'utf8');
      const replaced = replacePlaceholders(content, config);
      if (replaced !== content) {
        await fs.writeFile(itemPath, replaced, 'utf8');
      }
    }
  }
}

async function copyVault(vaultSrc, dest, config) {
  await fs.ensureDir(dest);

  const claudeSrc = config.language === 'PT-BR'
    ? path.join(vaultSrc, 'CLAUDE.pt-br.md')
    : path.join(vaultSrc, 'CLAUDE.en.md');

  const items = await fs.readdir(vaultSrc, { withFileTypes: true });

  for (const item of items) {
    if (item.name === 'CLAUDE.pt-br.md' || item.name === 'CLAUDE.en.md') continue;
    const srcPath = path.join(vaultSrc, item.name);
    const destPath = path.join(dest, item.name);
    await fs.copy(srcPath, destPath, { overwrite: false });
  }

  const claudeContent = await fs.readFile(claudeSrc, 'utf8');
  await fs.writeFile(
    path.join(dest, 'CLAUDE.md'),
    replacePlaceholders(claudeContent, config),
    'utf8'
  );

  await replacePlaceholdersInDir(dest, config);
}

async function createAreas(dest, areas, config) {
  const isptbr = config.language === 'PT-BR';
  for (const area of areas) {
    const slug = slugify(area);
    await fs.ensureDir(path.join(dest, '03-areas', slug));

    const mocPath = path.join(dest, 'wiki', 'sintese', `moc-${slug}.md`);
    const mocContent = isptbr
      ? buildMocPtbr(area, slug, config.date)
      : buildMocEn(area, slug, config.date);
    await fs.writeFile(mocPath, mocContent, 'utf8');
  }
}

function buildMocPtbr(area, slug, date) {
  return `---
titulo: MOC — ${area}
data-criacao: ${date}
data-atualizacao: ${date}
tags:
  - tipo/moc
  - dominio/${slug}
status: ativo
relacionadas: []
---

# MOC — ${area}

> [!info] Sobre este mapa
> Tudo que se conecta ao domínio: ${area}.

## Pontos de entrada
-

## Conceitos centrais
-

## Projetos ativos
\`\`\`dataview
LIST
FROM "02-projetos"
WHERE contains(tags, "dominio/${slug}")
\`\`\`

## Perguntas em aberto
-
`;
}

function buildMocEn(area, slug, date) {
  return `---
title: MOC — ${area}
created: ${date}
updated: ${date}
tags:
  - type/moc
  - domain/${slug}
status: active
related: []
---

# MOC — ${area}

> [!info] About this map
> Everything connected to the domain: ${area}.

## Entry points
-

## Core concepts
-

## Active projects
\`\`\`dataview
LIST
FROM "02-projetos"
WHERE contains(tags, "domain/${slug}")
\`\`\`

## Open questions
-
`;
}

async function makeExecutable(filePath) {
  if (process.platform !== 'win32' && await fs.pathExists(filePath)) {
    await fs.chmod(filePath, '755');
  }
}

module.exports = { copyVault, createAreas, makeExecutable, replacePlaceholders, today, slugify };
