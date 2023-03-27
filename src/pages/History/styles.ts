// DEPENDENCY
import styled from 'styled-components'

export const HistoryContainer = styled.main`
  min-width: min(60em, 100%);
  margin-inline: auto;
  padding-inline: 1rem;
  padding-block-end: 2rem;

  display: grid;
  gap: 2rem;

  & > h2 {
    font-size: 1.5rem;
    font-weight: 700;
  }
`

export const HistoryList = styled.section`
  overflow: auto;
`

export const TableBase = styled.table`
  width: 100%;
  min-width: 40em;
  border-collapse: collapse;
  font-size: 0.875rem;
  text-align: left;

  th {
    background-color: ${(props) => props.theme.colors.gray[600]};
    padding: 1rem;

    font-weight: 700;

    &:first-child {
      border-top-left-radius: 8px;
      padding-inline-start: 1.5rem;
    }

    &:last-child {
      border-top-right-radius: 8px;
      padding-inline-end: 1.5rem;
    }
  }

  td {
    background-color: ${(props) => props.theme.colors.gray[700]};
    border-top: 2px solid ${(props) => props.theme.colors.gray[800]};
    padding: 1em;

    &:first-child {
      width: 50%;
      padding-inline-start: 1.5rem;
    }

    &:last-child {
      padding-inline-end: 1.5rem;
    }
  }
`

const STATUS_COLORS = {
  finished: 'green',
  progress: 'amber',
  stopped: 'red',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    height: 0.5rem;
    aspect-ratio: 1;

    border-radius: 100vmax;
    background-color: ${(props) =>
      props.theme.colors[STATUS_COLORS[props.statusColor]][500]};
  }
`
