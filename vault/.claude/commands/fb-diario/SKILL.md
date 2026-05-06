---
name: fb-diario
description: "Abre ou cria o diário de hoje em diario/YYYY-MM-DD.md com template pronto."
---

# fb-diario

Abre ou cria a nota de diário do dia atual.

## Como usar

```
/fb-diario
```

## O que faz

1. Calcula a data de hoje no formato `YYYY-MM-DD`
2. Verifica se `diario/YYYY-MM-DD.md` já existe
3. Se **existe**: exibe o conteúdo e pergunta se quer adicionar algo
4. Se **não existe**: cria o arquivo com o template abaixo e confirma criação

## Template gerado

```markdown
---
titulo: Diário YYYY-MM-DD
data-criacao: YYYY-MM-DD
data-atualizacao: YYYY-MM-DD
tags:
  - tipo/diario
status: ativo
---

# Dia, DD de Mês de YYYY

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
```

## Regras

- Nunca sobrescreve um diário existente
- Sempre escreve em PT-BR
- Não preenche as seções — só cria a estrutura
