import * as React from 'react'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'

interface IProps {
  open: boolean,
  handleDismiss: (e: React.MouseEvent<HTMLButtonElement>) => void,
  handleOK: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const WarningDialog: React.SFC<IProps> = ({ open, handleDismiss, handleOK, }) => (
  <Dialog
    open={open}
    onClose={handleDismiss}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Eliminar Subscripción</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        ¿Está seguro que desea eliminar esta subscripción? Esta acción es irreversible.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDismiss} color="primary">
        Volver
      </Button>
      <Button onClick={handleOK} color="secondary" autoFocus={true}>
        Eliminar
      </Button>
    </DialogActions>
  </Dialog>
)

export default WarningDialog
