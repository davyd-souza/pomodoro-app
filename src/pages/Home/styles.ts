import styled from 'styled-components'

export const HomeContainer = styled.main`
  min-width: min(50em, 100%);
  margin-inline: auto;
  padding-inline: 1rem;

  display: grid;
  gap: 3rem;
`

export const FormContainer = styled.form`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-weight: 700;
  color: ${(props) => props.theme.colors.gray[100]};

  & > input[type='text'] {
    flex: 1;
  }

  & > input[type='number'] {
    width: 4em;
  }
`

export const InputStyled = styled.input`
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray[500]};

  padding-block: 0.25em;

  color: ${(props) => props.theme.colors.gray[100]};

  transition: border 150ms;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray[500]};
  }

  &:is(:focus-visible) {
    box-shadow: none;
    border-bottom-color: ${(props) => props.theme.colors.yellow[400]};
  }
`

export const CountdownContainer = styled.section`
  margin-inline: auto;

  display: inline-flex;
  align-items: center;
  gap: 0.1em;

  font-family: ${(props) => props.theme.fontFamily.mono};
  font-size: clamp(4rem, 15vw, 14.5rem);
  line-height: 1;

  & > span {
    background-color: ${(props) => props.theme.colors.gray[700]};
    padding-block: 0.2em;
    padding-inline: 0.1em;

    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding-inline: 0;
  padding-block: 0.2em;

  color: ${(props) => props.theme.colors.yellow[400]};
`

export const ButtonStyled = styled.button`
  all: unset;

  background-color: ${(props) => props.theme.colors.yellow[400]};
  border-radius: 8px;

  color: ${(props) => props.theme.colors.gray[800]};
  font-weight: 700;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  padding: 1rem;

  cursor: pointer;

  &:not(:disabled):is(:hover, :focus-visible) {
    background-color: ${(props) => props.theme.colors.yellow[200]};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
