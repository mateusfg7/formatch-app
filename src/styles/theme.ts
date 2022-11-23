import { extendTheme } from 'native-base'

export const THEME = extendTheme({
  colors: {
    primary: {
      200: '#000219',
      300: '#000532',
      400: '#000957',
      500: '#000C7C',
      600: '#4D55A4',
      700: '#999ECB',
      800: '#CCCEE5',
    },
    secondary: {
      200: '#FEDFD0',
      300: '#FDBEA1',
      400: '#FB8E5B',
      500: '#FA5D14',
      600: '#AF410E',
      700: '#642508',
      800: '#321304',
    },
    background: {
      200: '#FCFDFE',
      300: '#FAFBFD',
      400: '#F6F8FB',
      500: '#F2F5F9',
      600: '#A9ABAE',
      700: '#616264',
      800: '#303132',
    },
    complement: {
      200: '#CECECF',
      300: '#9D9D9F',
      400: '#545457',
      500: '#0A0A0F',
      600: '#07070A',
      700: '#040406',
      800: '#020203',
    },
  },
  fonts: {
    bold: 'Roboto_700Bold',
    regular: 'Roboto_400Regular',
  },
  sizes: {
    22: 87,
  },
})

export type CustomThemeType = typeof THEME
