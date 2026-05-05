---
titulo: Diário <% tp.date.now("YYYY-MM-DD") %>
data-criacao: <% tp.date.now("YYYY-MM-DD") %>
data-atualizacao: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tipo/diario
status: ativo
---

# <% tp.date.now("dddd, DD [de] MMMM [de] YYYY") %>

> [!info] Foco do dia
> 

## Capturas rápidas
- 

## O que aconteceu
- 

## O que aprendi
- 

## Pendências
- [ ] 

## Notas tocadas hoje
```dataview
LIST
FROM ""
WHERE file.mtime >= date("<% tp.date.now("YYYY-MM-DD") %>") AND file.mtime < date("<% tp.date.now("YYYY-MM-DD") %>") + dur(1 day)
SORT file.mtime DESC
LIMIT 20
```
