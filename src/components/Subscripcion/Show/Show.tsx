import * as React from 'react'

import * as Subscripcion from '../../../entities/Subscripcion'
import * as SubsServ from '../Service'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'

import Delete from '@material-ui/icons/Delete'

// LISTS 
import Personales from './components/Personales'
import Contacto from './components/Contacto'
import Pago from './components/Pago'
import Ponencia from './components/Ponencia'

import WarningDialog from './components/WarningDialog'

interface IProps {
  s: Subscripcion.ISubscripcion,
  deleteSubs: SubsServ.Delete,
  confirmarSubs: SubsServ.Confirmar,
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
    const { s, classes, } = this.props
    const { open, } = this.state
    return (
      <>
        <Paper component="article" className={classes.paper}>
          <Grid container={true} item={true} spacing={24} xs={12}>
            <Grid item={true} xs={12} lg={3}>
              <Personales s={s} classes={classes} />
            </Grid>
            <Grid item={true} xs={12} lg={3}>
              <Contacto s={s} classes={classes} />
            </Grid>
            <Grid item={true} xs={12} lg={3}>
              <Pago s={s} classes={classes} confirmar={this.props.confirmarSubs} />
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
        </Paper>
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
    this.props.deleteSubs(this.props.s.documento)
    this.handleClose()
  }
}


// STYLES

const decorate = withStyles(({ }) => ({
  paper: {
    marginTop: '1.125rem',
    padding: '1.125rem',
    minWidth: '85%',
  },
  dataList: {
    borderLeft: '2px solid #EEEEEE',
  },
  rightIcon: {
    marginLeft: '0.225rem',
  },
}))

export default decorate<IProps>(ShowSubscripcion)
