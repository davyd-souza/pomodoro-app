// DEPENDENCY
import styled from 'styled-components'

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
