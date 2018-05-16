import * as React from 'react'

import * as Subscripcion from '../../../../entities/Subscripcion'

import List, { ListItem, ListItemText, ListItemSecondaryAction, } from 'material-ui/List'
import Switch from 'material-ui/Switch'
import Typography from 'material-ui/Typography'

interface IProps {
  s: Subscripcion.ISubscripcion,
  classes: {
    dataList: string,
  },
  confirm: (s: Subscripcion.ISubscripcion, conf: boolean) => Promise<void>,
}

const handleChange = (s: Subscripcion.ISubscripcion, confirm: (s: Subscripcion.ISubscripcion, conf: boolean) => Promise<void>) =>
  (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { checked, } = e.currentTarget
    confirm(s, checked)
  }

const Pago = ({ s, classes, confirm }: IProps) => {
  const [categoria, base,] = Subscripcion.humanizeArancelCategoria(s.arancel_categoria)
  return (
    <>
      <Typography variant="headline">Pago</Typography>
      <List className={classes.dataList}>
        <ListItem>
          <ListItemText primary={s.confirmado ? 'Si' : 'No'} secondary="Confirmado" />
          <ListItemSecondaryAction>
            <Switch
              onChange={handleChange(s, confirm)}
              checked={s.confirmado}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={categoria} secondary="Categoría" />
        </ListItem>
        <ListItem>
          <ListItemText primary={`$${base}`} secondary="Base" />
        </ListItem>
        {
          s.arancel_adicional ? (
            <ListItem>
              <ListItemText primary={`$${s.arancel_adicional}`} secondary="Adicional" />
            </ListItem>
          ) : null
        }
        <ListItem>
          <ListItemText primary={s.arancel_pago} secondary="Forma de pago" />
        </ListItem>
        {
          s.acompanantes ? (
            <ListItem>
              <ListItemText primary={s.acompanantes} secondary="Acompañantes" />
            </ListItem>
          ) : null
        }
      </List>
    </>
  )
}
export default Pago
