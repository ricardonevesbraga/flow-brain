# Karpathy — LLM Wiki e a "append-and-review note"

> Transcrição adaptada de uma conversa de Andrej Karpathy sobre o padrão LLM Wiki
> e a técnica "append-and-review note", originalmente publicados no blog dele
> (karpathy.bearblog.dev) e em um gist no GitHub. Tradução livre para PT-BR.
> Material de apoio para aula — Flowgrammers, maio de 2026.

---

Então, eu queria conversar sobre uma coisa que venho fazendo há alguns anos e que mudou bastante a forma como eu organizo conhecimento. Não é nada revolucionário, mas é o tipo de coisa que parece pequeno e na prática gera uma diferença enorme ao longo do tempo. Eu chamo isso de "append-and-review note" e, mais recentemente, de "LLM Wiki". São duas ideias relacionadas, mas distintas. Deixa eu explicar uma de cada vez.

## O problema das ferramentas tradicionais de nota

Antes de chegar nisso, eu acho importante explicar o que me incomodava. Eu já tentei de tudo: Notion, Roam Research, Obsidian, Apple Notes, Bear, Logseq. Cada uma dessas ferramentas tem uma filosofia diferente, e cada uma tem um problema diferente. Mas o padrão que eu observei em todas elas é mais ou menos esse: você abre a ferramenta com uma ideia, e antes de conseguir registrar a ideia, você precisa decidir um monte de coisas. Em que pasta vai? Em que banco de dados? Qual o tipo da nota? Quais tags? Tem uma página relacionada? Tem que linkar?

E o que acontece é que essa fricção mata a captura. Você está caminhando, está dirigindo, está no chuveiro, tem uma ideia boa, e quando chega no computador a energia já passou. Ou pior: você abre a ferramenta, fica 30 segundos pensando onde encaixar aquela ideia, perde o foco e fecha sem registrar nada.

O Tiago Forte, no livro Building a Second Brain, propõe o sistema PARA: Projects, Areas, Resources, Archive. É um sistema legal, mas ele assume que você já sabe em qual dessas categorias uma ideia se encaixa no momento da captura. E na prática, na maioria das vezes, você não sabe. Você só sabe que é uma ideia que vale a pena guardar.

O Niklas Luhmann, com o Zettelkasten, também resolveu parte desse problema. Mas o Zettelkasten exige um trabalho cognitivo grande no momento da escrita: você precisa achar a ideia anterior relacionada, criar a nova ficha, decidir as conexões. É lindo conceitualmente, mas é um sistema para alguém que escreve livros, não para alguém que está tentando capturar uma ideia rapidamente entre duas reuniões.

## A "append-and-review note"

Então a minha proposta é absurdamente simples. Você tem **um único arquivo de texto**. Pode ser um Markdown, pode ser um .txt, não importa. E toda vez que você tem uma ideia, um link, uma tarefa, qualquer coisa, você adiciona uma linha no topo desse arquivo. Com timestamp.

É só isso. Você não decide pasta. Você não decide categoria. Você não pensa. Você só anota.

O nome "append-and-review" vem de duas operações que esse arquivo recebe:

1. **Append**: adicionar no topo, sem fricção, a qualquer momento.
2. **Review**: de tempos em tempos — uma vez por semana, ou quando bater na cabeça — você revisa de cima pra baixo e decide o que fazer com cada item.

A revisão tem três destinos possíveis pra cada item:

- **Promover**: a ideia é boa o suficiente pra virar uma nota própria, num lugar próprio.
- **Agir**: é uma tarefa, vira um TODO ou um projeto.
- **Deixar ali**: o item não merece ação imediata, mas também não merece ser deletado. Ele afunda naturalmente conforme você adiciona coisas novas no topo.

Esse terceiro caso é o mais importante e o mais subestimado. Eu chamo isso de "sinking natural". Coisas que parecem urgentes na hora da captura, três semanas depois, você percebe que não eram tão importantes assim. E elas afundam sem você precisar deletar manualmente nada. O sistema se auto-poda.

Isso resolve um problema profundo das ferramentas de nota: a paralisia de "o que faço com isso?". Você não faz nada. Você só anota e segue.

## A diferença pra to-do lists

Uma pergunta que eu recebo bastante é: isso não é só uma lista de tarefas? Não. Uma lista de tarefas pressupõe que tudo ali vai virar ação. Aqui não. A maior parte do que entra na append-and-review note é conhecimento bruto, links, ideias soltas, observações. Talvez 10% vire ação. Talvez 30% vire conhecimento processado. E 60% afunda. E tudo bem.

Outra diferença: a append-and-review note é um buffer cronológico, não uma estrutura. Você nunca volta lá pra "consultar" alguma coisa. A informação útil vai sair dali, virar outra coisa, e a nota original vai afundar. A nota é descartável por design.

## Entrando no LLM Wiki

Agora a segunda ideia, que é mais recente. Com o avanço dos LLMs com contextos cada vez maiores — a gente tá falando hoje de modelos com 200k tokens, 1 milhão de tokens — abriu uma possibilidade nova de organizar conhecimento que antes não fazia sentido.

A ideia é construir um wiki pessoal, mas não escrito por você. Escrito por um agente que opera em cima das suas fontes brutas.

Funciona assim. Você tem três camadas:

1. **Raw**: as fontes brutas, imutáveis. Artigos que você leu, transcrições de vídeos, papers, dumps de texto. Você joga tudo aqui sem editar.
2. **Wiki**: o conhecimento processado. Páginas curtas, conectadas por wikilinks, organizadas por entidade e por conceito. Quem escreve essa camada é o agente.
3. **Schema**: as regras de operação. Um arquivo de instruções pro agente — o que ele pode fazer, como ele deve escrever, em que idioma, com qual estrutura.

A função do agente é processar o raw e gerar wiki. Quando você joga um novo artigo no raw, o agente lê, extrai entidades, extrai conceitos, escreve uma página de fonte com TL;DR, resumo estruturado e citações-chave, e atualiza as páginas das entidades e conceitos relevantes.

A grande diferença pra um RAG tradicional é que o LLM Wiki não busca chunks na hora da pergunta. Ele já tem o conhecimento organizado em páginas curadas, escritas em linguagem natural, conectadas por links. Quando você faz uma pergunta, o agente lê o índice, identifica as páginas relevantes, lê elas inteiras (não chunks) e responde com base nesse contexto completo.

## Por que isso funciona

A intuição por trás é a seguinte: os LLMs hoje são muito bons em **ler texto longo** e muito bons em **escrever síntese**. Eles são menos bons em **lembrar de fatos específicos sem contexto**. Então a estratégia é dar pra ele, na hora da pergunta, o contexto pré-curado, pré-organizado, pré-conectado. E aí ele responde de forma muito melhor do que se buscasse chunks num banco vetorial.

Tem uma analogia que eu uso. Um RAG é como pesquisar no Google: você joga uma query e recebe trechos descontextualizados de páginas diferentes. Um LLM Wiki é como ter uma enciclopédia pessoal que alguém escreveu pra você: você abre a página, lê do começo ao fim, e tudo está conectado.

E o melhor: você não precisa escrever essa enciclopédia. O agente escreve.

## O que muda na prática

Eu uso isso há alguns meses e o que mais me surpreende é a sensação de que o conhecimento "fica". Antes, eu lia um artigo bom, achava genial, e três semanas depois não lembrava mais nem o título. Hoje, leio o artigo, jogo no raw, peço pro agente ingerir, e quando precisar — daqui a três meses, daqui a um ano — eu consulto o wiki e ele me dá a resposta com referência exata.

Outra coisa que mudou é a forma como eu consumo conteúdo. Eu agora leio com a expectativa de que vou processar depois. Isso baixa a ansiedade do "preciso entender tudo agora". Eu leio, marco, jogo no raw, e o agente faz o resumo. Se eu precisar do detalhe, está lá. Se não precisar, não estraga minha cabeça.

## Os erros que eu cometi no caminho

Antes de chegar nesse formato, eu cometi alguns erros que valem mencionar.

O primeiro foi tentar fazer tudo manualmente. Eu mantinha um Obsidian vault enorme, escrevia eu mesmo as páginas, fazia os links. Era trabalhoso e, no fim, eu mantinha umas 50 páginas bem escritas e ignorava o resto. Não escala. Você precisa de um agente fazendo o trabalho pesado.

O segundo erro foi misturar processo com armazenamento. Eu tinha o mesmo arquivo servindo de captura e de conhecimento curado. Isso vira uma bagunça rapidamente. As três camadas — raw, wiki, schema — precisam ser separadas. Não dá pra economizar nessa estrutura.

O terceiro erro foi não ter um schema explícito. Eu deixava o agente "decidir" como escrever, e cada ingest saía com um formato diferente. Sem um contrato claro, o wiki perde coerência. Hoje eu tenho um arquivo de instruções com regras de idioma, estrutura, frontmatter, convenções de wikilink, tudo escrito. O agente segue isso religiosamente.

## E o futuro

A coisa que eu acho mais interessante nessa direção é o que acontece quando o wiki cresce. Cada nova fonte que você ingere aumenta a qualidade de todas as respostas futuras. É composto. Você não tem isso em anotações isoladas. Anotações isoladas têm valor linear: 100 notas valem 100x uma nota. Um wiki conectado tem valor quadrático: 100 páginas conectadas valem muito mais do que 100 páginas soltas porque cada uma referencia as outras.

E isso só tende a ficar melhor com modelos mais capazes. Hoje o agente já consegue identificar entidades, escrever sínteses razoáveis, propor conexões. Daqui a um ou dois anos, com modelos ainda melhores e contextos ainda maiores, ele vai conseguir manter um wiki de milhares de páginas com coerência total.

A visão que eu tenho é a seguinte: cada pessoa, no futuro próximo, vai ter um segundo cérebro que é um wiki pessoal, escrito por um agente, sobre tudo que ela leu, assistiu, ouviu e pensou. E esse wiki vai ser consultável por ela mesma e por outros agentes que trabalham pra ela. É um substrato de memória.

## Recomendações práticas

Pra quem quer começar:

- **Comece pequeno.** Não tente migrar 10 anos de anotações pra esse formato. Comece com o que você consumir a partir de hoje.
- **Use Markdown local.** Não use ferramentas proprietárias. Você quer que esse wiki seja seu, sem dependência de empresa.
- **Tenha um schema explícito.** Escreva as regras de operação do agente. Idioma, estrutura, convenções. Sem isso o wiki perde coerência.
- **Separe captura de curadoria.** Use uma append-and-review note pro raw bruto, e deixe o agente processar pro wiki.
- **Não tente automatizar 100%.** Você ainda precisa decidir o que vale ingerir. Mas tudo depois disso pode ser delegado.

E mais importante: confie no processo. Os primeiros dias vão parecer que você está só acumulando lixo no raw. Mas conforme o wiki vai sendo construído, você começa a ver o composto. Daqui a três meses você vai poder perguntar uma coisa específica e o agente vai responder com referência exata a um artigo que você leu em janeiro. E aí você entende por que vale a pena.

## Fechando

Pra mim a grande sacada não é nenhuma das técnicas individuais — append-and-review existe há muito tempo, em outras formas. Wiki pessoal também. O que muda é que agora você tem um agente capaz de operar essa estrutura por você. Você não precisa mais ser o curador. Você só precisa ser o consumidor e o aprovador.

E isso libera uma quantidade enorme de capacidade cognitiva pra fazer outras coisas. Você para de gastar energia organizando informação e passa a gastar energia usando informação.

É isso. Sem fricção na entrada, sem trabalho na curadoria, e conhecimento que fica. Pra mim essa é a forma certa de organizar a cabeça em 2026.

---

*Fim da transcrição.*
