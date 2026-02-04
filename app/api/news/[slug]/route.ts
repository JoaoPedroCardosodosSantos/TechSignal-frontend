/**
 * API Route: /api/news/[slug]
 * Retorna uma noticia especifica pelo slug
 * Preparado para integracao com backend Laravel
 */

import { NextResponse } from 'next/server'
import type { NewsItem } from '@/types/news'

// Dados mockados - mesmos da API principal para consistencia
const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Nova Geracao de Chips de IA Revoluciona o Mercado',
    summary: 'Os novos processadores prometem 10x mais desempenho em tarefas de inteligencia artificial, transformando como empresas processam dados.',
    content: 'A mais recente geracao de chips de inteligencia artificial esta redefinindo os limites do que e possivel em computacao. Com arquiteturas inovadoras e eficiencia energetica sem precedentes, esses processadores estao permitindo que empresas de todos os tamanhos implementem solucoes de IA que antes eram exclusivas de gigantes da tecnologia.\n\nOs novos chips apresentam melhorias significativas em processamento paralelo, permitindo treinar modelos de machine learning em fracoes do tempo anteriormente necessario. Alem disso, a reducao no consumo de energia torna essas solucoes mais sustentaveis e economicamente viaveis.\n\nEspecialistas preveem que essa revolucao tecnologica acelerara a adocao de IA em setores como saude, financas e manufatura. Empresas que ainda nao investiram em capacidades de IA podem encontrar dificuldades em competir nos proximos anos.\n\nA corrida por processadores de IA mais eficientes continua aquecida, com grandes players como NVIDIA, AMD, Intel e novos entrantes disputando fatias desse mercado bilionario.',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop',
    tag: 'Hardware',
    published_at: '2026-02-04',
    slug: 'nova-geracao-chips-ia-revoluciona-mercado'
  },
  {
    id: 2,
    title: 'Startup Brasileira Capta R$ 500 Milhoes em Rodada Serie C',
    summary: 'A fintech nacional atinge status de unicornio com solucao inovadora de pagamentos para pequenas empresas.',
    content: 'Em um movimento que reafirma o potencial do ecossistema de startups brasileiro, uma fintech nacional acaba de concluir uma rodada de investimentos Serie C no valor de R$ 500 milhoes. A empresa, que oferece solucoes de pagamento simplificadas para pequenos e medios empresarios, agora ostenta uma avaliacao de mercado que ultrapassa R$ 5 bilhoes, consolidando seu status de unicornio.\n\nO aporte sera utilizado para expandir operacoes para outros paises da America Latina e desenvolver novos produtos financeiros. A empresa ja processa mais de R$ 100 bilhoes em transacoes anuais e conta com mais de 2 milhoes de clientes ativos.\n\nO fundador da empresa destacou que o investimento permitira acelerar a missao de democratizar o acesso a servicos financeiros de qualidade para pequenos negocios.',
    image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop',
    tag: 'Startups',
    published_at: '2026-02-03',
    slug: 'startup-brasileira-capta-500-milhoes'
  },
  {
    id: 3,
    title: 'Web3 e Blockchain: O Futuro da Internet Descentralizada',
    summary: 'Especialistas debatem como tecnologias descentralizadas estao moldando a proxima era da internet e das transacoes digitais.',
    content: 'A Web3 representa a terceira geracao da internet, caracterizada pela descentralizacao e pelo uso extensivo de tecnologias blockchain. Diferente das versoes anteriores, onde grandes corporacoes controlam dados e plataformas, a Web3 promete devolver o poder aos usuarios.\n\nSmart contracts, tokens nao fungiveis (NFTs) e organizacoes autonomas descentralizadas (DAOs) sao apenas algumas das inovacoes que estao emergindo deste novo paradigma. Empresas tradicionais estao comecando a explorar como podem se adaptar a essa nova realidade, enquanto reguladores ao redor do mundo buscam equilibrar inovacao com protecao ao consumidor.\n\nA tecnologia blockchain subjacente oferece transparencia e imutabilidade, caracteristicas valiosas para aplicacoes em cadeia de suprimentos, votacao eletronica e verificacao de identidade.',
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop',
    tag: 'Blockchain',
    published_at: '2026-02-02',
    slug: 'web3-blockchain-futuro-internet-descentralizada'
  },
  {
    id: 4,
    title: 'Ciberseguranca: Ameacas Crescem 300% em 2025',
    summary: 'Relatorio revela aumento dramatico em ataques ciberneticos, com ransomware liderando as ameacas corporativas.',
    content: 'Um novo relatorio de seguranca digital revela numeros alarmantes: os ataques ciberneticos cresceram 300% no ultimo ano, com empresas de todos os portes sendo alvos de criminosos cada vez mais sofisticados. O ransomware continua sendo a principal ameaca, com pedidos de resgate que chegam a milhoes de dolares.\n\nEspecialistas recomendam investimentos em infraestrutura de seguranca, treinamento de funcionarios e implementacao de politicas de zero trust. A inteligencia artificial esta sendo usada tanto por atacantes quanto por defensores, criando uma corrida armamentista digital que nao mostra sinais de desaceleracao.\n\nEmpresas que sofrem ataques enfrentam nao apenas perdas financeiras diretas, mas tambem danos reputacionais significativos e possíveis multas regulatorias.',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop',
    tag: 'Seguranca',
    published_at: '2026-02-01',
    slug: 'ciberseguranca-ameacas-crescem-300-porcento'
  },
  {
    id: 5,
    title: 'Apple Apresenta Vision Pro 2 com Recursos Revolucionarios',
    summary: 'Nova geracao de oculos de realidade mista promete experiencias imersivas ainda mais avancadas e preco mais acessivel.',
    content: 'A Apple acaba de anunciar a segunda geracao de seus oculos de realidade mista, o Vision Pro 2. O novo dispositivo traz melhorias significativas em conforto, duracao da bateria e qualidade de display. Com um campo de visao ampliado e novos sensores de rastreamento, a experiencia de realidade mista atinge novos patamares de realismo.\n\nO preco tambem foi reduzido significativamente, tornando a tecnologia mais acessivel ao consumidor medio. A empresa tambem anunciou parcerias com desenvolvedores para criar um ecossistema robusto de aplicativos nativos.\n\nAnalistas acreditam que esta geracao pode ser o ponto de inflexao para a adocao em massa de dispositivos de realidade mista.',
    image_url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&h=800&fit=crop',
    tag: 'Gadgets',
    published_at: '2026-01-31',
    slug: 'apple-apresenta-vision-pro-2'
  },
  {
    id: 6,
    title: 'Inteligencia Artificial Generativa Transforma Industria Criativa',
    summary: 'Ferramentas de IA estao revolucionando como designers, escritores e artistas trabalham, gerando debates sobre direitos autorais.',
    content: 'A inteligencia artificial generativa esta causando uma revolucao sem precedentes na industria criativa. Ferramentas capazes de criar imagens, textos, musicas e videos estao mudando fundamentalmente como profissionais criativos trabalham.\n\nEnquanto alguns celebram as novas possibilidades de produtividade e experimentacao, outros levantam preocupacoes sobre direitos autorais, empregos e a propria natureza da criatividade humana. Reguladores ao redor do mundo estao correndo para estabelecer frameworks legais que equilibrem inovacao com protecao aos criadores.\n\nEmpresas de tecnologia continuam investindo bilhoes no desenvolvimento de modelos cada vez mais sofisticados e versateis.',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
    tag: 'IA',
    published_at: '2026-01-30',
    slug: 'ia-generativa-transforma-industria-criativa'
  },
  {
    id: 7,
    title: 'Veiculos Eletricos Ultrapassam Vendas de Combustao na Europa',
    summary: 'Marco historico: pela primeira vez, carros eletricos superam vendas de veiculos a combustao no continente europeu.',
    content: 'Em um marco historico para a industria automotiva, os veiculos eletricos ultrapassaram as vendas de carros a combustao na Europa pela primeira vez. Este momento representa o ponto de inflexao que especialistas previam, sinalizando uma mudanca irreversivel no mercado automotivo global.\n\nA combinacao de incentivos governamentais, melhoria na infraestrutura de recarga e reducao nos precos das baterias contribuiu para essa transicao. Analistas preveem que outros mercados seguirao essa tendencia nos proximos anos.\n\nFabricantes tradicionais estao acelerando seus planos de eletrifcacao para nao ficarem para tras.',
    image_url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=800&fit=crop',
    tag: 'Mobilidade',
    published_at: '2026-01-29',
    slug: 'veiculos-eletricos-ultrapassam-combustao-europa'
  },
  {
    id: 8,
    title: '5G Avancado: Operadoras Anunciam Cobertura Nacional',
    summary: 'Brasil atinge marco de cobertura 5G em todas as capitais e principais cidades, prometendo revolucionar conectividade.',
    content: 'As principais operadoras de telecomunicacoes brasileiras anunciaram a conclusao da expansao da rede 5G para todas as capitais e cidades com mais de 500 mil habitantes. Este marco representa um avanco significativo na infraestrutura digital do pais, prometendo revolucionar setores como saude, educacao e industria.\n\nA tecnologia 5G oferece velocidades ate 100 vezes maiores que o 4G, com latencia minima, permitindo aplicacoes que antes eram impraticaveis. Empresas ja estao desenvolvendo solucoes inovadoras que aproveitam essa nova capacidade de conectividade.',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop',
    tag: 'Telecom',
    published_at: '2026-01-28',
    slug: '5g-avancado-operadoras-cobertura-nacional'
  },
  {
    id: 9,
    title: 'Computacao Quantica Atinge Novo Recorde de Qubits',
    summary: 'Pesquisadores conseguem estabilizar 1000 qubits, aproximando a computacao quantica pratica da realidade.',
    content: 'Uma equipe internacional de pesquisadores acaba de anunciar um avanco significativo na computacao quantica: a estabilizacao de 1000 qubits em um unico processador. Este marco aproxima a tecnologia de aplicacoes praticas que podem revolucionar areas como descoberta de medicamentos, modelagem climatica e criptografia.\n\nA computacao quantica promete resolver problemas que levariam milhares de anos em computadores tradicionais. Empresas de tecnologia e governos estao investindo bilhoes nessa corrida tecnologica.',
    image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=800&fit=crop',
    tag: 'Ciencia',
    published_at: '2026-01-27',
    slug: 'computacao-quantica-novo-recorde-qubits'
  },
  {
    id: 10,
    title: 'Metaverso Corporativo: Empresas Adotam Espacos Virtuais',
    summary: 'Grandes corporacoes estao criando escritorios virtuais no metaverso, redefinindo o futuro do trabalho remoto.',
    content: 'O conceito de metaverso esta encontrando aplicacoes praticas no mundo corporativo. Grandes empresas estao criando espacos virtuais onde funcionarios podem colaborar, realizar reunioes e ate mesmo socializar.\n\nEsses ambientes oferecem uma experiencia mais imersiva que videoconferencias tradicionais, permitindo interacoes mais naturais e produtivas. Plataformas especializadas estao surgindo para atender essa demanda crescente, oferecendo ferramentas de colaboracao, apresentacao e networking em ambientes tridimensionais.',
    image_url: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&h=800&fit=crop',
    tag: 'Metaverso',
    published_at: '2026-01-26',
    slug: 'metaverso-corporativo-empresas-espacos-virtuais'
  },
  {
    id: 11,
    title: 'Satelites de Internet de Baixa Orbita Conectam Areas Remotas',
    summary: 'Constelacoes de satelites estao levando internet de alta velocidade para regioes antes sem conectividade.',
    content: 'As constelacoes de satelites de baixa orbita estao cumprindo sua promessa de conectar as areas mais remotas do planeta. Comunidades indigenas, agricultores em regioes isoladas e habitantes de ilhas distantes agora tem acesso a internet de alta velocidade pela primeira vez.\n\nO impacto social e economico e imenso, permitindo acesso a educacao online, telemedicina e comercio eletronico. O custo do servico continua caindo, tornando-o cada vez mais acessivel para populacoes de baixa renda.',
    image_url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=800&fit=crop',
    tag: 'Espacial',
    published_at: '2026-01-25',
    slug: 'satelites-internet-baixa-orbita-areas-remotas'
  },
  {
    id: 12,
    title: 'Robotica Avancada: Humanoides Entram no Mercado de Trabalho',
    summary: 'Novos robos humanoides estao sendo testados em fabricas e armazens, prometendo transformar a forca de trabalho.',
    content: 'A robotica esta entrando em uma nova era com o lancamento de robos humanoides capazes de realizar tarefas complexas em ambientes projetados para humanos. Fabricas, armazens e centros de logistica estao testando esses robos para tarefas que vao desde movimentacao de carga ate montagem de produtos.\n\nA tecnologia combina avancos em IA, sensores e atuadores para criar maquinas que podem aprender e se adaptar a diferentes situacoes. O debate sobre o impacto no emprego se intensifica enquanto a tecnologia avanca rapidamente.',
    image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop',
    tag: 'Robotica',
    published_at: '2026-01-24',
    slug: 'robotica-avancada-humanoides-mercado-trabalho'
  },
  {
    id: 13,
    title: 'Privacidade Digital: Novas Leis Entram em Vigor Globalmente',
    summary: 'Regulamentacoes mais rigorosas sobre dados pessoais estao forcando empresas a repensar suas praticas.',
    content: 'Uma nova onda de regulamentacoes de privacidade esta entrando em vigor ao redor do mundo, forcando empresas de tecnologia a repensar como coletam, armazenam e utilizam dados pessoais. As multas por violacoes estao se tornando mais severas, e consumidores estao ganhando mais controle sobre suas informacoes.\n\nEmpresas estao investindo em tecnologias de privacidade, como computacao confidencial e aprendizado federado, para continuar oferecendo servicos personalizados enquanto respeitam os novos marcos regulatorios.',
    image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop',
    tag: 'Privacidade',
    published_at: '2026-01-23',
    slug: 'privacidade-digital-novas-leis-vigor'
  },
  {
    id: 14,
    title: 'Biotecnologia e IA: Descoberta de Medicamentos em Semanas',
    summary: 'A combinacao de inteligencia artificial com biotecnologia esta acelerando drasticamente a descoberta de novos tratamentos.',
    content: 'A convergencia entre inteligencia artificial e biotecnologia esta revolucionando o processo de descoberta de medicamentos. O que antes levava anos agora pode ser realizado em semanas, gracas a algoritmos capazes de simular milhoes de combinacoes moleculares e prever sua eficacia.\n\nVarias empresas farmaceuticas ja estao utilizando essa abordagem para desenvolver tratamentos para doencas que antes eram consideradas incuraveis. Os primeiros medicamentos desenvolvidos inteiramente com auxilio de IA estao entrando em testes clinicos.',
    image_url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=800&fit=crop',
    tag: 'Biotech',
    published_at: '2026-01-22',
    slug: 'biotecnologia-ia-descoberta-medicamentos'
  },
  {
    id: 15,
    title: 'Cloud Gaming Atinge 500 Milhoes de Usuarios',
    summary: 'Plataformas de jogos em nuvem crescem exponencialmente, eliminando a necessidade de hardware caro.',
    content: 'O mercado de cloud gaming atingiu o marco de 500 milhoes de usuarios ativos, consolidando-se como uma das formas mais populares de jogar. A tecnologia permite que jogadores acessem titulos AAA em qualquer dispositivo, desde smartphones ate smart TVs, sem necessidade de consoles ou PCs poderosos.\n\nA competicao entre plataformas esta impulsionando melhorias na qualidade do streaming e reducao nos precos das assinaturas. Desenvolvedores de jogos estao criando experiencias especificamente otimizadas para essa nova realidade.',
    image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop',
    tag: 'Games',
    published_at: '2026-01-21',
    slug: 'cloud-gaming-500-milhoes-usuarios'
  }
]

/**
 * GET /api/news/[slug]
 * Retorna uma noticia especifica pelo slug
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 200))

  const { slug } = await params

  // Busca a noticia pelo slug
  const news = newsData.find(item => item.slug === slug)

  if (!news) {
    return NextResponse.json(
      { error: 'Noticia nao encontrada' },
      { status: 404 }
    )
  }

  // Busca noticias relacionadas (mesma tag, excluindo a atual)
  const related = newsData
    .filter(item => item.tag === news.tag && item.id !== news.id)
    .slice(0, 3)

  return NextResponse.json({
    news,
    related
  })
}
