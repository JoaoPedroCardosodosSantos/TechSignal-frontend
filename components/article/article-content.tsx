/**
 * Componente ArticleContent
 * Renderiza o conteudo completo do artigo com formatacao para leitura
 */

interface ArticleContentProps {
  content: string
}

export function ArticleContent({ content }: ArticleContentProps) {
  // Divide o conteudo em paragrafos
  const paragraphs = content.split('\n\n').filter(p => p.trim())

  return (
    <article className="animate-slide-up">
      {/* Conteudo do artigo com tipografia otimizada para leitura */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {paragraphs.map((paragraph, index) => (
          <p 
            key={index}
            className="text-foreground/90 leading-relaxed mb-6 text-base md:text-lg"
            style={{
              // Adiciona delay progressivo na animacao
              animationDelay: `${index * 100}ms`
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}
