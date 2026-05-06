---
description: "Guia completo dos comandos do Flow Brain. Ponto de entrada para novos usuários."
---

# fb-help

Guia de todos os comandos do Flow Brain.

## Como usar

```
/fb-help
```

## O que exibe

---

## Flow Brain — Guia de Comandos

O vault tem três camadas (padrão Karpathy):

- **raw/** — fontes imutáveis. Você escreve, o Claude nunca toca.
- **wiki/** — conhecimento gerado. O Claude escreve a partir do raw.
- **CLAUDE.md** — contrato de operação. Define as regras.

Além disso:
- **captura.md** — nota de captura rápida (append-and-review)
- **diario/** — notas diárias

---

### Comandos wiki — Conhecimento

| Comando | O que faz |
|---|---|
| `/wiki-ingest raw/arquivo.md` | Processa fonte raw → gera resumo e conceitos no wiki |
| `/wiki-query <pergunta>` | Responde usando o conhecimento do wiki |
| `/wiki-review` | Revisa captura.md e sugere destino para cada item |
| `/wiki-lint` | Verifica saúde do wiki (links, frontmatter, idioma) |

### Comandos fb — Vault

| Comando | O que faz |
|---|---|
| `/fb-diario` | Abre ou cria o diário de hoje |
| `/fb-raw` | Lista arquivos em raw/ e mostra quais já foram processados |
| `/fb-help` | Este guia |

---

### Fluxo recomendado

1. Adicione fontes em `raw/` e processe com `/wiki-ingest`
2. Consulte o conhecimento com `/wiki-query`
3. Mensalmente: `/wiki-lint` para checar a saúde
