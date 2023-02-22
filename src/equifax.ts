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

import { isEmpty } from './'

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
        requestId: resp?.response?.headers.get('requestid'),
        error: { ...resp?.payload, type: 'ecredit' }
      }
    }
    return {
      success: true,
      requestId: resp?.response?.headers.get('requestid'),
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
   * Function to look at the public records of the TransUnion data and
   * return a string[] of all the records - mostly Bankruptcies - that
   * are on this credit report.
   */
  bankruptcies(rpt: CreditReport): string[] {
    let ans = [] as string[]
    const recs = rpt?.data?.bankruptcies ?? []
    for (const r of recs) {
      let code = ''
      if (r.priorIntentOrDispositionCode?.description) {
        code += `Prior Disposition: ${r.priorIntentOrDispositionCode?.description}`
      }
      if (r.currentIntentOrDispositionCode?.description) {
        if (code.length > 0) {
          code += '... '
        }
        code += `Current Disposition: ${r.currentIntentOrDispositionCode?.description}`
      }
      if (code.length > 0) {
        ans.push(code)
      }
    }
    return ans
  }
}
