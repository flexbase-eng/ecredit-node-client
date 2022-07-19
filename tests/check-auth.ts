import { Ecredit } from '../src/index'

(async () => {
  const client = new Ecredit(
    process.env.ECREDIT_USERNAME!,
    process.env.ECREDIT_PASSWORD!,
    { host: process.env.ECREDIT_HOST! }
  )

  console.log('attempting to get an authentication token...')
  const one = await client.authentication.checkToken()
  // console.log('ONE', one)
  if (one.success) {
    console.log('Success!')
  } else {
    console.log('Error! I was not able to get a valid auth token')
    console.log(one)
  }

  console.log('checking that the authentication token stuck...')
  if (client.authentication.token) {
    console.log('Success!')
  } else {
    console.log('Error! I was not able to veify the new auth token')
    console.log(client.authentication.token)
  }

  console.log('attempting to reset for a new authentication token...')
  const two = await client.authentication.resetToken()
  // console.log('TWO', two)
  if (two.success) {
    console.log('Success!')
  } else {
    console.log('Error! I was not able to get a *new* valid auth token')
    console.log(two)
  }
})()
