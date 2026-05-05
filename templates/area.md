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

> [!info] Definição
> Responsabilidade contínua sem data de fim. Padrão a manter.

## Padrão / saúde
O que "estar bem" significa nesta área.

## Projetos ativos
```dataview
LIST
FROM "02-projetos"
WHERE contains(file.frontmatter.relacionadas, this.file.link) OR contains(tags, "dominio/" + lower(this.file.name))
SORT file.mtime DESC
```

## Recursos relevantes
- 

## Pessoas-chave
- 

## Notas recentes
- 
