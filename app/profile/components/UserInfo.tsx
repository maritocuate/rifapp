'use client'

import { UserIcon, EnvelopeIcon } from '@phosphor-icons/react'
import { styled } from '@mui/material/styles'

// Styled components
const Container = styled('div')({
  marginBottom: '1.5rem'
})

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
})

const Avatar = styled('div')({
  height: '4rem',
  width: '4rem',
  borderRadius: '50%',
  background: 'linear-gradient(to bottom right, #facc15, #eab308)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '1.25rem',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
})

const InfoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: '#d1d5db',
  fontSize: '0.875rem'
})

const Username = styled('h2')({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '#facc15',
  fontFamily: 'monospace',
  marginBottom: '0.25rem'
})

interface UserInfoProps {
  email: string
  username?: string
}

export function UserInfo({ email, username }: UserInfoProps) {
  const getUserInitials = (email: string) => {
    return email
      .split('@')[0]
      .split('.')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  return (
    <Container>
      <FlexContainer>
        <Avatar>
          {getUserInitials(email)}
        </Avatar>
        <div>
          <InfoContainer>
            <UserIcon className="h-4 w-4 mr-2" />
            <Username>
              {username || email.split('@')[0]}
            </Username>
          </InfoContainer>
          <InfoContainer>
            <EnvelopeIcon className="h-4 w-4 mr-2" />
            {email}
          </InfoContainer>
        </div>
      </FlexContainer>
    </Container>
  )
}
