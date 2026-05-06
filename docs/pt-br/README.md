# Flow Brain

> Seu segundo cérebro com Obsidian + Claude Code — configurado em 60 segundos.

---

## O que você ganha

- Um vault Obsidian completamente estruturado
- 5 comandos do Claude Code (`/wiki-ingest`, `/wiki-query`, `/wiki-lint`, `/wiki-review`, `/wiki-capture`)
- Suporte bilíngue: PT-BR e EN
- Funciona no Mac, Linux e Windows

---

## Início rápido

**Pré-requisitos:** [Obsidian](https://obsidian.md), [Claude Code](https://claude.ai/code), Node.js 18+

```bash
npx flowbrain
```

Responda as perguntas, abra a pasta gerada no Obsidian e comece a capturar.

---

## Comandos

| Comando | O que faz |
|---|---|
| `/wiki-capture <texto>` | Captura zero-fricção no inbox |
| `/wiki-ingest raw/caminho/arquivo.md` | Processa uma fonte raw no wiki |
| `/wiki-query <pergunta>` | Responde usando o conhecimento do wiki |
| `/wiki-lint` | Checa saúde do wiki (links, órfãs, stale) |
| `/wiki-review` | Triagem do inbox com ajuda do Claude |

---

## Arquitetura

```
vault/
├── 00-inbox/captura.md   ← tudo entra aqui
├── 01-diario/            ← daily notes
├── 02-projetos/          ← projetos com prazo
├── 03-areas/             ← responsabilidades contínuas
├── 04-recursos/          ← material de referência
├── 05-arquivo/           ← concluído/inativo
├── raw/                  ← fontes imutáveis (você escreve)
└── wiki/                 ← conhecimento gerado (Claude escreve)
    ├── conceitos/
    ├── entidades/
    ├── fontes/
    └── sintese/
```

O arquivo `CLAUDE.md` é o **contrato de operação**: diz ao Claude exatamente o que fazer no vault, quais comandos existem e quais regras seguir.

---

## Como funciona

1. Capture em `00-inbox/captura.md` (ou via `bin/cap` no terminal)
2. Com material raw (artigo, transcript, notas), rode `/wiki-ingest`
3. O Claude cria resumos, páginas de conceitos e entidades em `wiki/`
4. Faça perguntas a qualquer hora com `/wiki-query`
5. Mensalmente: rode `/wiki-lint` para checar a saúde

---

## Contribuindo

PRs bem-vindos. Mantenha o suporte bilíngue intacto e teste com setups PT-BR e EN.
