---
name: fb-raw
description: "Lista arquivos em raw/ mostrando quais já foram processados e quais estão pendentes de ingest."
---

# fb-raw

Lista os arquivos em `raw/` e mostra o status de ingest de cada um.

## Como usar

```
/fb-raw
```

## O que faz

1. Lista todos os arquivos em `raw/` recursivamente
2. Para cada arquivo, verifica se existe uma página correspondente em `wiki/fontes/`
3. Exibe a lista em dois grupos:

**Pendentes de ingest** — ainda não processados:
```
raw/artigos/nome-do-artigo.md    ← pronto para /wiki-ingest
raw/videos/transcript.md       ← pronto para /wiki-ingest
```

**Já processados** — têm página em wiki/fontes/:
```
raw/livros/livro-x.md  →  wiki/fontes/livro-x.md ✓
```

4. Sugere o próximo arquivo a processar (o mais recente entre os pendentes)

## Regras

- Nunca modifica nada em `raw/` (camada read-only)
- Não faz o ingest — apenas informa o status
- Para processar um arquivo: use `/wiki-ingest raw/caminho/arquivo.md`
