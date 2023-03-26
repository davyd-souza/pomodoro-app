// DEPENDENCY
import 'styled-components'

// STYLE
import { defaultTheme } from '../styles/themes/default'

// Create a type with the values of defaultTheme
type ThemeType = typeof defaultTheme

// Create a type to module styled-component
// Making everytime that I import styled-components it inherits the type i'm defining here
// Because I'm overwriting I need to import styled-component. If not I would be creating from scratch
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
