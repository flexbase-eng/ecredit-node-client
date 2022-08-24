import type { Ecredit, EcreditOptions, EcreditError } from './'

export interface CreditReport {
  fileNumber: string;
  fileSummary: {
    fileHitIndicator: string;
    ssnMatchIndicator: string;
    consumerStatementIndicator: boolean;
    market: string;
    submarket: string;
    creditDataStatus: {
      suppressed: boolean;
      doNotPromote: {
        indicator: boolean;
      };
      freeze: {
        indicator: boolean;
      };
      minor: boolean;
      disputed: boolean;
    };
    inFileSinceDate: Date;
  };
  indicative: {
    names: Name[]
    addresses: Address[];
    socialSecurities: {
      number: string;
      source: string;
    }[];
    dateOfBirths: Date[];
    ages: any[];
    phones: any[];
    employments: Employment[];
    creditCards: any[];
    genders: any[];
    vehicles: any[];
  };
  originalInputs: any[];
  custom: {
    credit: {
      trades: Trade[];
      collections: Collection[];
      publicRecords: any[];
      inquiries: Inquiry[];
    };
  };
  addOnProducts: Product[];
}

export interface Date {
  value: string;
  estimatedCentury: boolean;
  estimatedYear: boolean;
  estimatedMonth: boolean;
  estimatedDay: boolean;
}

export interface Remark {
  code: string;
  type: string;
};

export interface Name {
  person: {
    first?: string;
    middle?: string;
    last?: string;
  };
  source: string;
}

export interface Address {
  status: string;
  qualifier: string;
  street: {
    unparseds?: string[];
    number?: string;
    name?: string;
    preDirectional?: string;
    type?: string;
  };
  location: {
    city: string;
    state: string;
    zipCode?: string;
  };
  dateReported: Date;
  source: string;
};

export interface Employment {
  employer: {
    unparsed: string;
  };
  occupation: string;
  dateOnFileSince: Date;
  dateEffective: Date;
  source: string;
};

export interface Trade {
  subscriber: {
    industryCode: string;
    memberCode: string;
    name: {
      unparsed: string;
    };
  };
  portfolioType: string;
  accountNumber: string;
  dateOpened: Date;
  dateEffective: Date;
  currentBalance: string;
  highCredit: string;
  accountRating: string;
  remarks: Remark[];
  pastDue: string;
  paymentHistory: {
    maxDelinquencies: any[];
  };
  accountHistories: any[];
  updateMethod: string;
  ecoadesignator: string;
};

export interface Collection {
  subscriber: {
    industryCode: string;
    memberCode: string;
    name: {
      unparsed: string;
    };
  };
  portfolioType: string;
  accountNumber: string;
  dateOpened: Date;
  dateEffective: Date;
  currentBalance: string;
  original: {
    creditGrantor: {
      unparsed: string;
    };
    creditorClassification: string;
    balance: string;
  };
  pastDue: string;
  accountRating: string;
  remarks: Remark[];
  updateMethod: string;
  ecoadesignator: string;
};

export interface Inquiry {
  subscriber: {
    industryCode: string;
    memberCode: string;
    inquirySubscriberPrefixCode: string;
    name: {
      unparsed: string;
    };
  };
  date: Date;
  ecoadesignator: string;
};

export interface Product {
  code: string;
  status: string;
  idMismatchAlerts: {
    type: string;
    condition: string;
    inquiriesInLast60Count: string;
    addressStatus: string;
  }[];
  addressAnalysises: any[];
  creditorContacts: any[];
  scoreModel?: {
    score: {
      results: string;
      derogatoryAlert: boolean;
      fileInquiriesImpactedScore: boolean;
      factors: {
        factors: {
          rank: string;
          code: string;
        }[];
      };
    };
    characteristics: any[];
    messages: any[];
    statements: any[];
    consumerStatements: any[];
    complianceConditions: any[];
    idMismatchAlerts: any[];
  };
};

import { isEmpty } from './'

export class TransUnionApi {
  client: Ecredit

  constructor(client: Ecredit, _options?: EcreditOptions) {
    this.client = client
  }

  /*
   * Function to take some standard User information and run the Basic
   * TransUnion Credit Report on the data and return it. This is something
   * that should be pretty standard. The optional 'config' is there to
   * indicate what type of TransUnion Credit Report we are looking to obtain.
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
    let uri = 'transunion/credit-report/basic'
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

  /*
   * Simple function to extract the FICO Score from the Experian Report
   * and return it - or `undefined` if there's nothing to be found.
   */
  ficoScore(rpt: CreditReport): string | number | undefined {
    let score
    const fico = (rpt?.addOnProducts ?? [])
      .find(rm => rm.code === '00W18')
    if (fico?.scoreModel?.score?.results) {
      score = Number(fico.scoreModel.score.results)
    }
    return score
  }

  /*
   * Simple predicate function to look and see if the User's credit has
   * been 'frozen' so that Credit Reports can't be run against it - for
   * anti-fraud reasons.
   */
  isFrozen(rpt: CreditReport): boolean {
    const ind = rpt?.fileSummary?.creditDataStatus?.freeze?.indicator
    return !!ind
  }

  /*
   * Function to look at the public records of the TransUnion data and
   * return a string[] of all the records - mostly Bankruptcies - that
   * are on this credit report.
   */
  publicRecords(rpt: CreditReport): string[] {
    let ans = [] as string[]
    const recs = rpt?.custom?.credit?.publicRecords ?? []
    for (const r of recs) {
      const code = this.publicCodes[r?.type] as string
      if (code) {
        ans.push(code)
      }
    }
    return ans
  }

  // ...and these are the codes for publicRecords
  publicCodes = {
    'CP': 'Child support',
    '1D': 'Chapter 11 bankruptcy dismissed/closed',
    '1F': 'Chapter 11 bankruptcy filing',
    '1V': 'Chapter 11 bankruptcy voluntary dismissal',
    '1X': 'Chapter 11 bankruptcy discharged',
    '2D': 'Chapter 12 bankruptcy dismissed/closed',
    '2F': 'Chapter 12 bankruptcy filing',
    '2V': 'Chapter 12 bankruptcy voluntary dismissal',
    '2X': 'Chapter 12 bankruptcy discharged',
    '3D': 'Chapter 13 bankruptcy dismissed/closed',
    '3F': 'Chapter 13 bankruptcy filing',
    '3V': 'Chapter 13 bankruptcy voluntary dismissal',
    '3X': 'Chapter 13 bankruptcy discharged',
    '7D': 'Chapter 7 bankruptcy dismissed/closed',
    '7F': 'Chapter 7 bankruptcy filing',
    '7V': 'Chapter 7 bankruptcy voluntary dismissal',
    '7X': 'Chapter 7 bankruptcy discharged',
  } as { [index: string] : string }
}
