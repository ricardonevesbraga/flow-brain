---
titulo: Índice do Wiki
data-criacao: {{DATA}}
data-atualizacao: {{DATA}}
tags:
  - tipo/moc
status: ativo
---

# Índice do Wiki de {{NOME}}

> [!info] Catálogo mestre
> Este arquivo é o ponto de entrada para todo o conhecimento gerado neste vault.

## Fontes processadas

```dataview
TABLE data-atualizacao AS "Atualizado", dominio AS "Domínio"
FROM "wiki/fontes"
SORT data-atualizacao DESC
```

## Conceitos

```dataview
TABLE status, dominio
FROM "wiki/conceitos"
SORT status DESC
```

## Entidades

```dataview
LIST
FROM "wiki/entidades"
SORT file.name ASC
```

## Sínteses e MOCs

```dataview
LIST
FROM "wiki/sintese"
SORT file.name ASC
```

## Adicionados recentemente

```dataview
LIST
FROM "wiki"
SORT file.ctime DESC
LIMIT 10
```

## Stale (não atualizados há 90+ dias)

```dataview
LIST
FROM "wiki"
WHERE status = "ativo" OR status = "maduro"
WHERE date(data-atualizacao) < date(today) - dur(90 days)
```
