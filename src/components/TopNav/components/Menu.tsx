import * as React from 'react'

import './Menu.css'

import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import { MenuList, MenuItem as MuiMenuItem } from 'material-ui/Menu'
import { ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'

import * as Router from 'react-router'

import { push } from '../../../lib/router'

import items from './items'

import MenuItem from './MenuItem'

// TYPES _______________________________________________________________________

interface IMenuProps {
  menuOpen: boolean,
}

type MenuProps = IMenuProps & Router.RouteComponentProps<IMenuProps>

interface IMenuStyle {
  classes: {
    nav: string,
  }
}

type IMenuStyled = MenuProps & IMenuStyle

const Menu = ({ menuOpen, classes, history }: IMenuStyled) => (
  <Paper component="nav" className={`${classes.nav} ${menuOpen ? 'nav--open' : ''}`}>
    <MenuList>
      <MenuItem type="primary" key={0} item={items.inicio} onClick={push('/', history)} />
      <Divider />
      <MuiMenuItem>
        <ListItemText primary="Listado de Subscripciones" />
      </MuiMenuItem>
      {
        items.listados.map(
          (item, key) =>
            <MenuItem type="secondary" key={key} item={item} onClick={push(item.href, history)} />
        )
      }
      <Divider />
      {
        items.subscripcion.map(
          (item, key) => <MenuItem type="primary" key={key} item={item} onClick={push(item.href, history)} />
        )
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

export default Router.withRouter<MenuProps>(decorate<MenuProps>(Menu))
