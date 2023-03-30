// COMPONENT
import { Router } from './Router'

// STYLE
import { GlobalStyle } from './styles/global'

// CONTEXT
import { CountdownContextProvider } from './contexts/CountdownContext'

export function App() {
  return (
    <CountdownContextProvider>
      <Router />
      <GlobalStyle />
    </CountdownContextProvider>
  )
}
