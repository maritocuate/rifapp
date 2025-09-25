import { NumberBoardStep } from './NumberBoardStep'

interface DynamicPageProps {
  params: Promise<{
    id: string
  }>
}

const DynamicPage = async ({ params }: DynamicPageProps) => {
  const { id } = await params
  return <NumberBoardStep raffleAlias={id} />
}

export default DynamicPage
