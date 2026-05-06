---
description: "Captura rápida zero-fricção no topo de captura.md. Use: /wiki-capture <texto ou ideia>"
---

# wiki-capture

Captura rápida no topo de `captura.md` (append-and-review do Karpathy).

## Como usar

```
/wiki-capture <texto ou ideia>
```

## O que faz

1. Abre `captura.md` na raiz do vault
2. Insere a entrada no TOPO da seção `## Backlog` com timestamp
3. Prefixa com tag funcional se ausente (`ideia:`, `tarefa:`, `ler:`, etc.)

## Exemplo

```
/wiki-capture ideia: criar resumo do paper sobre LLMs depois
```

Resultado em `captura.md`:
```
- 2026-05-05 22:00 — ideia: criar resumo do paper sobre LLMs depois
```

## Regras

- Sempre insere no TOPO do Backlog — nunca no final
- Não categoriza, não decide destino — só captura
