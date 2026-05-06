---
description: "Revisa captura.md e sugere destino para cada item capturado."
---

# wiki-review

Revisa o backlog de `captura.md` e sugere o que fazer com cada item.

## Como usar

```
/wiki-review
```

## O que faz

1. Abre `captura.md`
2. Para cada bloco do `## Backlog`:
   - Sugere destino: ingerir como fonte raw? virar conceito no wiki? descartar?
   - Apresenta uma ação por bloco
   - Aguarda `ok` antes de executar
3. Itens não acionados ficam onde estão (sinking natural — princípio do Karpathy)

## Regras

- Nunca move nada sem confirmação explícita
- Nunca deleta — o "arquivo morto" de captura.md é o destino de items descartados
- Respeita o sinking natural: não force processar tudo
