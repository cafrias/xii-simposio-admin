import * as React from 'react'

import Snackbar from './components/Snackbar'

export interface IWithSnack {
  commitMessage: (msg: string) => void,
}

interface IState {
  open: boolean,
  msg: string,
}

const withSnackbar = <P extends IWithSnack>(Comp: React.ComponentType<P>) => (
  class WithSnackbar extends React.Component<P & IWithSnack, IState> {
    constructor(props: P & IWithSnack) {
      super(props)

      this.state = {
        open: false,
        msg: '',
      }

      this.commitMessage = this.commitMessage.bind(this)
      this.close = this.close.bind(this)
    }

    public render() {
      const {
        open,
        msg
      } = this.state
      return (
        <>
          <Comp commitMessage={this.commitMessage} {...this.props} />
          <Snackbar
            open={open}
            msg={msg}
            onClose={this.close}
          />
        </>
      )
    }

    private commitMessage(msg: string) {
      this.setState(Object.assign({}, this.state, {
        open: true,
        msg,
      }))
    }

    private close() {
      this.setState(Object.assign({}, this.state, {
        open: false,
        msg: '',
      }))
    }
  }
)

export default withSnackbar
