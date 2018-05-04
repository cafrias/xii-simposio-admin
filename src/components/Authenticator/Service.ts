import { Auth } from 'aws-amplify'

import { ErrNewPassword } from './errors'

export type AuthResult = [IUser | undefined, Error | undefined]
export type Result = [boolean, Error | undefined]

export interface IUser {
  Session: string,
  authenticationFlowType: string,
  challengeName: string,
}

class AuthenticatorService {
  public async login(username: string, password: string): Promise<AuthResult> {
    try {
      const user: IUser = await Auth.signIn(username, password)

      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        return [user, new Error(ErrNewPassword)]
      }

      return [user, undefined]
    } catch (e) {
      return [undefined, e]
    }
  }

  public async updatePassword(oldPass: string, newPass: string): Promise<Result> {
    try {
      const user: IUser = await Auth.currentAuthenticatedUser()
      await Auth.changePassword(user, oldPass, newPass)

      return [true, undefined]
    } catch (e) {
      return [false, e]
    }
  }

  public async completePassword(user: IUser, newPass: string): Promise<Result> {
    try {
      await Auth.completeNewPassword(user, newPass, {})

      return [true, undefined]
    } catch (e) {
      return [false, e]
    }
  }
}

export default new AuthenticatorService()
