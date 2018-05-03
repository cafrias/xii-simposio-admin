import * as React from 'react'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import withFloatingForm, * as Form from './FloatingForm'
import SendButton from '../../SendButton/SendButton'

import AuthServ from '../Service'
import * as withSnackbar from '../../Snackbar/withSnackbar'

type IProps = Form.FormProps & withSnackbar.IWithSnack

interface IField {
  value: string,
  error: boolean,
}

interface IState {
  username: IField,
  password: IField,
}

type FormFields = keyof IState

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      username: {
        value: '',
        error: false,
      },
      password: {
        value: '',
        error: false,
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  public render() {
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
        <Grid container={true} spacing={24} id="login_form" component="form" onSubmit={this.handleSubmit}>
          <Grid item={true} xs={12}>
            <TextField fullWidth={true} label="Usuario" error={this.state.username.error}
              onChange={this.handleChange('username')} />
          </Grid>
          <Grid item={true} xs={12}>
            <TextField fullWidth={true} label="Contraseña" error={this.state.password.error}
              onChange={this.handleChange('password')} type="password" />
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <Button>
              Olvidé mi Contraseña
            </Button>
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <SendButton text="Ingresar" loading={status === 'loading'} />
          </Grid>
        </Grid>
      </>
    )
  }

  private handleChange(prop: FormFields) {
    return (e: React.SyntheticEvent<HTMLInputElement>) => {
      this.setState(Object.assign({}, this.state, {
        [prop]: {
          value: e.currentTarget.value,
          error: false,
        },
      }))
    }
  }

  private async handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    const {
      username,
      password,
    } = this.state

    const [OK, err] = await AuthServ.login(username.value, password.value)

    if (OK) {
      this.props.allowAccess()
    } else {
      const msg = err ? err.toString() : 'Error deconocido al logearse'
      this.props.commitMessage(msg)
    }
  }
}

const withSnack = withSnackbar.default(Login)

export default withFloatingForm(withSnack)
