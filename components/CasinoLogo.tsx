'use client';

import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '2rem',
  position: 'relative',
}));

const LogoFrame = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffd700 0%, #ffed4e 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
  borderRadius: '50%',
  padding: '3px',
  animation: 'glow 2s ease-in-out infinite alternate',
}));

const LogoInner = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, #2d1b69, #1a0033)',
  borderRadius: '50%',
  width: '120px',
  height: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 700,
  fontSize: '2rem',
  background: 'linear-gradient(145deg, #ffd700, #ffed4e)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  lineHeight: 1.2,
  textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
}));

const CasinoLogo: React.FC = () => {
  return (
    <LogoContainer>
      <LogoFrame>
        <LogoInner>
          <LogoText>
            LUCKY
            <br />
            777
          </LogoText>
        </LogoInner>
      </LogoFrame>
    </LogoContainer>
  );
};

export default CasinoLogo;