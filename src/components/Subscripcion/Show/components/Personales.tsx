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

const Personales = ({ s, classes, }: IProps) => (
  <>
    <Typography variant="headline">Datos Personales</Typography>
    <List className={classes.dataList}>
      <ListItem>
        <ListItemText primary={s.documento} secondary="Documento" />
      </ListItem>
      <ListItem>
        <ListItemText primary={s.apellido} secondary="Apellido" />
      </ListItem>
      <ListItem>
        <ListItemText primary={s.nombre} secondary="Nombre" />
      </ListItem>
    </List>
  </>
)

export default Personales
