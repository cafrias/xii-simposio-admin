import * as Subs from '../../entities/Subscripcion'

import { Auth, API } from 'aws-amplify'

interface IAPIResponse {
  log_id: string,
  message: string,
  payload?: any,
}

// OUTPUTS

export type GetOutput = [Subs.ISubscripcion, Error | undefined]
export type ConfirmarOutput = [Subs.ISubscripcion, Error | undefined]
export type DeleteOutput = Error | undefined

export interface IService {
  get(doc: number): Promise<GetOutput>
  delete(doc: number): Promise<DeleteOutput>
  confirmar(s: Subs.ISubscripcion, conf: boolean): Promise<ConfirmarOutput>
}

interface IAPIError {
  response: {
    status: number,
    data: IAPIResponse,
  },
  toString: () => string,
}

export const API_NAME = 'Simposio'

class SubscripcionService implements IService {
  public async get(doc: number): Promise<GetOutput> {
    try {
      const res: IAPIResponse = await API.get(API_NAME, `/subscripcion?doc=${doc}`, {
        headers: {
          Authorization: await this.getIdToken(),
        },
      })

      const subs: Subs.ISubscripcion = res.payload

      return [subs, undefined]
    } catch (e) {
      return this.mapErrorsToTuple<Subs.ISubscripcion>(e, Subs.EmptySubscripcion)
    }
  }

  public async delete(doc: number): Promise<DeleteOutput> {
    try {
      await API.del(API_NAME, `/subscripcion?doc=${doc}`, {
        headers: {
          Authorization: await this.getIdToken(),
        }
      })

      return undefined
    } catch (e) {
      return this.mapErrorsToError(e)
    }
  }

  public async confirmar(s: Subs.ISubscripcion, confirmado: boolean): Promise<ConfirmarOutput> {
    const lSubs: Subs.ISubscripcion = {
      ...s,
      confirmado,
    }

    try {
      await API.put(API_NAME, `/subscripcion`, {
        headers: {
          Authorization: await this.getIdToken(),
        },
        body: lSubs,
      })
      return [lSubs, undefined]
    } catch (e) {
      return this.mapErrorsToTuple<Subs.ISubscripcion>(e, Subs.EmptySubscripcion)
    }
  }

  private async getIdToken(): Promise<string> {
    const session = await Auth.currentSession()

    return session ? session.idToken.jwtToken : ''
  }


  // TODO: refactor duplicated code

  private mapErrorsToTuple<V>(err: IAPIError, def: V): [V, Error | undefined] {
    if (!err.response) {
      return [def, new Error(err.toString())]
    }

    switch (err.response.status) {
      // Known errors
      case 400:
      case 404:
      case 500:
        return [def, new Error(err.response.data.message)]
      // Unknown error
      default:
        return [def, new Error('Error desconocido, contacte con soporte.')]
    }
  }

  private mapErrorsToError<V>(err: IAPIError): Error {
    if (!err.response) {
      return new Error(err.toString())
    }

    switch (err.response.status) {
      // Known errors
      case 400:
      case 404:
      case 500:
        return new Error(err.response.data.message)
      // Unknown error
      default:
        return new Error('Error desconocido, contacte con soporte.')
    }
  }
}

export default new SubscripcionService()
