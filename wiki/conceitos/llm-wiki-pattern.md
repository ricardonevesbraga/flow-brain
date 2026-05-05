---
titulo: LLM Wiki Pattern
data-criacao: 2026-04-30
data-atualizacao: 2026-04-30
tags:
  - tipo/conceito
  - dominio/engenharia-ia
status: maduro
fonte: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
relacionadas:
  - "[[append-and-review]]"
aliases:
  - LLM Wiki
  - wiki vivo
  - padrão Karpathy de wiki
  - second brain Karpathy
---

# LLM Wiki Pattern

> [!info] Definição em uma frase
> Em vez de fazer um LLM **reler** PDFs toda vez que você pergunta algo (RAG clássico), você deixa o LLM **escrever e manter** um wiki incremental de markdown que cresce e melhora com o tempo.

## Por que importa
- RAG escala mal: para cada pergunta, embedding + retrieval + reranking + leitura. Latência e custo crescem com o corpus.
- Wiki escala bem: o conhecimento já está sintetizado em markdown navegável. O LLM lê só o que precisa via `index.md`.
- Resolve o problema que Vannevar Bush apontou no Memex (1945) e nunca foi resolvido: a manutenção da rede associativa.
- O agente faz a parte chata (bookkeeping). O humano faz a parte interessante (curadoria e crítica).

## Como funciona — três camadas

### 1. Raw (fontes imutáveis)
Pasta `raw/` com artigos, papers, transcripts, dumps. **Read-only para o agente.** Fonte da verdade.

### 2. Wiki (gerado pelo agente)
Pasta `wiki/` com markdown estruturado:
- `index.md` — catálogo (link + 1 linha por página).
- `log.md` — timeline append-only de operações.
- `entidades/`, `conceitos/`, `fontes/`, `sintese/` — páginas atômicas com wikilinks.

### 3. Schema
Arquivo `CLAUDE.md` (ou `AGENTS.md`) que ensina o agente: convenções, frontmatter, workflows, idioma. **Sem schema, o agente vira um chatbot genérico.** Com schema, vira bibliotecário disciplinado.

## Workflows operacionais

### Ingest
Agente lê fonte em `raw/` → cria `wiki/fontes/X.md` → atualiza 5–15 páginas existentes com novas conexões → registra em `log.md`.

### Query
Agente lê `index.md` → identifica páginas relevantes → sintetiza com citações `[[wikilink]]` → opcionalmente arquiva resposta em `sintese/`.

### Lint
Periodicamente: links quebrados, órfãs, contradições, gaps de cross-reference, frontmatter inválido.

## Marco psicológico do Karpathy
Quando a wiki passa de **~100 artigos / ~400 mil palavras**, o agente começa a responder perguntas complexas com profundidade que RAG não alcança.

## Quando aplicar
- Pesquisa contínua sobre um domínio (research notes, OKRs, base de clientes, due diligence).
- Knowledge base que quer crescer com você.
- Substituto para "joga tudo num PDF e RAG depois".

## Quando NÃO aplicar
> [!warning] Não substitui
> - Captura zero-fricção (use [[append-and-review]] para isso).
> - Documentação técnica versionada com código (use repo do projeto).
> - Coisas com prazo (use PARA Projects).

## Como aplico no meu vault
- O vault inteiro segue este padrão. Veja [[CLAUDE]] §1 para a definição das três camadas e §5 para os workflows.
- `index.md` e `log.md` em `wiki/` ficam vivos via Dataview e são tocados pelo agente em todo `/ingest`.

## Conceitos relacionados
- [[append-and-review]] — método "irmão" do Karpathy para captura de baixa fricção.

## Fontes
- Karpathy, *LLM Wiki gist*, 2025. https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Implementação de referência: https://github.com/NicholasSpisak/second-brain
