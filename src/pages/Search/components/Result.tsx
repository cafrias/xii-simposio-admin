import * as React from 'react'

import * as SubsEnt from '../../../entities/Subscripcion'
import * as SubsServ from '../../../components/Subscripcion/Service'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'

import SubsShow from '../../../components/Subscripcion/Show/Show'

interface IProps {
  result: SubsEnt.ISubscripcion,
}

type Props = IProps & SubsServ.IWithService

type StyledProps = Props & {
  classes: {
    paper: string,
  }
}

const Result: React.SFC<StyledProps> = ({ result, subsServ, classes, }) => (
  <Paper component="article" className={classes.paper}>
    <SubsShow
      s={result}
      subsServ={subsServ}
    />
  </Paper>
)


// STYLES

const decorate = withStyles(({ }) => ({
  paper: {
    marginTop: '1.125rem',
    padding: '1.125rem',
    minWidth: '85%',
  },
}))

export default decorate<Props>(Result)
