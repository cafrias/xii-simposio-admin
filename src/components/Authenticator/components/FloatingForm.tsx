import * as React from 'react'

import { withStyles } from 'material-ui/styles'

import Paper from 'material-ui/Paper'

// CONSTANTS ___________________________________________________________________

type FormStatus = 'initial' | 'loading' | 'error'

export interface IFormProps {
  status: FormStatus,
  setStatus: (s: FormStatus) => void,
}

interface IState {
  status: FormStatus,
}


// STYLES

const decorate = withStyles((theme) => ({
  background: {
    backgroundColor: theme.palette.grey[200],
    height: '100vh',
    padding: '1.125rem',
  },
  paper: {
    maxWidth: '500px',
    padding: '0.5rem 1.618rem 1.618rem 1.618rem',
    margin: '0 auto',
  }
}))


// STYLED COMPONENT

interface IFloatingFormProps {
  render: React.ReactNode,
}

const FloatingForm = decorate<IFloatingFormProps>(
  ({ render, classes }) => (
    <section className={classes.background}>
      <Paper className={classes.paper} elevation={6}>
        {render}
      </Paper>
    </section>
  )
)


// HOC

const withFloatingForm = <P extends {}>(Comp: React.ComponentType<P & IFormProps>) => (
  class WithFloatingForm extends React.Component<P, IState> {
    constructor(props: P) {
      super(props)
      this.state = {
        status: 'initial',
      }

      this.setStatus = this.setStatus.bind(this)
    }

    public render() {
      return (
        <FloatingForm render={
          <Comp
            status={this.state.status}
            setStatus={this.setStatus}
            {...this.props}
          />
        } />
      )
    }

    private setStatus(status: FormStatus) {
      this.setState(Object.assign({}, this.state, {
        status,
      }))
    }
  }
)

export default withFloatingForm
