import NumberBoard from '@/app/[id]/NumberBoard'

export async function generateStaticParams() {
  return [{ id: '2' }]
}

const DynamicPage = () => {
  return <NumberBoard />
}

export default DynamicPage
