'use strict';

const fs = require('fs-extra');
const path = require('path');

function replacePlaceholders(template, config) {
  return template
    .replace(/\{\{NOME\}\}/g, config.name)
    .replace(/\{\{NAME\}\}/g, config.name)
    .replace(/\{\{DATA\}\}/g, config.date);
}

async function replacePlaceholdersInDir(dir, config) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const itemPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      await replacePlaceholdersInDir(itemPath, config);
    } else if (item.name.endsWith('.md')) {
      const content = await fs.readFile(itemPath, 'utf8');
      const replaced = replacePlaceholders(content, config);
      if (replaced !== content) await fs.writeFile(itemPath, replaced, 'utf8');
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
    await fs.copy(path.join(vaultSrc, item.name), path.join(dest, item.name), { overwrite: false });
  }

  const claudeContent = await fs.readFile(claudeSrc, 'utf8');
  await fs.writeFile(path.join(dest, 'CLAUDE.md'), replacePlaceholders(claudeContent, config), 'utf8');

  await replacePlaceholdersInDir(dest, config);
}

async function makeExecutable(filePath) {
  if (process.platform !== 'win32' && await fs.pathExists(filePath)) {
    await fs.chmod(filePath, '755');
  }
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

module.exports = { copyVault, makeExecutable, replacePlaceholders, today };
