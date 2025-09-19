import NumberBoard from '@/app/[id]/NumberBoard'

export async function generateStaticParams() {
  return [{ id: '2' }]
}

interface DynamicPageProps {
  params: Promise<{
    id: string
  }>
}

const DynamicPage = async ({ params }: DynamicPageProps) => {
  const { id } = await params
  return <NumberBoard raffleId={id} />
}

export default DynamicPage
