---
titulo: Índice do Wiki
data-criacao: {{DATA}}
data-atualizacao: {{DATA}}
tags:
  - tipo/inbox
status: ativo
---

# Wiki de {{NOME}}

> [!info] Ponto de entrada
> Todo o conhecimento gerado pelo Claude a partir dos arquivos em `raw/`.

## Fontes processadas

```dataview
TABLE data-atualizacao AS "Atualizado"
FROM "wiki/fontes"
SORT data-atualizacao DESC
```

## Conceitos

```dataview
TABLE status
FROM "wiki/conceitos"
SORT status DESC
```

## Entidades

```dataview
LIST
FROM "wiki/entidades"
SORT file.name ASC
```
