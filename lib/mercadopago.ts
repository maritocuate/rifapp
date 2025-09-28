// Configuración para MercadoPago
export const getMercadoPagoConfig = () => {
  return {
    accessToken: process.env.MERCADOLIBRE_TOKEN || '',
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }
}
