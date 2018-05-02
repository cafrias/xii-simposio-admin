import * as React from 'react'

import * as Subscripcion from '../../../../entities/Subscripcion'

import List, { ListItem, ListItemText, } from 'material-ui/List'
import Typography from 'material-ui/Typography'

interface IProps {
  s: Subscripcion.ISubscripcion,
  classes: {
    dataList: string,
  },
}

const Contacto = ({ s, classes, }: IProps) => (
  <>
    <Typography variant="headline">Contacto</Typography>
    <List className={classes.dataList}>
      <ListItem>
        <ListItemText primary={s.email} secondary="Email" />
      </ListItem>
      {
        s.celular ? (
          <ListItem>
            <ListItemText primary={s.celular} secondary="Celular" />
          </ListItem>
        ) : null
      }
      {
        s.telefono ? (
          <ListItem>
            <ListItemText primary={s.telefono} secondary="Telefono" />
          </ListItem>
        ) : null
      }
      {
        s.fax ? (
          <ListItem>
            <ListItemText primary={s.fax} secondary="Fax" />
          </ListItem>
        ) : null
      }
      <ListItem>
        <ListItemText primary={s.direccion} secondary="Direccion" />
      </ListItem>
      <ListItem>
        <ListItemText primary={s.zip} secondary="Código Postal" />
      </ListItem>
      <ListItem>
        <ListItemText primary={s.localidad} secondary="Localidad" />
      </ListItem>
      <ListItem>
        <ListItemText primary={s.pais} secondary="País" />
      </ListItem>
    </List>
  </>
)

export default Contacto
