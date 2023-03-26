// STYLE
import { Play } from 'phosphor-react'

export function Home() {
  return (
    <main>
      <form id="timer">
        <label htmlFor="task">I&apos;m going to work on</label>
        <input
          type="text"
          id="task"
          placeholder="Give your task a name"
          autoComplete="on"
        />

        <label htmlFor="minutesAmount">for</label>
        <input
          type="number"
          id="minutesAmount"
          placeholder="00"
          step={5}
          max={60}
          min={5}
        />

        <span>minutes.</span>
      </form>

      <section>
        <span>0</span>
        <span>0</span>
        <span>:</span>
        <span>0</span>
        <span>0</span>
      </section>

      <button form="timer" type="submit">
        Start
        <Play size={24} weight="bold" />
      </button>
    </main>
  )
}
