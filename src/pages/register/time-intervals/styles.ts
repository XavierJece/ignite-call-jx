import { Box, styled } from '@ignite-ui/react'

export const IntervalBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const IntervalsContainer = styled('div', {
  border: '1px solid $gray600',
  borderRadius: '$md',
  marginBottom: '$4',
})

export const IntervalItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$2',

  padding: '$3 $4',

  '& + &': {
    borderTop: '1px solid $gray600',
  },
})

export const IntervalDay = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const IntervalHours = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  'input::-webkit-calendar-picker-indicator': {
    filter: 'invert(100%)  brightness(60%)',
  },
})