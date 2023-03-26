// DEPENDENCY
import { Outlet } from 'react-router-dom'

// COMPONENT
import { Header } from '../components/Header'

// STYLES
import { LayoutContainer } from './styles'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}
