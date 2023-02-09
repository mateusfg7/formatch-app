import { ExpoConfig, ConfigContext } from 'expo/config'

import packageConfig from './package.json'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Formatch',
  slug: 'formatch',
  scheme: 'formatch',
  version: packageConfig.version,
  jsEngine: 'hermes',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#000C7C',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.mateusfg7.formatch',
  },
  android: {
    versionCode: 6,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FA5D14',
    },
    package: 'com.mateusfg7.formatch',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    eas: {
      projectId: '6d357eb5-2c98-48ab-b711-afdb27583908',
    },
  },
  plugins: [['expo-image-picker']],
})
