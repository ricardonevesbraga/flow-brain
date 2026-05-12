---
name: fb-help
description: "Guia completo do vault: o que vai em cada pasta e o que faz cada comando."
---

# fb-help

Guia completo do Flow Brain.

## Como usar

```
/fb-help
```

---

## Estrutura do vault

```
meu-cerebro/
├── captura.md          ← anote aqui tudo sem pensar em pasta
├── raw/                ← fontes brutas (você escreve, Claude nunca toca)
│   ├── artigos/        ← posts, artigos de blog, textos da web
│   ├── livros/         ← livros, papers, publicações acadêmicas
│   ├── transcricoes/   ← transcrições de vídeos, podcasts, áudios
│   └── arquivos/       ← PDFs, imagens, outros arquivos
├── wiki/               ← conhecimento gerado pelo Claude
│   ├── fontes/         ← resumo de cada arquivo processado de raw/
│   ├── entidades/      ← pessoas, empresas, produtos mencionados
│   ├── conceitos/      ← ideias, frameworks, termos importantes
│   ├── index.md        ← índice de tudo no wiki
│   └── log.md          ← histórico de operações do agente
├── diario/             ← notas diárias YYYY-MM-DD.md
└── CLAUDE.md           ← contrato do agente (regras e workflows)
```

---

## Comando captura — Entrada

### `/capturar <texto OU caminho-de-arquivo>`
Append zero-fricção no `captura.md` com timestamp e tag funcional sugerida automaticamente.

**Modo texto:**
- Aceita qualquer texto (URL, ideia, tarefa, link, pergunta).
- Detecta a tag (`ler:`, `ideia:`, `tarefa:`, `link:`, `assistir:`, `ouvir:`, `pergunta:`).
- Prepend no topo do `## Backlog` — sem decidir pasta, sem fricção.

**Modo arquivo (PDF, DOCX, HTML, TXT, MD):**
- Converte o arquivo para markdown via conversor embutido do `flowbrain` (sem precisar instalar `pdftotext` ou `pandoc`).
- Salva em `raw/arquivos/<slug>.md` com frontmatter pronto.
- Enfileira no `captura.md` como `ingerir: [[slug]]`.

**Quando usar:** sempre que tiver uma ideia, link, pendência ou um arquivo (paper, ebook, página salva) pra ler depois. É a porta de entrada.

---

## Comandos wiki — Conhecimento

### `/wiki-ingest raw/caminho/arquivo.md`
Processa um arquivo de `raw/` e gera conhecimento no wiki.
- Cria `wiki/fontes/<slug>.md` com TL;DR, resumo e citações
- Cria ou atualiza páginas de entidades e conceitos
- Atualiza `wiki/index.md` e `wiki/log.md`

**Quando usar:** sempre que adicionar algo novo em `raw/`

---

### `/wiki-query <pergunta>`
Responde perguntas usando o conhecimento acumulado no wiki.
- Lê `wiki/index.md`, identifica páginas relevantes
- Sintetiza resposta citando fontes via wikilinks
- Oferece arquivar a síntese em `wiki/conceitos/`

**Quando usar:** quando quiser consultar o que já aprendeu

---

### `/wiki-review`
Revisa `captura.md` e sugere o que fazer com cada item.
- Para cada item do backlog: sugere ingerir, virar conceito ou descartar
- Aguarda confirmação antes de executar qualquer ação
- Itens não acionados ficam onde estão (sinking natural)

**Quando usar:** semanalmente para processar a captura

---

### `/wiki-lint`
Verifica a saúde do wiki e reporta problemas.
- Links quebrados, páginas órfãs, frontmatter inválido
- Violação de idioma (conteúdo em inglês onde deveria ser PT-BR)
- Páginas desatualizadas há mais de 90 dias

**Quando usar:** mensalmente como manutenção

---

## Comandos fb — Vault

### `/fb-diario`
Abre ou cria a nota de diário do dia atual em `diario/YYYY-MM-DD.md`.
- Se já existe: mostra o conteúdo e pergunta se quer adicionar algo
- Se não existe: cria com template pronto (foco, capturas, aprendizados)

**Quando usar:** todo dia para registro diário

---

### `/fb-raw`
Lista os arquivos em `raw/` e mostra o status de ingest de cada um.
- Pendentes: arquivos ainda não processados
- Processados: arquivos com página correspondente em `wiki/fontes/`
- Sugere o próximo arquivo a processar

**Quando usar:** para ver o que está esperando para ser ingerido

---

### `/fb-help`
Este guia.

---

## Fluxo recomendado

1. Adicione fontes em `raw/` (artigos, livros, transcrições)
2. Processe com `/wiki-ingest raw/caminho/arquivo.md`
3. Consulte o conhecimento com `/wiki-query <pergunta>`
4. Semanalmente: `/wiki-review` para processar capturas avulsas
5. Mensalmente: `/wiki-lint` para checar a saúde do wiki
