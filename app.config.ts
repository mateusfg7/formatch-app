import { ExpoConfig, ConfigContext } from 'expo/config'

import packageConfig from './package.json'

const isProd = process.env.BUILD_ENV === 'production'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: isProd ? 'Formatch' : 'Formatch DEV',
  description:
    'Conecta você a um profissional da área de construção civil, e ainda te mantém informado sobre novidades do setor. ',
  slug: 'formatch',
  scheme: 'formatch',
  privacy: 'public',
  githubUrl: 'https://github.com/mateusfg7/formatch',
  platforms: ['android'],
  version: packageConfig.version,
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
    bundleIdentifier: isProd
      ? 'com.mateusfg7.formatch'
      : 'com.mateusfg7.formatch.dev',
  },
  android: {
    versionCode: packageConfig.versionCode,
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.mateusfg7.formatch',
    jsEngine: 'hermes',
    adaptiveIcon: isProd
      ? {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#FA5D14',
        }
      : {
          foregroundImage: './assets/adaptive-icon-dev.png',
          backgroundColor: '#000C7C',
        },
    package: isProd ? 'com.mateusfg7.formatch' : 'com.mateusfg7.formatch.dev',
  },
  extra: {
    eas: {
      projectId: '6d357eb5-2c98-48ab-b711-afdb27583908',
    },
  },
  plugins: [['expo-image-picker']],
})
