import * as React from 'react'

import * as SubsEnt from '../../../entities/Subscripcion'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'

import * as SubsShow from '../../../components/Subscripcion/Show/Show'

interface IProps {
  result: SubsEnt.ISubscripcion,
  actions: SubsShow.IActions,
}

type Props = IProps

type StyledProps = Props & {
  classes: {
    paper: string,
  }
}

const Result: React.SFC<StyledProps> = ({ result, classes, actions }) => (
  <Paper component="article" className={classes.paper}>
    <SubsShow.default
      s={result}
      actions={actions}
    />
  </Paper>
)


// STYLES

const decorate = withStyles(({ }) => ({
  paper: {
    marginTop: '1.125rem',
    padding: '1.125rem',
    width: '100%',
  },
}))

export default decorate<Props>(Result)
