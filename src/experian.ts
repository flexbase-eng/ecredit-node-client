import type { Ecredit, EcreditOptions, EcreditError } from './'

export interface CreditReport {
  headerRecord?: Header[];
  addressInformation?: AddressInfo[];
  consumerIdentity?: {
    dob: {
      day: string;
      month: string;
      year: string;
    };
    name: Name[];
  };
  employmentInformation?: EmploymentInfo[];
  informationalMessage?: InfoMessage[];
  inquiry?: Inquiry[];
  publicRecord?: PublicRecord[];
  riskModel?: RiskModel[];
  tradeline?: Tradeline[];
  endTotals?: Totals[];
}

export interface Name {
  firstName: string;
  middleName: string;
  surname: string;
  type: string;
}

export interface Header {
  reportDate: string;
  reportTime: string;
  preamble: string;
  versionNo: string;
  mKeywordLength: string;
  mKeywordText: string;
  y2kReportedDate: string;
}

export interface AddressInfo {
  city: string;
  dwellingType: string;
  firstReportedDate: string;
  lastReportingSubscriberCode: string;
  lastUpdatedDate: string;
  source: string;
  state: string;
  streetName: string;
  streetPrefix: string;
  streetSuffix: string;
  timesReported: string;
  unitId: string;
  unitType: string;
  zipCode: string;
}

export interface EmploymentInfo {
  firstReportedDate: string;
  lastUpdatedDate: string;
  name: string;
  source: string;
}

export interface InfoMessage {
  messageNumber: string;
  messageNumberDetailed: string;
  messageText: string;
}

export interface Inquiry {
  amount: string;
  date: string;
  subscriberCode: string;
  subscriberName: string;
  terms: string;
  type: string;
}

export interface PublicRecord {
  courtCode: string;
  courtName: string;
  ecoa: string;
  evaluation: string;
  filingDate: string;
  referenceNumber: string;
  status: string;
  statusDate: string;
}

export interface RiskModel {
  evaluation: string;
  modelIndicator: string;
  score: string;
  scoreFactors: {
    importance: string;
    code: string;
  }[];
}

export interface Tradeline {
  accountNumber: string;
  accountType: string;
  amount1: string;
  amount1Qualifier: string;
  balanceDate: string;
  delinquencies30Days: string;
  delinquencies60Days: string;
  delinquencies90to180Days: string;
  derogCounter: string;
  ecoa: string;
  enhancedPaymentData: EnhancedPaymentData[];
  evaluation: string;
  kob: string;
  monthsHistory: string;
  openDate: string;
  openOrClosed: string;
  paymentHistory: string;
  revolvingOrInstallment: string;
  specialComment: string;
  status: string;
  statusDate: string;
  subscriberCode: string;
  subscriberName: string;
  terms: string;
}

export interface EnhancedPaymentData {
  enhancedAccountCondition: string;
  enhancedAccountType: string;
  enhancedPaymentHistory84: string;
  enhancedPaymentStatus: string;
  enhancedSpecialComment: string;
  enhancedTerms: string;
  enhancedTermsFrequency: string;
  originalLoanAmount: string;
  paymentLevelDate: string;
}

export interface Totals {
  totalSegments: string;
  totalLength: string;
}

import { isEmpty } from './'

export class ExperianApi {
  client: Ecredit

  constructor(client: Ecredit, _options?: EcreditOptions) {
    this.client = client
  }

  /*
   * Function to take some standard User information and run the Basic
   * Experian Credit Report on the data and return it. This is something
   * that should be pretty standard. The optional 'config' is there to
   * indicate what type of Experian Credit Report we are looking to obtain.
   */
  async basic(data: {
    firstName: string,
    middleName?: string,
    lastName: string,
    nameSuffix?: string,
    dob?: string,
    ssn?: string,
    phone?: string,
    street1: string,
    street2?: string,
    city: string,
    state: string,
    zip: string,
  }, options?: {
    config?: string,
  }): Promise<{
    success: boolean,
    report?: CreditReport,
    error?: EcreditError,
  }> {
    let uri = 'experian/credit-profile/credit-report/basic'
    // see if we have been given a 'config' to use
    if (!isEmpty(options?.config)) {
      uri += `/${options?.config}`
    }
    // prep the fields for the the call - if needed
    if (!isEmpty(data.zip)) {
      data.zip = data.zip!.replace(/-/g, '')
    }
    if (!isEmpty(data.ssn)) {
      data.ssn = data.ssn!.replace(/-/g, '')
    }
    // ...now make the call...
    const resp = await this.client.fire('POST', uri, undefined, data )
    if ((resp?.response?.status >= 400) || !isEmpty(resp?.payload?.timestamp)) {
      return { success: false, error: { ...resp?.payload, type: 'ecredit' } }
    }
    return { success: true, report: resp?.payload }
  }
}