import DynamicPageClient from '@/components/DynamicPageClient'

export async function generateStaticParams() {
  return [{ id: '2' }]
}

const DynamicPage = () => {
  return <DynamicPageClient />
}

export default DynamicPage
