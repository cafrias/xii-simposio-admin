import * as React from 'react'

import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import MuiCard, { CardActions, CardContent } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

interface ICardClasses {
  card: string,
}

interface ICardProps {
  key: number,
  item: HomeItem,
  action: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const decorate = withStyles(({ }) => ({
  card: {
    borderTop: '6px solid #3F51B5',
    margin: '1rem',
    width: '380px',
  },
}))

const Card: React.SFC<ICardProps & { classes: ICardClasses }> = ({ key, classes, item, action }) => (
  <MuiCard key={key} className={classes.card}>
    <CardContent>
      <Typography color="textSecondary">
        {item.type}
      </Typography>
      <Typography variant="headline" component="h2">
        {item.name}
      </Typography>
    </CardContent>
    <Divider />
    <CardActions>
      <Button color="primary" size="small" onClick={action}>Ver</Button>
    </CardActions>
  </MuiCard>
)

export default decorate<ICardProps>(Card)
