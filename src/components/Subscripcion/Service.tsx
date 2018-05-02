import * as React from 'react'


// CONFIRMAR

export type ConfirmarOutput = [boolean, Error | undefined]
export type Confirmar = (doc: number, conf: boolean) => Promise<ConfirmarOutput>

const confirmar: Confirmar = async (doc, conf) => {
  return [true, undefined]
}


// DELETE

export type DeleteOutput = [boolean, Error | undefined]
export type Delete = (doc: number) => Promise<DeleteOutput>

const del: Delete = async (doc) => {
  return [true, undefined]
}


// HOC

export interface IService {
  delete: Delete,
  confirmar: Confirmar,
}

export interface IWithService {
  subsServ: IService,
}

export const withSubscripcion = <P extends IWithService>(Comp: React.ComponentType<P>) =>
  class WithSubscripcion extends React.Component<P> {
    public render() {
      return (
        <Comp
          {...this.props}
          subsServ={{
            delete: del,
            confirmar,
          }}
        />
      )
    }
  }
