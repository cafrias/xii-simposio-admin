import * as React from 'react'

import * as SubsEnt from '../../../entities/Subscripcion'
import * as SubsServ from '../../../components/Subscripcion/Service'
import ShowSubs from '../../../components/Subscripcion/Show/Show'

import Dialog, { DialogTitle } from 'material-ui/Dialog'

interface IProps {
  subscripcion: SubsEnt.ISubscripcion,
  open: boolean,
  onClose: () => void,
  service: SubsServ.IService,
}

// TODO: refactor ShowSubs to use service

const SubsModal: React.SFC<IProps> = ({ subscripcion, open, onClose, service, }) => (
  <Dialog open={open} onClose={onClose} aria-labelledby="simple-dialog-title">
    <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
    <div>
      <ShowSubs
        s={subscripcion}
        confirmarSubs={service.subscripcion.confirmar}
        deleteSubs={service.subscripcion.delete}
      />
    </div>
  </Dialog>
)
