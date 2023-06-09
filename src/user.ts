import { Ecredit, EcreditOptions, EcreditError, isEmpty } from './'

/*
No public API docs available. Example response from a /users/logs call:

{
   "hasMore":true,
   "count":40,
   "content":[
      {
         "id":"a22b7541-fa34-409a-a43d-1695a146f49d",
         "type":"EFX",
         "encryptionKey":"4b5404b0-6d9c-4583-9ff5-d04d1ca0a2a6",
         "ip":1806880623,
         "ipAddress":"107.178.207.111",
         "detail":"Individual Report 1",
         "createdAt":"2023-06-08T23:41:38.306+00:00",
         "status":"SUCCESS",
         "method":"POST",
         "description":"Credit Report",
         "product":"Equifax",
         "url":"/api/equifax/credit-report/efx-business-principal-fico9",
         "responseCode":"200",
         "userId":"4bd8352b-b659-4d2f-9814-d0d2c5c59a8b",
         "clientEmail":"fadi@flexbase.app",
         "clientName":"Flexbase",
         "userConfigId":"167067ab-b695-440d-a54c-0946a1d576de",
         "userConfigDesc":"efx-business-principal-fico9 not configured yet"
      },
      ...
    ]
}
*/
export interface UserReport {
    hasMore: boolean
    count: number
    content: UserLog[]
}

export interface UserLog {
    id: string
    type: string
    encryptionKey: string
    ip: number
    ipAddress: string
    detail: string
    createdAt: string
    status: string
    method: string
    description: string
    product: string
    url: string
    responseCode: string
    userId: string
    clientEmail: string
    clientName: string
    userConfigId: string
    userConfigDesc: string
}


export class UserApi {
  client: Ecredit
  
  constructor(client: Ecredit, _options?: EcreditOptions) {
    this.client = client
  }

  /*
   * Function optionally takes page number and returns an array of logs for requests CRS has recorded
   * for the user who generated the auth credentials.
   */
  async basic(data: {
    page?: number,
  },
  options?: {
    config?: string,
  }): Promise<{
    success: boolean,
    requestId: string,
    report?: UserReport,
    error?: EcreditError,
  }> {
    const _page = data.page ?? 0

    let uri = `user/logs?page=${_page}`
    // see if we have been given a 'config' to use
    if (!isEmpty(options?.config)) {
      uri += `/${options?.config}`
    }

    // ...now make the call...
    const resp = await this.client.fire('GET', uri, undefined, data )
    if ((resp?.response?.status >= 400) || !isEmpty(resp?.payload?.timestamp)) {
      return {
        success: false,
        requestId: resp?.response?.headers.get('requestid'),
        error: { ...resp?.payload, type: 'user' }
      }
    }
    return {
      success: true,
      requestId: resp?.response?.headers.get('requestid'),
      report: resp?.payload
    }
  }
}