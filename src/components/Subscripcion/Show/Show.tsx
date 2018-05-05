import * as React from 'react'

import * as Subscripcion from '../../../entities/Subscripcion'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'

import Delete from '@material-ui/icons/Delete'

// LISTS 
import Personales from './components/Personales'
import Contacto from './components/Contacto'
import Pago from './components/Pago'
import Ponencia from './components/Ponencia'

import WarningDialog from './components/WarningDialog'

export interface IActions {
  confirm: (s: Subscripcion.ISubscripcion, conf: boolean) => Promise<void>,
  delete: (doc: number) => Promise<void>,
}

interface IProps {
  s: Subscripcion.ISubscripcion,
  actions: IActions,
}

type StyledProps = IProps & {
  classes: {
    paper: string,
    dataList: string,
    rightIcon: string,
  }
}

interface IState {
  open: boolean,
}

class ShowSubscripcion extends React.Component<StyledProps, IState> {
  constructor(props: StyledProps) {
    super(props)

    this.state = {
      open: false,
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleOK = this.handleOK.bind(this)
  }

  public render() {
    const { s, classes } = this.props
    const { open, } = this.state
    return (
      <>
        <Grid container={true} spacing={24} xs={12}>
          <Grid item={true} xs={12} lg={3}>
            <Personales s={s} classes={classes} />
          </Grid>
          <Grid item={true} xs={12} lg={3}>
            <Contacto s={s} classes={classes} />
          </Grid>
          <Grid item={true} xs={12} lg={3}>
            <Pago s={s} classes={classes} confirm={this.props.actions.confirm} />
          </Grid>
          <Grid item={true} xs={12} lg={3}>
            <Ponencia s={s} classes={classes} />
          </Grid>
        </Grid>
        <Grid container={true} item={true} spacing={16} xs={12} justify="flex-end">
          <Grid item={true}>
            <Button variant="raised" color="secondary" onClick={this.handleOpen}>
              Eliminar
                <Delete className={classes.rightIcon} />
            </Button>
          </Grid>
        </Grid>
        <WarningDialog open={open}
          handleDismiss={this.handleClose}
          handleOK={this.handleOK}
        />
      </>
    )
  }

  private handleOpen() {
    this.setState(Object.assign({}, this.state, {
      open: true,
    }))
  }

  private handleClose() {
    this.setState(Object.assign({}, this.state, {
      open: false,
    }))
  }

  private handleOK() {
    this.props.actions.delete(this.props.s.documento)
    this.handleClose()
  }
}


// STYLES

const decorate = withStyles(({ }) => ({
  dataList: {
    borderLeft: '2px solid #EEEEEE',
  },
  rightIcon: {
    marginLeft: '0.225rem',
  },
}))

export default decorate<IProps>(ShowSubscripcion)
