import * as React from 'react'

import * as Snack from './Snackbar'

const withSnackbar = <T extends {}>(Comp: React.ComponentType<T & Snack.IWithSnack>) => (
  (props: T) => (
    <Snack.SnackbarContext.Consumer>
      {
        (snack) => <Comp {...props} {...snack}/>
      }
    </Snack.SnackbarContext.Consumer>
  )
)

export default withSnackbar
