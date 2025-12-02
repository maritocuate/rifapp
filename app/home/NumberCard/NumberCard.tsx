import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"

interface NumberCardProps {
  value: number | string
  position?: { top?: number | string; left?: number | string; right?: number | string; bottom?: number | string }
  scale?: number
  rotation?: number
}

const StyledNumberCard = styled(Box)<{
  $top?: number | string
  $left?: number | string
  $right?: number | string
  $bottom?: number | string
  $scale?: number
  $rotation?: number
}>(({ theme, $top, $left, $right, $bottom, $scale, $rotation }) => {
  const transforms: string[] = []
  if ($scale !== undefined) {
    transforms.push(`scale(${$scale})`)
  }
  if ($rotation !== undefined) {
    transforms.push(`rotate(${$rotation}deg)`)
  }
  const transform = transforms.length > 0 ? transforms.join(' ') : undefined

  return {
    position: 'absolute',
    ...($top !== undefined && { top: typeof $top === 'number' ? `${$top}px` : $top }),
    ...($left !== undefined && { left: typeof $left === 'number' ? `${$left}px` : $left }),
    ...($right !== undefined && { right: typeof $right === 'number' ? `${$right}px` : $right }),
    ...($bottom !== undefined && { bottom: typeof $bottom === 'number' ? `${$bottom}px` : $bottom }),
    padding: '2rem',
    fontSize: '2.5rem',
    height: '100px',
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '700',
    color: 'rgba(255, 238, 1, 0.9)',
    textShadow: '0 0 5px rgba(153, 153, 153, 0.5)',
    textAlign: 'center',
    background: 'rgb(30, 15, 82)',
    border: '3px solid rgba(102, 102, 102, 0.5)',
    borderRadius: '15px',
    boxShadow: '6px 6px 7px rgb(0 0 0 / 30%)',
    opacity: 0.9,
    cursor: 'default',
    userSelect: 'none',
    ...(transform && { transform }),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }
})

export function NumberCard({ value, position, scale, rotation }: NumberCardProps) {
  return (
    <StyledNumberCard
      $top={position?.top}
      $left={position?.left}
      $right={position?.right}
      $bottom={position?.bottom}
      $scale={scale}
      $rotation={rotation}
    >
      {value}
    </StyledNumberCard>
  )
}