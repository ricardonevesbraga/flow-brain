# Segundo Cérebro

> Your second brain with Obsidian + Claude Code — set up in 60 seconds.

Built on the **Karpathy LLM Wiki** pattern (append-and-review + 3-layer wiki), **PARA** by Tiago Forte, and **Zettelkasten** connections. Claude Code manages the wiki layer; you own your notes.

---

## What you get

- A fully structured Obsidian vault
- 5 Claude Code slash commands (`/wiki-ingest`, `/wiki-query`, `/wiki-lint`, `/wiki-review`, `/wiki-capture`)
- Bilingual support: PT-BR and EN
- Works on Mac, Linux, and Windows

---

## Quick start

**Prerequisites:** [Obsidian](https://obsidian.md), [Claude Code](https://claude.ai/code), Node.js 18+

```bash
npx segundo-cerebro
```

That's it. Answer 4 questions, open the generated folder in Obsidian, and start capturing.

---

## Commands

| Command | What it does |
|---|---|
| `/wiki-capture <text>` | Zero-friction capture to inbox |
| `/wiki-ingest raw/path/file.md` | Process a raw source into the wiki |
| `/wiki-query <question>` | Answer a question using wiki knowledge |
| `/wiki-lint` | Check wiki health (broken links, orphans, stale) |
| `/wiki-review` | Triage inbox items with Claude's help |

---

## Architecture

```
vault/
├── 00-inbox/captura.md   ← everything enters here (append-and-review)
├── 01-diario/            ← daily notes
├── 02-projetos/          ← time-bound projects (PARA)
├── 03-areas/             ← ongoing responsibilities (PARA)
├── 04-recursos/          ← reference material (PARA)
├── 05-arquivo/           ← completed/inactive (PARA)
├── raw/                  ← immutable source material (you write)
└── wiki/                 ← generated knowledge (Claude writes)
    ├── conceitos/        ← concept pages
    ├── entidades/        ← entity pages
    ├── fontes/           ← source summaries
    └── sintese/          ← MOCs and synthesis
```

The `CLAUDE.md` file is the **operating contract**: it tells Claude exactly what to do in this vault, which commands exist, and what rules to follow.

---

## Customizing after setup

- **Add an area:** create a folder in `03-areas/` and add a MOC in `wiki/sintese/moc-<area>.md`
- **Change language:** update `CLAUDE.md` — section 0 controls the language rule
- **Add a skill:** drop a `.md` file in `~/.claude/commands/`

---

## How it works

1. You capture in `00-inbox/captura.md` (or `bin/cap` from terminal)
2. When you have raw material (article, transcript, notes), run `/wiki-ingest`
3. Claude creates summaries, concept pages, and entity pages in `wiki/`
4. Ask questions any time with `/wiki-query`
5. Monthly: run `/wiki-lint` to check health

---

## Contributing

PRs welcome. Please keep the bilingual support intact and test with both `PT-BR` and `EN` setups.

---

## References

- Karpathy, [The append-and-review note](https://karpathy.bearblog.dev/the-append-and-review-note/)
- Karpathy, [LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- Tiago Forte, *Building a Second Brain* (PARA)
- Niklas Luhmann, Zettelkasten
- Nick Milo, *Linking Your Thinking* (MOCs)
