import { Box, styled } from '@ignite-ui/react'

export const IntervalBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  '@media(max-width: 390px)': {
    padding: '$6 0',

    '> button, > p': {
      margin: '0 $6',
    },
  },
})

export const IntervalsContainer = styled('div', {
  border: '1px solid $gray600',
  borderRadius: '$md',
  marginBottom: '$4',

  '@media(max-width: 390px)': {
    border: '0',
    borderTop: '1px solid $gray600',
    borderBottom: '1px solid $gray600',
  },
})

export const IntervalItem = styled('div', {
  '> div': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '$2',
    width: '100%',
  },

  minHeight: '95px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  justifyContent: 'stretch',
  alignContent: 'start',
  gap: '$2',

  padding: '$3 $4',

  '& + &': {
    borderTop: '1px solid $gray600',
  },

  '@media(max-width: 600px)': {
    '> div': {
      flexDirection: 'column',
      gap: '$3',
    },

    alignItems: 'center',
    minHeight: '134px',
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
