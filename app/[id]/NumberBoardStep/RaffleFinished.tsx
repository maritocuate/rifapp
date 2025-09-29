'use client'

import { RaffleFinishedContainer, FinishedMessage, FinishedIcon, WinnerInfo, WinnerNumber, WinnerUsername } from './styles'

interface RaffleFinishedProps {
  winner?: {
    winner_username: string
    winning_number: number
  } | null
}

export function RaffleFinished({ winner }: RaffleFinishedProps) {
  return (
    <RaffleFinishedContainer>
      {winner ? (
        <>
          <FinishedIcon>🎉</FinishedIcon>
          <FinishedMessage>
            ¡La rifa ha terminado! El ganador es...
          </FinishedMessage>
          <WinnerInfo>
            <WinnerNumber>{winner.winning_number}</WinnerNumber>
            <WinnerUsername>{winner.winner_username}</WinnerUsername>
          </WinnerInfo>
        </>
      ) : (
        <>
          <FinishedIcon>🏁</FinishedIcon>
          <FinishedMessage>
            ¡La rifa ha terminado! Pronto se anunciará el ganador.
          </FinishedMessage>
        </>
      )}
    </RaffleFinishedContainer>
  )
}
