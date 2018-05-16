import * as React from 'react'
import './List.css'

import * as SubsEnt from '../../../entities/Subscripcion'

import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'

interface IProps {
  results: SubsEnt.ISubscripcion[],
  rowClickHandler: (doc: number) => (e: React.MouseEvent<HTMLTableRowElement>) => void
}

type StyledProps = IProps & {
  classes: {
    paper: string,
  }
}

const ResultsTable = ({ results, classes, rowClickHandler, }: StyledProps) => (
  <Paper className={`list__paper ${classes.paper}`}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell numeric={true}>Documento</TableCell>
          <TableCell>Apellido</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell numeric={true} className="no-print">Celular</TableCell>
          <TableCell className="no-print">Email</TableCell>
          <TableCell className="no-print">Presenta Ponencia</TableCell>
          <TableCell>Abonado</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results.map(n => {
          return (
            <TableRow hover={true} key={n.documento} onClick={rowClickHandler(n.documento)}>
              <TableCell numeric={true}>{n.documento}</TableCell>
              <TableCell>{n.apellido}</TableCell>
              <TableCell>{n.nombre}</TableCell>
              <TableCell>{SubsEnt.humanizeArancelCategoria(n.arancel_categoria)[0]}</TableCell>
              <TableCell numeric={true} className="no-print">{n.celular}</TableCell>
              <TableCell className="no-print">{n.email}</TableCell>
              <TableCell className="no-print">{n.ponencia_presenta ? 'Si' : 'No'}</TableCell>
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
