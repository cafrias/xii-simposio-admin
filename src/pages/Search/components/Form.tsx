import * as React from 'react'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

import SendButton from '../../../components/SendButton/SendButton'
import { withStyles } from 'material-ui';

interface IProps {
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void,
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void,
  error: boolean,
  loading: boolean,
  query: string,
}

interface IStyles {
  classes: {
    formPaper: string,
  }
}

type StyledProps = IProps & IStyles

const Form: React.SFC<StyledProps> = ({ error, query, onChange, classes, loading, onSubmit, }) => (
  <Paper className={classes.formPaper}>
    <Typography variant="headline" color="primary" gutterBottom={true}>
      Buscar Subscripción
    </Typography>
    <Grid container={true} spacing={40} id="search_form" component="form" alignItems="flex-end" onSubmit={onSubmit}>
      <Grid item={true} xs={12} lg={8}>
        <TextField
          id="search_subscripcion"
          label="Nro. Documento"
          type="search"
          margin="none"
          value={query}
          fullWidth={true}
          autoFocus={true}
          onChange={onChange}
          error={error}
        />
      </Grid>
      <Grid item={true} xs={12} lg={4}>
        <SendButton loading={loading} text="Buscar" />
      </Grid>
    </Grid>
  </Paper>
)


// STYLES

const decorate = withStyles(({ }) => ({
  formPaper: {
    padding: '1.125rem',
    minWidth: '30%',
  },
}))

export default decorate<IProps>(Form)
