import * as React from 'react'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu, { MenuItem } from 'material-ui/Menu'
import AppMenu from './components/Menu'

// TYPES _______________________________________________________________________

interface ITopNavStyles {
  classes: {
    title: string,
    container: string,
  }
}

type ITopNavStyled = ITopNavStyles

interface ITopNavState {
  menuOpen: boolean,
  anchorEl: HTMLButtonElement | undefined,
}


// COMPONENT ___________________________________________________________________

class TopNav extends React.Component<ITopNavStyled, ITopNavState> {
  public constructor(props: ITopNavStyled) {
    super(props)

    this.state = {
      menuOpen: false,
      anchorEl: undefined,
    }

    this.closeMenu = this.closeMenu.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
    this.handleToggleMenu = this.handleToggleMenu.bind(this)
  }

  public componentDidMount() {
    this.closeMenu()
  }

  public render() {
    const { anchorEl, } = this.state
    const open = Boolean(anchorEl)

    const { classes, } = this.props

    return (
      <React.Fragment>
        <AppBar position="fixed" className={`no-print ${classes.container}`}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={this.handleToggleMenu}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="title" color="inherit" component="span">
              XII Simposio
            </Typography>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Salir</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <AppMenu menuOpen={this.state.menuOpen} />
      </React.Fragment>
    )
  }

  private handleMenu(event: React.MouseEvent<HTMLButtonElement>) {
    this.setState(Object.assign({}, this.state, {
      anchorEl: event.currentTarget,
    }))
  }

  private handleClose() {
    this.setState(Object.assign({}, this.state, {
      anchorEl: undefined,
    }))
  }

  private closeMenu() {
    this.setState(Object.assign({}, this.state, {
      menuOpen: false,
    }))
  }

  private openMenu() {
    this.setState(Object.assign({}, this.state, {
      menuOpen: true,
    }))
  }

  private handleToggleMenu() {
    const { menuOpen, } = this.state
    if (menuOpen) {
      this.closeMenu()
    } else {
      this.openMenu()
    }
  }
}


// STYLES ______________________________________________________________________

const decorate = withStyles(({ }) => ({
  title: {
    flexGrow: 1,
  },
  container: {
    zIndex: 10,
  },
}))

export default decorate<{}>(TopNav)
