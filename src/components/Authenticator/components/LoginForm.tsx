import * as React from 'react'

import withFloatingForm, * as Form from './FloatingForm'

import AuthServ from '../Service'
import * as withSnackbar from '../../Snackbar/withSnackbar'

import { ErrNewPassword } from '../errors'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import SendButton from '../../SendButton/SendButton'

type IProps = Form.FormProps & withSnackbar.IWithSnack & {
  requiresNewPass: () => void,
}

interface IField {
  value: string,
  error: boolean,
}

const EmptyField = {
  value: '',
  error: false,
}

interface IState {
  username: IField,
  password: IField,
}
type IStateFields = keyof IState


class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      username: EmptyField,
      password: EmptyField,
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  public render() {
    const {
      username,
      password
    } = this.state
    return (
      <>
        <header className="mb3">
          <Typography variant="display1" color="primary" component="h1">
            Simposio de Contabilidad
          </Typography>
          <Typography className="mb2" variant="subheading">
            Sistema de Administración
          </Typography>
        </header>
        <Grid container={true} spacing={24} id="login_form" component="form" onSubmit={this.onSubmit}>
          <Grid item={true} xs={12}>
            <TextField fullWidth={true} label="Usuario" error={username.error}
              onChange={this.onChange('username')} />
          </Grid>
          <Grid item={true} xs={12}>
            <TextField fullWidth={true} label="Contraseña" error={password.error}
              onChange={this.onChange('password')} type="password" />
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <Button>
              Olvidé mi Contraseña
            </Button>
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <SendButton text="Ingresar" loading={this.props.status === 'loading'} />
          </Grid>
        </Grid>
      </>
    )
  }

  private onChange(prop: IStateFields) {
    return (e: React.SyntheticEvent<HTMLInputElement>) => {
      this.setState(Object.assign({}, this.state, {
        [prop]: {
          value: e.currentTarget.value,
          error: false,
        },
      }))
    }
  }

  private async onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    this.props.setStatus('loading')

    const {
      username,
      password,
    } = this.state

    const [OK, err] = await AuthServ.login(username.value, password.value)

    if (OK) {
      if (err && err.message === ErrNewPassword) {
        this.props.requiresNewPass()
      } else {
        this.props.allowAccess()
      }
    } else {
      const msg = err ? err.message : 'Error deconocido al logearse'
      this.props.commitMessage(msg)
      this.props.setStatus('initial')
    }

    this.props.setStatus('initial')
  }
}

const withSnack = withSnackbar.default(Login)

export default withFloatingForm(withSnack)

