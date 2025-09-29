'use client'

import { RafflesList } from '../RafflesList'
import { styled } from '@mui/material/styles'
import { Box, Container } from '@mui/material'

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: '1200px',
  textAlign: 'center',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 0',
}))

const ListsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '3rem',
  marginTop: '2rem',
  width: '100%',
  maxWidth: '1200px',
  
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: '2rem',
  },
}))

export function RafflesSection() {
  return (
    <ContentWrapper maxWidth="lg">
      <ListsContainer>
        <RafflesList 
          type="recent" 
          title="Últimas Rifas Creadas" 
        />
        <RafflesList 
          type="almostFinished" 
          title="Por Finalizar" 
        />
      </ListsContainer>
    </ContentWrapper>
  )
}
