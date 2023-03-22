import { ExpoConfig, ConfigContext } from 'expo/config'

import packageConfig from './package.json'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Formatch',
  slug: 'formatch',
  scheme: 'formatch',
  platforms: ['android'],
  version: packageConfig.version,
  /* TODO: remove hermes config after bumb expo to SDK 48 (last version uses hermes by default) */
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
    bundleIdentifier:
      process.env.BUILD_ENV != 'production'
        ? 'com.mateusfg7.formatch.dev'
        : 'com.mateusfg7.formatch',
  },
  android: {
    versionCode: packageConfig.versionCode,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FA5D14',
    },
    package:
      process.env.BUILD_ENV != 'production'
        ? 'com.mateusfg7.formatch.dev'
        : 'com.mateusfg7.formatch',
  },
  extra: {
    eas: {
      projectId: '6d357eb5-2c98-48ab-b711-afdb27583908',
    },
  },
  plugins: [['expo-image-picker']],
})
