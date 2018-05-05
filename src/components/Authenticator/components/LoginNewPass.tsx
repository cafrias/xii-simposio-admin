import * as React from 'react'

import withFloatingForm, * as Form from './FloatingForm'

import * as Service from '../Service'

import AuthServ from '../Service'

import * as Snack from '../../Snackbar/Snackbar'
import withSnackbar from '../../Snackbar/withSnackbar'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

import SendButton from '../../SendButton/SendButton'

interface IBaseProps {
  allowAccess: () => void,
  user: Service.IUser,
}

type IProps = Form.IFormProps & Snack.IWithSnack & IBaseProps

interface IField {
  value: string,
  error: boolean,
}

const EmptyField = {
  value: '',
  error: false,
}

interface IState {
  newPass: IField,
  newPassConf: IField,
}
type IStateFields = keyof IState


class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      newPass: EmptyField,
      newPassConf: EmptyField,
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  public render() {
    return (
      <>
        <header className="mb3">
          <Typography variant="display1" component="h1">
            Primer Ingreso
          </Typography>
          <Typography variant="subheading">
            Debe elegir una contraseña nueva
          </Typography>
          <Typography className="pt2">
            La contraseña debe tener al menos 8 caracteres.
          </Typography>
        </header>
        <Grid container={true} spacing={24} id="new_pass_form" component="form" onSubmit={this.onSubmit}>
          <Grid item={true} xs={12}>
            <TextField fullWidth={true} onChange={this.onChange('newPass')} label="Nueva Contraseña" type="password" />
          </Grid>
          <Grid item={true} xs={12}>
            <TextField fullWidth={true} error={this.state.newPassConf.error} onChange={this.onChange('newPassConf')} label="Confirmar Contraseña" type="password" />
          </Grid>
          <Grid item={true} xs={12} md={6} />
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
      newPass,
      newPassConf,
    } = this.state

    if (newPass.value !== newPassConf.value) {
      this.props.setStatus('error')
      this.props.commitMessage('Las contraseñas deben coincidir')
      this.setState(Object.assign({}, this.state, {
        newPassConf: Object.assign({}, this.state.newPassConf, {
          error: true,
        })
      }))

      return
    }

    const [OK, err] = await AuthServ.completePassword(this.props.user, newPass.value)

    if (OK) {
      this.props.setStatus('initial')

      this.props.allowAccess()
    } else {
      this.props.setStatus('error')

      const msg = err ? err.message : 'Error deconocido al cambiar de password'
      this.props.commitMessage(msg)
    }

  }
}

const withSnack = withSnackbar(Login)

export default withFloatingForm<IBaseProps>(withSnack)
