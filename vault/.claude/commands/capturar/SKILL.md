---
name: capturar
description: "Captura zero-fricção no inbox do vault. Aceita texto livre OU arquivo físico (PDF, DOCX, HTML, TXT, MD) — converte e salva como markdown."
argument-hint: <texto OU caminho de arquivo>
---

# capturar

Captura rápida no `captura.md` do vault — sem decidir pasta, sem fricção. Append-and-review do Karpathy.

Aceita dois modos:

1. **Texto livre** → linha no backlog do `captura.md`.
2. **Arquivo físico** (PDF, DOCX, HTML, TXT, MD) → converte para `.md` usando o conversor embutido do `flowbrain`, salva em `raw/arquivos/`, e enfileira no backlog.

## Como usar

```
/capturar <texto livre>
/capturar <caminho/para/arquivo.pdf>
```

Exemplos de texto:

- `/capturar ler: paper sobre Mixture of Experts`
- `/capturar ideia: usar wiki-query pra preparar entrevistas`
- `/capturar https://karpathy.bearblog.dev/the-append-and-review-note/`

Exemplos de arquivo:

- `/capturar ~/Downloads/paper-rag.pdf`
- `/capturar ./relatorio.docx`
- `/capturar pagina-salva.html`

## Decisão: texto ou arquivo?

Trate `$ARGUMENTS` como **arquivo** se TODAS as condições forem verdadeiras:

1. Termina em `.pdf`, `.docx`, `.html`, `.htm`, `.txt` ou `.md`.
2. O arquivo existe no disco (verifique com `test -f "$ARGUMENTS"` via Bash, expandindo `~` se necessário).

Caso contrário, trate como **texto**.

---

## Modo TEXTO

Comportamento padrão — sem fricção, sem decisão de pasta.

1. Pega a data/hora atual no formato `YYYY-MM-DD HH:MM`.
2. Se o texto **não começa** com tag funcional (`ler:`, `ideia:`, `tarefa:`, `pergunta:`, `link:`, `assistir:`, `ouvir:`, `ingerir:`, `conceito:`), infira:
   - URL → `link:`
   - "ler ...", artigo, paper, post → `ler:`
   - "ouvir ...", podcast, álbum → `ouvir:`
   - "assistir ...", vídeo, filme, YouTube → `assistir:`
   - "lembrar de ...", "fazer ...", "renovar ..." → `tarefa:`
   - "como ...", "por que ...", "?" no final → `pergunta:`
   - Reflexão, observação, hipótese → `ideia:`
   - Default → `ideia:`
3. Abra `captura.md` (relativo ao `cwd`). Se não existir, avise: "Não achei `captura.md` no diretório atual. Está dentro do vault?"
4. Faça **prepend** logo abaixo do comentário `<!-- Novo conteúdo sempre no TOPO -->` (ou após `## Backlog` se o comentário não existir):

   ```
   - YYYY-MM-DD HH:MM — tag: texto
   ```

5. Salve. Confirme em **uma frase PT-BR**:
   > Capturado como `ler:` em `captura.md`.

---

## Modo ARQUIVO

Converte o arquivo para markdown via `flowbrain convert` (embutido — funciona pra qualquer aluno que rodou `npx flowbrain`, sem instalar `pdftotext`, `pandoc` ou nada externo).

### Passos

1. **Resolver caminho.** Expanda `~` para `$HOME` se necessário (o conversor também aceita `~/...`).
2. **Verificar que está na raiz do vault.** Se `captura.md` não existir no `cwd`, avise o usuário e pare. O conversor precisa do `cwd` correto pra salvar em `raw/arquivos/`.
3. **Rodar o conversor:**

   ```bash
   npx --yes flowbrain@latest convert "<caminho-do-arquivo>"
   ```

   - Sem `--out` ele salva automaticamente em `<cwd>/raw/arquivos/<slug>.md`.
   - Se o nome já existir, ele acrescenta `-2`, `-3`, etc. **Não sobrescreve.**
   - Imprime o caminho do arquivo gerado em stdout — capture e use no próximo passo.

4. **Pegar o slug** do nome de arquivo gerado (parte antes de `.md`). Esse é o wikilink.
5. **Pegar a data/hora atual** em `YYYY-MM-DD HH:MM`.
6. **Detectar a extensão original** (`.pdf`, `.docx`, `.html`, `.htm`, `.txt`, `.md`) — vai no fim da linha do backlog.
7. **Abrir `captura.md`** e fazer prepend logo abaixo do comentário `<!-- Novo conteúdo sempre no TOPO -->` (ou após `## Backlog`):

   ```
   - YYYY-MM-DD HH:MM — ingerir: [[<slug>]] (arquivo .pdf convertido)
   ```

   Ajuste `.pdf` conforme a extensão real.
8. Confirme em **uma frase PT-BR**, mostrando o caminho real retornado pelo conversor:
   > Arquivo `paper-rag.pdf` convertido para `raw/arquivos/paper-rag.md` e enfileirado para revisão.

### Quando a conversão falha

- **Exit code != 0** do `npx flowbrain convert` significa falha. Não invente conteúdo: mostre a mensagem de erro do conversor pro usuário e pare.
- **Arquivo binário corrompido** (PDF travado, DOCX inválido): mensagem do conversor explica. Sugira ao usuário tentar abrir o arquivo em outro programa pra confirmar que o original está íntegro.
- **Sem rede na primeira vez:** `npx` precisa baixar o pacote `flowbrain` se ainda não estiver em cache. Se o usuário não tem rede, oriente a rodar `npm install -g flowbrain` quando tiver, ou usar texto em vez de arquivo.

---

## Regras (ambos os modos)

- **Não abra** o `captura.md` no chat depois de salvar.
- **Não promova** pra wiki. **Não crie** nota em `wiki/`. Isso é trabalho do `/wiki-ingest` ou `/wiki-review`.
- Sempre PT-BR.
- Use tags consagradas (`ler:`, `ideia:`, `tarefa:`, `pergunta:`, `link:`, `assistir:`, `ouvir:`, `ingerir:`, `conceito:`). **Não invente tags novas.**

## Por que essa regra existe

A força da captura é a **ausência de decisão**. Karpathy chama de "append-and-review": tudo entra no topo, sem categorizar. A curadoria acontece depois, em `/wiki-review` — não aqui. Arquivos seguem o mesmo princípio: a conversão é mecânica, o destino é fixo (`raw/arquivos/`); a categorização real (artigo, livro, transcrição) é decidida depois.

Conteúdo a capturar: `$ARGUMENTS`
