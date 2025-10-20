'use client'

import { useState } from 'react'
import { trpc } from '@/client/trpc'
import { 
  Users, 
  Ticket, 
  Trophy, 
  CurrencyCircleDollar, 
  TrendUp, 
  Warning,
  Calendar,
  UserPlus,
  Gear,
} from '@phosphor-icons/react'
import { 
  RafflesTable, 
  UsersTable, 
  TicketsTable, 
  WinnersTable, 
  CreateUserModal 
} from './components'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import {
  AdminContainer,
  AdminHeader,
  AdminHeaderContent,
  AdminHeaderInner,
  AdminTitle,
  AdminSubtitle,
  AdminButtonGroup,
  AdminButton,
  AdminContent,
  AdminTabs,
  AdminTabsList,
  AdminTab,
  AdminCard,
  AdminCardHeader,
  AdminCardTitle,
  AdminCardContent,
  AdminStatValue,
  AdminStatLabel,
  AdminGrid,
  AdminAlert,
  AdminAlertTitle,
  AdminAlertDescription,
  AdminList,
  AdminListItem,
  AdminListItemContent,
  AdminListItemTitle,
  AdminListItemSubtitle,
  AdminListItemMeta,
  AdminListItemDate,
  AdminBadge
} from './styles'

export function AdminDashboard() {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const { data: stats, isLoading: isLoadingStats, error: statsError } = trpc.admin.getSystemStats.useQuery()
  const { data: almostFinishedRaffles } = trpc.admin.getRafflesAlmostFinished.useQuery()
  const { data: recentUsers, isLoading: isLoadingRecentUsers } = trpc.admin.getRecentUsers.useQuery({ limit: 5 })
  const { data: recentTickets, isLoading: isLoadingRecentTickets } = trpc.admin.getRecentTickets.useQuery({ limit: 5 })

  if (isLoadingStats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner message="Cargando panel de administración..." size="lg" />
      </div>
    )
  }

  if (statsError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <AdminAlert style={{ maxWidth: '28rem' }}>
          <AdminAlertTitle>
            <Warning size={16} />
            Error al cargar el panel de administración: {statsError.message}
          </AdminAlertTitle>
        </AdminAlert>
      </div>
    )
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminHeaderContent>
          <AdminHeaderInner>
            <div>
              <AdminTitle>Panel de Administración</AdminTitle>
              <AdminSubtitle>Gestiona rifas, usuarios y estadísticas del sistema</AdminSubtitle>
            </div>
            <AdminButtonGroup>
              <AdminButton
                variant="contained"
                onClick={() => setShowCreateUserModal(true)}
              >
                <UserPlus size={16} />
                Crear Usuario
              </AdminButton>
              <AdminButton variant="outlined">
                <Gear size={16} />
                Configuración
              </AdminButton>
            </AdminButtonGroup>
          </AdminHeaderInner>
        </AdminHeaderContent>
      </AdminHeader>

      <AdminContent>
        <AdminTabs>
          <AdminTabsList>
            <AdminTab 
              active={activeTab === 'overview'} 
              onClick={() => handleTabChange('overview')}
            >
              Resumen
            </AdminTab>
            <AdminTab 
              active={activeTab === 'raffles'} 
              onClick={() => handleTabChange('raffles')}
            >
              Rifas
            </AdminTab>
            <AdminTab 
              active={activeTab === 'users'} 
              onClick={() => handleTabChange('users')}
            >
              Usuarios
            </AdminTab>
            <AdminTab 
              active={activeTab === 'tickets'} 
              onClick={() => handleTabChange('tickets')}
            >
              Tickets
            </AdminTab>
            <AdminTab 
              active={activeTab === 'winners'} 
              onClick={() => handleTabChange('winners')}
            >
              Ganadores
            </AdminTab>
          </AdminTabsList>

          {activeTab === 'overview' && (
            <div className="flex flex-col gap-4">
              <AdminGrid className="grid-cols-4">
                <AdminCard>
                  <AdminCardHeader title="Total Rifas">
                    <AdminCardTitle>
                      <Ticket size={16} />
                    </AdminCardTitle>
                  </AdminCardHeader>
                  <AdminCardContent>
                    <AdminStatValue>{stats?.raffles.total || 0}</AdminStatValue>
                    <AdminStatLabel>
                      {stats?.raffles.active || 0} activas, {stats?.raffles.finished || 0} finalizadas
                    </AdminStatLabel>
                  </AdminCardContent>
                </AdminCard>

                <AdminCard>
                  <AdminCardHeader title="Usuarios">
                    <AdminCardTitle>
                      <Users size={16} />
                    </AdminCardTitle>
                  </AdminCardHeader>
                  <AdminCardContent>
                    <AdminStatValue>{stats?.users.total || 0}</AdminStatValue>
                    <AdminStatLabel>Usuarios registrados</AdminStatLabel>
                  </AdminCardContent>
                </AdminCard>

                <AdminCard>
                  <AdminCardHeader title="Tickets Vendidos">
                    <AdminCardTitle>
                      <TrendUp size={16} />
                    </AdminCardTitle>
                  </AdminCardHeader>
                  <AdminCardContent>
                    <AdminStatValue>{stats?.tickets.totalSold || 0}</AdminStatValue>
                    <AdminStatLabel>Números vendidos</AdminStatLabel>
                  </AdminCardContent>
                </AdminCard>

                <AdminCard>
                  <AdminCardHeader title="Ingresos">
                    <AdminCardTitle>
                      <CurrencyCircleDollar size={16} />
                    </AdminCardTitle>
                  </AdminCardHeader>
                  <AdminCardContent>
                    <AdminStatValue>
                      ${stats?.revenue.total ? (stats.revenue.total / 100).toLocaleString() : 0}
                    </AdminStatValue>
                    <AdminStatLabel>Ingresos totales</AdminStatLabel>
                  </AdminCardContent>
                </AdminCard>
              </AdminGrid>

              <AdminGrid className="grid-cols-3">
                <AdminCard>
                  <AdminCardHeader title="Ganadores">
                    <AdminCardTitle>
                      <Trophy size={20} />
                    </AdminCardTitle>
                  </AdminCardHeader>
                  <AdminCardContent>
                    <AdminStatValue style={{ fontSize: '1.875rem' }}>{stats?.winners.total || 0}</AdminStatValue>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <div>
                        <p style={{ fontSize: '0.875rem', color: '#16a34a', margin: 0 }}>
                          {stats?.winners.claimed || 0} reclamados
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.875rem', color: '#ea580c', margin: 0 }}>
                          {stats?.winners.pending || 0} pendientes
                        </p>
                      </div>
                    </div>
                  </AdminCardContent>
                </AdminCard>

                <AdminCard>
                  <AdminCardHeader title="Valor Total de Premios">
                  </AdminCardHeader>
                  <AdminCardContent>
                    <AdminStatValue style={{ fontSize: '1.875rem' }}>
                      ${stats?.winners.totalPrizeValue ? (stats.winners.totalPrizeValue / 100).toLocaleString() : 0}
                    </AdminStatValue>
                    <AdminStatLabel>Valor total de premios</AdminStatLabel>
                  </AdminCardContent>
                </AdminCard>

                <AdminCard>
                  <AdminCardHeader title="Tasa de Reclamo">
                  </AdminCardHeader>
                  <AdminCardContent>
                    <AdminStatValue style={{ fontSize: '1.875rem' }}>
                      {stats?.winners.total ? 
                        Math.round((stats.winners.claimed / stats.winners.total) * 100) : 0}%
                    </AdminStatValue>
                    <AdminStatLabel>Premios reclamados</AdminStatLabel>
                  </AdminCardContent>
                </AdminCard>
              </AdminGrid>

              {almostFinishedRaffles && almostFinishedRaffles.length > 0 && (
                <AdminAlert>
                  <AdminAlertTitle>
                    <Warning size={20} />
                    Rifas por Finalizar
                  </AdminAlertTitle>
                  <AdminAlertDescription>
                    Estas rifas tienen pocos números disponibles y podrían finalizarse pronto
                  </AdminAlertDescription>
                  <AdminList>
                    {almostFinishedRaffles.slice(0, 3).map((raffle) => (
                      <AdminListItem key={raffle.id}>
                        <AdminListItemContent>
                          <AdminListItemTitle>{raffle.title}</AdminListItemTitle>
                          <AdminListItemSubtitle>por {raffle.profiles?.username}</AdminListItemSubtitle>
                        </AdminListItemContent>
                        <AdminListItemMeta>
                          <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#ea580c', margin: 0 }}>
                            {raffle.availableNumbers} números disponibles
                          </p>
                          <AdminBadge variant="warning">
                            {raffle.soldNumbers}/100 vendidos
                          </AdminBadge>
                        </AdminListItemMeta>
                      </AdminListItem>
                    ))}
                    {almostFinishedRaffles.length > 3 && (
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', margin: 0 }}>
                        Y {almostFinishedRaffles.length - 3} rifas más...
                      </p>
                    )}
                  </AdminList>
                </AdminAlert>
              )}

              <AdminGrid className="grid-cols-2">
                <AdminCard>
                  <AdminCardHeader title="Usuarios Recientes">
                    <AdminCardTitle>
                      <Users size={20} />
                    </AdminCardTitle>
                  </AdminCardHeader>
                  <AdminCardContent>
                    {isLoadingRecentUsers ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 0' }}>
                        <LoadingSpinner size="sm" />
                      </div>
                    ) : (
                      <AdminList>
                        {recentUsers?.map((user) => (
                          <AdminListItem key={user.id}>
                            <AdminListItemContent>
                              <AdminListItemTitle>{user.username}</AdminListItemTitle>
                              <AdminListItemSubtitle>{user.email}</AdminListItemSubtitle>
                            </AdminListItemContent>
                            <AdminListItemMeta>
                              <AdminListItemDate>
                                {new Date(user.created_at).toLocaleDateString()}
                              </AdminListItemDate>
                            </AdminListItemMeta>
                          </AdminListItem>
                        ))}
                      </AdminList>
                    )}
                  </AdminCardContent>
                </AdminCard>

                <AdminCard>
                  <AdminCardHeader title="Tickets Recientes">
                    <AdminCardTitle>
                      <Ticket size={20} />
                    </AdminCardTitle>
                  </AdminCardHeader>
                  <AdminCardContent>
                    {isLoadingRecentTickets ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 0' }}>
                        <LoadingSpinner size="sm" />
                      </div>
                    ) : (
                      <AdminList>
                        {recentTickets?.map((ticket) => (
                          <AdminListItem key={ticket.id}>
                            <AdminListItemContent>
                              <AdminListItemTitle>Número {ticket.number}</AdminListItemTitle>
                              <AdminListItemSubtitle>
                                {ticket.raffles?.title} - {ticket.profiles?.username}
                              </AdminListItemSubtitle>
                            </AdminListItemContent>
                            <AdminListItemMeta>
                              <AdminListItemDate>
                                Ticket #{ticket.id}
                              </AdminListItemDate>
                            </AdminListItemMeta>
                          </AdminListItem>
                        ))}
                      </AdminList>
                    )}
                  </AdminCardContent>
                </AdminCard>
              </AdminGrid>
            </div>
          )}

          {activeTab === 'raffles' && <RafflesTable />}
          {activeTab === 'users' && <UsersTable />}
          {activeTab === 'tickets' && <TicketsTable />}
          {activeTab === 'winners' && <WinnersTable />}
        </AdminTabs>
      </AdminContent>

      {showCreateUserModal && (
        <CreateUserModal
          isOpen={showCreateUserModal}
          onClose={() => setShowCreateUserModal(false)}
        />
      )}
    </AdminContainer>
  )
}
