---
titulo: Append-and-Review
data-criacao: 2026-04-30
data-atualizacao: 2026-04-30
tags:
  - tipo/conceito
  - dominio/aprendizado
status: maduro
fonte: https://karpathy.bearblog.dev/the-append-and-review-note/
relacionadas:
  - "[[llm-wiki-pattern]]"
aliases:
  - append and review
  - método Karpathy de notas
  - nota única
---

# Append-and-Review

> [!info] Definição em uma frase
> Manter **uma única nota** onde tudo entra no topo; revisar periodicamente para "resgatar" para o topo o que ainda merece atenção. O resto afunda naturalmente.

## Por que importa
Resolve o problema de **fricção de captura**. Decidir em qual pasta uma ideia vai já é um custo cognitivo que mata a captura. Uma nota só, `Cmd+F` resolve busca, e a "gravidade" do tempo faz a curadoria sozinha.

## Como funciona

### 1. Append
Qualquer coisa nova → topo da nota. Sem categoria, sem tag obrigatória, sem reflexão. Plain text.

### 2. Review
Periodicamente (Karpathy não dá frequência fixa — quando der vontade), role pra baixo e leia. O que ainda importa, **copia e cola pro topo**. O que não importa, deixa afundar.

### 3. Rescue (resgate)
O ato de copiar do meio/fundo pro topo é o que diferencia este método de uma timeline pura. O que sobrevive a múltiplos resgates está provando seu valor.

### 4. Sinking natural
Itens que repetidamente não merecem atenção vão pro fundo. **Nunca são deletados** — só esquecidos. O Ctrl+F sempre acha se precisar.

## Tags funcionais (única exceção que Karpathy faz)
Para coisas que pedem ação posterior: `assistir:`, `ler:`, `ouvir:`. Permite filtrar com Ctrl+F sem montar sistema de tags.

## Quando aplicar
- Captura de ideias soltas, links, citações.
- Quando você não sabe (ainda) se uma anotação merece virar nota de verdade.
- Para reduzir a barreira de "anotar".

## Quando NÃO aplicar
> [!warning] Não substitui
> - Notas atômicas estilo Zettelkasten (essas merecem arquivos próprios em `wiki/conceitos/`).
> - Documentação técnica de longo prazo.
> - Coisas com prazo (PARA Projects).

## Como aplico no meu vault
- A nota é [[00-inbox/captura|captura.md]].
- Tags adaptadas pro PT-BR: `assistir:`, `ler:`, `ouvir:`, `tarefa:`, `ideia:`, `pergunta:`, `link:`.
- O workflow `/review-inbox` no [[CLAUDE]] formaliza o passo de revisão com ajuda do agente.

## Conceitos relacionados
- [[llm-wiki-pattern]] — método "irmão" do Karpathy, mas para conhecimento estruturado em vez de captura.

## Fontes
- Karpathy, *The append-and-review note*, 2025. https://karpathy.bearblog.dev/the-append-and-review-note/
