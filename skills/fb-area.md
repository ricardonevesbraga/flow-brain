---
description: "Cria uma nova área em 03-areas/ com pasta, index e MOC no wiki. Use: /fb-area <nome da área>"
---

# fb-area

Cria uma nova área de responsabilidade contínua no vault.

## Como usar

```
/fb-area <nome da área>
```

## O que faz

1. Converte o nome para slug: `engenharia ia` → `engenharia-ia`
2. Cria a pasta `03-areas/<slug>/`
3. Cria `03-areas/<slug>/index.md` com template de área
4. Cria `wiki/sintese/moc-<slug>.md` com template de MOC
5. Linka o MOC no `wiki/index.md`
6. Append em `wiki/log.md`

## Template de área gerado

```markdown
---
titulo: <nome>
data-criacao: YYYY-MM-DD
tags:
  - tipo/area
  - dominio/<slug>
status: ativo
---

# <nome>

> [!info] Definição da área
> O que esta área representa e por que importa.

## Padrão de qualidade
Como "bom" parece nesta área.

## Projetos ativos
-

## Recursos de referência
-

## Revisão periódica
- [ ] Última revisão:
```

## Regras

- Nunca cria área duplicada — verifica antes
- Sempre cria o MOC junto com a área
