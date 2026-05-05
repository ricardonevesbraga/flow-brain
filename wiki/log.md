---
titulo: Log do Wiki
data-criacao: 2026-04-30
data-atualizacao: 2026-04-30
tags:
  - tipo/sintese
status: ativo
---

# 📜 Log do Wiki

> [!info] Convenção
> Append-only. Toda operação do agente (ingest, pergunta, lint, review-inbox) deixa um registro aqui. Mais novo no TOPO.

---

## 2026-04-30 — aula HTML criada

- Criada aula portátil `aulas/aula-segundo-cerebro.html` (29 slides).
- Design system replica `MASTERCLASS-portavel.html` (dark, neon #e8006a, Barlow + JetBrains Mono).
- Conteúdo cobre: 4 frameworks combinados (PARA + Zettelkasten + Append-and-Review + LLM Wiki), setup completo (instalar Obsidian + Claude Code + estrutura + CLAUDE.md + plugins), atalhos globais (`cap`, `/capturar`, `/cerebro`, `/cerebro-ingest`), 5 workflows operacionais, e os 5 anéis de uso diário.
- Features: theme toggle persistido, navegação por seta/AD/JK/swipe, copy-to-clipboard nos blocos de código, checklist final com persistência em localStorage.
- Sem libs externas — vanilla JS + CSS + Google Fonts via CDN.

## 2026-04-30 — bootstrap

- Vault criado por Claude Code seguindo plano em `~/.claude/plans/greedy-snacking-rabin.md`.
- Estrutura PARA + LLM Wiki + append-and-review estabelecida.
- `CLAUDE.md` define schema operacional do agente.
- Templates criados: `diario`, `projeto`, `area`, `recurso`, `fonte`, `conceito`, `entidade`, `moc`.
- MOCs iniciais semeados: `moc-engenharia-ia`, `moc-flowgrammers`, `moc-aprendizado`, `moc-vida-pessoal`.
- Conceitos seed: [[append-and-review]], [[llm-wiki-pattern]].
- Daily note exemplo: `01-diario/2026-04-30.md`.
- **Próximo passo do humano**: instalar 4 community plugins (Templater, Dataview, QuickAdd, Calendar) via UI do Obsidian.
