---
titulo: Índice do Wiki
data-criacao: 2026-04-30
data-atualizacao: 2026-04-30
tags:
  - tipo/sintese
status: ativo
---

# 📚 Índice do Wiki

> [!info] O que é
> Catálogo mestre de tudo que existe em `wiki/`. Atualizado automaticamente pelo Claude após cada `/ingest`. As tabelas Dataview abaixo se preenchem sozinhas conforme o vault cresce — basta ter o plugin Dataview habilitado.

---

## 🗺️ MOCs (Mapas de Conteúdo)

```dataview
TABLE WITHOUT ID
  file.link AS "MOC",
  file.frontmatter.titulo AS "Título",
  dateformat(file.mtime, "yyyy-MM-dd") AS "Atualizado"
FROM "wiki/sintese"
WHERE contains(tags, "tipo/moc")
SORT file.name ASC
```

---

## 💡 Conceitos

```dataview
TABLE WITHOUT ID
  file.link AS "Conceito",
  file.frontmatter.status AS "Status",
  length(file.inlinks) AS "Inbound",
  dateformat(file.mtime, "yyyy-MM-dd") AS "Atualizado"
FROM "wiki/conceitos"
SORT length(file.inlinks) DESC, file.name ASC
```

---

## 👤 Entidades

```dataview
TABLE WITHOUT ID
  file.link AS "Entidade",
  file.frontmatter.categoria AS "Categoria",
  length(file.inlinks) AS "Inbound",
  dateformat(file.mtime, "yyyy-MM-dd") AS "Atualizado"
FROM "wiki/entidades"
SORT length(file.inlinks) DESC, file.name ASC
```

---

## 📄 Fontes processadas

```dataview
TABLE WITHOUT ID
  file.link AS "Fonte",
  file.frontmatter.autor AS "Autor",
  file.frontmatter.fonte AS "raw/",
  dateformat(file.mtime, "yyyy-MM-dd") AS "Processado"
FROM "wiki/fontes"
SORT file.mtime DESC
```

---

## 🧠 Sínteses e ensaios

```dataview
TABLE WITHOUT ID
  file.link AS "Síntese",
  file.frontmatter.titulo AS "Título",
  dateformat(file.mtime, "yyyy-MM-dd") AS "Atualizado"
FROM "wiki/sintese"
WHERE !contains(tags, "tipo/moc")
SORT file.mtime DESC
```

---

## 📊 Saúde do wiki

```dataview
TABLE WITHOUT ID
  "Total" AS "Métrica",
  length(rows.file) AS "Quantidade"
FROM "wiki"
WHERE file.name != "index" AND file.name != "log"
GROUP BY "📑"
```

```dataview
TABLE WITHOUT ID
  file.link AS "Possíveis órfãs (sem inbound)",
  dateformat(file.mtime, "yyyy-MM-dd") AS "Atualizado"
FROM "wiki/conceitos" OR "wiki/entidades" OR "wiki/fontes"
WHERE length(file.inlinks) = 0
SORT file.mtime DESC
LIMIT 10
```
