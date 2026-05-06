---
description: "Cria um novo projeto em 02-projetos/ com template estruturado. Use: /fb-projeto <nome do projeto>"
---

# fb-projeto

Cria uma nova nota de projeto em `02-projetos/`.

## Como usar

```
/fb-projeto <nome do projeto>
```

## O que faz

1. Converte o nome para slug: `meu projeto` → `meu-projeto`
2. Verifica se `02-projetos/<slug>.md` já existe (avisa se sim)
3. Pergunta o domínio/área relacionada (ex: `engenharia`, `flowgrammers`)
4. Pergunta o prazo (opcional, formato `YYYY-MM-DD`)
5. Cria `02-projetos/<slug>.md` com template preenchido
6. Sugere linkar na área correspondente em `03-areas/`

## Template gerado

```markdown
---
titulo: <nome>
data-criacao: YYYY-MM-DD
data-atualizacao: YYYY-MM-DD
tags:
  - tipo/projeto
  - dominio/<area>
status: ativo
prazo: <prazo ou vazio>
dono: <nome do usuário>
relacionadas: []
---

# <nome>

> [!info] Resultado esperado
> O que precisa estar verdade quando este projeto terminar.

## Por quê

## Escopo
- **Dentro**:
- **Fora**:

## Marcos
- [ ] M1 —

## Decisões
-

## Riscos
> [!warning]

## Conexões
- Área: [[]]
- Recursos: [[]]
```

## Regras

- Slug em kebab-case sem acentos
- Nunca sobrescreve projeto existente
