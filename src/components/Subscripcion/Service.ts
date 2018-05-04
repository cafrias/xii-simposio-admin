import * as Subs from '../../entities/Subscripcion'


// OUTPUTS

export type GetOutput = [Subs.ISubscripcion, Error | undefined]
export type ConfirmarOutput = [boolean, Error | undefined]
export type DeleteOutput = [boolean, Error | undefined]

export interface IService {
  get(doc: number): Promise<GetOutput>
  delete(doc: number): Promise<DeleteOutput>
  confirmar(doc: number, conf: boolean): Promise<ConfirmarOutput>
}


class SubscripcionService implements IService {
  public async get(doc: number): Promise<GetOutput> {
    return [Subs.EmptySubscripcion, undefined]
  }

  public async delete(doc: number): Promise<DeleteOutput> {
    return [true, undefined]
  }

  public async confirmar(doc: number, conf: boolean): Promise<ConfirmarOutput> {
    return [true, undefined]
  }
}

export default new SubscripcionService()
