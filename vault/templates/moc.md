---
titulo: MOC —
data-criacao: <% tp.date.now("YYYY-MM-DD") %>
data-atualizacao: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tipo/moc
  - dominio/
status: ativo
relacionadas: []
---

# MOC — <% tp.file.title %>

> [!info] Sobre este mapa
> Tudo que se conecta a este domínio.

## Pontos de entrada
-

## Conceitos centrais
-

## Entidades
-

## Fontes
-

## Projetos ativos
```dataview
LIST
FROM "02-projetos"
WHERE contains(tags, "dominio/<% tp.file.title %>")
```

## Perguntas em aberto
-
