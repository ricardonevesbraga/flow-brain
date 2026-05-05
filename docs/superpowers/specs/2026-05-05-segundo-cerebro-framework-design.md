# Design Spec — Segundo Cérebro Framework

**Data:** 2026-05-05  
**Status:** Aprovado  
**Autor:** Ric Neves + Claude Code

---

## Objetivo

Transformar o vault pessoal `ric-cerebro` em um framework público reutilizável que qualquer pessoa pode instalar via `npx segundo-cerebro`, respondendo algumas perguntas, e ter um vault Obsidian completo com Claude Code integrado.

---

## Contexto

O vault atual (`ric-cerebro`) está acoplado a dados pessoais (nome, áreas de vida, MOCs específicos) e tem um mismatch entre os nomes de workflow documentados no `CLAUDE.md` e os skills reais instalados no Claude Code. O framework resolve ambos os problemas.

---

## Arquitetura

### Estrutura do repositório

```
segundo-cerebro/
├── vault/                        # template do vault com placeholders
│   ├── 00-inbox/captura.md
│   ├── 01-diario/
│   ├── 02-projetos/
│   ├── 03-areas/                 # criado dinamicamente pelo CLI
│   ├── 04-recursos/
│   ├── 05-arquivo/
│   ├── raw/artigos/ raw/papers/ raw/transcripts/ raw/assets/
│   ├── wiki/conceitos/ wiki/entidades/ wiki/fontes/ wiki/sintese/
│   ├── wiki/index.md
│   ├── wiki/log.md
│   ├── templates/                # diario, projeto, area, recurso, fonte, conceito, entidade, moc
│   ├── bin/cap                   # script de captura genérico
│   ├── anexos/
│   └── CLAUDE.md                 # com {{NOME}}, {{AREAS}}, {{LANG}} como placeholders
├── cli/
│   ├── index.js                  # entry point — npx segundo-cerebro
│   ├── questions.js              # fluxo interativo com enquirer/prompts
│   ├── generators.js             # substituição de placeholders + criação de estrutura
│   └── skills.js                 # instala skills em ~/.claude/commands/
├── skills/                       # skills Claude Code versionados no repo
│   ├── wiki-ingest.md
│   ├── wiki-query.md
│   ├── wiki-lint.md
│   ├── wiki-review.md
│   └── wiki-capture.md
├── docs/
│   └── pt-br/README.md
├── aulas/
│   └── aula-segundo-cerebro.html
├── README.md                     # inglês (principal)
└── package.json
```

---

## CLI — Fluxo de setup

**Comando:** `npx segundo-cerebro`

**Sequência de perguntas:**

1. Nome do usuário (string livre)
2. Idioma do vault (PT-BR | EN)
3. Diretório de destino (default: `./meu-cerebro`)
4. Áreas de vida (multi-select com opções pré-definidas + input livre para áreas customizadas)
   - Defaults sugeridos: trabalho, aprendizado, saúde, finanças, família
   - Usuário pode adicionar áreas customizadas

**O que o CLI faz após as respostas:**

1. Copia `vault/` para o diretório escolhido
2. Substitui placeholders em todos os `.md`:
   - `{{NOME}}` → nome do usuário
   - `{{AREAS}}` → lista de áreas escolhidas
   - `{{LANG}}` → idioma selecionado
   - `{{DATA}}` → data atual `YYYY-MM-DD`
3. Cria subpastas em `03-areas/` para cada área escolhida
4. Cria MOC inicial em `wiki/sintese/` para cada área
5. Copia skills de `skills/` para `~/.claude/commands/`
6. Torna `bin/cap` executável
7. Imprime resumo com próximos passos

**Dependências npm:**

- `enquirer` — prompts interativos bonitos
- `fs-extra` — cópia de diretórios
- `chalk` — output colorido
- `ora` — spinners

---

## Alinhamento de comandos (fix do mismatch)

| CLAUDE.md antigo | Skill antigo | Framework novo |
|---|---|---|
| `5.1 /ingest` | `wiki-ingest` | `/wiki-ingest` |
| `5.2 /pergunta` | `wiki-query` | `/wiki-query` |
| `5.3 /lint` | `wiki-lint` | `/wiki-lint` |
| `5.4 /review-inbox` | `cerebro` | `/wiki-review` |
| — | `capturar` | `/wiki-capture` |

O `CLAUDE.md` gerado pelo CLI já documenta os nomes corretos dos skills. Os skills ficam versionados em `skills/` e são instalados em `~/.claude/commands/` pelo CLI.

---

## README.md (inglês)

Seções:
1. O que é (30 segundos — Karpathy LLM Wiki + PARA + Claude Code)
2. Pré-requisitos (Obsidian, Claude Code, Node 18+)
3. Quick start (3 linhas: `npx segundo-cerebro`)
4. Comandos disponíveis (tabela com os 5 skills)
5. Arquitetura (diagrama das 3 camadas)
6. Personalização (como mudar áreas depois do setup)
7. Como contribuir

**docs/pt-br/README.md** — mesmo conteúdo em PT-BR.

---

## Aula HTML — Atualizações

O arquivo `aulas/aula-segundo-cerebro.html` ganha duas novas partes:

### Parte 1 — Teoria (por que isso existe)

- **Slide:** "O Problema" — conhecimento consumido mas não retido; o loop leitura → esquecimento
- **Slide:** Quem é Andrej Karpathy e por que ele importa (ex-OpenAI, ex-Tesla, criador do termo "vibe coding") — contextualiza a credibilidade do método
- **Slide:** A tese do Karpathy — "seu cérebro é para ter ideias, não para guardar informações" (inspirado no GTD do David Allen)
- **Slide:** O método append-and-review — uma nota que só cresce; revisão periódica filtra o que ficou relevante; sem pressão de organizar na hora da captura
- **Slide:** Por que LLM Wiki? — diferença entre RAG (busca vetorial) vs wiki estruturada mantida por agente; Karpathy argumenta que wiki é mais confiável para raciocínio do que embeddings
- **Slide:** A pilha completa — Karpathy (captura + wiki) + Tiago Forte PARA (ação) + Zettelkasten (conexões) = sistema sem lacunas

### Parte 2 — Prática (como montar o seu)

- **Slide:** Como instalar o Obsidian — download em obsidian.md, criar um vault local, o que é um vault (pasta comum de arquivos `.md`); print de tela do processo; explica que não precisa criar conta
- **Slide:** Como instalar o Claude Code — `npm install -g @anthropic-ai/claude-code`, autenticação, o que é uma slash command
- **Slide:** "Seu Sistema, Seus Termos" — como o framework é personalizável
- **Demo:** terminal animado mostrando `npx segundo-cerebro` com as perguntas
- **Slide:** tabela dos 5 comandos do dia a dia com descrição de cada um
- **Slide:** como o `CLAUDE.md` funciona como "contrato com o agente"
- **Slide:** fluxo completo desde captura até síntese no wiki

---

## Fora do escopo (v1)

- Interface gráfica / web para o setup
- Sincronização com serviços externos (Notion, Roam)
- Plugin Obsidian nativo

## Suporte a plataformas

Mac, Linux e Windows. O CLI é Node.js puro (sem dependências de shell Unix), então roda nos três sistemas. Pontos de atenção:

- `bin/cap` usa bash — no Windows será gerado um `bin/cap.ps1` (PowerShell) em paralelo
- O path de instalação dos skills muda: `~/.claude/commands/` → `%USERPROFILE%\.claude\commands\` no Windows
- O CLI detecta o SO automaticamente (`process.platform`) e usa o path correto

---

## Critérios de sucesso

- `npx segundo-cerebro` roda do zero sem erros em Mac/Linux com Node 18+
- Vault gerado abre no Obsidian sem erros
- Os 5 skills aparecem em `~/.claude/commands/` após o setup
- CLAUDE.md gerado usa os nomes corretos dos comandos
- README explica o sistema em menos de 5 minutos de leitura
- Aula HTML inclui a seção do framework com demo do CLI
