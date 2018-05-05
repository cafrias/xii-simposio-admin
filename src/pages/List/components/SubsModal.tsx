import * as React from 'react'
import './SubsModal.css'

import * as SubsEnt from '../../../entities/Subscripcion'
import * as ShowSubs from '../../../components/Subscripcion/Show/Show'

import Dialog, { DialogTitle } from 'material-ui/Dialog'

interface IProps {
  subscripcion: SubsEnt.ISubscripcion,
  open: boolean,
  onClose: () => void,
  actions: ShowSubs.IActions,
}

type Props = IProps

const SubsModal: React.SFC<Props> = ({ subscripcion, open, onClose, actions }) => (
  <Dialog maxWidth="md" open={open} onClose={onClose} aria-labelledby="modal_title">
    <DialogTitle id="modal_title">Datos de Subscripción</DialogTitle>
    <div className="modal__content">
      <ShowSubs.default
        s={subscripcion}
        actions={actions}
      />
    </div>
  </Dialog>
)

export default SubsModal
