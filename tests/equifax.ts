import { Ecredit } from '../src/index'

(async () => {
  const client = new Ecredit(
    process.env.ECREDIT_USERNAME!,
    process.env.ECREDIT_PASSWORD!,
    { host: process.env.ECREDIT_HOST! }
  )

  const pOne = {
    firstName: 'ABAYNJ',
    middleName: 'L',
    lastName: 'HYIQKKEDXDGFUZ',
    ssn: '666008413',
    dob: '',
    houseNumber: '2438',
    streetName: 'JACVEAXP PRT',
    city: 'ELLERSLIE',
    state: 'GA',
    zip: '31807',
  }

  console.log('doing a soft pull from Equifax for normal FICO score...')
  const one = await client.equifax.basic(pOne, { config: 'efx-prequal-fico9' })
  // console.log('ONE', one?.report)
  if (one.success) {
    console.log(`Success! Pulled the soft pull for test person... FICO Score: ${client.equifax.ficoScore(one?.report!)}`)
    console.log(`Success! Pulled the soft pull for test person... Credit Frozen: ${client.equifax.isFrozen(one?.report!)}`)
    console.log('Bankruptcies', client.equifax.bankruptcies(one?.report!))
    console.log('Hard Pulls', client.equifax.hardPulls(one?.report!))
    console.log('Reasons', client.equifax.reasons(one?.report!))
    console.log('Credit Lines', client.equifax.creditLines(one?.report!))
    console.log('HitCode', client.equifax.hitCode(one?.report!))
  } else {
    console.log('Error! Getting soft Experian FICO pull failed, and the output is:')
    console.log(one)
  }

  console.log('doing a business principal pull from Equifax for normal FICO score...')
  const two = await client.equifax.basic(pOne, { config: 'efx-business-principal-fico9' })
  // console.log('TWO', two?.report)
  if (two.success) {
    console.log(`Success! Pulled the biz report for test person... FICO Score: ${client.equifax.ficoScore(two?.report!)}`)
    console.log(`Success! Pulled the biz report for test person... Credit Frozen: ${client.equifax.isFrozen(two?.report!)}`)
    console.log('Bankruptcies', client.equifax.bankruptcies(two?.report!))
    console.log('Hard Pulls', client.equifax.hardPulls(two?.report!))
    console.log('Reasons', client.equifax.reasons(two?.report!))
    console.log('Credit Lines', client.equifax.creditLines(two?.report!))
    console.log('HitCode', client.equifax.hitCode(two?.report!))
  } else {
    console.log('Error! Getting business principal Experian FICO pull failed, and the output is:')
    console.log(two)
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
  const tre = await client.equifax.basic(llift, { config: 'efx-prequal-fico9' })
  // console.log('TRE', tre?.report)
  if (tre.success) {
    console.log(`Success! Pulled the soft pull for test person... FICO Score: ${client.equifax.ficoScore(tre?.report!)}`)
    console.log(`Success! Pulled the soft pull for test person... Credit Frozen: ${client.equifax.isFrozen(tre?.report!)}`)
    console.log('Bankruptcies', client.equifax.bankruptcies(tre?.report!))
    console.log('Hard Pulls', client.equifax.hardPulls(tre?.report!))
    console.log('Reasons', client.equifax.reasons(tre?.report!))
    console.log('Credit Lines', client.equifax.creditLines(tre?.report!))
    console.log('HitCode', client.equifax.hitCode(tre?.report!))
  } else {
    console.log('Error! Getting soft Experian FICO pull failed, and the output is:')
    console.log(tre)
  }

  console.log('doing a business principal pull from Equifax for a Frozen user...')
  const fou = await client.equifax.basic(llift, { config: 'efx-business-principal-fico9' })
  // console.log('FOU', fou?.report)
  if (fou.success) {
    console.log(`Success! Pulled the biz report for test person... FICO Score: ${client.equifax.ficoScore(fou?.report!)}`)
    console.log(`Success! Pulled the biz report for test person... Credit Frozen: ${client.equifax.isFrozen(fou?.report!)}`)
    console.log('Bankruptcies', client.equifax.bankruptcies(fou?.report!))
    console.log('Hard Pulls', client.equifax.hardPulls(fou?.report!))
    console.log('Reasons', client.equifax.reasons(fou?.report!))
    console.log('Credit Lines', client.equifax.creditLines(fou?.report!))
    console.log('HitCode', client.equifax.hitCode(fou?.report!))
  } else {
    console.log('Error! Getting business principal Experian FICO pull failed, and the output is:')
    console.log(fou)
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
  const fiv = await client.equifax.basic(bbyy, { config: 'efx-prequal-fico9' })
  // console.log('FIV', fiv?.report)
  if (fiv.success) {
    console.log(`Success! Pulled the biz report for test person... FICO Score: ${client.equifax.ficoScore(fiv?.report!)}`)
    console.log(`Success! Pulled the biz report for test person... Credit Frozen: ${client.equifax.isFrozen(fiv?.report!)}`)
    console.log('Bankruptcies', client.equifax.bankruptcies(fiv?.report!))
    console.log('Hard Pulls', client.equifax.hardPulls(fiv?.report!))
    console.log('Reasons', client.equifax.reasons(fiv?.report!))
    console.log('Credit Lines', client.equifax.creditLines(fiv?.report!))
    console.log('HitCode', client.equifax.hitCode(fiv?.report!))
  } else {
    console.log('Error! Getting business principal Experian FICO pull failed, and the output is:')
    console.log(fiv)
  }

  console.log('doing a business principal pull from Equifax for a Bankruptcy user...')
  const six = await client.equifax.basic(bbyy, { config: 'efx-business-principal-fico9' })
  // console.log('SIX', six?.report)
  if (six.success) {
    console.log(`Success! Pulled the biz report for test person... FICO Score: ${client.equifax.ficoScore(six?.report!)}`)
    console.log(`Success! Pulled the biz report for test person... Credit Frozen: ${client.equifax.isFrozen(six?.report!)}`)
    console.log('Bankruptcies', client.equifax.bankruptcies(six?.report!))
    console.log('Hard Pulls', client.equifax.hardPulls(six?.report!))
    console.log('Reasons', client.equifax.reasons(six?.report!))
    console.log('Credit Lines', client.equifax.creditLines(six?.report!))
    console.log('HitCode', client.equifax.hitCode(six?.report!))
  } else {
    console.log('Error! Getting business principal Experian FICO pull failed, and the output is:')
    console.log(six)
  }

})()
