// DEPENDENCY
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

// STYLE
import { FormContainer, InputStyled } from './styles'

// CONTEXT
import { CountdownContext } from '../../../../contexts/CountdownContext'

export function NewCountdownForm() {
  const { activeCountdown } = useContext(CountdownContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">I&apos;m going to work on</label>
      <InputStyled
        type="text"
        id="task"
        placeholder="Give your task a name"
        autoComplete="on"
        disabled={!!activeCountdown}
        {...register('task')}
      />

      <label htmlFor="minutesAmount">for</label>
      <InputStyled
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        max={60}
        min={5}
        disabled={!!activeCountdown}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
