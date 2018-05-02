import * as React from 'react'
import './SubsModal.css'

import * as SubsEnt from '../../../entities/Subscripcion'
import * as SubsServ from '../../../components/Subscripcion/Service'
import ShowSubs from '../../../components/Subscripcion/Show/Show'

import Dialog, { DialogTitle } from 'material-ui/Dialog'

interface IProps {
  subscripcion: SubsEnt.ISubscripcion,
  open: boolean,
  onClose: () => void,
}

type Props = IProps & SubsServ.IWithService

const SubsModal: React.SFC<Props> = ({ subscripcion, open, onClose, subsServ, }) => (
  <Dialog maxWidth="md" open={open} onClose={onClose} aria-labelledby="modal_title">
    <DialogTitle id="modal_title">Datos de Subscripción</DialogTitle>
    <div className="modal__content">
      <ShowSubs
        s={subscripcion}
        subsServ={subsServ}
      />
    </div>
  </Dialog>
)

export default SubsModal
