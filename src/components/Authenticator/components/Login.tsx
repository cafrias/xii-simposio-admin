import * as React from 'react'

import * as Service from '../Service'

import LoginForm from './LoginForm'
import LoginNewPass from './LoginNewPass'

interface IProps {
  allowAccess: () => void,
  blockAccess: () => void,
}

interface IState {
  user: Service.IUser | undefined,
  requiresNewPass: boolean,
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      user: undefined,
      requiresNewPass: false,
    }

    this.requiresNewPass = this.requiresNewPass.bind(this)
  }

  public render() {
    return this.state.requiresNewPass && this.state.user
      ? <LoginNewPass
        allowAccess={this.props.allowAccess}
        user={this.state.user}
      />
      : <LoginForm
        requiresNewPass={this.requiresNewPass}
        allowAccess={this.props.allowAccess}
        blockAccess={this.props.blockAccess}
      />
  }

  private requiresNewPass(user: Service.IUser) {
    this.setState(Object.assign({}, this.state, {
      requiresNewPass: true,
      user,
    }))
  }
}

export default Login
