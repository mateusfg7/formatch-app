const ANDROID_CLIENT_ID =
  process.env.BUILD_ENV === 'production'
    ? process.env.ANDROID_CLIENT_ID_PROD
    : process.env.ANDROID_CLIENT_ID_DEV

const API_URL = process.env.API_URL

const TESTERS = ['mateusfelipefg77@gmail.com', 'tuliomtm.mtm@gmail.com']

export { ANDROID_CLIENT_ID, API_URL, TESTERS }
