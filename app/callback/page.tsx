import { Suspense } from 'react'
import Status from './components/Status'

export default function Callback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Status />
    </Suspense>
  )
}
