import * as React from 'react'

import './Menu.css'

import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import { MenuList, MenuItem as MuiMenuItem } from 'material-ui/Menu'
import { ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'

import items from './items'

import MenuItem from './MenuItem'

// TYPES _______________________________________________________________________

interface IMenuProps {
  menuOpen: boolean,
}

interface IMenuStyle {
  classes: {
    nav: string,
  }
}

type IMenuStyled = IMenuProps & IMenuStyle

const Menu = ({ menuOpen, classes, }: IMenuStyled) => (
  <Paper component="nav" className={`${classes.nav} ${menuOpen ? 'nav--open' : ''}`}>
    <MenuList>
      <MenuItem type="primary" key={0} item={items.inicio} />
      <Divider />
      <MuiMenuItem>
        <ListItemText primary="Listado de Subscripciones" />
      </MuiMenuItem>
      {
        items.listados.map((item, key) => <MenuItem type="secondary" key={key} item={item} />)
      }
      <Divider />
      {
        items.subscripcion.map((item, key) => <MenuItem type="primary" key={key} item={item} />)
      }
    </MenuList>
  </Paper>
)


// STYLES ______________________________________________________________________

// Done to prevent type widening in decorate
const position: 'fixed' = 'fixed'

const decorate = withStyles(({ }) => ({
  nav: {
    position,
    top: 0,
    zIndex: 5,
    minHeight: '100vh',
    paddingTop: '64px',
    minWidth: '288px',
    transform: 'translateX(-500px)',
    transition: '.5s transform',
  },
}))

export default decorate<IMenuProps>(Menu)
