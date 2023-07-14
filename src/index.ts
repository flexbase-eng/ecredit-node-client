import fetch from 'node-fetch'
import FormData = require('formdata')
import path from 'path'

import { AuthenticationApi } from './authentication'
import { ExperianApi } from './experian'
import { TransUnionApi } from './transunion'
import { EquifaxApi } from './equifax'

const ClientVersion = require('../package.json').version
const PROTOCOL = 'https'
const ECREDIT_HOST = 'withpersona.com/api/v1'

/*
 * These are the acceptable options to the creation of the Client:
 *
 *   {
 *     host: 'withpersona.com/api/v1',
 *     username: "me@myplace.com",
 *     password: "pickle",
 *   }
 *
 * and the construction of the Client will use this data for all
 * calls made to CRS Credit.
 */
export interface EcreditOptions {
  host?: string;
  username?: string;
  password?: string;
}

/*
 * These are the standard error objects from CRS Credit - and will be returned
 * from eCredit API for any bad condition. We will allow these - as well as just
 * strings in the errors being returned from the calls.
 */
export interface EcreditError {
  type: string;
  timestamp?: string;
  codes?: string[];
  messages?: string[];
  details?: string[];
}

/*
 * This is the main constructor of the CRS Credit Client, and will be called
 * with something like:
 *
 *   import { Ecredit } from "@flexbase/ecredit-node-client"
 *   const client = new Ecredit('me@google.com', 'fiddlesticks')
 */
export class Ecredit {
  host: string
  username: string
  password: string
  authentication: AuthenticationApi
  experian: ExperianApi
  transunion: TransUnionApi
  equifax: EquifaxApi

  constructor (username: string, password: string, options?: EcreditOptions) {
    this.host = options?.host ?? ECREDIT_HOST
    this.username = options?.username || username
    this.password = options?.password || password
    // now construct all the specific domain objects
    this.authentication = new AuthenticationApi(this, options)
    this.experian = new ExperianApi(this, options)
    this.transunion = new TransUnionApi(this, options)
    this.equifax = new EquifaxApi(this, options)
  }

  /*
   * Function to fire off a GET, PUT, POST, (method) to the uri, preceeded
   * by the host, with the optional query params, and optional body, and
   * puts the 'apiKey' into the headers for the call, and fires off the call
   * to the Persona host and returns the response.
   */
  async fire(
    method: string,
    uri: string,
    query?: { [index: string] : number | string | string[] | boolean },
    body?: object | object[] | FormData,
  ): Promise<{ response: any, payload?: any }> {
    // build up the complete url from the provided 'uri' and the 'host'
    let url = new URL(PROTOCOL+'://'+path.join(this.host, uri))
    if (query) {
      Object.keys(query).forEach(k => {
        if (something(query![k])) {
          url.searchParams.append(k, query![k].toString())
        }
      })
    }
    const isForm = isFormData(body)
    // make the appropriate headers
    let headers = {
      Accept: 'application/json',
      'X-ECredit-Client-Ver': ClientVersion,
      'Cache-Control': 'no-cache',
    } as any
    if (!isForm) {
      headers = { ...headers, 'Content-Type': 'application/json' }
    }
    // allow a few retries on the authentication token expiration
    let response: any
    for (let cnt = 0; cnt < 3; cnt++) {
      if (uri !== 'users/login' || method !== 'POST') {
        const auth = await this.authentication.checkToken()
        if (!auth?.success) {
          return { response: { payload: auth } }
        }
        headers = { ...headers,
          'Authorization': 'Bearer ' + this.authentication.token,
        }
      }
      // now we can make the call... see if it's a JSON body or a FormData one...
      try {
        response = await fetch(url, {
          method: method,
          body: isForm ? (body as any) : (body ? JSON.stringify(body) : undefined),
          headers,
          redirect: 'follow',
        })
        const payload = await response?.json()
        // check for an invalid token from the service
        if (response.status == 401 && Array.isArray(payload?.messages) &&
            (payload?.messages.includes('User Token Invalid') ||
             payload?.messages.includes('User Token Expired'))) {
          const auth = await this.authentication.resetToken()
          if (!auth?.success) {
            return { response: { ...response, payload: auth } }
          }
          // ...and try it all again... :)
          continue
        }
        return { response, payload }
      } catch (err) {
        return { response }
      }
    }
    // this will mean we retried, and still failed
    return { response }
  }
}

/*
 * Simple function used to weed out undefined and null query params before
 * trying to place them on the call.
 */
function something(arg: any) {
  return arg || arg === false || arg === 0 || arg === ''
}

/*
 * Function to examine the argument and see if it's 'empty' - and this will
 * work for undefined values, and nulls, as well as strings, arrays, and
 * objects. If it's a regular data type - then it's "not empty" - but this
 * will help know if there's something in the data to look at.
 */
export function isEmpty(arg: any): boolean {
  if (arg === undefined || arg === null) {
    return true
  } else if (typeof arg === 'string' || Array.isArray(arg)) {
    return arg.length == 0
  } else if (typeof arg === 'object') {
    return Object.keys(arg).length == 0
  }
  return false
}

/*
 * Simple predicate function to return 'true' if the argument is a FormData
 * object - as that is one of the possible values of the 'body' in the fire()
 * function. We have to handle that differently on the call than when it's
 * a more traditional JSON object body.
 */
function isFormData(arg: any): boolean {
  let ans = false
  if (arg && typeof arg === 'object') {
    ans = (typeof arg._boundary === 'string' &&
           arg._boundary.length > 20 &&
           Array.isArray(arg._streams))
  }
  return ans
}

/*
 * Convenience function to create a EcreditError based on a simple message
 * from the Client code. This is an easy way to make EcreditError instances
 * from the simple error messages we have in this code.
 */
export function mkError(message: string): EcreditError {
  return {
    type: 'client',
    timestamp: new Date().toISOString(),
    messages: [message],
  }
}

/*
 * Function to recursively remove all the 'empty' values from the provided
 * Object and return what's left. This will not cover the complete boolean
 * falsey set.
 */
export function removeEmpty(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(itm => removeEmpty(itm)) }
  else if (typeof obj === 'object') {
    return Object.entries(obj)
      .filter(([_k, v]) => !isEmpty(v))
      .reduce(
        (acc, [k, v]) => (
          { ...acc, [k]: v === Object(v) ? removeEmpty(v) : v }
        ), {}
      )
  }
  return obj
}
