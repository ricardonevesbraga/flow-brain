---
description: "Cria material de referência em 04-recursos/. Use: /fb-recurso <nome do recurso>"
---

# fb-recurso

Cria uma nota de recurso/referência em `04-recursos/`.

## Como usar

```
/fb-recurso <nome do recurso>
```

## O que faz

1. Converte o nome para slug
2. Pergunta o domínio relacionado
3. Pergunta um link ou descrição inicial (opcional)
4. Cria `04-recursos/<slug>.md` com template preenchido

## Template gerado

```markdown
---
titulo: <nome>
data-criacao: YYYY-MM-DD
data-atualizacao: YYYY-MM-DD
tags:
  - tipo/recurso
  - dominio/<area>
status: ativo
relacionadas: []
---

# <nome>

## O que é
Uma frase sobre este recurso.

## Quando usar
-

## Links relevantes
-

## Notas
-
```

## Regras

- Recursos são material de referência estável (ferramentas, guias, checklists)
- Não confundir com `raw/` — raw é fonte imutável para ingest no wiki
- Nunca sobrescreve recurso existente
