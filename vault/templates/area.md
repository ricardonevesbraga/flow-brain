---
titulo:
data-criacao: <% tp.date.now("YYYY-MM-DD") %>
data-atualizacao: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tipo/area
  - dominio/
status: ativo
relacionadas: []
---

# <% tp.file.title %>

> [!info] Definição da área
> O que esta área representa e por que importa.

## Padrão de qualidade
Como "bom" parece nesta área.

## Projetos ativos
```dataview
LIST
FROM "02-projetos"
WHERE contains(tags, "dominio/<% tp.file.title %>")
```

## Recursos de referência
-

## Revisão periódica
- [ ] Última revisão:
