// DEPENDENCY
import styled from 'styled-components'

export const FormContainer = styled.section`
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
