import * as React from 'react'

import Login from './components/Login'

interface IState {
  auth: boolean,
}

class Authenticator extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      auth: false,
    }

    this.allowAccess = this.allowAccess.bind(this)
    this.blockAccess = this.blockAccess.bind(this)
  }

  public render() {
    return this.state.auth
      ? React.Children.only(this.props.children)
      : <Login allowAccess={this.allowAccess} blockAccess={this.blockAccess} />
  }

  private allowAccess() {
    this.setState(Object.assign({}, this.state, {
      auth: true,
    }))
  }

  private blockAccess() {
    this.setState(Object.assign({}, this.state, {
      auth: false,
    }))
  }
}

export default Authenticator
