---
description: "Processa um arquivo de raw/ e gera resumo, entidades e conceitos no wiki. Use: /wiki-ingest raw/arquivo.md"
---

# wiki-ingest

Processa um arquivo de `raw/` e gera páginas no wiki.

## Como usar

```
/wiki-ingest raw/artigos/nome-do-arquivo.md
```

## O que faz

1. Lê o arquivo em `raw/` (texto integral)
2. Identifica entidades (pessoas, empresas, produtos) e conceitos (ideias, frameworks)
3. Cria `wiki/fontes/<slug>.md` com:
   - `## TL;DR` — 3–5 bullets
   - `## Resumo estruturado` — ~300 palavras
   - `## Citações-chave` — 3–5 trechos verbatim
   - `## Conexões` — wikilinks para entidades e conceitos
4. Para cada entidade/conceito:
   - Se já existe: adiciona 1–3 frases novas e atualiza `data-atualizacao`
   - Se é nova: cria página com frontmatter + parágrafo seed
5. Atualiza `wiki/index.md`
6. Append em `wiki/log.md`

## Regras

- Nunca modifica nada em `raw/`
- Todas as páginas geradas em PT-BR (ou EN, conforme CLAUDE.md)
- Não inventa citações — só trechos verbatim do original
