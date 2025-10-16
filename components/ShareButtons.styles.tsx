import styled from '@emotion/styled'

export const ShareContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`

export const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  width: 48px;
  height: 48px;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    padding: 10px;
  }
`

export const ShareIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ShareText = styled.span`
  font-weight: 600;
`