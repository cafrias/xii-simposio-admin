import * as React from 'react'

import * as Subscripcion from '../../../../entities/Subscripcion'
import * as SubsServ from '../../Service'

import List, { ListItem, ListItemText, ListItemSecondaryAction, } from 'material-ui/List'
import Switch from 'material-ui/Switch'
import Typography from 'material-ui/Typography'

interface IProps {
  s: Subscripcion.ISubscripcion,
  classes: {
    dataList: string,
  },
  confirmar: SubsServ.Confirmar,
}

const ArancelCategoria = (cat: string): [string, number] => {
  switch (cat) {
    case 'estudiante_untdf':
      return ['Estudiante UNTDF', 0,]
    case 'estudiante_otro':
      return ['Estudiante otras instituciones', 350,]
    case 'docente_untdf':
      return ['Docente UNTDF', 1600,]
    case 'matriculado_cpcetf':
      return ['Matriculado CPCETF', 1000,]
    default:
      return ["general", 2700,]
  }
}

const handleChange = (s: Subscripcion.ISubscripcion, confirmar: SubsServ.Confirmar) =>
  (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { checked, } = e.currentTarget
    confirmar(s.documento, checked)
  }

const Pago = ({ s, classes, confirmar, }: IProps) => {
  const [categoria, base,] = ArancelCategoria(s.arancel_categoria)
  return (
    <>
      <Typography variant="headline">Pago</Typography>
      <List className={classes.dataList}>
        <ListItem>
          <ListItemText primary={s.confirmado ? 'Si' : 'No'} secondary="Confirmado" />
          <ListItemSecondaryAction>
            <Switch
              onChange={handleChange(s, confirmar)}
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
