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

  console.log('doing a soft pull from Experian...')
  const one = await client.experian.basic(laurie, { config: 'exp-prequal-vantage4' })
  // console.log('ONE', one)
  if (one.success) {
    console.log('Success! Pulled the prequal report for test person')
  } else {
    console.log('Error! Getting soft Experian pull failed, and the output is:')
    console.log(one)
  }

  console.log('doing a hard pull from Experian...')
  const two = await client.experian.basic(laurie, { config: 'exp-hard-vantage4' })
  // console.log('TWO', two)
  if (two.success) {
    console.log('Success! Pulled the hard report for test person')
  } else {
    console.log('Error! Getting hard Experian pull failed, and the output is:')
    console.log(two)
  }

})()
