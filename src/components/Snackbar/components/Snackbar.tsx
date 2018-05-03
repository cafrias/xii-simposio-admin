import * as React from 'react'

import MuiSnackbar from 'material-ui/Snackbar'

interface IProps {
  open: boolean,
  onClose: () => void,
  msg: string,
}

const Snackbar: React.SFC<IProps> = ({ open, onClose, msg, }) => (
  <MuiSnackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    SnackbarContentProps={{
      'aria-describedby': 'snack_message',
    }}
    message={<span id="snack_message">{msg}</span>}
  />
)

export default Snackbar
