'use strict';

const { Input, Select, MultiSelect } = require('enquirer');
const path = require('path');

const DEFAULT_AREAS = {
  'PT-BR': ['trabalho', 'aprendizado', 'saúde', 'finanças', 'família'],
  'EN': ['work', 'learning', 'health', 'finance', 'family'],
};

async function askQuestions() {
  const name = await new Input({
    name: 'name',
    message: 'Qual é o seu nome? / What is your name?',
    initial: 'João',
    validate: (v) => v.trim().length > 0 || 'Nome não pode ser vazio / Name cannot be empty',
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
    validate: (v) => v.trim().length > 0 || 'Diretório inválido / Invalid directory',
  }).run();

  const defaults = DEFAULT_AREAS[language];

  const selectedAreas = await new MultiSelect({
    name: 'areas',
    message: isptbr ? 'Quais são suas áreas de vida?' : 'What are your life areas?',
    choices: defaults,
    initial: defaults.map((_, i) => i),
    validate: (v) => v.length > 0 || (isptbr ? 'Selecione pelo menos uma área' : 'Select at least one area'),
  }).run();

  const customMsg = isptbr
    ? 'Áreas customizadas? (vírgula para separar, Enter para pular)'
    : 'Custom areas? (comma-separated, Enter to skip)';

  const customInput = await new Input({
    name: 'customAreas',
    message: customMsg,
    initial: '',
  }).run();

  const customAreas = customInput
    .split(',')
    .map((a) => a.trim().toLowerCase().replace(/\s+/g, '-'))
    .filter(Boolean);

  const areas = [...selectedAreas, ...customAreas];

  return {
    name: name.trim(),
    language,
    dest: path.resolve(dest.trim()),
    areas,
  };
}

module.exports = { askQuestions };
