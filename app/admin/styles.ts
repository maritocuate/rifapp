import { styled } from '@mui/material/styles'
import { Box, Typography, Button, Card, CardContent, CardHeader } from '@mui/material'

export const AdminContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f9fafb',
  fontFamily: 'var(--font-inter), sans-serif',
}))

export const AdminHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e5e7eb',
  position: 'relative',
  zIndex: 10,
}))

export const AdminHeaderContent = styled(Box)(({ theme }) => ({
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 1rem',
  
  [theme.breakpoints.up('sm')]: {
    padding: '0 1.5rem',
  },
  
  [theme.breakpoints.up('lg')]: {
    padding: '0 2rem',
  },
}))

export const AdminHeaderInner = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem 0',
}))

export const AdminTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.875rem',
  fontWeight: 700,
  color: '#111827',
  margin: 0,
}))

export const AdminSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#6b7280',
  marginTop: '0.25rem',
}))

export const AdminButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '0.75rem',
  position: 'relative',
  zIndex: 10,
}))

export const AdminButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  textTransform: 'none',
  fontWeight: 500,
}))

export const AdminContent = styled(Box)(({ theme }) => ({
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '2rem 1rem',
  
  [theme.breakpoints.up('sm')]: {
    padding: '2rem 1.5rem',
  },
  
  [theme.breakpoints.up('lg')]: {
    padding: '2rem 2rem',
  },
}))

export const AdminTabs = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
}))

export const AdminTabsList = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  width: '100%',
  position: 'relative',
  zIndex: 10,
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
  padding: '0.25rem',
  marginBottom: '1.5rem',
}))

export const AdminTab = styled(Button)<{ active?: boolean }>(({ active }) => ({
  position: 'relative',
  zIndex: 10,
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.875rem',
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
  backgroundColor: active ? '#3b82f6' : 'transparent',
  color: active ? '#ffffff' : '#6b7280',
  '&:hover': {
    backgroundColor: active ? '#2563eb' : '#f3f4f6',
    color: active ? '#ffffff' : '#374151',
  },
}))

export const AdminCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
}))

export const AdminCardHeader = styled(CardHeader)(({ theme }) => ({
  padding: '1.5rem 1.5rem 0.5rem 1.5rem',
  '& .MuiCardHeader-title': {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#6b7280',
  },
}))

export const AdminCardTitle = styled(Typography)(() => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#6b7280',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

export const AdminCardContent = styled(CardContent)(({ theme }) => ({
  padding: '0 1.5rem 1.5rem 1.5rem',
}))

export const AdminStatValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#111827',
  margin: 0,
}))

export const AdminStatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: '#6b7280',
  marginTop: '0.25rem',
}))

export const AdminGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: '1.5rem',
  
  '&.grid-cols-1': {
    gridTemplateColumns: '1fr',
  },
  
  '&.grid-cols-2': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  
  '&.grid-cols-3': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
    },
  },
  
  '&.grid-cols-4': {
    gridTemplateColumns: 'repeat(4, 1fr)',
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
}))

export const AdminAlert = styled(Box)(({ theme }) => ({
  backgroundColor: '#fef3c7',
  border: '1px solid #f59e0b',
  borderRadius: '0.5rem',
  padding: '1rem',
  marginBottom: '1.5rem',
}))

export const AdminAlertTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  color: '#92400e',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem',
}))

export const AdminAlertDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: '#92400e',
}))

export const AdminList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
}))

export const AdminListItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.75rem',
  backgroundColor: '#ffffff',
  borderRadius: '0.5rem',
  border: '1px solid #e5e7eb',
}))

export const AdminListItemContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}))

export const AdminListItemTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#111827',
  margin: 0,
}))

export const AdminListItemSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: '#6b7280',
  margin: 0,
}))

export const AdminListItemMeta = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  textAlign: 'right',
}))

export const AdminListItemDate = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: '#6b7280',
  margin: 0,
}))

export const AdminBadge = styled(Box)<{ variant?: 'default' | 'success' | 'warning' | 'danger' }>(({ variant = 'default' }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.375rem',
  fontSize: '0.75rem',
  fontWeight: 500,
  ...(variant === 'success' && {
    backgroundColor: '#dcfce7',
    color: '#166534',
    border: '1px solid #bbf7d0',
  }),
  ...(variant === 'warning' && {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    border: '1px solid #fde68a',
  }),
  ...(variant === 'danger' && {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fecaca',
  }),
  ...(variant === 'default' && {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
  }),
}))
