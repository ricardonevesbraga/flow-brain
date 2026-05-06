# Flow Brain

> Seu segundo cérebro com Obsidian + Claude Code — configurado em 60 segundos.

Baseado no padrão **LLM Wiki do Karpathy**: você joga fontes em `raw/`, o Claude processa e gera conhecimento em `wiki/`. Simples assim.

---

## Início rápido

**Pré-requisitos:** [Obsidian](https://obsidian.md), [Claude Code](https://claude.ai/code), Node.js 18+

```bash
npx flowbrain
```

Responda 3 perguntas, abra a pasta gerada no Obsidian e comece a capturar.

---

## Estrutura

```
vault/
├── captura.md   ← tudo entra aqui (append-and-review)
├── diario/      ← notas diárias YYYY-MM-DD.md
├── raw/         ← fontes imutáveis (você escreve)
└── wiki/        ← conhecimento gerado (Claude escreve)
    ├── fontes/
    ├── entidades/
    └── conceitos/
```

---

## Comandos

| Comando | O que faz |
|---|---|
| `/wiki-capture <texto>` | Captura ideia no topo de captura.md |
| `/wiki-ingest raw/arquivo.md` | Processa fonte → gera páginas no wiki |
| `/wiki-query <pergunta>` | Responde usando o conhecimento do wiki |
| `/wiki-review` | Triagem de captura.md com Claude |
| `/wiki-lint` | Verifica saúde do wiki |
| `/fb-diario` | Abre ou cria o diário de hoje |
| `/fb-raw` | Lista fontes pendentes de ingest |
| `/fb-help` | Guia completo |

---

## Como funciona

1. Capture qualquer ideia com `/wiki-capture`
2. Adicione artigos/papers/transcripts em `raw/`
3. Processe com `/wiki-ingest raw/arquivo.md`
4. Consulte com `/wiki-query <pergunta>`
5. Mensalmente: `/wiki-lint`

---

## Contribuindo

PRs bem-vindos.
