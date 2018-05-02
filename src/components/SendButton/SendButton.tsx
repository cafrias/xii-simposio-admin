import * as React from 'react'

import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

interface IProps {
  loading: boolean,
  text: string,
}

const SendButton = ({ loading, text, }: IProps) =>
  <Button fullWidth={true} variant="raised" className="mt3" disabled={loading} type="submit" color="primary">
    {loading ? <CircularProgress size={20} /> : null}
    {text}
  </Button>

export default SendButton
