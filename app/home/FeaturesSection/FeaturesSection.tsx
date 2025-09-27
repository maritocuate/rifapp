'use client'

import { Plus, Share2, DollarSign } from 'lucide-react'
import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

const FeaturesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '4rem',
  marginTop: '2rem',
  marginBottom: '2rem',
  
  [theme.breakpoints.down('md')]: {
    gap: '1.5rem',
    alignItems: 'center',
    marginTop: '0',
    marginBottom: '0',
  },
}))

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'rgba(255, 215, 0, 0.05)',
  },
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
  },
}))

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}))

const FeatureText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: '#ffffff',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
    textAlign: 'center',
  },
}))

export function FeaturesSection() {
  return (
    <FeaturesContainer>
      <FeatureItem>
        <FeatureIcon>
          <Plus className="h-5 w-5 text-yellow-400" />
        </FeatureIcon>
        <FeatureText>Crea</FeatureText>
      </FeatureItem>
      
      <FeatureItem>
        <FeatureIcon>
          <Share2 className="h-5 w-5 text-yellow-400" />
        </FeatureIcon>
        <FeatureText>Comparte</FeatureText>
      </FeatureItem>
      
      <FeatureItem>
        <FeatureIcon>
          <DollarSign className="h-5 w-5 text-yellow-400" />
        </FeatureIcon>
        <FeatureText>Cobra!</FeatureText>
      </FeatureItem>
    </FeaturesContainer>
  )
}
