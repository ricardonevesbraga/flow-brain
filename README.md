# Ric-Cérebro 🧠

Meu segundo cérebro. Vault Obsidian baseado em:
- **LLM Wiki** do Karpathy (`raw/` + `wiki/` + `CLAUDE.md`).
- **Append-and-Review** do Karpathy (captura única em `00-inbox/captura.md`).
- **PARA** do Tiago Forte (`02-projetos/`, `03-areas/`, `04-recursos/`, `05-arquivo/`).
- **Zettelkasten + LYT** (notas atômicas, wikilinks, MOCs em `wiki/sintese/`).

Tudo em **Português do Brasil**.

---

## Como usar no dia a dia

### 1. Capturar (zero fricção)

Qualquer ideia, link, tarefa, citação → vai pro topo de `00-inbox/captura.md`.
Use tags funcionais para filtrar depois com `Ctrl+F`:

```
- assistir: vídeo do Karpathy sobre LLM Wiki — link
- ler: paper sobre RAG vs LLM Wiki
- ouvir: podcast Lex Fridman + Carmack
- tarefa: revisar pricing Flowgrammers
- ideia: usar callouts customizados pra OKRs
```

Atalho recomendado (após instalar QuickAdd): `Cmd+Shift+I` → digita → Enter.

### 2. Daily note

Abrir o dia: `Cmd+P` → "Daily notes: Open today's note".
O template `templates/diario.md` já preenche o frontmatter.

### 3. Trazer fontes (artigos, papers, transcripts)

1. Salvar o arquivo em `raw/artigos/`, `raw/papers/`, ou `raw/transcripts/`.
2. No Claude Code, dizer:
   > "ingest `raw/artigos/<arquivo>.md` no wiki"
3. O agente cria `wiki/fontes/<slug>.md`, conecta a entidades/conceitos existentes, atualiza `wiki/index.md` e `wiki/log.md`.

### 4. Perguntar ao wiki

> "me responde X usando o wiki"

O agente lê `wiki/index.md`, identifica as páginas relevantes, sintetiza com citações `[[wikilink]]`, e (opcional) arquiva a resposta em `wiki/sintese/`.

### 5. Revisar a captura (semanal)

> "revisa minha captura"

O agente passa por `00-inbox/captura.md` e sugere destinos (criar projeto? mover pra área? virar conceito?). Itens não acionados ficam — sinking natural (Karpathy).

### 6. Health check do wiki (mensal)

> "lint do wiki"

Reporta links quebrados, órfãs, frontmatter inválido, páginas em inglês, stale.

---

## Estrutura de pastas

```
ric-cerebro/
├── 00-inbox/captura.md       ← captura zero-fricção
├── 01-diario/                ← daily notes
├── 02-projetos/              ← Projects (PARA)
├── 03-areas/                 ← Areas (PARA) — eng-ia, flowgrammers, etc.
├── 04-recursos/              ← Resources (PARA)
├── 05-arquivo/               ← Archive (PARA)
├── raw/                      ← fontes imutáveis (read-only para o agente)
├── wiki/                     ← wiki gerado e mantido pelo Claude
│   ├── index.md              ← catálogo mestre
│   ├── log.md                ← timeline append-only
│   ├── entidades/
│   ├── conceitos/
│   ├── fontes/
│   └── sintese/              ← MOCs e ensaios
├── templates/                ← Templater scaffolds
├── anexos/                   ← imagens/PDFs colados
└── CLAUDE.md                 ← schema do agente (regras de operação)
```

---

## Setup inicial (uma vez)

1. **Instalar Obsidian**: https://obsidian.md
2. **Abrir o vault**: `Open folder as vault` → selecionar `~/Documents/Projetos/ric-cerebro`.
3. **Habilitar community plugins**: `Settings → Community plugins → Turn on`. Confirmar o aviso.
4. **Instalar 4 plugins** (Browse → buscar e instalar cada um):
   - **Templater** — variáveis dinâmicas.
   - **Dataview** — queries no `index.md` e MOCs.
   - **QuickAdd** — atalho de captura.
   - **Calendar** — navegação visual do diário.
5. **Verificar daily notes**: `Cmd+P` → "Daily notes: Open today's note" → deve criar `01-diario/<hoje>.md` usando `templates/diario.md`.

---

## Atalhos para usar de qualquer lugar

### No terminal (qualquer pasta)

```bash
cap "ideia: usar Bases pra dashboard de OKRs"   # empurra pro topo de captura.md
echo "link: https://..." | cap                  # via stdin
cap                                              # abre captura.md no $EDITOR
```

Para habilitar o `cap` global, faça uma vez:

```bash
ln -s ~/Documents/Projetos/ric-cerebro/bin/cap /usr/local/bin/cap
```

### No Claude Code (qualquer projeto)

Os slash commands abaixo são **globais** (~/.claude/commands/). Funcionam de qualquer pasta:

| Comando | O que faz |
|---|---|
| `/capturar <texto>` | Empurra texto pro topo de `captura.md` (mesma coisa que `cap`, mas dentro do Claude). |
| `/cerebro <pergunta>` | Abre uma sessão focada no vault: lê `CLAUDE.md` + `index.md` + `log.md` e responde via wiki. Se vier sem argumento, pergunta qual workflow você quer (ingest / pergunta / lint / review). |
| `/cerebro-ingest <caminho>` | Roda o workflow §5.1 sobre uma fonte em `raw/`. Ex.: `/cerebro-ingest artigos/karpathy-llm-wiki.md`. |

### No Obsidian

- `Cmd+Shift+D` — abrir/criar daily note de hoje.
- `Cmd+P` — command palette (qualquer ação).
- `Cmd+O` — switcher rápido (abrir nota por nome).
- `Cmd+Shift+F` — busca global.
- `Cmd+Shift+G` — graph view.

Após instalar o plugin **QuickAdd**, configure uma macro "Capturar" apontando para `00-inbox/captura.md` com modo "Append at top of section: Backlog". Atalho sugerido: `Cmd+Shift+I`.

---

## Filosofia

> **Captura é zero-fricção. Organização é emergente. Manutenção é do agente.**

- Não force estrutura cedo demais. MOCs nascem quando você sente falta deles.
- Linke notas desde o dia 1. A rede se constrói por hábito.
- O agente é o bibliotecário. Você é o curador.
- Inglês? Não. PT-BR sempre. Veja `CLAUDE.md` §0.
