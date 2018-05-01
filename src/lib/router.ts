import * as H from 'history'

// Returns function that pushes React Router History to the route passed in `to`.
export const push = (to: string, history: H.History) =>
  () => history.push(to)
