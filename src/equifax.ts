import type { Ecredit, EcreditOptions, EcreditError } from './'

export interface CreditReport {
  pdfReportId: string;
  data: {
    identifier: string;
    customerReferenceNumber: string;
    customerNumber: string;
    consumerReferralCode: string;
    multipleReportIndicator: string;
    ECOAInquiryType: string;
    numberOfMonthsToCountInquiries?: string;
    hitCode: Code;
    fileSinceDate: string;
    lastActivityDate: string;
    reportDate: string;
    subjectName: Name;
    subjectSocialNum: string;
    birthDate: string;
    age: string;
    nameMatchFlags: {
      firstNameMatchFlag: string;
      lastNameMatchFlag: string;
      middleNameMatchFlag: string;
      suffixMatchFlag: string;
    },
    linkIndicator: string;
    doNotCombineIndicator: string;
    addressDiscrepancyIndicator: string;
    fraudSocialNumAlertCode: Code;
    fraudVictimIndicator: Code;
    addresses: Address[];
    identityScan: {
      alertCodes: Code[];
      identityScanRegulated: string;
    },
    formerNames: Name[];
    deathDate: string;
    employments: Employment[];
    otherIdentification: Identification[];
    bankruptcies: Bankruptcy[];
    collections: Collection[];
    fileIdentificationNumber: string;
    alertContacts: AlertContact[];
    trades: Trade[];
    inquiries: Inquiry[];
    consumerStatements: ConsumerStatement[];
    models: Model[];
    onlineDirectory: BusinessInfo[];
    identification: {
      subjectAge: string;
      subjectSocialNum: string;
      socialNumConfirmed: string;
      socialMatchFlags: string;
      inquirySocialNum: string;
      inquirySocialNumStateIssued: string;
      inquirySocialNumYearIssued: string;
      inquirySocialNumYearOfDeath: string;
      inquirySocialNumStateOfDeath: string;
      socialNumMatch: string;
    };
    attributes: {
      modelNumber: string;
      numberOfVariableFields: string;
      attributes: {
        identifier: string;
        value: string;
      }[];
    }[];
    onlineGeoCode: GeoCode[];
    OFACAlerts: any[];
    consumerReferralLocation: {
      bureauCode: string;
      bureauName: string;
      address: {
        primaryAddress: string;
        secondaryAddress: string;
        cityName: string;
        stateAbbreviation: string;
        zipCode: string;
      };
      telephoneNumber: {
        TelephoneNumber: string;
      };
    };
    alternateDataSources: {
      alternateDataSourceErrorMessage: {
        customerReferenceNumber: string;
        customerNumber: string;
        errorType: string;
        alternateDataSourceCode: {
          code: string;
          description: string;
          errorCodes: string[];
        }[];
      }[];
      militaryLendingCoveredBorrower: {
        regulatedIdentifier: string;
        disclaimer: string;
        coveredBorrowerStatus: string;
        insufficientDataProvidedForMatch: string;
        referralContactNumber: string;
      };
      northAmericanLink: {
        regulatedIdentifier: string;
        hitNohitIndicator: string;
        INTL5FFFConsumerReport: string;
      };
      fraudIQSyntheticIDAlerts: {
        nonRegulatedIdentifier: string;
        hitNohitIndicator: string;
        disclaimer: string;
        finalAssessmentFlag: string;
        authorizedUserVelocityFlag: string;
        idDiscrepancyFlag: string;
        numberOfAuthorizedUsers: string;
        numberOfTerminatedUsers: string;
      };
      fraudIQSyntheticIDV2Alerts: {
        nonRegulatedIdentifier: string;
        hitNohitIndicator: string;
        syntheticIdVer2: string;
      };
    }
  }
}

export interface Name {
  lastName: string;
  firstName: string;
  middleInitial: string;
  suffix: string;
}

export interface Code {
  code: string;
  description: string;
}

export interface Address {
  addressType: string;
  houseNumber: string;
  streetName: string;
  streetType: string;
  cityName: string;
  stateAbbreviation: string;
  zipCode: string;
  rentOwnBuy: string;
  sourceOfAddress: Code
  telephoneNumber: string;
  sourceOfTelephoneNumber: Code;
  addressVarianceIndicator: Code;
  addressLine1: string;
  dateFirstReported: string;
  dateLastReported: string;
  dateTelephoneReported: string;
}

export interface MailingAddress {
  addressLine1: string;
  addressLine2?: string;
  cityName: string;
  stateAbbreviation: string;
  zipCode: string;
  countryCode: string;
}

export interface PhoneNumber {
  telephoneNumberType: Code;
  countryCode: string;
  telephoneNumber: string;
  extension: string;
}

export interface BusinessInfo {
  customerNumber: string;
  customerName: string;
  telephoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateAbbreviation: string;
  zipCode: string;
}

export interface Employment {
  identifier: string;
  occupation: string;
  employer: string;
  dateLastReported: string;
  dateFirstReported: string;
}

export interface Identification {
  dateReported: string;
  typeCode: Code;
  identificationNumber: string;
  reasonCode: Code;
}

export interface Bankruptcy {
  customerNumber: string;
  type: string;
  filer: string;
  industryCode: string;
  currentIntentOrDispositionCode: Code;
  narrativeCodes: any[];
  rawNarrativeCodes: string[];
  caseNumber: string;
  dispositionDate: string;
  dateFiled: string;
  currentDispositionDate: string;
  verifiedDate: string;
  priorIntentOrDispositionCode: Code;
  dateReported: string;
}

export interface Collection {
  industryCode: string;
  customerNumber: string;
  clientNameOrNumber: string;
  statusCode: Code;
  narrativeCodes: any[];
  rawNarrativeCodes: string[];
  indicator: string;
  dateReported: string;
  dateAssigned: string;
  originalAmount: string;
  statusDate: string;
  balance: string;
  lastPaymentDate: string;
  dateOfFirstDelinquency: string;
  accountNumber: string;
  accountDesignatorCode: Code;
  creditorClassificationCode: Code;
}

export interface AlertContact {
  alertType: Code;
  dateReported: string;
  effectiveDate: string;
  status: string;
  telephoneNumbers: PhoneNumber[];
  address: MailingAddress;
  additionalInformation: string;
}

export interface Trade {
  automatedUpdateIndicator: string;
  monthsReviewed: string;
  accountDesignator: Code;
  accountNumber: string;
  thirtyDayCounter: number;
  sixtyDayCounter: number;
  ninetyDayCounter: number;
  previousHighRate1: number;
  previousHighDate1: string;
  previousHighRate2: number;
  previousHighDate2: string;
  previousHighRate3: number;
  previousHighDate3: string;
  // 24MonthPaymentHistory: Code[];
  customerName: string;
  customerNumber: string;
  dateReported: string;
  dateOpened: string;
  highCredit: number;
  creditLimit: number;
  balance: number;
  pastDueAmount: number;
  portfolioTypeCode: Code;
  rateStatusCode: Code;
  rate: Code;
  lastActivityDate: string;
  narrativeCodes: any[];
  rawNarrativeCodes: string[];
  accountTypeCode: Code;
  lastPaymentDate: string;
  closedDate: string;
  dateMajorDelinquencyFirstReported: string;
  actualPaymentAmount: number;
  scheduledPaymentAmount: number;
  termsFrequencyCode: Code;
  termsDurationCode: Code;
  purchasedFromOrSoldCreditorIndicator: Code;
  purchasedFromOrSoldCreditorName: string;
  creditorClassificationCode: Code;
  activityDesignatorCode: Code;
  originalChargeOffAmount: number;
  deferredPaymentStartDate: string;
  ballonPaymentAmount: number;
  ballonPaymentDueDate: string;
  mortgageIDNumber: string;
  paymentHistory1to24: Code[];
  paymentHistory25to36: Code[];
  paymentHistory37to48: Code[];
  previousHighRatePaymentHistory: string;
  previousHighDatePaymentHistory: string;
  dimensionsDataStartDate: string;
  dimensionsNumberOfMonths: string;
  dimension: TradeDimension[];
}

export interface TradeDimension {
  dimensionsBalance: number;
  dimensionsActualPaymentAmount: number;
  dimensionsScheduledPaymentAmount: number;
  dimensionsLastPaymentDate: string;
  dimensionsHighCredit: number;
  dimensionsCreditLimit: number;
  dimensionsPastDueAmount: number;
  dimensionsNarrativeCodes: any[];
  dimensionsRawNarrativeCodes: string[];
  dimensionsAccountDesignatorCode: Code;
  dimensionsAccountTypeCode: Code;
}

export interface Inquiry {
  type: string;
  industryCode: string;
  inquiryDate: string;
  customerNumber: string;
  customerName: string;
  expandedAccountTypeOrInquiryIntent: Code;
}

export interface ConsumerStatement {
  dateReported: string;
  datePurged: string;
  statement: string;
}

export interface Model {
  type: string;
  modelNumber: string;
  FICOScoreIndicatorCode: Code;
  score: number;
  reasons: Code[];
  inquiryKeyFactor: Code;
  riskBasedPricingOrModel: {
    percentage: string;
    lowRange: string;
    highRange: string;
  };
  rejects: Code[];
  EDASRegionalIndicatorCode: Code;
  EDASIndicatorCode: Code;
  modelIDOrScorecard: string;
  scoreNumberOrMarketMaxIndustryCode: Code;
  numericScoreIndicator: string;
}

export interface GeoCode {
  geoSMSACode: string;
  geoStateCode: string;
  geoCountyCode: string;
  geoCensusTract: string;
  geoSuffix: string;
  geoBlockGroup: string;
  streetNumber: string;
  streetName: string;
  streetTypeOrDirection: string;
  geoSMSA5DigitCode: string;
  city: string;
  stateAbbreviation: string;
  zipCode: string;
  typeOfAddress: Code;
  returnCode1: Code;
  returnCode2: Code;
  returnCode3: Code;
  returnCode4: Code;
  microVisionCode: string;
  microVisionReturnCode: string;
}

import { isEmpty, toUsd } from './'

export class EquifaxApi {
  client: Ecredit

  constructor(client: Ecredit, _options?: EcreditOptions) {
    this.client = client
  }

  /*
   * Function to take some standard User information and run the Basic
   * Equifax Credit Report on the data and return it. This is something
   * that should be pretty standard. The optional 'config' is there to
   * indicate what type of Equifax Credit Report we are looking to obtain.
   */
  async basic(data: {
    firstName: string,
    middleName?: string,
    lastName: string,
    suffix?: string,
    age?: string,
    dob?: string,
    ssn?: string,
    phone?: string,
    houseNumber?: string,
    quadrant?: string,
    streetName?: string,
    streetType?: string,
    apartmentNumber?: string,
    city: string,
    state: string,
    zip?: string,
    occupation?: string,
    employerName?: string,
  }, options?: {
    config?: string,
  }): Promise<{
    success: boolean,
    requestId: string,
    report?: CreditReport,
    error?: EcreditError,
  }> {
    let uri = 'equifax/credit-report'
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
    if (!isEmpty(data.phone)) {
      data.phone = data.phone!.replace(/-/g, '')
    }
    // ...now make the call...
    const resp = await this.client.fire('POST', uri, undefined, data )
    if ((resp?.response?.status >= 400) || !isEmpty(resp?.payload?.timestamp)) {
      return {
        success: false,
        requestId: resp?.response?.headers?.get('requestid'),
        error: { ...resp?.payload, type: 'ecredit' }
      }
    }
    return {
      success: true,
      requestId: resp?.response?.headers?.get('requestid'),
      report: resp?.payload
    }
  }

  /*
   * Simple function to extract the FICO Score from the Equifax Report
   * and return it - or `undefined` if there's nothing to be found.
   */
  ficoScore(rpt: CreditReport): number | undefined {
    let score
    const fico = (rpt?.data?.models ?? [])
      .find(rm => rm.modelNumber === '05206')
    if (fico?.score) {
      score = Number(fico?.score)
    }
    return score
  }

  /*
   * Simple predicate function to look and see if the User's credit has
   * been 'frozen' so that Credit Reports can't be run against it - for
   * anti-fraud reasons.
   */
  isFrozen(rpt: CreditReport): boolean {
    return /.* Requested Security Freeze .*/.test(rpt?.data?.hitCode?.description ?? '')
  }

  /*
   * Function to look at the public records of the Equifax data and
   * return a string[] of all the records - mostly Bankruptcies - that
   * are on this credit report.
   */
  bankruptcies(rpt: CreditReport): string[] {
    let ans = [] as string[]
    const recs = rpt?.data?.bankruptcies ?? []
    for (const r of recs) {
      let code = ''
      if (r.priorIntentOrDispositionCode?.description) {
        if (r.dateFiled) {
          const y = r.dateFiled.substr(-4)
          const m = r.dateFiled.substr(0, 2)
          const d = r.dateFiled.substr(2, 2)
          code += `[${y}-${m}-${d}] `
        }
        code += `Prior Disposition: ${r.priorIntentOrDispositionCode?.description}`
      }
      if (r.currentIntentOrDispositionCode?.description) {
        if (code.length > 0) {
          code += '... '
        }
        if (r.currentDispositionDate) {
          const y = r.currentDispositionDate.substr(-4)
          const m = r.currentDispositionDate.substr(0, 2)
          const d = r.currentDispositionDate.substr(2, 2)
          code += `[${y}-${m}-${d}] `
        }
        code += `Current Disposition: ${r.currentIntentOrDispositionCode?.description}`
      }
      if (code.length > 0) {
        ans.push(code)
      }
    }
    return ans
  }

  /*
   * Function to look at the public records of the Equifax data and
   * return a string[] of all the records of the hard credit pulls
   * of the form: "[YYYY-MM-DD] Company".
   */
  hardPulls(rpt: CreditReport): string[] {
    let ans = [] as string[]
    const recs = rpt?.data?.inquiries ?? []
    for (const r of recs) {
      let code = ''
      if (r.inquiryDate) {
        const y = r.inquiryDate.substr(-4)
        const m = r.inquiryDate.substr(0, 2)
        const d = r.inquiryDate.substr(2, 2)
        code += `[${y}-${m}-${d}] `
      }
      code += (r.customerName ?? '')
      if (code.length > 0) {
        ans.push(code)
      }
    }
    return ans
  }

  /*
   * Function to return the FICO Reasons as an array of strings
   * in the same order as they are returned by Equifax to us, so
   * that the caller can have a human-readable set of reasons that
   * the FICO score is what it is. This is very useful.
   */
  reasons(rpt: CreditReport): string[] {
    let ans = [] as string[]
    const fico = (rpt?.data?.models ?? [])
      .find(rm => rm.modelNumber === '05206')
    for (const r of (fico?.reasons ?? [])) {
      ans.push(ficoReasons[Number(r.code)])
    }
    return ans
  }

  /*
   * Function to format the Trades in the CreditReport and format
   * each as a concise description for display. This is just another
   * way to look at the Trades, aka credit lines.
   */
  creditLines(rpt: CreditReport): string[] {
    let ans = [] as string[]
    const lines = rpt?.data?.trades ?? []
    for (const l of lines) {
      let code = `${l.customerName} [${isEmpty(l.closedDate) ? 'Open' : 'Closed'}] `
      if (!isEmpty(l.portfolioTypeCode?.description)) {
        code += l.portfolioTypeCode?.description
      }
      code += `, max: ${toUsd(l.highCredit)}, balance: ${toUsd(l.balance)}`
      if (code.length > 24) {
        ans.push(code)
      }
    }
    return ans
  }

  /*
   * Function to return the Hit Code from Equifax and CRS that
   * can be very useful if it's *not* 'Hit' - so it is useful
   * to check this by the caller to make sure things went well.
   */
  hitCode(rpt: CreditReport): string | undefined {
    let ans
    const hit = rpt?.data?.hitCode
    if (hit?.description) {
      ans = hit.description
    }
    return ans
  }
}

/*
 * These are all the Equifax FICO Reason Codes, that will appear in
 * the 'reasons' of the FICO model entry. These are the mapping of
 * the codes to human-readable reasons.
 */
const ficoCodes = [
  ['0', 'Returned when FICO does not return a reason code (NO VERBIAGE RETURNED)'],
  ['1', 'Amount owed on accounts is too high'],
  ['2', 'Level of delinquency on accounts'],
  ['3', 'Too few bank revolving accounts'],
  ['4', 'Too many bank or national revolving accounts'],
  ['5', 'Too many accounts with balances'],
  ['6', 'Too many consumer finance company accounts'],
  ['7', 'Account payment history is too new to rate'],
  ['8', 'Too many inquiries last 12 months'],
  ['9', 'Too many accounts recently opened'],
  ['10', 'Ratio of balance to limit on bank revolving or other rev accts too high'],
  ['11', 'Amount owed on revolving accounts is too high'],
  ['12', 'Length of time revolving accounts have been established'],
  ['13', 'Time since delinquency is too recent or unknown'],
  ['14', 'Length of time accounts have been established'],
  ['15', 'Lack of recent bank revolving information'],
  ['16', 'Lack of recent revolving account information'],
  ['17', 'No recent non-mortgage balance information'],
  ['18', 'Number of accounts with delinquency'],
  ['19', 'Too few accounts currently paid as agreed'],
  ['20', 'Length of time since derogatory public record or collection is too short'],
  ['21', 'Amount past due on accounts'],
  ['23', 'Number of bank or national revolving accounts with balances'],
  ['24', 'No recent revolving balances'],
  ['25', 'Length of time installment loans have been established (Industry Scores only)'],
  ['26', 'Number of revolving accounts (Industry Scores only)'],
  ['28', 'Number of established accounts'],
  ['29', 'No recent bank/national revolving balances'],
  ['30', 'Time since most recent account opening is too short'],
  ['31', 'Too few accounts with recent payment information'],
  ['32', 'Lack of recent installment loan information'],
  ['33', 'Proportion of loan balances to loan amounts is too high'],
  ['34', 'Amount owed on delinquent accounts'],
  ['36', 'Length of time open installment loans have been established'],
  ['38', 'Serious delinquency, and derogatory public record or collection filed'],
  ['39', 'Serious delinquency'],
  ['40', 'Derogatory public record or collection filed'],
  ['53', 'Amount paid down on open mortgage loans is too low 55* Amount paid down on open installment loans is too low'],
  ['58', 'Proportion of balances to loan amounts on mortgage accounts is too high'],
  ['59', 'Lack of recent revolving HELOC information'],
  ['62', 'Proportion of balances to credit limits on revolving HELOC accounts is too high'],
  ['64', 'Proportion of revolving HELOC balances to total revolving balances is too high'],
  ['65', 'Length of time bank/national revolving accounts have been established'],
  ['67', 'Length of time open mortgage loans have been established'],
  ['70', 'Amount owed on mortgage loans is too high'],
  ['71', 'Too many recently opened installment accounts'],
  ['77', 'Proportion of balances to loan amounts on revolving auto accounts is too high'],
  ['78', 'Length of time reported mortgage accounts have been established'],
  ['79', 'Lack of recent reported mortgage loan information'],
  ['81', 'Frequency of delinquency'],
  ['85', 'Too few active accounts'],
  ['96', 'Too many mortgage loans with balances'],
  ['98', 'Lack of recent auto finance loan information (Industry Scores only)'],
  ['99', 'Lack of recent consumer finance company account information (Industry Scores only)'],
]
/*
 * Now let's make a sparse array where each of the codes is an index, and
 * the value at that index is the string reason. This will make lookup by
 * numeric code much easier.
 */
const ficoReasons = ficoCodes.reduce((acc: string[], tup: string[]) => {
  acc[Number(tup[0])] = tup[1]
  return acc
}, [] as string[])
