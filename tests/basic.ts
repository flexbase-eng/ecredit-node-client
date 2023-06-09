import { Ecredit } from '../src/index'

(async () => {
  const client = new Ecredit(
    process.env.ECREDIT_USERNAME!,
    process.env.ECREDIT_PASSWORD!,
    { host: process.env.ECREDIT_HOST! }
  )

  const laurie = {
    firstName: 'ANDERSON',
    lastName: 'LAURIE',
    ssn: '666-45-5730',
    street1: '9817 LOOP BLVD',
    street2: 'APT G',
    city: 'CALIFORNIA CITY',
    state: 'CA',
    zip: '93505-1352',
  }

  console.log('doing a soft pull from Experian for Vantage score...')
  const one = await client.experian.basic(laurie, { config: 'exp-prequal-vantage4' })
  // console.log('ONE', one)
  if (one.success) {
    console.log(`Success! Pulled the prequal report for test person... Vantage Score: ${client.experian.vantageScore(one?.report!)}`)
  } else {
    console.log('Error! Getting soft Experian Vantage pull failed, and the output is:')
    console.log(one)
  }

  console.log('doing a hard pull from Experian Vantage score...')
  const two = await client.experian.basic(laurie, { config: 'exp-hard-vantage4' })
  // console.log('TWO', two)
  if (two.success) {
    console.log(`Success! Pulled the hard report for test person... Vantage Score: ${client.experian.vantageScore(two?.report!)}`)
  } else {
    console.log('Error! Getting hard Experian Vantage pull failed, and the output is:')
    console.log(two)
  }

  console.log('doing a soft pull from Experian for FICO score...')
  const tre = await client.experian.basic(laurie, { config: 'exp-prequal-fico9' })
  // console.log('TRE', tre)
  if (tre.success) {
    console.log(`Success! Pulled the prequal report for test person... FICO Score: ${client.experian.ficoScore(tre?.report!)}`)
  } else {
    console.log('Error! Getting soft Experian FICO pull failed, and the output is:')
    console.log(tre)
  }

  console.log('doing a hard pull from Experian for FICO score...')
  const fou = await client.experian.basic(laurie, { config: 'exp-hard-fico9' })
  // console.log('FOU', fou)
  if (fou.success) {
    console.log(`Success! Pulled the hard report for test person... FICO Score: ${client.experian.ficoScore(fou?.report!)}`)
  } else {
    console.log('Error! Getting hard Experian FICO pull failed, and the output is:')
    console.log(fou)
  }

  const mark = {
    firstName: 'MARK',
    lastName: 'KINTEH',
    street1: '4930 KNIGHTS WAY',
    street2: '',
    city: 'ANCHORAGE',
    state: 'AK',
    zip: '99508-4808',
    ssn: '666-53-3460'
  }

  console.log('doing a soft pull from Experian for FICO score on a frozen account...')
  const fiv = await client.experian.basic(mark, { config: 'exp-prequal-fico9' })
  // console.log('FIV', fiv)
  if (fiv.success) {
    console.log(`Success! Pulled the prequal report for test person with a frozen account: ${client.experian.isFrozen(fiv?.report!)}`)
  } else {
    console.log('Error! Getting soft Experian FICO pull failed, and the output is:')
    console.log(fiv)
  }

  const zelnino = {
    firstName: 'ZELNINO',
    middleName: 'X',
    lastName: 'WINTER',
    street1: '760WSPROULRD',
    city: 'FANTASYISLAND',
    state: 'IL',
    zip: '60750',
    ssn: '666125812'
  }

  console.log('doing a soft pull from TransUnion for FICO score...')
  const six = await client.transunion.basic(zelnino, { config: 'tu-prequal-fico9' })
  // console.log('SIX', six?.report)
  if (six.success) {
    console.log(`Success! Pulled the prequal report for test person... FICO Score: ${client.transunion.ficoScore(six?.report!)}`)
    console.log(`Success! Pulled the prequal report for test person... Credit Frozen: ${client.transunion.isFrozen(six?.report!)}`)
    console.log('Issues', client.transunion.publicRecords(six?.report!))
  } else {
    console.log('Error! Getting soft Experian FICO pull failed, and the output is:')
    console.log(six)
  }

  console.log('doing a hard pull from TransUnion for FICO score...')
  const sev = await client.transunion.basic(zelnino, { config: 'tu-hard-fico9' })
  // console.log('SEV', sev?.report)
  if (sev.success) {
    console.log(`Success! Pulled the prequal report for test person... FICO Score: ${client.transunion.ficoScore(sev?.report!)}`)
    console.log(`Success! Pulled the prequal report for test person... Credit Frozen: ${client.transunion.isFrozen(sev?.report!)}`)
    console.log('Issues', client.transunion.publicRecords(sev?.report!))
  } else {
    console.log('Error! Getting soft Experian FICO pull failed, and the output is:')
    console.log(sev)
  }

  const taron = {
    firstName: 'Taron',
    middleName: '',
    lastName: 'Mason',
    street1: '204 WINN RD',
    city: 'Lee',
    state: 'ME',
    zip: '04455-4216',
    ssn:  '666319724',
  }

  console.log('doing a soft pull from TransUnion for FICO score...')
  const eig = await client.transunion.basic(taron, { config: 'tu-hard-fico9' })
  // console.log('EIG', eig?.report)
  if (eig.success) {
    console.log(`Success! Pulled the prequal report for test person... FICO Score: ${client.transunion.ficoScore(eig?.report!)}`)
    console.log(`Success! Pulled the prequal report for test person... Credit Frozen: ${client.transunion.isFrozen(eig?.report!)}`)
    console.log('Issues', client.transunion.publicRecords(eig?.report!))
  } else {
    console.log('Error! Getting soft Experian FICO pull failed, and the output is:')
    console.log(eig)
  }

  const asad = {
    firstName: 'ASAD',
    lastName: 'YCSWL',
    houseNumber: '8615',
    quadrant: 'NW',
    streetName: 'Black Tern',
    streetType: 'LN',
    city: 'HOUSTON',
    state: 'TX',
    zip: '77040',
    ssn: '666-17-6062',
    dob: '1985-05-06',
    phone: '713-555-1212'
  }

  console.log('doing a soft pull from Equifax for normal FICO score...')
  const nin = await client.equifax.basic(asad, { config: 'efx-business-principal-fico9' })
  // console.log('NIN', nin?.report)
  if (nin.success) {
    console.log(`Success! Pulled the biz report for test person... FICO Score: ${client.equifax.ficoScore(nin?.report!)}`)
    console.log(`Success! Pulled the biz report for test person... Credit Frozen: ${client.equifax.isFrozen(nin?.report!)}`)
    console.log('Bankruptcies', client.equifax.bankruptcies(nin?.report!))
    console.log('Hard Pulls', client.equifax.hardPulls(nin?.report!))
    console.log('Reasons', client.equifax.reasons(nin?.report!))
  } else {
    console.log('Error! Getting soft Experian FICO pull failed, and the output is:')
    console.log(nin)
  }

  const llift = {
    firstName: 'NOOR',
    lastName: 'LLIFT',
    houseNumber: '41',
    streetName: 'WJEKH',
    city: 'CHESTER',
    state: 'VA',
    zip: '23831',
    ssn: '666-09-1621',
  }

  console.log('doing a soft pull from Equifax for a Frozen user...')
  const ten = await client.equifax.basic(llift, { config: 'efx-business-principal-fico9' })
  // console.log('ten', ten?.report)
  if (ten.success) {
    console.log(`Success! Pulled the biz report for test person... FICO Score: ${client.equifax.ficoScore(ten?.report!)}`)
    console.log(`Success! Pulled the biz report for test person... Credit Frozen: ${client.equifax.isFrozen(ten?.report!)}`)
    console.log('Bankruptcies', client.equifax.bankruptcies(ten?.report!))
  } else {
    console.log('Error! Getting soft Experian FICO pull failed, and the output is:')
    console.log(ten)
  }

  const bbyy = {
    firstName: 'JENNIFER',
    lastName: 'BBYY',
    houseNumber: '926',
    streetName: 'L LJEHFW',
    streetType: 'ST',
    city: 'ASHLAND',
    state: 'OH',
    zip: '44805',
    ssn: '666-79-9162',
  }

  console.log('doing a soft pull from Equifax for a Bankruptcy user...')
  const ele = await client.equifax.basic(bbyy, { config: 'efx-business-principal-fico9' })
  // console.log('ele', ele?.report)
  if (ele.success) {
    console.log(`Success! Pulled the biz report for test person... FICO Score: ${client.equifax.ficoScore(ele?.report!)}`)
    console.log(`Success! Pulled the biz report for test person... Credit Frozen: ${client.equifax.isFrozen(ele?.report!)}`)
    console.log('Bankruptcies', client.equifax.bankruptcies(ele?.report!))
  } else {
    console.log('Error! Getting soft Experian FICO pull failed, and the output is:')
    console.log(ele)
  }

  console.log('pulling the first page of user logs...')
  const _logs = await client.user.basic({ page: 0 })
  if (_logs.success) {
    console.log(`Sucess! Pulled the logs for the authorized account... Count is: ${_logs?.report}`)
  } else {
    console.log('Error! Getting the logs for the authorized account failed, and the output is:')
    console.log(_logs)
  }
})()
