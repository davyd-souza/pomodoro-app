// DEPENDENCY
import dayjs from 'dayjs'
import { useContext, useEffect } from 'react'

// STYLE
import { CountdownContainer, Separator } from './styles'

// CONTEXT
import { CountdownContext } from '../..'

export function Countdown() {
  const {
    activeCountdown,
    markCurrentCountdownAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CountdownContext)

  // Get total of seconds typed user set
  const totalSeconds = activeCountdown ? activeCountdown.minutesAmount * 60 : 0

  // Amount of seconds passed after countdown is created
  const currentSeconds = activeCountdown
    ? totalSeconds - amountSecondsPassed
    : 0

  // Get amount of minutes and seconds left
  const minutesLeft = Math.floor(currentSeconds / 60)
  const secondsLeft = currentSeconds % 60

  // Get amount of minutes and seconds left but with a 0 at the start if it doens't have one
  const minutes = String(minutesLeft).padStart(2, '0')
  const seconds = String(secondsLeft).padStart(2, '0')

  // Run countdown
  useEffect(() => {
    let intervalId: number

    if (activeCountdown) {
      intervalId = setInterval(() => {
        const differenceInSeconds = dayjs(new Date()).diff(
          activeCountdown.startDate,
          'seconds',
        )

        if (differenceInSeconds >= totalSeconds) {
          markCurrentCountdownAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(intervalId)
        } else {
          setSecondsPassed(differenceInSeconds)
        }
      }, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [
    activeCountdown,
    totalSeconds,
    markCurrentCountdownAsFinished,
    setSecondsPassed,
  ])

  // update page title with timer
  useEffect(() => {
    if (activeCountdown) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Pomodoro'
    }
  }, [minutes, seconds, activeCountdown])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
