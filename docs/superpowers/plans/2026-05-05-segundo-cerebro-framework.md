# Segundo Cérebro Framework — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o vault pessoal ric-cerebro em um framework público instalável via `npx segundo-cerebro`, suportando Mac, Linux e Windows, com bilíngue PT-BR/EN, e atualizar a aula HTML com teoria do Karpathy e seção do framework.

**Architecture:** CLI Node.js em `cli/` lê preferências via enquirer, copia template genérico de `vault/`, substitui placeholders, cria pastas de áreas, e instala skills em `~/.claude/commands/` (ou `%USERPROFILE%\.claude\commands\` no Windows). Skills ficam versionados em `skills/`. Vault template usa `{{NOME}}`, `{{AREAS_INLINE}}`, `{{AREAS_YAML}}`, `{{DATA}}` como placeholders.

**Tech Stack:** Node.js 18+, enquirer 2.x, fs-extra 11.x, chalk 4.x, ora 5.x, Jest 29.x

---

## Mapa de arquivos

```
segundo-cerebro/
├── vault/                          NOVO — template genérico
│   ├── CLAUDE.pt-br.md             NOVO — template PT-BR com placeholders
│   ├── CLAUDE.en.md                NOVO — template EN com placeholders
│   ├── 00-inbox/captura.md         NOVO — captura genérica
│   ├── 01-diario/.gitkeep          NOVO
│   ├── 02-projetos/.gitkeep        NOVO
│   ├── 03-areas/.gitkeep           NOVO (áreas criadas pelo CLI)
│   ├── 04-recursos/.gitkeep        NOVO
│   ├── 05-arquivo/.gitkeep         NOVO
│   ├── raw/{artigos,papers,transcripts,assets}/.gitkeep  NOVO
│   ├── wiki/{conceitos,entidades,fontes,sintese}/.gitkeep NOVO
│   ├── wiki/index.md               NOVO — catálogo genérico
│   ├── wiki/log.md                 NOVO — log genérico
│   ├── templates/{diario,projeto,area,recurso,fonte,conceito,entidade,moc}.md  NOVO — com {{NOME}}
│   ├── bin/cap                     NOVO — bash script genérico
│   ├── bin/cap.ps1                 NOVO — PowerShell (Windows)
│   └── anexos/.gitkeep             NOVO
├── cli/
│   ├── index.js                    NOVO — entry point `npx segundo-cerebro`
│   ├── questions.js                NOVO — enquirer prompts
│   ├── generators.js               NOVO — cópia + substituição de placeholders
│   ├── skills.js                   NOVO — instalação cross-platform de skills
│   └── __tests__/
│       ├── generators.test.js      NOVO — testes unitários
│       └── skills.test.js          NOVO — testes unitários
├── skills/                         NOVO — 5 skills versionados
│   ├── wiki-capture.md
│   ├── wiki-ingest.md
│   ├── wiki-lint.md
│   ├── wiki-query.md
│   └── wiki-review.md
├── docs/pt-br/README.md            NOVO — README em PT-BR
├── aulas/aula-segundo-cerebro.html MODIFICADO — +7 slides (3 teoria + 4 framework)
├── README.md                       MODIFICADO — conteúdo completo em EN
└── package.json                    NOVO — config npm
```

---

## Task 1: Package scaffolding

**Files:**
- Create: `package.json`
- Create: `cli/` (directory)
- Create: `vault/` (directory)
- Create: `skills/` (directory)
- Create: `docs/pt-br/` (directory)

- [ ] **Step 1: Criar package.json**

```json
{
  "name": "segundo-cerebro",
  "version": "1.0.0",
  "description": "Your second brain with Obsidian + Claude Code — setup in 60 seconds",
  "bin": {
    "segundo-cerebro": "./cli/index.js"
  },
  "scripts": {
    "test": "jest",
    "start": "node cli/index.js"
  },
  "dependencies": {
    "chalk": "^4.1.2",
    "enquirer": "^2.4.1",
    "fs-extra": "^11.2.0",
    "ora": "^5.4.1"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  },
  "engines": {
    "node": ">=18"
  },
  "keywords": ["obsidian", "second-brain", "claude", "zettelkasten", "para"],
  "license": "MIT"
}
```

- [ ] **Step 2: Criar diretórios**

```bash
mkdir -p cli/__tests__ vault/00-inbox vault/01-diario vault/02-projetos \
  vault/03-areas vault/04-recursos vault/05-arquivo \
  vault/raw/artigos vault/raw/papers vault/raw/transcripts vault/raw/assets \
  vault/wiki/conceitos vault/wiki/entidades vault/wiki/fontes vault/wiki/sintese \
  vault/templates vault/bin vault/anexos \
  skills docs/pt-br
```

- [ ] **Step 3: Criar .gitkeep em diretórios vazios**

```bash
touch vault/01-diario/.gitkeep vault/02-projetos/.gitkeep \
  vault/03-areas/.gitkeep vault/04-recursos/.gitkeep \
  vault/05-arquivo/.gitkeep vault/raw/artigos/.gitkeep \
  vault/raw/papers/.gitkeep vault/raw/transcripts/.gitkeep \
  vault/raw/assets/.gitkeep vault/wiki/conceitos/.gitkeep \
  vault/wiki/entidades/.gitkeep vault/wiki/fontes/.gitkeep \
  vault/wiki/sintese/.gitkeep vault/anexos/.gitkeep
```

- [ ] **Step 4: Instalar dependências**

```bash
npm install
```

Expected: `node_modules/` criado com enquirer, fs-extra, chalk, ora.

- [ ] **Step 5: Commit**

```bash
git init
git add package.json package-lock.json
git commit -m "feat: scaffold npm package for segundo-cerebro framework"
```

---

## Task 2: CLAUDE.md templates (PT-BR + EN)

**Files:**
- Create: `vault/CLAUDE.pt-br.md`
- Create: `vault/CLAUDE.en.md`

- [ ] **Step 1: Criar vault/CLAUDE.pt-br.md**

```markdown
# CLAUDE.md — Schema do Segundo Cérebro de {{NOME}}

> Este arquivo é o **contrato de operação** do agente (Claude Code) sobre o vault.
> Sempre que você (Claude) for invocado neste diretório, leia este arquivo primeiro.

---

## 0. Regra absoluta: idioma

**TUDO neste vault é escrito em Português do Brasil.**

- Frontmatter, corpo das notas, callouts, mensagens de log, sumários, perguntas, respostas — sempre PT-BR.
- Termos técnicos consagrados podem ficar em inglês (ex.: `wikilink`, `frontmatter`, `MOC`, `PARA`, `Zettelkasten`).
- Se você se pegar escrevendo qualquer parágrafo em inglês, pare e reescreva.

---

## 1. Arquitetura: três camadas (padrão LLM Wiki do Karpathy)

| Camada | Pasta | Quem escreve | O que vai aqui |
|---|---|---|---|
| **Raw** (fontes imutáveis) | `raw/` | {{NOME}} | Artigos, papers, transcripts. **Você NUNCA modifica `raw/`.** Só lê. |
| **Wiki** (conhecimento gerado) | `wiki/` | Você (Claude) | Sumários, conceitos, entidades, sínteses. |
| **Schema** | `CLAUDE.md` | {{NOME}} | Regras de operação. |

| Pasta | Conteúdo |
|---|---|
| `00-inbox/captura.md` | Captura zero-fricção (append-and-review). Tudo entra aqui primeiro. |
| `01-diario/` | Daily notes, formato `YYYY-MM-DD.md`. |
| `02-projetos/` | Projetos com prazo e entregáveis. |
| `03-areas/` | Áreas ativas: {{AREAS_INLINE}}. |
| `04-recursos/` | Material de referência temático. |
| `05-arquivo/` | Concluído ou inativo. |

---

## 2. Convenções de nomeação

- **Slugs**: `kebab-case`, sem acentos. Ex.: `andrej-karpathy.md`.
- **Daily notes**: `YYYY-MM-DD.md`.
- **MOCs**: prefixo `moc-`. Ex.: `moc-aprendizado.md`.
- **Fontes**: `wiki/fontes/<slug>.md`.
- **Entidades/conceitos**: `wiki/entidades/<slug>.md`, `wiki/conceitos/<slug>.md`.

---

## 3. Frontmatter padrão

```yaml
---
titulo:
data-criacao: {{DATA}}
data-atualizacao: {{DATA}}
tags:
  - tipo/conceito
  - dominio/geral
status: rascunho
fonte:
relacionadas: []
aliases: []
---
```

**Tipos válidos**: `projeto`, `area`, `recurso`, `fonte`, `conceito`, `entidade`, `sintese`, `moc`, `diario`, `inbox`.

**Domínios**:
{{AREAS_YAML}}
  - geral

**Status**: `rascunho` → `ativo` → `maduro` → `arquivado`.

---

## 4. Regras de wikilink

1. Toda menção a entidade/conceito vira `[[slug]]`.
2. Use `[[slug|texto exibido]]` quando o slug for feio.
3. Toda fonte deve linkar ≥1 entidade e ≥1 conceito.
4. Todo conceito deve linkar ≥2 conceitos relacionados.
5. Embeds (`![[...]]`) só para trechos curtos relevantes.

---

## 5. Workflows

### 5.1 `/wiki-ingest <caminho-em-raw>`

1. Ler arquivo em `raw/`.
2. Identificar entidades e conceitos.
3. Criar `wiki/fontes/<slug>.md` com TL;DR, Resumo, Citações-chave, Conexões.
4. Criar ou atualizar páginas de entidades/conceitos.
5. Atualizar `wiki/index.md`.
6. Append em `wiki/log.md`.

### 5.2 `/wiki-query <pergunta>`

1. Ler `wiki/index.md`.
2. Ler 3–8 páginas relevantes.
3. Sintetizar em PT-BR com wikilinks.
4. Oferecer arquivar em `wiki/sintese/<slug>.md`.
5. Append em `wiki/log.md`.

### 5.3 `/wiki-lint`

1. Listar todos `.md` em `wiki/`.
2. Verificar links quebrados, órfãs, frontmatter inválido, inglês, stale.
3. Reportar em callout `> [!warning]` e append em `wiki/log.md`.

### 5.4 `/wiki-review`

1. Abrir `00-inbox/captura.md`.
2. Para cada bloco do Backlog: sugerir destino; aguardar `ok` antes de mover.
3. Itens não acionados ficam (sinking natural).

### 5.5 `/wiki-capture <texto>`

1. Prepend do texto no topo do `## Backlog` em `00-inbox/captura.md`.
2. Prefixar com timestamp e tag funcional se ausente.

---

## 6. Estilo de escrita

- Frases curtas. Direto ao ponto.
- Bullets quando há lista; parágrafos quando há argumento.
- Callouts: `[!info]`, `[!warning]`, `[!example]`, `[!quote]`, `[!todo]`.
- Sem emojis (a não ser que {{NOME}} peça).
- Sem "eu" ou "nós" nas notas wiki — terceira pessoa neutra.

---

## 7. O que você NÃO faz

- Não mexe em `raw/` (read-only).
- Não cria pastas novas em `wiki/` sem perguntar.
- Não move arquivos sem confirmação.
- Não deleta — arquiva em `05-arquivo/`.
- Não escreve em inglês.
- Não inventa fontes ou citações.

---

## 8. Referências

- Karpathy, *The append-and-review note* — https://karpathy.bearblog.dev/the-append-and-review-note/
- Karpathy, *LLM Wiki gist* — https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Tiago Forte, *Building a Second Brain* (PARA).
- Niklas Luhmann, Zettelkasten.
- Nick Milo, *Linking Your Thinking* (MOCs).
```

- [ ] **Step 2: Criar vault/CLAUDE.en.md**

```markdown
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
- **Sources**: `wiki/sources/<slug>.md`.
- **Entities/concepts**: `wiki/entities/<slug>.md`, `wiki/concepts/<slug>.md`.

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
3. Create `wiki/sources/<slug>.md` with TL;DR, Summary, Key Quotes, Connections.
4. Create or update entity/concept pages.
5. Update `wiki/index.md`.
6. Append to `wiki/log.md`.

### 5.2 `/wiki-query <question>`

1. Read `wiki/index.md`.
2. Read 3–8 relevant pages.
3. Synthesize answer with wikilinks.
4. Offer to archive in `wiki/synthesis/<slug>.md`.
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
```

- [ ] **Step 3: Commit**

```bash
git add vault/CLAUDE.pt-br.md vault/CLAUDE.en.md
git commit -m "feat: add bilingual CLAUDE.md templates with placeholders"
```

---

## Task 3: Vault template — arquivos de conteúdo

**Files:**
- Create: `vault/00-inbox/captura.md`
- Create: `vault/wiki/index.md`
- Create: `vault/wiki/log.md`
- Create: `vault/templates/diario.md`
- Create: `vault/templates/projeto.md`
- Create: `vault/templates/area.md`
- Create: `vault/templates/recurso.md`
- Create: `vault/templates/fonte.md`
- Create: `vault/templates/conceito.md`
- Create: `vault/templates/entidade.md`
- Create: `vault/templates/moc.md`
- Create: `vault/bin/cap`
- Create: `vault/bin/cap.ps1`

- [ ] **Step 1: Criar vault/00-inbox/captura.md**

```markdown
---
titulo: Captura
data-criacao: {{DATA}}
data-atualizacao: {{DATA}}
tags:
  - tipo/inbox
status: ativo
---

# Captura

> [!info] Como usar (append-and-review do Karpathy)
> 1. **Append**: tudo novo entra no TOPO do `## Backlog`. Sem categorizar.
> 2. **Review**: de tempos em tempos, role pra baixo e leia. O que importa, resgate pro topo.
> 3. **Sinking natural**: o que não merece atenção desce sozinho. Nunca delete.
> 4. **Tags funcionais**: `assistir:`, `ler:`, `ouvir:`, `tarefa:`, `ideia:`, `pergunta:`, `link:`.
> 5. Quando algo virar projeto/conceito/fonte → mover ou pedir `/wiki-review` ao Claude.

---

## Backlog

<!-- Cole aqui no topo. Tudo novo vai pra cima. -->

- ideia: usar `/wiki-lint` mensalmente para checar saúde da wiki
- tarefa: após 1 semana de uso, escrever retrospectiva no diário
- ler: post do Karpathy sobre append-and-review (https://karpathy.bearblog.dev/the-append-and-review-note/)
- ler: gist do Karpathy sobre LLM Wiki (https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

---

## Resgatados
-

---

## Arquivo morto (NÃO mexa — sinking natural)
-
```

- [ ] **Step 2: Criar vault/wiki/index.md**

```markdown
---
titulo: Índice do Wiki
data-criacao: {{DATA}}
data-atualizacao: {{DATA}}
tags:
  - tipo/moc
status: ativo
---

# Índice do Wiki de {{NOME}}

> [!info] Catálogo mestre
> Este arquivo é o ponto de entrada para todo o conhecimento gerado neste vault.

## Fontes processadas

```dataview
TABLE data-atualizacao AS "Atualizado", dominio AS "Domínio"
FROM "wiki/fontes"
SORT data-atualizacao DESC
```

## Conceitos

```dataview
TABLE status, dominio
FROM "wiki/conceitos"
SORT status DESC
```

## Entidades

```dataview
LIST
FROM "wiki/entidades"
SORT file.name ASC
```

## Sínteses e MOCs

```dataview
LIST
FROM "wiki/sintese"
SORT file.name ASC
```

## Adicionados recentemente

```dataview
LIST
FROM "wiki"
SORT file.ctime DESC
LIMIT 10
```

## Stale (não atualizados há 90+ dias)

```dataview
LIST
FROM "wiki"
WHERE status = "ativo" OR status = "maduro"
WHERE date(data-atualizacao) < date(today) - dur(90 days)
```
```

- [ ] **Step 3: Criar vault/wiki/log.md**

```markdown
---
titulo: Log do Wiki
data-criacao: {{DATA}}
data-atualizacao: {{DATA}}
tags:
  - tipo/moc
status: ativo
---

# Log do Wiki

> [!info] Registro de operações
> Cada ingest, pergunta ou lint gera uma entrada aqui automaticamente.

---

## {{DATA}} — bootstrap
- vault criado por {{NOME}} via `npx segundo-cerebro`
- áreas: {{AREAS_INLINE}}
```

- [ ] **Step 4: Criar vault/templates/diario.md**

```markdown
---
titulo: Diário <% tp.date.now("YYYY-MM-DD") %>
data-criacao: <% tp.date.now("YYYY-MM-DD") %>
data-atualizacao: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tipo/diario
status: ativo
---

# <% tp.date.now("dddd, DD [de] MMMM [de] YYYY") %>

> [!info] Foco do dia
>

## Capturas rápidas
-

## O que aconteceu
-

## O que aprendi
-

## Pendências
- [ ]

## Notas tocadas hoje
```dataview
LIST
FROM ""
WHERE file.mtime >= date("<% tp.date.now("YYYY-MM-DD") %>") AND file.mtime < date("<% tp.date.now("YYYY-MM-DD") %>") + dur(1 day)
SORT file.mtime DESC
LIMIT 20
```
```

- [ ] **Step 5: Criar vault/templates/projeto.md**

```markdown
---
titulo:
data-criacao: <% tp.date.now("YYYY-MM-DD") %>
data-atualizacao: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tipo/projeto
  - dominio/
status: ativo
prazo:
dono: {{NOME}}
relacionadas: []
---

# <% tp.file.title %>

> [!info] Resultado esperado
> O que precisa estar verdade quando este projeto terminar.

## Por quê
Qual problema este projeto resolve.

## Escopo
- **Dentro**:
- **Fora**:

## Marcos
- [ ] M1 —
- [ ] M2 —
- [ ] M3 —

## Decisões
-

## Riscos
> [!warning]
>

## Conexões
- Área: [[]]
- Recursos: [[]]
- Pessoas: [[]]
```

- [ ] **Step 6: Criar vault/templates/area.md**

```markdown
---
titulo:
data-criacao: <% tp.date.now("YYYY-MM-DD") %>
data-atualizacao: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tipo/area
  - dominio/
status: ativo
relacionadas: []
---

# <% tp.file.title %>

> [!info] Definição da área
> O que esta área representa e por que importa.

## Padrão de qualidade
Como "bom" parece nesta área.

## Projetos ativos
```dataview
LIST
FROM "02-projetos"
WHERE contains(tags, "dominio/<% tp.file.title %>")
```

## Recursos de referência
-

## Revisão periódica
- [ ] Última revisão:
```

- [ ] **Step 7: Criar vault/templates/recurso.md, fonte.md, conceito.md, entidade.md, moc.md**

`vault/templates/recurso.md`:
```markdown
---
titulo:
data-criacao: <% tp.date.now("YYYY-MM-DD") %>
data-atualizacao: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tipo/recurso
  - dominio/
status: ativo
relacionadas: []
aliases: []
---

# <% tp.file.title %>

## O que é
Uma frase sobre este recurso.

## Quando usar
-

## Links relevantes
-

## Notas
-
```

`vault/templates/fonte.md`:
```markdown
---
titulo:
data-criacao: <% tp.date.now("YYYY-MM-DD") %>
data-atualizacao: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tipo/fonte
  - dominio/
status: rascunho
fonte:
relacionadas: []
aliases: []
---

# <% tp.file.title %>

## TL;DR
-
-
-

## Resumo estruturado


## Citações-chave
> "..."

## Conexões
- Entidades: [[]]
- Conceitos: [[]]
```

`vault/templates/conceito.md`:
```markdown
---
titulo:
data-criacao: <% tp.date.now("YYYY-MM-DD") %>
data-atualizacao: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tipo/conceito
  - dominio/
status: rascunho
fonte:
relacionadas: []
aliases: []
---

# <% tp.file.title %>

> [!info] Definição em uma frase
>

## Por que importa


## Como funciona


## Quando aplicar
-

## Quando NÃO aplicar
> [!warning]
>

## Conceitos relacionados
- [[]]
- [[]]

## Fontes
- [[]]
```

`vault/templates/entidade.md`:
```markdown
---
titulo:
data-criacao: <% tp.date.now("YYYY-MM-DD") %>
data-atualizacao: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tipo/entidade
  - dominio/
status: rascunho
relacionadas: []
aliases: []
---

# <% tp.file.title %>

> [!info] O que é / quem é
>

## Relevância para o vault


## Conexões
- Conceitos: [[]]
- Fontes: [[]]
```

`vault/templates/moc.md`:
```markdown
---
titulo: MOC —
data-criacao: <% tp.date.now("YYYY-MM-DD") %>
data-atualizacao: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tipo/moc
  - dominio/
status: ativo
relacionadas: []
---

# MOC — <% tp.file.title %>

> [!info] Sobre este mapa
> Tudo que se conecta a este domínio.

## Pontos de entrada
-

## Conceitos centrais
-

## Entidades
-

## Fontes
-

## Projetos ativos
```dataview
LIST
FROM "02-projetos"
WHERE contains(tags, "dominio/<% tp.file.title %>")
```

## Perguntas em aberto
-
```

- [ ] **Step 8: Criar vault/bin/cap (bash)**

```bash
#!/usr/bin/env bash
# Captura zero-fricção — adiciona linha no topo do Backlog de captura.md
# Uso: cap "ideia: minha ideia"

set -e

VAULT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CAPTURA="$VAULT_DIR/00-inbox/captura.md"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
ENTRADA="- $TIMESTAMP — $*"

# Insere após a linha "## Backlog" e a linha de comentário
awk -v entrada="$ENTRADA" '
  /^<!-- Cole aqui no topo/ { print; print entrada; next }
  { print }
' "$CAPTURA" > "$CAPTURA.tmp" && mv "$CAPTURA.tmp" "$CAPTURA"

echo "Capturado: $*"
```

- [ ] **Step 9: Criar vault/bin/cap.ps1 (PowerShell — Windows)**

```powershell
# Captura zero-fricção — adiciona linha no topo do Backlog de captura.md
# Uso: .\cap.ps1 "ideia: minha ideia"
param([Parameter(Mandatory=$true)][string]$Texto)

$VaultDir = Split-Path -Parent $PSScriptRoot
$Captura = Join-Path $VaultDir "00-inbox\captura.md"
$Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$Entrada = "- $Timestamp — $Texto"

$Conteudo = Get-Content $Captura -Encoding UTF8
$Idx = ($Conteudo | Select-String -Pattern "<!-- Cole aqui no topo").LineNumber
$Novo = $Conteudo[0..($Idx-1)] + $Entrada + $Conteudo[$Idx..($Conteudo.Length-1)]
$Novo | Set-Content $Captura -Encoding UTF8

Write-Host "Capturado: $Texto"
```

- [ ] **Step 10: Tornar cap executável e commitar**

```bash
chmod +x vault/bin/cap
git add vault/
git commit -m "feat: add generic vault template with all files and bin scripts"
```

---

## Task 4: CLI — questions.js

**Files:**
- Create: `cli/questions.js`

- [ ] **Step 1: Escrever cli/questions.js**

```javascript
'use strict';

const { Input, Select, MultiSelect } = require('enquirer');
const path = require('path');

const DEFAULT_AREAS = {
  'PT-BR': ['trabalho', 'aprendizado', 'saúde', 'finanças', 'família'],
  'EN': ['work', 'learning', 'health', 'finance', 'family'],
};

async function askQuestions() {
  const name = await new Input({
    name: 'name',
    message: 'Qual é o seu nome? / What is your name?',
    initial: 'João',
    validate: (v) => v.trim().length > 0 || 'Nome não pode ser vazio / Name cannot be empty',
  }).run();

  const language = await new Select({
    name: 'language',
    message: 'Idioma do vault / Vault language?',
    choices: ['PT-BR', 'EN'],
  }).run();

  const isptbr = language === 'PT-BR';

  const dest = await new Input({
    name: 'dest',
    message: isptbr ? 'Em qual diretório criar o vault?' : 'Which directory to create the vault in?',
    initial: isptbr ? './meu-cerebro' : './my-brain',
    validate: (v) => v.trim().length > 0 || 'Diretório inválido / Invalid directory',
  }).run();

  const defaults = DEFAULT_AREAS[language];

  const selectedAreas = await new MultiSelect({
    name: 'areas',
    message: isptbr ? 'Quais são suas áreas de vida?' : 'What are your life areas?',
    choices: defaults,
    initial: defaults.map((_, i) => i),
    validate: (v) => v.length > 0 || (isptbr ? 'Selecione pelo menos uma área' : 'Select at least one area'),
  }).run();

  const customMsg = isptbr
    ? 'Áreas customizadas? (vírgula para separar, Enter para pular)'
    : 'Custom areas? (comma-separated, Enter to skip)';

  const customInput = await new Input({
    name: 'customAreas',
    message: customMsg,
    initial: '',
  }).run();

  const customAreas = customInput
    .split(',')
    .map((a) => a.trim().toLowerCase().replace(/\s+/g, '-'))
    .filter(Boolean);

  const areas = [...selectedAreas, ...customAreas];

  return {
    name: name.trim(),
    language,
    dest: path.resolve(dest.trim()),
    areas,
  };
}

module.exports = { askQuestions };
```

- [ ] **Step 2: Commit**

```bash
git add cli/questions.js
git commit -m "feat: add CLI questions module with bilingual enquirer prompts"
```

---

## Task 5: CLI — generators.js + tests

**Files:**
- Create: `cli/generators.js`
- Create: `cli/__tests__/generators.test.js`

- [ ] **Step 1: Escrever cli/__tests__/generators.test.js (testes primeiro)**

```javascript
'use strict';

const { replacePlaceholders, today, slugify } = require('../generators');

describe('replacePlaceholders', () => {
  const config = {
    name: 'Ana',
    language: 'PT-BR',
    areas: ['trabalho', 'saúde'],
    date: '2026-05-05',
  };

  it('substitui {{NOME}} pelo nome do usuário', () => {
    expect(replacePlaceholders('Olá {{NOME}}!', config)).toBe('Olá Ana!');
  });

  it('substitui {{DATA}} pela data', () => {
    expect(replacePlaceholders('data: {{DATA}}', config)).toBe('data: 2026-05-05');
  });

  it('substitui {{AREAS_INLINE}} pela lista de áreas', () => {
    const result = replacePlaceholders('{{AREAS_INLINE}}', config);
    expect(result).toBe('trabalho, saúde');
  });

  it('substitui {{AREAS_YAML}} por lista YAML com indentação', () => {
    const result = replacePlaceholders('{{AREAS_YAML}}', config);
    expect(result).toBe('  - trabalho\n  - saúde');
  });

  it('substitui múltiplas ocorrências do mesmo placeholder', () => {
    const result = replacePlaceholders('{{NOME}} e {{NOME}}', config);
    expect(result).toBe('Ana e Ana');
  });

  it('não altera texto sem placeholders', () => {
    expect(replacePlaceholders('texto normal', config)).toBe('texto normal');
  });
});

describe('today', () => {
  it('retorna string no formato YYYY-MM-DD', () => {
    expect(today()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('slugify', () => {
  it('converte para kebab-case sem acentos', () => {
    expect(slugify('Saúde')).toBe('saude');
    expect(slugify('engenharia IA')).toBe('engenharia-ia');
    expect(slugify('Finanças & Família')).toBe('financas-familia');
  });
});
```

- [ ] **Step 2: Rodar testes — devem FALHAR**

```bash
npx jest cli/__tests__/generators.test.js
```

Expected: FAIL — `Cannot find module '../generators'`

- [ ] **Step 3: Escrever cli/generators.js**

```javascript
'use strict';

const fs = require('fs-extra');
const path = require('path');

function today() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function replacePlaceholders(content, config) {
  const areasYaml = config.areas.map((a) => `  - ${a}`).join('\n');
  const areasInline = config.areas.join(', ');
  return content
    .replace(/\{\{NOME\}\}/g, config.name)
    .replace(/\{\{NAME\}\}/g, config.name)
    .replace(/\{\{AREAS_YAML\}\}/g, areasYaml)
    .replace(/\{\{AREAS_INLINE\}\}/g, areasInline)
    .replace(/\{\{DATA\}\}/g, config.date)
    .replace(/\{\{LANG\}\}/g, config.language);
}

async function replacePlaceholdersInDir(dir, config) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const itemPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      await replacePlaceholdersInDir(itemPath, config);
    } else if (item.name.endsWith('.md') || item.name === 'cap' || item.name === 'cap.ps1') {
      const content = await fs.readFile(itemPath, 'utf8');
      const replaced = replacePlaceholders(content, config);
      if (replaced !== content) {
        await fs.writeFile(itemPath, replaced, 'utf8');
      }
    }
  }
}

async function copyVault(vaultSrc, dest, config) {
  await fs.ensureDir(dest);

  const claudeSrc = config.language === 'PT-BR'
    ? path.join(vaultSrc, 'CLAUDE.pt-br.md')
    : path.join(vaultSrc, 'CLAUDE.en.md');

  const items = await fs.readdir(vaultSrc, { withFileTypes: true });

  for (const item of items) {
    if (item.name === 'CLAUDE.pt-br.md' || item.name === 'CLAUDE.en.md') continue;
    const srcPath = path.join(vaultSrc, item.name);
    const destPath = path.join(dest, item.name);
    await fs.copy(srcPath, destPath, { overwrite: false });
  }

  const claudeContent = await fs.readFile(claudeSrc, 'utf8');
  await fs.writeFile(
    path.join(dest, 'CLAUDE.md'),
    replacePlaceholders(claudeContent, config),
    'utf8'
  );

  await replacePlaceholdersInDir(dest, config);
}

async function createAreas(dest, areas, config) {
  const isptbr = config.language === 'PT-BR';
  for (const area of areas) {
    const slug = slugify(area);
    await fs.ensureDir(path.join(dest, '03-areas', slug));

    const mocPath = path.join(dest, 'wiki', 'sintese', `moc-${slug}.md`);
    const mocContent = isptbr
      ? buildMocPtbr(area, slug, config.date)
      : buildMocEn(area, slug, config.date);
    await fs.writeFile(mocPath, mocContent, 'utf8');
  }
}

function buildMocPtbr(area, slug, date) {
  return `---
titulo: MOC — ${area}
data-criacao: ${date}
data-atualizacao: ${date}
tags:
  - tipo/moc
  - dominio/${slug}
status: ativo
relacionadas: []
---

# MOC — ${area}

> [!info] Sobre este mapa
> Tudo que se conecta ao domínio: ${area}.

## Pontos de entrada
-

## Conceitos centrais
-

## Projetos ativos
\`\`\`dataview
LIST
FROM "02-projetos"
WHERE contains(tags, "dominio/${slug}")
\`\`\`

## Perguntas em aberto
-
`;
}

function buildMocEn(area, slug, date) {
  return `---
title: MOC — ${area}
created: ${date}
updated: ${date}
tags:
  - type/moc
  - domain/${slug}
status: active
related: []
---

# MOC — ${area}

> [!info] About this map
> Everything connected to the domain: ${area}.

## Entry points
-

## Core concepts
-

## Active projects
\`\`\`dataview
LIST
FROM "02-projetos"
WHERE contains(tags, "domain/${slug}")
\`\`\`

## Open questions
-
`;
}

async function makeExecutable(filePath) {
  if (process.platform !== 'win32' && await fs.pathExists(filePath)) {
    await fs.chmod(filePath, '755');
  }
}

module.exports = { copyVault, createAreas, makeExecutable, replacePlaceholders, today, slugify };
```

- [ ] **Step 4: Rodar testes — devem PASSAR**

```bash
npx jest cli/__tests__/generators.test.js
```

Expected: PASS — 8 tests

- [ ] **Step 5: Commit**

```bash
git add cli/generators.js cli/__tests__/generators.test.js
git commit -m "feat: add generators module with placeholder replacement and TDD tests"
```

---

## Task 6: CLI — skills.js + tests

**Files:**
- Create: `cli/skills.js`
- Create: `cli/__tests__/skills.test.js`

- [ ] **Step 1: Escrever cli/__tests__/skills.test.js (testes primeiro)**

```javascript
'use strict';

const { getSkillsDir } = require('../skills');
const os = require('os');
const path = require('path');

describe('getSkillsDir', () => {
  const originalPlatform = process.platform;
  const originalEnv = process.env.USERPROFILE;

  afterEach(() => {
    Object.defineProperty(process, 'platform', { value: originalPlatform });
    process.env.USERPROFILE = originalEnv;
  });

  it('retorna caminho Unix em mac/linux', () => {
    Object.defineProperty(process, 'platform', { value: 'darwin' });
    const result = getSkillsDir();
    expect(result).toBe(path.join(os.homedir(), '.claude', 'commands'));
  });

  it('retorna caminho Windows usando USERPROFILE', () => {
    Object.defineProperty(process, 'platform', { value: 'win32' });
    process.env.USERPROFILE = 'C:\\Users\\TestUser';
    const result = getSkillsDir();
    expect(result).toBe(path.join('C:\\Users\\TestUser', '.claude', 'commands'));
  });

  it('retorna caminho Windows com os.homedir() se USERPROFILE ausente', () => {
    Object.defineProperty(process, 'platform', { value: 'win32' });
    delete process.env.USERPROFILE;
    const result = getSkillsDir();
    expect(result).toBe(path.join(os.homedir(), '.claude', 'commands'));
  });
});
```

- [ ] **Step 2: Rodar testes — devem FALHAR**

```bash
npx jest cli/__tests__/skills.test.js
```

Expected: FAIL — `Cannot find module '../skills'`

- [ ] **Step 3: Escrever cli/skills.js**

```javascript
'use strict';

const fs = require('fs-extra');
const path = require('path');
const os = require('os');

function getSkillsDir() {
  if (process.platform === 'win32') {
    return path.join(process.env.USERPROFILE || os.homedir(), '.claude', 'commands');
  }
  return path.join(os.homedir(), '.claude', 'commands');
}

async function installSkills(skillsSrc) {
  const dest = getSkillsDir();
  await fs.ensureDir(dest);

  const files = await fs.readdir(skillsSrc);
  const installed = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    await fs.copy(path.join(skillsSrc, file), path.join(dest, file), { overwrite: true });
    installed.push(file.replace('.md', ''));
  }

  return { dest, installed };
}

module.exports = { installSkills, getSkillsDir };
```

- [ ] **Step 4: Rodar testes — devem PASSAR**

```bash
npx jest cli/__tests__/skills.test.js
```

Expected: PASS — 3 tests

- [ ] **Step 5: Rodar todos os testes**

```bash
npx jest
```

Expected: PASS — todos os testes

- [ ] **Step 6: Commit**

```bash
git add cli/skills.js cli/__tests__/skills.test.js
git commit -m "feat: add cross-platform skills installer with Windows USERPROFILE support"
```

---

## Task 7: CLI — index.js (entry point)

**Files:**
- Create: `cli/index.js`

- [ ] **Step 1: Criar cli/index.js**

```javascript
#!/usr/bin/env node
'use strict';

const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { askQuestions } = require('./questions');
const { copyVault, createAreas, makeExecutable, today } = require('./generators');
const { installSkills } = require('./skills');

const VAULT_TEMPLATE = path.join(__dirname, '..', 'vault');
const SKILLS_DIR = path.join(__dirname, '..', 'skills');

async function main() {
  console.log('\n' + chalk.bold('  ┌─────────────────────────────────────┐'));
  console.log(chalk.bold('  │   ') + chalk.hex('#e8006a').bold('Segundo Cérebro') + chalk.bold(' — Setup v1.0   │'));
  console.log(chalk.bold('  └─────────────────────────────────────┘\n'));

  let answers;
  try {
    answers = await askQuestions();
  } catch {
    console.log('\n' + chalk.yellow('  Setup cancelado.'));
    process.exit(0);
  }

  const config = { ...answers, date: today() };

  const spinner = ora(chalk.dim('Copiando vault...')).start();

  try {
    spinner.text = chalk.dim('Copiando template...');
    await copyVault(VAULT_TEMPLATE, answers.dest, config);

    spinner.text = chalk.dim('Criando áreas de vida...');
    await createAreas(answers.dest, answers.areas, config);

    const capPath = path.join(answers.dest, 'bin', 'cap');
    await makeExecutable(capPath);

    spinner.text = chalk.dim('Instalando skills do Claude Code...');
    const { dest: skillsDest, installed } = await installSkills(SKILLS_DIR);

    spinner.succeed(chalk.green('Vault criado com sucesso!'));

    console.log('\n' + chalk.bold('  Pronto!'));
    console.log(`\n  ${chalk.dim('Vault:')}   ${chalk.cyan(answers.dest)}`);
    console.log(`  ${chalk.dim('Skills:')}  ${chalk.cyan(skillsDest)}`);
    console.log(`\n  ${chalk.bold('Abra')} ${chalk.cyan(answers.dest)} ${chalk.bold('no Obsidian.')}`);
    console.log(`\n  ${chalk.bold('Comandos disponíveis no Claude Code:')}`);
    installed.forEach((s) => console.log(`    ${chalk.hex('#e8006a')('/')}${s}`));
    console.log();
  } catch (err) {
    spinner.fail(chalk.red('Erro durante o setup'));
    console.error(chalk.red('\n  ' + err.message));
    process.exit(1);
  }
}

main();
```

- [ ] **Step 2: Tornar executável**

```bash
chmod +x cli/index.js
```

- [ ] **Step 3: Testar localmente**

```bash
node cli/index.js
```

Expected: o prompt interativo abre e percorre todas as perguntas. Ao confirmar, cria o vault no diretório escolhido com CLAUDE.md, áreas, wiki, e instala os 5 skills em `~/.claude/commands/`.

- [ ] **Step 4: Commit**

```bash
git add cli/index.js
git commit -m "feat: add CLI entry point — npx segundo-cerebro fully functional"
```

---

## Task 8: Skills markdown files

**Files:**
- Create: `skills/wiki-capture.md`
- Create: `skills/wiki-ingest.md`
- Create: `skills/wiki-lint.md`
- Create: `skills/wiki-query.md`
- Create: `skills/wiki-review.md`

- [ ] **Step 1: Criar skills/wiki-capture.md**

```markdown
# wiki-capture

Captura rápida zero-fricção no vault.

## Como usar

```
/wiki-capture <texto ou ideia>
```

## O que faz

1. Abre `00-inbox/captura.md`
2. Insere a nova entrada no TOPO da seção `## Backlog` com timestamp
3. Prefixa com tag funcional se não estiver presente (`ideia:`, `tarefa:`, `ler:`, etc.)

## Exemplo

```
/wiki-capture ideia: criar um MOC de IA depois que tiver 5 conceitos
```

Resultado em `captura.md`:
```
- 2026-05-05 10:32 — ideia: criar um MOC de IA depois que tiver 5 conceitos
```
```

- [ ] **Step 2: Criar skills/wiki-ingest.md**

```markdown
# wiki-ingest

Processa um arquivo de `raw/` e gera páginas no wiki.

## Como usar

```
/wiki-ingest raw/artigos/nome-do-arquivo.md
```

## O que faz

1. Lê o arquivo em `raw/` (texto integral)
2. Identifica entidades (pessoas, empresas, produtos) e conceitos (ideias, frameworks)
3. Cria `wiki/fontes/<slug>.md` com:
   - `## TL;DR` — 3–5 bullets
   - `## Resumo estruturado` — ~300 palavras
   - `## Citações-chave` — 3–5 trechos verbatim
   - `## Conexões` — wikilinks para entidades e conceitos
4. Para cada entidade/conceito:
   - Se já existe: adiciona 1–3 frases novas e atualiza `data-atualizacao`
   - Se é nova: cria página com frontmatter + parágrafo seed
5. Atualiza `wiki/index.md`
6. Append em `wiki/log.md`

## Regras

- Nunca modifica nada em `raw/`
- Todas as páginas geradas em PT-BR (ou EN, conforme CLAUDE.md)
- Não inventa citações — só trechos verbatim do original
```

- [ ] **Step 3: Criar skills/wiki-lint.md**

```markdown
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
```

- [ ] **Step 4: Criar skills/wiki-query.md**

```markdown
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
```

- [ ] **Step 5: Criar skills/wiki-review.md**

```markdown
# wiki-review

Revisa o inbox e sugere destino para cada item capturado.

## Como usar

```
/wiki-review
```

ou: `revisa minha captura`, `limpa minha caixa de entrada`

## O que faz

1. Abre `00-inbox/captura.md`
2. Para cada bloco do `## Backlog`:
   - Sugere destino: criar projeto/recurso/conceito/fonte? mover para área?
   - Apresenta uma ação por bloco
   - Aguarda `ok` antes de executar
3. Itens não acionados ficam onde estão (sinking natural — princípio do Karpathy)

## Regras

- Nunca move nada sem confirmação explícita
- Nunca deleta — arquiva em `05-arquivo/` se necessário
- Respeita o sinking natural: não forçar processar tudo
```

- [ ] **Step 6: Commit**

```bash
git add skills/
git commit -m "feat: add 5 Claude Code skill files (wiki-capture, ingest, lint, query, review)"
```

---

## Task 9: README.md (EN + PT-BR)

**Files:**
- Modify: `README.md`
- Create: `docs/pt-br/README.md`

- [ ] **Step 1: Reescrever README.md (inglês)**

```markdown
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
```

- [ ] **Step 2: Criar docs/pt-br/README.md**

Mesmo conteúdo do Step 1 traduzido para PT-BR. Substituir todos os títulos, descrições e comentários por equivalentes em PT-BR, mantendo os comandos e nomes de arquivo em inglês/original.

Estrutura idêntica ao README.md em inglês, com:
- "O que você ganha" em vez de "What you get"
- "Início rápido" em vez de "Quick start"
- "Comandos" em vez de "Commands"
- "Arquitetura" em vez de "Architecture"
- "Como funciona" em vez de "How it works"
- "Referências" em vez de "References"

- [ ] **Step 3: Commit**

```bash
git add README.md docs/pt-br/README.md
git commit -m "docs: add comprehensive bilingual README (EN + PT-BR)"
```

---

## Task 10: Aula HTML — 3 slides de teoria Karpathy

**Files:**
- Modify: `aulas/aula-segundo-cerebro.html`

Os 3 novos slides serão inseridos **após o slide 5** ("Cada um no seu lugar") e **antes do slide 6** ("Append-and-Review"). Após a inserção, os slides 6–29 precisam ser renumerados para 9–32.

- [ ] **Step 1: Escrever script de renumeração (Node.js)**

Criar `aulas/renumber.js` temporário:

```javascript
const fs = require('fs');

let html = fs.readFileSync('aulas/aula-segundo-cerebro.html', 'utf8');

// Renumera data-slide de 29 até 6, de trás para frente
for (let i = 29; i >= 6; i--) {
  html = html.replace(
    new RegExp(`data-slide="${i}"`, 'g'),
    `data-slide="${i + 3}"`
  );
  html = html.replace(
    new RegExp(`<!-- ============== SLIDE ${i}:`, 'g'),
    `<!-- ============== SLIDE ${i + 3}:`
  );
}

// Atualiza hero meta text
html = html.replace('29 slides · ~25 min', '36 slides · ~30 min');

fs.writeFileSync('aulas/aula-segundo-cerebro.html', html, 'utf8');
console.log('Renumeração concluída. Slides 6-29 → 9-32.');
```

- [ ] **Step 2: Rodar script de renumeração**

```bash
node aulas/renumber.js
```

Expected: "Renumeração concluída. Slides 6-29 → 9-32."

- [ ] **Step 3: Verificar renumeração**

```bash
grep -c 'data-slide=' aulas/aula-segundo-cerebro.html
```

Expected: 29 (count não muda ainda — apenas os valores mudaram)

- [ ] **Step 4: Inserir os 3 novos slides após data-slide="5"**

Localizar no HTML a linha que contém `<!-- ============== SLIDE 9:` (era slide 6 antes).
Inserir ANTES dessa linha os 3 novos slides:

```html
<!-- ============== SLIDE 6: QUEM É KARPATHY ============== -->
<section class="slide" data-slide="6">
  <div class="slide-inner">
    <div class="label">teoria</div>
    <h2 class="section-title">Quem é <span class="gradient">Andrej Karpathy</span></h2>
    <div class="grid-2" style="margin-top:2rem; gap:2rem;">
      <div class="card">
        <div class="card-label">trajetória</div>
        <ul class="list mt-16">
          <li>PhD Stanford — IA e visão computacional</li>
          <li>Co-fundador da OpenAI (2015)</li>
          <li>Head de IA na Tesla (Autopilot)</li>
          <li>Volta à OpenAI como pesquisador sênior</li>
          <li>2024: funda Eureka Labs (educação + IA)</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-label">por que ele importa aqui</div>
        <ul class="list mt-16">
          <li>Criou o termo <strong>"vibe coding"</strong></li>
          <li>Construiu seu próprio segundo cérebro e documentou o método publicamente</li>
          <li>Pensa em <em>sistemas</em>, não em ferramentas</li>
          <li>O método dele é usado por engenheiros de IA do mundo inteiro</li>
        </ul>
      </div>
    </div>
    <blockquote class="callout callout-quote mt-32">
      "The brain is not for storing information — it is for having ideas."
      <cite>— inspiração central do método</cite>
    </blockquote>
  </div>
</section>

<!-- ============== SLIDE 7: POR QUE ELE CRIOU ============== -->
<section class="slide" data-slide="7">
  <div class="slide-inner">
    <div class="label">teoria</div>
    <h2 class="section-title">O problema que o <span class="gradient">Karpathy resolveu</span></h2>
    <div class="card mt-32" style="max-width:720px; margin-left:auto; margin-right:auto;">
      <div class="card-label">o ciclo quebrado</div>
      <div style="display:flex; flex-direction:column; gap:1rem; margin-top:1.5rem;">
        <div class="step-row"><span class="step-num">1</span><span>Você lê um artigo excelente</span></div>
        <div class="step-row"><span class="step-num">2</span><span>Você entende tudo na hora</span></div>
        <div class="step-row"><span class="step-num">3</span><span>Você não anota nada (ou anota de forma desorganizada)</span></div>
        <div class="step-row step-bad"><span class="step-num">4</span><span>Em 2 semanas, você esqueceu 90% do conteúdo</span></div>
        <div class="step-row step-bad"><span class="step-num">5</span><span>Você relê o mesmo artigo 6 meses depois</span></div>
      </div>
    </div>
    <div class="grid-2 mt-32" style="gap:1.5rem;">
      <div class="card card-bad">
        <div class="card-label">antes do método</div>
        <p class="mt-8">Notas em 5 apps diferentes. Sem conexão. Esquecidas em semanas. O conhecimento não se acumula.</p>
      </div>
      <div class="card card-good">
        <div class="card-label">com o método Karpathy</div>
        <p class="mt-8">Uma nota viva que cresce. O LLM mantém o wiki. Você acumula contexto real ao longo de anos.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============== SLIDE 8: LLM WIKI VS RAG ============== -->
<section class="slide" data-slide="8">
  <div class="slide-inner">
    <div class="label">teoria</div>
    <h2 class="section-title">LLM Wiki <span class="gradient">vs</span> RAG</h2>
    <p class="subtitle mt-16">Por que Karpathy escolheu wiki estruturada em vez de busca vetorial</p>
    <div class="grid-2 mt-32" style="gap:2rem;">
      <div class="card">
        <div class="card-label">RAG (busca vetorial)</div>
        <ul class="list mt-16">
          <li>Chunks isolados sem contexto</li>
          <li>Boa para busca pontual ("me dá esse trecho")</li>
          <li>Ruim para raciocínio ("como X se conecta com Y?")</li>
          <li>Depende de embeddings e infraestrutura</li>
          <li>Conhecimento fragmentado</li>
        </ul>
      </div>
      <div class="card card-highlight">
        <div class="card-label">LLM Wiki (método Karpathy)</div>
        <ul class="list mt-16">
          <li>Páginas com contexto completo e conexões</li>
          <li>Ótimo para raciocínio e síntese</li>
          <li>O LLM entende relações entre conceitos</li>
          <li>Só precisa de arquivos .md</li>
          <li>Conhecimento acumulado e conectado</li>
        </ul>
      </div>
    </div>
    <blockquote class="callout callout-info mt-32">
      RAG busca documentos. Wiki entende contexto. Para um segundo cérebro pessoal, contexto vence.
    </blockquote>
  </div>
</section>
```

- [ ] **Step 5: Apagar script temporário**

```bash
rm aulas/renumber.js
```

- [ ] **Step 6: Verificar slide count**

```bash
grep -c 'class="slide"' aulas/aula-segundo-cerebro.html
```

Expected: 32

- [ ] **Step 7: Commit**

```bash
git add aulas/aula-segundo-cerebro.html
git commit -m "feat(aula): add 3 Karpathy theory slides (who he is, the problem, LLM Wiki vs RAG)"
```

---

## Task 11: Aula HTML — 4 slides do framework

**Files:**
- Modify: `aulas/aula-segundo-cerebro.html`

Os 4 novos slides serão inseridos **antes do slide 32** (que era o slide 29 original — Encerramento).

- [ ] **Step 1: Verificar número atual do último slide**

```bash
grep 'data-slide=' aulas/aula-segundo-cerebro.html | tail -5
```

Expected: o último `data-slide` deve ser `"32"` (encerramento).

- [ ] **Step 2: Renumerar slide 32 para 36**

```bash
sed -i '' 's/data-slide="32"/data-slide="36"/g' aulas/aula-segundo-cerebro.html
sed -i '' 's/<!-- ============== SLIDE 32:/<!-- ============== SLIDE 36:/g' aulas/aula-segundo-cerebro.html
```

(No Linux, remover o `''` após `-i`)

- [ ] **Step 3: Inserir 4 slides de framework antes do slide 36**

Localizar `<!-- ============== SLIDE 36:` no HTML e inserir ANTES:

```html
<!-- ============== SLIDE 32: FRAMEWORK ============== -->
<section class="slide" data-slide="32">
  <div class="slide-inner" style="display:flex; flex-direction:column; justify-content:center; min-height:70vh;">
    <div class="label">framework</div>
    <h2 class="section-title">Seu segundo cérebro em <span class="gradient">1 comando</span></h2>
    <p class="subtitle mt-16">Agora tudo isso virou um framework público. Qualquer pessoa instala em 60 segundos.</p>
    <div class="card mt-32" style="max-width:640px; margin:2rem auto;">
      <div class="card-label">instalação</div>
      <div class="cmd-multi mt-16">
        <pre>npx segundo-cerebro</pre>
        <span class="copy-hint">copiar</span>
      </div>
    </div>
    <div class="grid-3 mt-32" style="gap:1rem; max-width:720px; margin:0 auto;">
      <div class="mini-card"><span class="dot"></span>Mac</div>
      <div class="mini-card"><span class="dot"></span>Linux</div>
      <div class="mini-card"><span class="dot"></span>Windows</div>
    </div>
    <p class="muted mt-24 text-center">Único pré-requisito: Node.js 18+</p>
  </div>
</section>

<!-- ============== SLIDE 33: DEMO CLI ============== -->
<section class="slide" data-slide="33">
  <div class="slide-inner">
    <div class="label">framework</div>
    <h2 class="section-title">O que acontece quando você roda</h2>
    <div class="terminal mt-32" style="max-width:680px; margin:0 auto;">
      <div class="terminal-bar"><span class="t-dot red"></span><span class="t-dot yellow"></span><span class="t-dot green"></span><span class="t-label">terminal</span></div>
      <div class="terminal-body">
        <div class="t-line"><span class="t-prompt">$</span> npx segundo-cerebro</div>
        <div class="t-line t-gap"></div>
        <div class="t-line t-header">  ┌─────────────────────────────────────┐</div>
        <div class="t-line t-header">  │   <span class="t-pink">Segundo Cérebro</span> — Setup v1.0   │</div>
        <div class="t-line t-header">  └─────────────────────────────────────┘</div>
        <div class="t-line t-gap"></div>
        <div class="t-line"><span class="t-q">?</span> Qual é o seu nome? <span class="t-ans">› Ana</span></div>
        <div class="t-line"><span class="t-q">?</span> Idioma do vault? <span class="t-ans">› PT-BR</span></div>
        <div class="t-line"><span class="t-q">?</span> Diretório do vault? <span class="t-ans">› ./meu-cerebro</span></div>
        <div class="t-line"><span class="t-q">?</span> Áreas de vida? <span class="t-ans">› trabalho, aprendizado, saúde</span></div>
        <div class="t-line t-gap"></div>
        <div class="t-line t-success">✔ Vault criado com sucesso!</div>
        <div class="t-line t-gap"></div>
        <div class="t-line">  Vault:  <span class="t-cyan">./meu-cerebro</span></div>
        <div class="t-line">  Skills: <span class="t-cyan">~/.claude/commands</span></div>
        <div class="t-line t-gap"></div>
        <div class="t-line">  Comandos disponíveis:</div>
        <div class="t-line">    <span class="t-pink">/</span>wiki-capture</div>
        <div class="t-line">    <span class="t-pink">/</span>wiki-ingest</div>
        <div class="t-line">    <span class="t-pink">/</span>wiki-lint</div>
        <div class="t-line">    <span class="t-pink">/</span>wiki-query</div>
        <div class="t-line">    <span class="t-pink">/</span>wiki-review</div>
      </div>
    </div>
  </div>
</section>

<!-- ============== SLIDE 34: OS 5 COMANDOS ============== -->
<section class="slide" data-slide="34">
  <div class="slide-inner">
    <div class="label">framework</div>
    <h2 class="section-title">Os <span class="gradient">5 comandos</span> do dia a dia</h2>
    <div style="display:flex; flex-direction:column; gap:1rem; margin-top:2rem; max-width:760px;">
      <div class="cmd-row">
        <span class="cmd-name">/wiki-capture</span>
        <span class="cmd-desc">Captura rápida no inbox — sem sair do terminal</span>
        <span class="cmd-freq">diário</span>
      </div>
      <div class="cmd-row">
        <span class="cmd-name">/wiki-ingest</span>
        <span class="cmd-desc">Processa artigo/paper/transcript em raw/ → gera páginas no wiki</span>
        <span class="cmd-freq">por fonte</span>
      </div>
      <div class="cmd-row">
        <span class="cmd-name">/wiki-query</span>
        <span class="cmd-desc">Faz uma pergunta ao wiki — Claude sintetiza com wikilinks</span>
        <span class="cmd-freq">quando precisar</span>
      </div>
      <div class="cmd-row">
        <span class="cmd-name">/wiki-review</span>
        <span class="cmd-desc">Triagem do inbox com Claude — cada item vira uma decisão</span>
        <span class="cmd-freq">semanal</span>
      </div>
      <div class="cmd-row">
        <span class="cmd-name">/wiki-lint</span>
        <span class="cmd-desc">Checa saúde do wiki — links quebrados, órfãs, stale, idioma</span>
        <span class="cmd-freq">mensal</span>
      </div>
    </div>
    <blockquote class="callout callout-info mt-32">
      Os skills ficam em <code>~/.claude/commands/</code> e funcionam em qualquer projeto.
    </blockquote>
  </div>
</section>

<!-- ============== SLIDE 35: CLAUDE.MD COMO CONTRATO ============== -->
<section class="slide" data-slide="35">
  <div class="slide-inner">
    <div class="label">framework</div>
    <h2 class="section-title">O <span class="gradient">CLAUDE.md</span> como contrato</h2>
    <p class="subtitle mt-16">O arquivo que ensina o Claude a operar o seu vault — gerado automaticamente pelo setup.</p>
    <div class="grid-2 mt-32" style="gap:2rem;">
      <div class="card">
        <div class="card-label">o que ele define</div>
        <ul class="list mt-16">
          <li><strong>§0 Idioma</strong> — PT-BR ou EN (regra absoluta)</li>
          <li><strong>§1 Arquitetura</strong> — raw/ (você) vs wiki/ (Claude)</li>
          <li><strong>§2 Nomeação</strong> — slugs, daily notes, MOCs</li>
          <li><strong>§3 Frontmatter</strong> — campos obrigatórios por tipo</li>
          <li><strong>§4 Wikilinks</strong> — quando e como linkar</li>
          <li><strong>§5 Workflows</strong> — os 5 comandos em detalhe</li>
          <li><strong>§7 Proibições</strong> — o que Claude nunca faz</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-label">por que isso importa</div>
        <ul class="list mt-16">
          <li>Claude Code lê o CLAUDE.md ao entrar no diretório</li>
          <li>Você não precisa re-explicar as regras a cada sessão</li>
          <li>O contrato persiste — você evolui o vault, o contrato acompanha</li>
          <li>Funciona como <em>memory</em> estruturada do agente</li>
        </ul>
        <div class="cmd-single mt-24">
          <code>cat CLAUDE.md | wc -l</code>
          <span class="t-muted"> → ~200 linhas de contrato</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Atualizar contagem no hero slide**

Localizar e substituir no slide 1:
```
36 slides · ~30 min
```

(Verificar linha exata com `grep -n '29 slides\|30 slides\|36 slides' aulas/aula-segundo-cerebro.html` e substituir o valor correto)

- [ ] **Step 5: Adicionar CSS para novos elementos usados nos slides**

Os novos slides usam classes: `.step-row`, `.step-num`, `.step-bad`, `.step-good`, `.card-bad`, `.card-good`, `.card-highlight`, `.grid-3`, `.mini-card`, `.cmd-row`, `.cmd-name`, `.cmd-desc`, `.cmd-freq`, `.terminal`, `.terminal-bar`, `.terminal-body`, `.t-line`, `.t-prompt`, `.t-q`, `.t-ans`, `.t-pink`, `.t-cyan`, `.t-success`, `.t-header`, `.t-gap`, `.t-dot`, `.t-label`, `.t-muted`, `.cmd-single`, `.t-dot.red`, `.t-dot.yellow`, `.t-dot.green`.

Adicionar no `<style>` do HTML antes de `</style>`:

```css
/* ==================== NOVOS SLIDES — TEORIA + FRAMEWORK ==================== */
.step-row { display:flex; align-items:center; gap:1rem; padding:0.5rem 0; border-bottom:1px solid var(--glass-border); }
.step-row:last-child { border-bottom:none; }
.step-num { width:28px; height:28px; border-radius:50%; background:var(--neon); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; flex-shrink:0; }
.step-bad .step-num { background:#ef4444; }
.card-bad { border-color:rgba(239,68,68,0.3); }
.card-good { border-color:rgba(74,222,128,0.3); }
.card-highlight { border-color:var(--neon); background:var(--neon-dim); }
.grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
.mini-card { background:var(--glass); border:1px solid var(--glass-border); border-radius:10px; padding:0.75rem 1rem; display:flex; align-items:center; gap:0.5rem; font-weight:500; }
.cmd-row { display:flex; align-items:center; gap:1rem; padding:0.75rem 1rem; background:var(--glass); border:1px solid var(--glass-border); border-radius:10px; }
.cmd-name { font-family:var(--font-mono); color:var(--neon); font-weight:600; min-width:160px; font-size:0.95rem; }
.cmd-desc { flex:1; color:var(--text); font-size:0.95rem; }
.cmd-freq { font-size:0.78rem; color:var(--muted); background:var(--bg-card); border:1px solid var(--glass-border); border-radius:6px; padding:2px 8px; white-space:nowrap; }
.terminal { background:#0d1117; border:1px solid var(--glass-border); border-radius:12px; overflow:hidden; font-family:var(--font-mono); font-size:0.88rem; }
.terminal-bar { background:#1a1a2e; padding:10px 14px; display:flex; align-items:center; gap:6px; }
.t-dot { width:12px; height:12px; border-radius:50%; }
.t-dot.red { background:#ff5f57; }
.t-dot.yellow { background:#ffbd2e; }
.t-dot.green { background:#28c840; }
.t-label { margin-left:auto; color:var(--muted); font-size:0.78rem; }
.terminal-body { padding:1.25rem 1.5rem; display:flex; flex-direction:column; gap:2px; }
.t-line { color:#c9d1d9; white-space:pre; line-height:1.7; }
.t-gap { height:8px; }
.t-prompt { color:var(--success); margin-right:8px; }
.t-q { color:var(--warning); margin-right:8px; }
.t-ans { color:var(--text); }
.t-pink { color:var(--neon); }
.t-cyan { color:#58a6ff; }
.t-success { color:var(--success); }
.t-header { color:var(--muted); }
.t-muted { color:var(--muted); }
.cmd-single { background:var(--bg); border:1px solid var(--glass-border); border-radius:8px; padding:0.5rem 0.75rem; font-family:var(--font-mono); font-size:0.85rem; display:inline-block; }
```

- [ ] **Step 6: Verificar slide count final**

```bash
grep -c 'class="slide"' aulas/aula-segundo-cerebro.html
```

Expected: 36

- [ ] **Step 7: Abrir no browser e navegar todos os slides**

```bash
open aulas/aula-segundo-cerebro.html
```

Verificar:
- Slides 6, 7, 8 (teoria Karpathy) aparecem entre slide 5 e o antigo slide 6
- Slides 32–35 (framework) aparecem antes do encerramento (slide 36)
- Contador de slides mostra "36" no canto superior direito
- Hero mostra "36 slides · ~30 min"
- Navegação por teclado (← →) funciona corretamente

- [ ] **Step 8: Commit final**

```bash
git add aulas/aula-segundo-cerebro.html
git commit -m "feat(aula): add 4 framework slides (CLI demo, 5 commands, CLAUDE.md contract)"
```

---

## Verificação final

- [ ] `npx jest` — todos os testes passam
- [ ] `node cli/index.js` — setup completo sem erros (Mac/Linux)
- [ ] Vault gerado abre no Obsidian sem erros
- [ ] 5 skills em `~/.claude/commands/`
- [ ] CLAUDE.md gerado usa `/wiki-ingest`, `/wiki-query`, `/wiki-lint`, `/wiki-review`, `/wiki-capture`
- [ ] `aulas/aula-segundo-cerebro.html` tem 36 slides navegáveis
- [ ] `README.md` em inglês + `docs/pt-br/README.md` em PT-BR
- [ ] `git log --oneline` mostra 1 commit por task (10 commits no total)
