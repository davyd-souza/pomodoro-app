// STYLE
import {
  ButtonStyled,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  InputStyled,
  Separator,
} from './styles'
import { Play } from 'phosphor-react'

export function Home() {
  return (
    <HomeContainer>
      <FormContainer id="timer">
        <label htmlFor="task">I&apos;m going to work on</label>
        <InputStyled
          type="text"
          id="task"
          placeholder="Give your task a name"
          autoComplete="on"
        />

        <label htmlFor="minutesAmount">for</label>
        <InputStyled
          type="number"
          id="minutesAmount"
          placeholder="00"
          step={5}
          max={60}
          min={5}
        />

        <span>minutes.</span>
      </FormContainer>

      <CountdownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountdownContainer>

      <ButtonStyled form="timer" type="submit">
        Start
        <Play size={24} weight="bold" />
      </ButtonStyled>
    </HomeContainer>
  )
}
