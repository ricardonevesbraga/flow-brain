---
description: "Revisa o inbox (captura.md) e sugere destino para cada item capturado."
---

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
