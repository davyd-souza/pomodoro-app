import styled from 'styled-components'

export const HomeContainer = styled.main`
  min-width: min(50em, 100%);
  margin-inline: auto;
  padding-inline: 1rem;

  display: grid;
  gap: 3rem;
`

const BaseButton = styled.button`
  all: unset;
  border-radius: 8px;

  font-weight: 700;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  padding: 1rem;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartButton = styled(BaseButton)`
  color: ${(props) => props.theme.colors.gray[800]};
  background-color: ${(props) => props.theme.colors.yellow[400]};

  &:not(:disabled):is(:hover, :focus-visible) {
    background-color: ${(props) => props.theme.colors.yellow[200]};
  }
`

export const InterruptButton = styled(BaseButton)`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.red[500]};

  &:not(:disabled):is(:hover, :focus-visible) {
    background-color: ${(props) => props.theme.colors.red[700]};
  }
`
