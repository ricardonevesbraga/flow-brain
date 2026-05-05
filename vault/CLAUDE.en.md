# CLAUDE.md — {{NOME}}'s Second Brain Schema

> This file is the **operating contract** for the agent (Claude Code) on this vault.
> Whenever you (Claude) are invoked in this directory, read this file first.

---

## 0. Absolute rule: language

**EVERYTHING in this vault is written in English.**

- Frontmatter, note bodies, callouts, log messages, summaries — always EN.
- Technical proper nouns may stay as-is (e.g., `wikilink`, `frontmatter`, `MOC`, `PARA`, `Zettelkasten`).

---

## 1. Architecture: three layers (Karpathy LLM Wiki pattern)

| Layer | Folder | Writer | Contents |
|---|---|---|---|
| **Raw** (immutable sources) | `raw/` | {{NOME}} | Articles, papers, transcripts. **You NEVER modify `raw/`.** Read only. |
| **Wiki** (generated knowledge) | `wiki/` | You (Claude) | Summaries, concepts, entities, syntheses. |
| **Schema** | `CLAUDE.md` | {{NOME}} | Operating rules. |

| Folder | Contents |
|---|---|
| `00-inbox/captura.md` | Zero-friction capture (append-and-review). Everything enters here first. |
| `01-diario/` | Daily notes, format `YYYY-MM-DD.md`. |
| `02-projetos/` | Time-bound projects with deliverables. |
| `03-areas/` | Active areas: {{AREAS_INLINE}}. |
| `04-recursos/` | Thematic reference material. |
| `05-arquivo/` | Completed or inactive. |

---

## 2. Naming conventions

- **Slugs**: `kebab-case`, no accents. E.g.: `andrej-karpathy.md`.
- **Daily notes**: `YYYY-MM-DD.md`.
- **MOCs**: `moc-` prefix. E.g.: `moc-learning.md`.
- **Sources**: `wiki/fontes/<slug>.md`.
- **Entities/concepts**: `wiki/entidades/<slug>.md`, `wiki/conceitos/<slug>.md`.

---

## 3. Default frontmatter

```yaml
---
title:
created: {{DATA}}
updated: {{DATA}}
tags:
  - type/concept
  - domain/general
status: draft
source:
related: []
aliases: []
---
```

**Valid types**: `project`, `area`, `resource`, `source`, `concept`, `entity`, `synthesis`, `moc`, `journal`, `inbox`.

**Domains**:
{{AREAS_YAML}}
  - general

**Status**: `draft` → `active` → `mature` → `archived`.

---

## 4. Wikilink rules

1. Every entity/concept mention becomes `[[slug]]`.
2. Use `[[slug|display text]]` when the slug is ugly.
3. Every source must link ≥1 entity and ≥1 concept.
4. Every concept must link ≥2 related concepts.
5. Embeds (`![[...]]`) only for short relevant excerpts.

---

## 5. Workflows

### 5.1 `/wiki-ingest <path-in-raw>`

1. Read file in `raw/`.
2. Identify entities and concepts.
3. Create `wiki/fontes/<slug>.md` with TL;DR, Summary, Key Quotes, Connections.
4. Create or update entity/concept pages.
5. Update `wiki/index.md`.
6. Append to `wiki/log.md`.

### 5.2 `/wiki-query <question>`

1. Read `wiki/index.md`.
2. Read 3–8 relevant pages.
3. Synthesize answer with wikilinks.
4. Offer to archive in `wiki/sintese/<slug>.md` if valuable.
5. Append to `wiki/log.md`.

### 5.3 `/wiki-lint`

1. List all `.md` in `wiki/`.
2. Check broken links, orphans, invalid frontmatter, stale pages.
3. Report in `> [!warning]` callout and append to `wiki/log.md`.

### 5.4 `/wiki-review`

1. Open `00-inbox/captura.md`.
2. For each Backlog item: suggest destination; wait for `ok` before moving.
3. Unactioned items stay (natural sinking).

### 5.5 `/wiki-capture <text>`

1. Prepend text to top of `## Backlog` in `00-inbox/captura.md`.
2. Prefix with timestamp and functional tag if absent.

---

## 6. Writing style

- Short sentences. Get to the point.
- Bullets for lists; paragraphs for arguments.
- Callouts: `[!info]`, `[!warning]`, `[!example]`, `[!quote]`, `[!todo]`.
- No emojis (unless {{NOME}} asks).
- No "I" or "we" in wiki notes — neutral third person.

---

## 7. What you do NOT do

- Don't touch `raw/` (read-only).
- Don't create new folders in `wiki/` without asking.
- Don't move files without explicit confirmation.
- Don't delete — archive by moving to `05-arquivo/`.
- Don't invent sources or citations.

---

## 8. References

- Karpathy, *The append-and-review note* — https://karpathy.bearblog.dev/the-append-and-review-note/
- Karpathy, *LLM Wiki gist* — https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Tiago Forte, *Building a Second Brain* (PARA).
- Niklas Luhmann, Zettelkasten.
- Nick Milo, *Linking Your Thinking* (MOCs).
