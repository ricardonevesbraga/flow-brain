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
