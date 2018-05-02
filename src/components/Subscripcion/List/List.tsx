import * as React from 'react'

import * as SubsEnt from '../../../entities/Subscripcion'

import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'

interface IProps {
  results: SubsEnt.ISubscripcion[],
  rowClickHandler: (e: React.MouseEvent<HTMLTableRowElement>) => void
}

type StyledProps = IProps & {
  classes: {
    paper: string,
  }
}

const ResultsTable = ({ results, classes, rowClickHandler, }: StyledProps) => (
  <Paper className={classes.paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell numeric={true}>Documento</TableCell>
          <TableCell>Apellido</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell numeric={true}>Celular</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Presenta Ponencia</TableCell>
          <TableCell>Confirmado</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results.map(n => {
          return (
            <TableRow hover={true} key={n.documento} onClick={rowClickHandler}>
              <TableCell numeric={true}>{n.documento}</TableCell>
              <TableCell>{n.apellido}</TableCell>
              <TableCell>{n.nombre}</TableCell>
              <TableCell numeric={true}>{n.celular}</TableCell>
              <TableCell>{n.email}</TableCell>
              <TableCell>{n.ponencia_presenta ? 'Si' : 'No'}</TableCell>
              <TableCell>{n.confirmado ? 'Si' : 'No'}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  </Paper>
)


// STYLES

const overflowX: 'auto' = 'auto'

const decorate = withStyles(({ }) => ({
  paper: {
    overflowX,
  },
}))


export default decorate<IProps>(ResultsTable)
