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

const Ponencia = ({ s, classes, }: IProps) => (
  <>
    <Typography variant="headline">Ponencia</Typography>
    <List className={classes.dataList}>
      <ListItem>
        <ListItemText primary={s.ponencia_presenta ? 'Si' : 'No'} secondary="¿Presenta Ponencia?" />
      </ListItem>
      {
        s.ponencia_presenta ? (
          <>
            <ListItem>
              <ListItemText primary={s.ponencia_titulo} secondary="Título" />
            </ListItem>
            <ListItem>
              <ListItemText primary={s.ponencia_area} secondary="Área" />
            </ListItem>
            {
              s.ponencia_coautores ? (
                <ListItem>
                  <ListItemText primary={s.ponencia_coautores} secondary="Coautores" />
                </ListItem>
              ) : null
            }
            {
              s.ponencia_institucion ? (
                <ListItem>
                  <ListItemText primary={s.ponencia_institucion} secondary="Institución" />
                </ListItem>
              ) : null
            }
          </>
        ) : null
      }
    </List>
  </>
)

export default Ponencia
