const EXPO_CLIENT_ID = process.env.EXPO_CLIENT_ID
const ANDROID_CLIENT_ID =
  process.env.BUILD_ENV === 'production'
    ? process.env.ANDROID_CLIENT_ID_PROD
    : process.env.ANDROID_CLIENT_ID_DEV

const API_URL = process.env.API_URL

export { EXPO_CLIENT_ID, ANDROID_CLIENT_ID, API_URL }
