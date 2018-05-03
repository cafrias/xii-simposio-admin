import * as React from 'react'

import LoginForm from './LoginForm'
// import LoginNewPass from './LoginNewPass'

interface IProps {
  allowAccess: () => void,
  blockAccess: () => void,
}

interface IState {
  requiresNewPass: boolean,
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      requiresNewPass: false,
    }

    this.requiresNewPass = this.requiresNewPass.bind(this)
  }

  public render() {
    return this.state.requiresNewPass
      ? null
      : <LoginForm
        requiresNewPass={this.requiresNewPass}
        allowAccess={this.props.allowAccess}
        blockAccess={this.props.blockAccess}
      />
  }

  private requiresNewPass() {
    this.setState(Object.assign({}, this.state, {
      requiresNewPass: true,
    }))
  }
}

export default Login
