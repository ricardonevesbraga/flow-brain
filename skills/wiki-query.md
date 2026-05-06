---
description: "Responde perguntas consultando o conhecimento acumulado no wiki. Use: /wiki-query <pergunta>"
---

# wiki-query

Responde perguntas usando o conhecimento do wiki.

## Como usar

```
/wiki-query <pergunta>
```

ou simplesmente: `me responde X usando o wiki`

## O que faz

1. Lê `wiki/index.md` para mapear páginas existentes
2. Identifica 3–8 páginas relevantes para a pergunta
3. Lê essas páginas integralmente
4. Sintetiza resposta citando fontes via `[[wikilink]]`
5. Oferece arquivar a síntese em `wiki/sintese/<slug>.md` se valiosa
6. Append em `wiki/log.md`

## Exemplo

```
/wiki-query qual a diferença entre RAG e LLM Wiki?
```
