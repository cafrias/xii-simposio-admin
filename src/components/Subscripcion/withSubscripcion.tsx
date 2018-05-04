import * as React from 'react'

import Service, * as ServiceT from './Service'

export interface IWithService {
  subsServ: ServiceT.IService,
}

const withSubscripcion = <P extends IWithService>(Comp: React.ComponentType<P>) => (
  class WithSubscripcion extends React.Component<P> {
    public render() {
      return (
        <Comp
          {...this.props}
          subsServ={Service}
        />
      )
    }
  }
)

export default withSubscripcion
