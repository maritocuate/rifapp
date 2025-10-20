import { AdminDashboard } from './index'
import { AdminRoute } from '@/components/auth/AdminRoute'

export default function AdminPage() {
  return (
    <div className="font-inter">
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    </div>
  )
}
