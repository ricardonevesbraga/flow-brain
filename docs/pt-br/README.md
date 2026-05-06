# Flow Brain

> Seu segundo cérebro com Obsidian + Claude Code — configurado em 60 segundos.

Construído sobre o padrão **LLM Wiki do Karpathy** (append-and-review + wiki em 3 camadas), **PARA** de Tiago Forte, e conexões **Zettelkasten**. O Claude Code gerencia a camada wiki; você é dono das suas notas.

---

## O que você ganha

- Um vault Obsidian completamente estruturado
- 5 slash commands do Claude Code (`/wiki-ingest`, `/wiki-query`, `/wiki-lint`, `/wiki-review`, `/wiki-capture`)
- Suporte bilíngue: PT-BR e EN
- Funciona no Mac, Linux e Windows

---

## Início rápido

**Pré-requisitos:** [Obsidian](https://obsidian.md), [Claude Code](https://claude.ai/code), Node.js 18+

```bash
npx flowbrain
```

Só isso. Responda 4 perguntas, abra a pasta gerada no Obsidian, e comece a capturar.

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
├── 00-inbox/captura.md   ← tudo entra aqui (append-and-review)
├── 01-diario/            ← daily notes
├── 02-projetos/          ← projetos com prazo (PARA)
├── 03-areas/             ← responsabilidades contínuas (PARA)
├── 04-recursos/          ← material de referência (PARA)
├── 05-arquivo/           ← concluído/inativo (PARA)
├── raw/                  ← fontes imutáveis (você escreve)
└── wiki/                 ← conhecimento gerado (Claude escreve)
    ├── conceitos/        ← páginas de conceitos
    ├── entidades/        ← páginas de entidades
    ├── fontes/           ← resumos de fontes
    └── sintese/          ← MOCs e sínteses
```

O arquivo `CLAUDE.md` é o **contrato de operação**: diz ao Claude exatamente o que fazer no vault, quais comandos existem, e quais regras seguir.

---

## Personalizando após o setup

- **Adicionar área:** crie uma pasta em `03-areas/` e um MOC em `wiki/sintese/moc-<area>.md`
- **Mudar idioma:** edite `CLAUDE.md` — a seção 0 controla a regra de idioma
- **Adicionar skill:** coloque um arquivo `.md` em `~/.claude/commands/`

---

## Como funciona

1. Você captura em `00-inbox/captura.md` (ou via `bin/cap` no terminal)
2. Quando tiver material raw (artigo, transcript, notas), rode `/wiki-ingest`
3. O Claude cria resumos, páginas de conceitos e entidades em `wiki/`
4. Faça perguntas a qualquer hora com `/wiki-query`
5. Mensalmente: rode `/wiki-lint` para checar a saúde

---

## Contribuindo

PRs bem-vindos. Mantenha o suporte bilíngue intacto e teste com setups PT-BR e EN.

---

## Referências

- Karpathy, [The append-and-review note](https://karpathy.bearblog.dev/the-append-and-review-note/)
- Karpathy, [LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- Tiago Forte, *Building a Second Brain* (PARA)
- Niklas Luhmann, Zettelkasten
- Nick Milo, *Linking Your Thinking* (MOCs)
