import { Auth } from 'aws-amplify'

export type Result = [boolean, Error | undefined]

class AuthenticatorService {
  public async login(username: string, password: string): Promise<Result> {
    try {
      await Auth.signIn(username, password)
    } catch (e) {
      return [false, e]
    }

    return [true, undefined]
  }
}

export default new AuthenticatorService()
