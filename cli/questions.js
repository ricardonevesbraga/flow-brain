'use strict';

const { Input, Select } = require('enquirer');
const path = require('path');

async function askQuestions() {
  const name = await new Input({
    name: 'name',
    message: 'Qual é o seu nome? / What is your name?',
    initial: 'João',
    validate: (v) => v.trim().length > 0 || 'Nome não pode ser vazio',
  }).run();

  const language = await new Select({
    name: 'language',
    message: 'Idioma do vault / Vault language?',
    choices: ['PT-BR', 'EN'],
  }).run();

  const isptbr = language === 'PT-BR';

  const dest = await new Input({
    name: 'dest',
    message: isptbr ? 'Em qual diretório criar o vault?' : 'Which directory to create the vault in?',
    initial: isptbr ? './meu-cerebro' : './my-brain',
    validate: (v) => v.trim().length > 0 || 'Diretório inválido',
  }).run();

  return {
    name: name.trim(),
    language,
    dest: path.resolve(dest.trim()),
  };
}

module.exports = { askQuestions };
