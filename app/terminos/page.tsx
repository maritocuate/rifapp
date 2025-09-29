'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography, Container, Card, CardContent, Divider } from '@mui/material'

const PageContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  padding: '2rem 1rem',
  color: 'white',
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: '1rem',
}))

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  textAlign: 'center',
  marginBottom: '3rem',
  lineHeight: 1.6,
}))

const TermsCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 215, 0, 0.2)',
  borderRadius: '15px',
  color: 'white',
  marginBottom: '2rem',
}))

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: '2rem',
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: '1rem',
  color: 'white',
  marginTop: '2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  '&:first-of-type': {
    marginTop: 0,
  },
}))

const SectionText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  lineHeight: 1.7,
  marginBottom: '1.5rem',
}))

const ListItem = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  lineHeight: 1.7,
  marginBottom: '0.8rem',
  paddingLeft: '1rem',
  position: 'relative',
}))

const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: 'rgba(255, 215, 0, 0.2)',
  margin: '2rem 0',
}))

const HighlightBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  borderRadius: '10px',
  padding: '1.5rem',
  margin: '1.5rem 0',
}))

const HighlightText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  textAlign: 'center',
}))

export default function TerminosPage() {
  return (
    <PageContainer maxWidth="lg">
      <Title>
        Términos y Condiciones
      </Title>
      
      <Subtitle>
        Por favor, lee cuidadosamente estos términos antes de crear tu sorteo.
      </Subtitle>

      <TermsCard>
        <CardContentStyled>
          <SectionTitle>1. Organización</SectionTitle>
          <SectionText>
            La presente rifa (en adelante, la &quot;Rifa&quot;) es organizada por el usuario registrado en la plataforma 
            que crea la rifa, en adelante el &quot;Organizador&quot;. La plataforma actúa únicamente como intermediario 
            para facilitar la organización y gestión de la rifa.
          </SectionText>

          <SectionTitle>2. Participación</SectionTitle>
          <SectionText>
            Podrán participar de la Rifa todas aquellas personas físicas mayores de 18 años que adquieran 
            uno o más números del 01 al 100 (inclusive), hasta agotar la totalidad de los mismos. 
            La adquisición de un número implica la aceptación plena y sin reservas de las presentes 
            Bases y Condiciones.
          </SectionText>

          <SectionTitle>3. Determinación del número ganador</SectionTitle>
          <SectionText>
            El número ganador de la Rifa se determinará en base al resultado oficial de la Quiniela 
            de la Ciudad de Buenos Aires (Lotería de la Ciudad), sorteo nocturno del día inmediato 
            siguiente a la venta del último número correspondiente a la Rifa.
          </SectionText>

          <SectionTitle>4. Método de cálculo</SectionTitle>
          <SectionText>
            Se tomará como referencia el número premiado en primer lugar (primer premio) del sorteo 
            nocturno mencionado.
          </SectionText>
          <ListItem>
            A los efectos de determinar el número ganador de la Rifa, se considerarán los últimos 
            dos (2) dígitos de dicho número.
          </ListItem>
          <ListItem>
            En caso de que el resultado de los dos últimos dígitos sea &quot;00&quot;, se asignará al número 
            ganador de la Rifa el valor &quot;100&quot;.
          </ListItem>

          <SectionTitle>5. Publicidad y verificación del resultado</SectionTitle>
          <SectionText>
            Los resultados del sorteo podrán ser verificados públicamente en el sitio oficial de 
            Lotería de la Ciudad: https://quiniela.loteriadelaciudad.gob.ar/
          </SectionText>

          <SectionTitle>6. Premio</SectionTitle>
          <SectionText>
            El participante cuyo número coincida con el determinado según lo dispuesto en los apartados 
            precedentes será considerado ganador de la Rifa y hará acreedor del premio detallado en la 
            descripción de la misma. El premio no podrá ser canjeado por dinero ni por otros bienes 
            o servicios, salvo disposición expresa del Organizador.
          </SectionText>

          <SectionTitle>7. Notificación y entrega del premio</SectionTitle>
          <SectionText>
            El Organizador notificará al ganador mediante email una vez que se conozcan los resultados 
            oficiales de la Quiniela de la Ciudad de Buenos Aires. La entrega del premio se coordinará 
            directamente con el ganador. <strong>Es importante aclarar que los gastos de envío y entrega del premio 
            corren por cuenta del ganador</strong>, salvo que el Organizador disponga lo contrario. En caso de no poder 
            ser contactado dentro de los 30 días hábiles siguientes a la fecha del sorteo, el premio podrá 
            ser declarado vacante o redistribuido conforme determine el Organizador.
          </SectionText>
          <SectionText>
            <strong>Transferencia de recaudación:</strong> La recaudación total de la rifa será transferida 
            al Organizador únicamente después de que se haya confirmado la entrega del premio al ganador 
            o se presenten pruebas fehacientes (video o fotografías) que demuestren la entrega efectiva 
            del premio. Esta medida garantiza la transparencia y el cumplimiento de las obligaciones del 
            Organizador.
          </SectionText>

          <SectionTitle>8. Responsabilidades</SectionTitle>
          <SectionText>
            El Organizador no será responsable por fallas técnicas, errores humanos o circunstancias 
            de fuerza mayor que pudieran afectar el normal desarrollo de la Rifa. La plataforma no se 
            hace responsable por disputas entre organizadores y participantes, ni por la entrega efectiva 
            de los premios.
          </SectionText>

          <SectionTitle>9. Aceptación</SectionTitle>
          <SectionText>
            La participación en la Rifa implica el conocimiento y aceptación total de las presentes 
            Bases y Condiciones, las cuales se encuentran a disposición de los participantes en esta 
            plataforma.
          </SectionText>

          <StyledDivider />

          <HighlightBox>
            <HighlightText>
              ⚠️ IMPORTANTE: Al registrarte en la plataforma, confirmas que has leído, 
              entendido y aceptado todos estos términos y condiciones.
            </HighlightText>
          </HighlightBox>

          <SectionText>
            Si tienes alguna pregunta sobre estos términos, puedes contactarnos por email a <a href="mailto:info@riffita.com">info@riffita.com</a>.
          </SectionText>
        </CardContentStyled>
      </TermsCard>
    </PageContainer>
  )
}
