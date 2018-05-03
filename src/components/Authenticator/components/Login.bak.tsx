import * as React from 'react'

import withFloatingForm, * as Form from './FloatingForm'

import AuthServ from '../Service'
import * as withSnackbar from '../../Snackbar/withSnackbar'

import { newPassRequired } from '../errors'

import LoginForm from './LoginForm'

type IProps = Form.FormProps & withSnackbar.IWithSnack


interface IField {
  value: string,
  error: boolean,
}

const EmptyField = {
  value: '',
  error: false,
}

interface ILoginFields {
  username: IField,
  password: IField,
}
type LoginFieldsKeys = keyof ILoginFields

interface INewPassFields {
  newPass: IField,
  newPassConf: IField,
}
type NewPassFieldsKeys = keyof INewPassFields

interface IState {
  login: ILoginFields
  newPass: INewPassFields,
  newPassRequired: boolean,
}


class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      login: {
        username: EmptyField,
        password: EmptyField,
      },
      newPass: {
        newPass: EmptyField,
        newPassConf: EmptyField,
      },
      newPassRequired: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  public render() {
    const {
      login,
      newPass,
    } = this.state
    return this.state.newPassRequired
      ? <NewPass />
      : <LoginForm
        onSubmit={this.loginSubmit}
        onChange={this.handleChange}
        loading={this.props.status === 'loading'}
        username={login.username}
        password={login.password}
      />
  }

  private handleChange(prop: LoginFieldsKeys & NewPassFieldsKeys) {
    return (e: React.SyntheticEvent<HTMLInputElement>) => {
      this.setState(Object.assign({}, this.state, {

        [prop]: {
          value: e.currentTarget.value,
          error: false,
        },
      }))
    }
  }

  private async loginSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    this.props.setStatus('loading')

    const {
      username,
      password,
    } = this.state

    const [OK, err] = await AuthServ.login(username.value, password.value)

    if (OK) {
      if (err && err.message === newPassRequired) {
        this.setState(Object.assign({}, this.state, {
          newPassRequired: true,
        }))
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
