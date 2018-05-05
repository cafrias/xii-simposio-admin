import * as React from 'react'

import MuiSnackbar from 'material-ui/Snackbar'


// TYPES

export interface IWithSnack {
  commitMessage: (msg: string) => void,
}

interface IState {
  open: boolean,
  msg: string,
}


// CONTEXT

export const SnackbarContext = React.createContext<IWithSnack>({
  commitMessage: (msg: string) => { return },
})


// COMPONENT

class Snackbar extends React.Component<{}, IState> {
  constructor(props: {}) {
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
    const {
      commitMessage,
    } = this
    return (
      <SnackbarContext.Provider value={{ commitMessage }}>
        {this.props.children}
        <MuiSnackbar
          open={open}
          autoHideDuration={6000}
          onClose={this.close}
          SnackbarContentProps={{
            'aria-describedby': 'snack_message',
          }}
          message={<span id="snack_message">{msg}</span>}
        />
      </SnackbarContext.Provider>
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

export default Snackbar
