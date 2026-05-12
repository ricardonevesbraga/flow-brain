#!/usr/bin/env node
'use strict';

const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { askQuestions } = require('./questions');
const { copyVault, today } = require('./generators');
const { installSkills } = require('./skills');

const VAULT_TEMPLATE = path.join(__dirname, '..', 'vault');
const SKILLS_DIR = path.join(__dirname, '..', 'vault', '.claude', 'commands');

async function main() {
  console.log('\n' + chalk.bold('  ┌─────────────────────────────────────┐'));
  console.log(chalk.bold('  │   ') + chalk.hex('#e8006a').bold('flowbrain') + chalk.bold(' — Setup v1.0   │'));
  console.log(chalk.bold('  └─────────────────────────────────────┘\n'));

  let answers;
  try {
    answers = await askQuestions();
  } catch {
    console.log('\n' + chalk.yellow('  Setup cancelado.'));
    process.exit(0);
  }

  const config = { ...answers, date: today() };

  const spinner = ora(chalk.dim('Copiando vault...')).start();

  try {
    spinner.text = chalk.dim('Copiando template...');
    await copyVault(VAULT_TEMPLATE, answers.dest, config);

    spinner.text = chalk.dim('Instalando skills do Claude Code...');
    const { dest: skillsDest, installed } = await installSkills(SKILLS_DIR);

    spinner.succeed(chalk.green('Vault criado com sucesso!'));

    console.log('\n' + chalk.bold('  Pronto!'));
    console.log(`\n  ${chalk.dim('Vault:')}   ${chalk.cyan(answers.dest)}`);
    console.log(`  ${chalk.dim('Skills:')}  ${chalk.cyan(skillsDest)}`);
    console.log(`\n  ${chalk.bold('Abra')} ${chalk.cyan(answers.dest)} ${chalk.bold('no Obsidian.')}`);
    console.log(`\n  ${chalk.bold('Comandos disponíveis no Claude Code:')}`);
    installed.forEach((s) => console.log(`    ${chalk.hex('#e8006a')('/')}${s}`));
    console.log();
  } catch (err) {
    spinner.fail(chalk.red('Erro durante o setup'));
    console.error(chalk.red('\n  ' + err.message));
    process.exit(1);
  }
}

if (process.argv[2] === 'convert') {
  process.argv.splice(2, 1);
  require('./convert.js');
} else {
  main();
}
