// DEPENDENCY
import { Outlet } from 'react-router-dom'

// COMPONENT
import { Header } from '../components/Header'

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
