'use strict';

const { replacePlaceholders, today, slugify } = require('../generators');

describe('replacePlaceholders', () => {
  const config = {
    name: 'Ana',
    language: 'PT-BR',
    areas: ['trabalho', 'saúde'],
    date: '2026-05-05',
  };

  it('substitui {{NOME}} pelo nome do usuário', () => {
    expect(replacePlaceholders('Olá {{NOME}}!', config)).toBe('Olá Ana!');
  });

  it('substitui {{DATA}} pela data', () => {
    expect(replacePlaceholders('data: {{DATA}}', config)).toBe('data: 2026-05-05');
  });

  it('substitui {{AREAS_INLINE}} pela lista de áreas', () => {
    const result = replacePlaceholders('{{AREAS_INLINE}}', config);
    expect(result).toBe('trabalho, saúde');
  });

  it('substitui {{AREAS_YAML}} por lista YAML com indentação', () => {
    const result = replacePlaceholders('{{AREAS_YAML}}', config);
    expect(result).toBe('  - trabalho\n  - saúde');
  });

  it('substitui múltiplas ocorrências do mesmo placeholder', () => {
    const result = replacePlaceholders('{{NOME}} e {{NOME}}', config);
    expect(result).toBe('Ana e Ana');
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

describe('slugify', () => {
  it('converte para kebab-case sem acentos', () => {
    expect(slugify('Saúde')).toBe('saude');
    expect(slugify('engenharia IA')).toBe('engenharia-ia');
    expect(slugify('Finanças & Família')).toBe('financas-familia');
  });
});
