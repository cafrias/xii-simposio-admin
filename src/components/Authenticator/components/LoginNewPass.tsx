import * as React from 'react'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
// import Button from 'material-ui/Button'

import SendButton from '../../SendButton/SendButton'

interface IField {
  value: string,
  error: boolean,
}

interface IProps {
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void,
  onChange: (e: 'new_pass' | 'confirmation') => (e: React.SyntheticEvent<HTMLInputElement>) => void,
  new_pass: IField,
  confirmation: IField,
  loading: boolean,
}

const LoginForm: React.SFC<IProps> = ({ onSubmit, onChange, new_pass, confirmation, loading }) => (
  <>
    <header className="mb3">
      <Typography variant="display1" component="h1">
        Primer Ingreso
      </Typography>
      <Typography variant="subheading">
        Debe elegir una contraseña nueva
      </Typography>
      <Typography className="pt2">
        La contraseña debe tener al menos 8 caracteres y contener al menos uno de: {' '}
        minúsculas, mayúsculas, números, caracteres especiales (?_-.,#).
      </Typography>
    </header>
    <Grid container={true} spacing={24} id="login_form" component="form" onSubmit={onSubmit}>
      <Grid item={true} xs={12}>
        <TextField fullWidth={true} onChange={onChange('new_pass')} label="Nueva Contraseña" type="password" />
      </Grid>
      <Grid item={true} xs={12}>
        <TextField fullWidth={true} onChange={onChange('confirmation')} label="Confirmar Contraseña" type="password" />
      </Grid>
      <Grid item={true} xs={12} md={6} />
      <Grid item={true} xs={12} md={6}>
        <SendButton text="Ingresar" loading={loading} />
      </Grid>
    </Grid>
  </>
)

export default LoginForm
