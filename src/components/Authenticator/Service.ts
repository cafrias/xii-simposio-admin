import { Auth } from 'aws-amplify'

import { ErrNewPassword } from './errors'

export type Result = [boolean, Error | undefined]

interface ICognitoUser {
  Session: string,
  authenticationFlowType: string,
  challengeName: string,
}

class AuthenticatorService {
  public async login(username: string, password: string): Promise<Result> {
    try {
      const user: ICognitoUser = await Auth.signIn(username, password)

      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        return [true, new Error(ErrNewPassword)]
      }

      return [true, undefined]
    } catch (e) {
      return [false, e]
    }
  }
}

export default new AuthenticatorService()
