import * as Subs from '../../entities/Subscripcion'

import { Auth, API } from 'aws-amplify'

interface IAPIResponse {
  log_id: string,
  message: string,
  payload?: any,
}

// OUTPUTS

export type GetOutput = [Subs.ISubscripcion, Error | undefined]
export type ConfirmarOutput = [boolean, Error | undefined]
export type DeleteOutput = [boolean, Error | undefined]

export interface IService {
  get(doc: number): Promise<GetOutput>
  delete(doc: number): Promise<DeleteOutput>
  confirmar(doc: number, conf: boolean): Promise<ConfirmarOutput>
}

export const API_NAME = 'Simposio'

class SubscripcionService implements IService {
  public async get(doc: number): Promise<GetOutput> {
    try {
      const session = await Auth.currentSession();
      const res: IAPIResponse = await API.get(API_NAME, `/subscripcion?doc=${doc}`, {
        headers: {
          Authorization: session.idToken.jwtToken,
        },
      })

      const subs: Subs.ISubscripcion = res.payload

      return [subs, undefined]
    } catch (e) {
      switch (e.response.status) {
        // Known errors
        case 400:
        case 404:
        case 500:
          return [
            Subs.EmptySubscripcion,
            new Error(e.response.data.message)
          ]
        // Unknown error
        default:
          return [Subs.EmptySubscripcion, Error('Error desconocido, contacte con soporte.')]
      }
    }
  }

  public async delete(doc: number): Promise<DeleteOutput> {
    return [true, undefined]
  }

  public async confirmar(doc: number, conf: boolean): Promise<ConfirmarOutput> {
    return [true, undefined]
  }
}

export default new SubscripcionService()
