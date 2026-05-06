---
description: "Arquiva uma nota ou projeto movendo para 05-arquivo/. Use: /fb-arquivar <caminho da nota>"
---

# fb-arquivar

Arquiva uma nota, projeto ou área movendo para `05-arquivo/`.

## Como usar

```
/fb-arquivar <caminho da nota>
```

### Exemplos

```
/fb-arquivar 02-projetos/meu-projeto.md
/fb-arquivar 03-areas/marketing/index.md
/fb-arquivar 04-recursos/ferramenta-x.md
```

## O que faz

1. Lê o arquivo indicado
2. Atualiza o frontmatter:
   - `status: arquivado`
   - `data-atualizacao: YYYY-MM-DD`
3. Move para `05-arquivo/<nome-original>.md`
4. Confirma a operação antes de executar (mostra de/para)
5. Append em `wiki/log.md`

## Regras

- **Sempre pede confirmação** antes de mover
- Nunca deleta — só move para `05-arquivo/`
- Se já existir arquivo com mesmo nome em `05-arquivo/`, adiciona sufixo com data
- Não modifica arquivos em `wiki/` — só nas pastas PARA
