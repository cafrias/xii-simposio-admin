import * as React from 'react'

import { withStyles } from 'material-ui/styles'

import Paper from 'material-ui/Paper'

// CONSTANTS ___________________________________________________________________

type FormStatus = 'initial' | 'loading' | 'error'

export type FormProps = IProps & {
  status: FormStatus,
  setStatus: (s: FormStatus) => void,
}

interface IProps {
  allowAccess: () => void,
  blockAccess: () => void,
}

type StyledProps = IProps & {
  classes: {
    background: string,
    paper: string,
  }
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


// HOC

const withFloatingForm = <P extends FormProps>(Comp: React.ComponentType<P>) => (
  decorate<IProps>(
    class FloatingForm extends React.Component<StyledProps, IState> {
      constructor(props: StyledProps) {
        super(props)
        this.state = {
          status: 'initial',
        }

        this.setStatus = this.setStatus.bind(this)
      }

      public render() {
        const {
          classes,
        } = this.props

        return (
          <section className={classes.background}>
            <Paper className={classes.paper} elevation={6}>
              <Comp
                status={this.state.status}
                setStatus={this.setStatus}
                allowAccess={this.props.allowAccess}
                blockAccess={this.props.blockAccess}
              />
            </Paper>
          </section>
        )
      }

      private setStatus(status: FormStatus) {
        this.setState(Object.assign({}, this.state, {
          status,
        }))
      }
    }
  )
)

export default withFloatingForm
