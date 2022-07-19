import type { Ecredit, EcreditOptions, EcreditError } from './'

export interface EcreditAuth {
  success: boolean;
  token?: string;
  error?: EcreditError;
}

export class AuthenticationApi {
  client: Ecredit
  token?: string

  constructor(client: Ecredit, _options?: EcreditOptions) {
    this.client = client
    this.token = undefined
  }

  /*
   * Function to look and see if we already have a token for this instance,
   * and if so, then return it successfully, but if not, then let's fetch
   * one from the CRS Credit eCredit service for the provided credentials,
   * and then save it.
   */
  async checkToken(): Promise<EcreditAuth> {
    // if we already have a token, use it - we can't check it's expiration
    if (this.token) {
      return { success: true, token: this.token }
    }
    // ...at this point, we know there is no token, so get one
    const resp = await this.getToken()
    if (!resp?.success) {
      return { ...resp, success: false }
    }
    // save the token we just got, and return the response
    this.token = resp.token
    return resp
  }

  /*
   * Function to force a refetching of the access token. Maybe it's expired,
   * or the credentials have changed, but for whatever reason, we need to
   * force a token refresh, and this function does just that.
   */
  async resetToken(): Promise<EcreditAuth> {
    this.token = undefined
    return (await this.checkToken())
  }

  /*
   * Function to use the credentials in the host Client instance to make
   * a 'user/login' call to the service and get back the response that will
   * contain a token - shoot that back to the caller and everyone is happy.
   */
  async getToken(): Promise<EcreditAuth> {
    const resp = await this.client.fire(
      'POST',
      'users/login',
      undefined,
      {
        username: this.client.username,
        password: this.client.password,
      }
    )
    if (resp?.response?.status >= 400) {
      return { success: false, error: { ...resp?.payload, type: 'ecredit' } }
    }
    return { success: true, token: resp?.payload?.token }
  }
}
