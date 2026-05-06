'use strict';

const { replacePlaceholders, today } = require('../generators');

describe('replacePlaceholders', () => {
  const config = { name: 'Ana', date: '2026-05-05' };

  it('substitui {{NOME}} pelo nome do usuário', () => {
    expect(replacePlaceholders('Olá {{NOME}}!', config)).toBe('Olá Ana!');
  });

  it('substitui {{NAME}} pelo nome do usuário', () => {
    expect(replacePlaceholders('Hello {{NAME}}!', config)).toBe('Hello Ana!');
  });

  it('substitui {{DATA}} pela data', () => {
    expect(replacePlaceholders('data: {{DATA}}', config)).toBe('data: 2026-05-05');
  });

  it('substitui múltiplas ocorrências do mesmo placeholder', () => {
    expect(replacePlaceholders('{{NOME}} e {{NOME}}', config)).toBe('Ana e Ana');
  });

  it('não altera texto sem placeholders', () => {
    expect(replacePlaceholders('texto normal', config)).toBe('texto normal');
  });
});

describe('today', () => {
  it('retorna string no formato YYYY-MM-DD', () => {
    expect(today()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
