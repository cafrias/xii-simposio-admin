import * as React from 'react'

import LoginForm from './LoginForm'
import LoginNewPass from './LoginNewPass'

interface IState {
  requiresNewPass: boolean,
}

class Login extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      requiresNewPass: false,
    }

    this.requiresNewPass = this.requiresNewPass.bind(this)
  }

  public render() {
    return this.state.requiresNewPass
      ? <LoginNewPass />
      : <LoginForm requiresNewPass={this.requiresNewPass} />
  }

  private requiresNewPass() {
    this.setState(Object.assign({}, this.state, {
      requiresNewPass: true,
    }))
  }
}

export default Login
