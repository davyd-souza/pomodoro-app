// DEPENDENCY
import { NavLink } from 'react-router-dom'

// STYLE
import { HeaderContainer } from './styles'
import { Scroll, Timer } from 'phosphor-react'

// ASSET
import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
