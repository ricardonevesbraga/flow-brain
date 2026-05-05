# wiki-lint

Verifica a saúde do wiki e reporta problemas.

## Como usar

```
/wiki-lint
```

## O que verifica

1. **Links quebrados** — wikilinks apontando para arquivos inexistentes
2. **Páginas órfãs** — arquivos sem nenhum inbound link (exceto `index.md`, `log.md`, MOCs)
3. **Frontmatter inválido** — faltando `titulo` (ou `title`), `data-criacao`, `tags`
4. **Violação de idioma** — parágrafos > 2 frases no idioma errado
5. **Stale** — `data-atualizacao` > 90 dias em páginas com status `ativo` ou `maduro`

## Output

Reporta no chat como callout `> [!warning]` com contagens.
Append em `wiki/log.md`:
```
## YYYY-MM-DD HH:MM — lint
- links quebrados: N
- órfãs: N
- frontmatter inválido: N
- violação de idioma: N
- stale: N
```
