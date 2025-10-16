export interface NumberBoardStepProps {
  raffleAlias: string
}

export interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export interface ContentWrapperProps {
  children: React.ReactNode
  maxWidth?: string
}

export interface LogoContainerProps {
  children: React.ReactNode
}

export interface GridSectionProps {
  children: React.ReactNode
}

export interface RaffleInfoProps {
  numberCost: number
  username: string
  availableNumbers: number
  title?: string
  description?: string
  url?: string
}
