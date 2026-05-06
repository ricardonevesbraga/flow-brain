---
description: "Exibe todos os comandos do Flow Brain com descrições e exemplos. Ponto de entrada para novos usuários."
---

# fb-help

Guia completo de todos os comandos do Flow Brain.

## Como usar

```
/fb-help
```

## O que exibe

Ao ser invocado, apresente este guia formatado ao usuário:

---

## Flow Brain — Guia de Comandos

O vault tem três camadas:
- **raw/** — fontes imutáveis (você escreve, Claude nunca toca)
- **wiki/** — conhecimento gerado (Claude escreve a partir do raw)
- **PARA** — projetos, áreas, recursos e arquivo (você e Claude colaboram)

---

### Camada wiki — Conhecimento

| Comando | O que faz |
|---|---|
| `/wiki-capture <texto>` | Captura ideia ou nota no inbox sem fricção |
| `/wiki-ingest raw/arquivo.md` | Processa fonte raw → gera resumo, entidades e conceitos no wiki |
| `/wiki-query <pergunta>` | Responde perguntas usando o conhecimento acumulado no wiki |
| `/wiki-lint` | Verifica saúde do wiki: links quebrados, órfãs, frontmatter inválido |
| `/wiki-review` | Revisa o inbox e sugere destino para cada item capturado |

---

### Camada PARA — Projetos e Áreas

| Comando | O que faz |
|---|---|
| `/fb-diario` | Abre ou cria o diário de hoje |
| `/fb-projeto <nome>` | Cria novo projeto com template estruturado |
| `/fb-area <nome>` | Cria nova área com pasta e MOC no wiki |
| `/fb-recurso <nome>` | Cria material de referência em 04-recursos/ |
| `/fb-arquivar <caminho>` | Arquiva nota ou projeto em 05-arquivo/ |

---

### Camada raw — Fontes

| Comando | O que faz |
|---|---|
| `/fb-raw` | Lista arquivos em raw/ e mostra quais já foram processados |

---

### Fluxo recomendado para iniciantes

1. Cole qualquer coisa no inbox com `/wiki-capture`
2. Adicione artigos/transcrições em `raw/` e processe com `/wiki-ingest`
3. Faça perguntas ao wiki com `/wiki-query`
4. Crie projetos e áreas com `/fb-projeto` e `/fb-area`
5. Mensalmente: rode `/wiki-lint` para checar a saúde

---

## Regras

- Sempre exibe o guia em PT-BR (ou EN se o vault estiver em inglês)
- Não executa nenhuma ação — só informa
