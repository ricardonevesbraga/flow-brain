#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const SUPPORTED = new Set(['.pdf', '.docx', '.html', '.htm', '.txt', '.md']);

function expandHome(p) {
  if (!p) return p;
  if (p === '~') return os.homedir();
  if (p.startsWith('~/')) return path.join(os.homedir(), p.slice(2));
  return p;
}

function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'sem-titulo';
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function frontmatter(originalName, srcPath) {
  const date = today();
  return [
    '---',
    `titulo: ${originalName}`,
    `data-criacao: ${date}`,
    `data-atualizacao: ${date}`,
    'tags:',
    '  - tipo/fonte',
    '  - dominio/geral',
    'status: rascunho',
    `fonte: ${srcPath}`,
    'relacionadas: []',
    'aliases: []',
    '---',
    '',
    ''
  ].join('\n');
}

async function convertPdf(src) {
  const pdfParse = require('pdf-parse');
  const data = await pdfParse(fs.readFileSync(src));
  return data.text || '';
}

async function convertDocx(src) {
  const mammoth = require('mammoth');
  const result = await mammoth.convertToMarkdown({ path: src });
  return result.value || '';
}

async function convertHtml(src) {
  const TurndownService = require('turndown');
  const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
  const html = fs.readFileSync(src, 'utf8');
  return td.turndown(html);
}

function convertPlain(src) {
  return fs.readFileSync(src, 'utf8');
}

async function convertFile(src) {
  const ext = path.extname(src).toLowerCase();
  switch (ext) {
    case '.pdf':  return convertPdf(src);
    case '.docx': return convertDocx(src);
    case '.html':
    case '.htm':  return convertHtml(src);
    case '.txt':
    case '.md':   return convertPlain(src);
    default:
      throw new Error(`Extensão não suportada: ${ext}. Suportados: ${[...SUPPORTED].join(', ')}`);
  }
}

function printUsage() {
  console.error('Uso: flowbrain convert <arquivo> [--out <destino.md>]');
  console.error('     flowbrain convert <arquivo> --vault <dir-vault>');
  console.error('Extensões: .pdf .docx .html .htm .txt .md');
}

function parseArgs(argv) {
  const opts = { src: null, out: null, vault: null, stdout: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out' || a === '-o') opts.out = argv[++i];
    else if (a === '--vault' || a === '-v') opts.vault = argv[++i];
    else if (a === '--stdout') opts.stdout = true;
    else if (a === '-h' || a === '--help') { printUsage(); process.exit(0); }
    else if (!opts.src) opts.src = a;
  }
  return opts;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.src) { printUsage(); process.exit(1); }

  const src = path.resolve(expandHome(opts.src));
  if (!fs.existsSync(src) || !fs.statSync(src).isFile()) {
    console.error(`Arquivo não encontrado: ${src}`);
    process.exit(1);
  }

  const ext = path.extname(src).toLowerCase();
  if (!SUPPORTED.has(ext)) {
    console.error(`Extensão "${ext}" não suportada. Use: ${[...SUPPORTED].join(', ')}`);
    process.exit(1);
  }

  let body;
  try {
    body = await convertFile(src);
  } catch (err) {
    console.error(`Falha ao converter: ${err.message}`);
    process.exit(2);
  }

  const baseName = path.basename(src, ext);
  const content = frontmatter(baseName, src) + body.trim() + '\n';

  if (opts.stdout) {
    process.stdout.write(content);
    return;
  }

  let dest = opts.out
    ? path.resolve(expandHome(opts.out))
    : path.join(
        opts.vault ? path.resolve(expandHome(opts.vault)) : process.cwd(),
        'raw',
        'arquivos',
        `${slugify(baseName)}.md`
      );

  if (fs.existsSync(dest)) {
    let counter = 2;
    const dir = path.dirname(dest);
    const stem = path.basename(dest, '.md');
    while (fs.existsSync(path.join(dir, `${stem}-${counter}.md`))) counter++;
    dest = path.join(dir, `${stem}-${counter}.md`);
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content, 'utf8');
  console.log(dest);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
