// DEPENDENCY
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-inline: 2em;
  padding-block: 2.5em;

  & > img {
    width: 3rem;
    aspect-ratio: 1;
  }

  & > nav {
    display: flex;
    gap: 0.5rem;

    & > a {
      color: ${(props) => props.theme.colors.gray[100]};

      width: 3rem;
      aspect-ratio: 1;
      display: grid;
      place-items: center;

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      transition: border 150ms;

      &:is(:hover) {
        border-bottom-color: ${(props) => props.theme.colors.yellow[400]};
      }

      &.active {
        color: ${(props) => props.theme.colors.yellow[400]};
      }
    }
  }
`
