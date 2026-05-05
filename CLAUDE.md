# CLAUDE.md — Schema do Segundo Cérebro do Ric

> Este arquivo é o **contrato de operação** do agente (Claude Code) sobre o vault.
> Sempre que você (Claude) for invocado neste diretório, leia este arquivo primeiro.

---

## 0. Regra absoluta: idioma

**TUDO neste vault é escrito em Português do Brasil.**

- Frontmatter, corpo das notas, callouts, mensagens de log, sumários, perguntas, respostas — sempre PT-BR.
- Termos técnicos consagrados podem ficar em inglês quando são "marcas" (ex.: `wikilink`, `frontmatter`, `MOC`, `PARA`, `Zettelkasten`, nomes de arquivos `index.md` e `log.md`).
- Se você se pegar escrevendo qualquer parágrafo em inglês, pare e reescreva.

---

## 1. Arquitetura: três camadas (padrão LLM Wiki do Karpathy)

| Camada | Pasta | Quem escreve | O que vai aqui |
|---|---|---|---|
| **Raw** (fontes imutáveis) | `raw/` | Humano (Ric) | Artigos, papers, transcripts, dumps de texto. **Você (Claude) NUNCA modifica nada em `raw/`.** Só lê. |
| **Wiki** (conhecimento gerado) | `wiki/` | Você (Claude) | Sumários, conceitos, entidades, sínteses. **Você é o dono desta camada.** |
| **Schema** | `CLAUDE.md` (este arquivo) | Humano (Ric) | Regras de operação. |

Além das três camadas do Karpathy, o vault tem uma camada **PARA** (Tiago Forte) para coisas acionáveis:

| Pasta | Conteúdo |
|---|---|
| `00-inbox/captura.md` | Captura zero-fricção (estilo append-and-review do Karpathy). Tudo entra aqui primeiro. |
| `01-diario/` | Daily notes, formato `YYYY-MM-DD.md`. |
| `02-projetos/` | Projetos com prazo, entregáveis, dono claro. |
| `03-areas/` | Responsabilidades contínuas (engenharia-ia, flowgrammers, aprendizado, saude, financas, familia). |
| `04-recursos/` | Material de referência temático. |
| `05-arquivo/` | Concluído ou inativo. |
| `templates/` | Scaffolds usados pelo plugin Templater. |
| `anexos/` | Imagens, PDFs colados pelo Obsidian. |

---

## 2. Convenções de nomeação

- **Slugs**: `kebab-case`, sem acentos, sem espaços. Ex.: `andrej-karpathy.md`, `agentes-de-ia.md`.
- **Daily notes**: `YYYY-MM-DD.md` (ex.: `2026-04-30.md`).
- **MOCs**: prefixo `moc-`. Ex.: `moc-engenharia-ia.md`.
- **Páginas de fonte**: `wiki/fontes/<slug-da-fonte>.md`. Slug deriva do nome do arquivo em `raw/` (sem extensão).
- **Páginas de entidade/conceito**: `wiki/entidades/<slug>.md`, `wiki/conceitos/<slug>.md`.
- Use `aliases` no frontmatter para nomes alternativos (ex.: alias "Karpathy" para `andrej-karpathy.md`).

---

## 3. Frontmatter padrão (Properties)

Toda nota nova precisa do bloco abaixo. Adapte os campos por tipo.

```yaml
---
titulo:
data-criacao: 2026-04-30
data-atualizacao: 2026-04-30
tags:
  - tipo/conceito
  - dominio/engenharia
status: rascunho
fonte:
relacionadas: []
aliases: []
---
```

**Tipos válidos** (`tipo/...`): `projeto`, `area`, `recurso`, `fonte`, `conceito`, `entidade`, `sintese`, `moc`, `diario`, `inbox`.

**Domínios** (`dominio/...`): `engenharia-ia`, `flowgrammers`, `aprendizado`, `saude`, `financas`, `familia`, `geral`.

**Status**: `rascunho` → `ativo` → `maduro` → `arquivado`.

---

## 4. Regras de wikilink

1. **Linke desde o dia 1.** Toda menção a uma entidade/conceito vira `[[entidade]]` ou `[[conceito]]`.
2. Use `[[slug|texto exibido]]` quando o slug for feio: `[[andrej-karpathy|Karpathy]]`.
3. Toda página de fonte (`wiki/fontes/...`) deve linkar pelo menos 1 entidade e 1 conceito.
4. Toda página de conceito deve linkar pelo menos 2 outros conceitos relacionados (cria a "rede de Zettelkasten").
5. Embeds (`![[...]]`) só para trechos curtos relevantes — não para "incluir nota inteira".

---

## 5. Workflows

### 5.1 `/ingest <caminho-em-raw>`

Quando o Ric pedir "ingest no wiki", "processa esse artigo", ou similar:

1. Ler o arquivo em `raw/` (texto integral).
2. Identificar **entidades** (pessoas, empresas, produtos, ferramentas) e **conceitos** (ideias, frameworks).
3. Criar `wiki/fontes/<slug>.md` com:
   - Frontmatter (`tipo/fonte`, `fonte: <caminho-relativo-em-raw>`, domínio adequado).
   - Seção `## TL;DR` com 3–5 bullets.
   - Seção `## Resumo estruturado` (~300 palavras, em PT-BR).
   - Seção `## Citações-chave` (3–5 trechos verbatim, com aspas).
   - Seção `## Conexões` listando wikilinks para entidades e conceitos.
4. Para cada entidade/conceito mencionado:
   - Se já existe (`wiki/entidades/<slug>.md` ou `wiki/conceitos/<slug>.md`): adicionar 1–3 frases novas e atualizar `data-atualizacao`.
   - Se é nova: criar a página com frontmatter + 1 parágrafo seed + wikilink de volta para a fonte.
5. Atualizar `wiki/index.md` (adicionar a fonte na seção correta).
6. Append em `wiki/log.md`:
   ```
   ## YYYY-MM-DD HH:MM — ingest
   - fonte: raw/<caminho>
   - criados: wiki/fontes/X.md, wiki/conceitos/Y.md
   - atualizados: wiki/entidades/Z.md (+2 conexões)
   ```

### 5.2 `/pergunta <pergunta>` (ou só "me responde X usando o wiki")

1. Ler `wiki/index.md` para mapa de páginas existentes.
2. Identificar 3–8 páginas relevantes; ler integralmente.
3. Sintetizar resposta em PT-BR, citando fontes via `[[wikilink]]`.
4. Se a pergunta gerou uma síntese valiosa, oferecer ao Ric arquivar em `wiki/sintese/<slug>.md`.
5. Append em `wiki/log.md`:
   ```
   ## YYYY-MM-DD HH:MM — pergunta
   - "<pergunta resumida>"
   - páginas consultadas: [[a]], [[b]], [[c]]
   - síntese arquivada: wiki/sintese/X.md (ou "não")
   ```

### 5.3 `/lint` (ou "checa a saúde do wiki")

1. Listar todos os arquivos `.md` em `wiki/`.
2. Verificar:
   - **Links quebrados**: wikilinks que apontam para arquivos inexistentes.
   - **Páginas órfãs**: arquivos sem nenhum inbound link (exceto `index.md`, `log.md`, MOCs).
   - **Frontmatter ausente ou inválido**: faltando `titulo`, `data-criacao`, `tags`.
   - **Páginas em inglês**: qualquer parágrafo > 2 frases em inglês é violação (regra 0).
   - **`data-atualizacao` muito antigo** (> 90 dias) em páginas com `status: ativo` ou `maduro`.
3. Reportar tudo em um callout `> [!warning]` no chat e append em `wiki/log.md`:
   ```
   ## YYYY-MM-DD HH:MM — lint
   - links quebrados: N
   - órfãs: N
   - frontmatter inválido: N
   - violação de idioma: N
   - stale: N
   ```

### 5.4 `/review-inbox` (ou "revisa minha captura")

1. Abrir `00-inbox/captura.md`.
2. Para cada bloco da seção `## Backlog` (ou linhas avulsas):
   - Sugerir destino: criar projeto/recurso/conceito/fonte? mover para área? descartar?
   - Mostrar uma ação por bloco; aguardar `ok` antes de mover.
3. Itens não acionados ficam onde estão (sinking natural — princípio do Karpathy).

---

## 6. Estilo de escrita

- **Frases curtas.** Direto ao ponto.
- **Bullets** quando há lista; **parágrafos** quando há argumento.
- **Callouts** para destacar:
  - `> [!info]` para contexto.
  - `> [!warning]` para riscos / pegadinhas.
  - `> [!example]` para exemplos concretos.
  - `> [!quote]` para citações de fontes.
  - `> [!todo]` para ações pendentes.
- **Sem emojis** (a não ser que o Ric peça explicitamente).
- **Sem "eu" ou "nós"** nas notas de wiki — escreva em terceira pessoa neutra. Diários e capturas podem ser em primeira pessoa.

---

## 7. O que você (Claude) NÃO faz

- Não mexe em `raw/` (read-only).
- Não cria pastas novas em `wiki/` sem perguntar (estrutura é fixa: `entidades/`, `conceitos/`, `fontes/`, `sintese/`).
- Não move arquivos sem confirmação explícita.
- Não deleta nada — arquiva movendo para `05-arquivo/`.
- Não escreve em inglês.
- Não inventa fontes ou citações. Se não souber, diga.

---

## 8. Atalhos mentais para o agente

- "Captura" → `00-inbox/captura.md`, sempre topo.
- "Diário" → `01-diario/YYYY-MM-DD.md`, template `templates/diario.md`.
- "Ingest fonte" → workflow 5.1.
- "Me responde X" → workflow 5.2.
- "Tá tudo ok?" → workflow 5.3.
- "Limpa minha caixa de entrada" → workflow 5.4.

---

## 9. Referências do padrão

- Karpathy, *The append-and-review note* — https://karpathy.bearblog.dev/the-append-and-review-note/
- Karpathy, *LLM Wiki gist* — https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Tiago Forte, *Building a Second Brain* (PARA).
- Niklas Luhmann, Zettelkasten.
- Nick Milo, *Linking Your Thinking* (MOCs).
