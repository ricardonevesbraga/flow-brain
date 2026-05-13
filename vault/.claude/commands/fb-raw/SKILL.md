---
name: fb-raw
description: "Gerencia raw/: sem args lista o status de ingest; com args salva texto ou arquivo físico em raw/ e enfileira para /wiki-ingest."
argument-hint: "[caminho/do/arquivo.pdf | texto livre]"
---

# fb-raw

Gerencia a pasta `raw/` do vault — lista o que está pendente ou salva novo conteúdo.

## Como usar

```
/fb-raw                          → lista todos os arquivos e status
/fb-raw raw/artigos/meu-texto.md → salva texto markdown diretamente
/fb-raw ~/Downloads/paper.pdf    → converte PDF e salva em raw/arquivos/
```

---

## Modo LISTA (sem argumentos)

Quando `$ARGUMENTS` estiver vazio:

1. Liste todos os arquivos `.md` em `raw/` recursivamente.
2. Para cada arquivo, verifique se existe `wiki/fontes/<mesmo-slug>.md`.
3. Exiba dois grupos:

**Pendentes de ingest:**
```
raw/artigos/nome-do-artigo.md    ← use /wiki-ingest
raw/arquivos/paper-rag.md        ← use /wiki-ingest
```

**Já processados:**
```
raw/livros/livro-x.md  →  wiki/fontes/livro-x.md ✓
```

4. Sugira o próximo arquivo a processar (mais recente entre os pendentes).
5. Se `raw/` estiver vazio, oriente: "Nenhum arquivo em raw/ ainda. Use `/fb-raw <arquivo>` para adicionar."

---

## Modo SALVAR (com argumento)

Quando `$ARGUMENTS` não estiver vazio, detecte o tipo:

### Caso A — Arquivo físico (PDF, DOCX, HTML, HTM, TXT)

Condições: `$ARGUMENTS` termina em `.pdf`, `.docx`, `.html`, `.htm` ou `.txt` **e** o arquivo existe no disco.

1. Converta via:
   ```bash
   npx --yes flowbrain@latest convert "$ARGUMENTS"
   ```
   - Salva automaticamente em `raw/arquivos/<slug>.md`.
   - Se o slug já existir, o conversor acrescenta `-2`, `-3` etc. — não sobrescreve.
2. Capture o caminho de saída impresso em stdout.
3. Confirme em PT-BR:
   > Arquivo `paper.pdf` convertido → `raw/arquivos/paper.md`. Use `/wiki-ingest raw/arquivos/paper.md` para processar.

### Caso B — Arquivo markdown já existente (`.md`)

Condições: `$ARGUMENTS` termina em `.md` **e** o arquivo existe no disco.

1. Pergunte ao usuário: "Esse arquivo vai para qual categoria? `artigos` / `livros` / `videos` / `transcricoes` / `arquivos`"
2. Aguarde a resposta.
3. Copie (via Bash `cp`) para `raw/<categoria>/<slug>.md`.
   - Slug = nome do arquivo sem o caminho original.
4. Confirme em PT-BR:
   > `meu-artigo.md` copiado para `raw/artigos/meu-artigo.md`. Use `/wiki-ingest raw/artigos/meu-artigo.md` para processar.

### Caso C — Texto livre (qualquer outra coisa)

1. Pergunte: "Qual o título desse conteúdo? (vai virar o slug do arquivo)"
2. Aguarde a resposta. Gere o slug: lowercase, kebab-case, sem acentos.
3. Pergunte: "Categoria: `artigos` / `livros` / `videos` / `transcricoes` / `arquivos`"
4. Aguarde e salve em `raw/<categoria>/<slug>.md` com este frontmatter mínimo:
   ```yaml
   ---
   titulo: <título dado pelo usuário>
   data-criacao: <YYYY-MM-DD>
   fonte: manual
   ---
   ```
   Corpo = o texto de `$ARGUMENTS`.
5. Confirme em PT-BR:
   > Texto salvo em `raw/artigos/<slug>.md`. Use `/wiki-ingest raw/artigos/<slug>.md` para processar.

---

## Regras

- Nunca modifica arquivos **já existentes** em `raw/` — leitura pura após a escrita inicial.
- Não faz o ingest — apenas prepara o arquivo. O processamento é trabalho do `/wiki-ingest`.
- Sempre PT-BR nas confirmações.
- Se `captura.md` precisar ser atualizado (para casos onde o aluno veio pelo inbox), oriente o usuário a usar `/capturar` em vez deste comando.
