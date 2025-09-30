import Script from 'next/script'

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'webapplication'
  data?: any
}

export function StructuredData({ type = 'website', data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Riffita',
          url: 'https://riffita.com',
          logo: 'https://riffita.com/images/logo-md.png',
          description:
            'Plataforma para crear sorteos online gratis. Organiza rifas digitales, concursos y sorteos de manera fácil y segura.',
          sameAs: [
            'https://twitter.com/riffita',
            'https://facebook.com/riffita',
            'https://instagram.com/riffita',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: 'Spanish',
          },
        }

      case 'webapplication':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Riffita',
          url: 'https://riffita.com',
          description:
            'Crea sorteos online gratis con Riffita. La mejor plataforma para organizar rifas digitales, sorteos y concursos.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          featureList: [
            'Crear sorteos online gratis',
            'Organizar rifas digitales',
            'Gestión de participantes',
            'Sistema de pagos integrado',
            'Resultados automáticos',
          ],
        }

      default:
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Riffita',
          url: 'https://riffita.com',
          description:
            'Crea sorteos online gratis con Riffita. La mejor plataforma para organizar rifas digitales, sorteos y concursos.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://riffita.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }
    }
  }

  const structuredData = data || getStructuredData()

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
