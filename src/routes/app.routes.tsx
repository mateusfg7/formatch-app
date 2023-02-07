import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'
import { Article, MagnifyingGlass, GearSix } from 'phosphor-react-native'

import { Feed } from '../screens/Feed'
import { ArticleContent } from '../screens/ArticleContent'
import { OptionsRoute } from './options.routes'
import { SelectLocation } from '../screens/SearchProfessional/SelectLocation'
import { ProfessionalRoute } from './professional.routes'

export type TabNavigatorParamList = {
  feed: {}
  article: { slug: string }
  professionals: {}
  options: {}
}

const { Navigator, Screen } = createBottomTabNavigator<TabNavigatorParamList>()

export function AppRoutes() {
  const { colors, sizes } = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.complement[500],
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          height: sizes[22],
          borderTopWidth: 0,
          elevation: 50,
          backgroundColor: colors.background[200],
          borderTopLeftRadius: sizes[8],
          borderTopRightRadius: sizes[8],
        },
      }}
    >
      <Screen
        name='feed'
        component={Feed}
        options={{
          tabBarIcon: ({ color }) => (
            <Article color={color} size={35} weight='duotone' />
          ),
        }}
      />
      <Screen
        name='article'
        component={ArticleContent}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name='professionals'
        component={ProfessionalRoute}
        options={{
          tabBarIcon: ({ color }) => (
            <MagnifyingGlass color={color} size={35} weight='duotone' />
          ),
        }}
      />
      <Screen
        name='options'
        component={OptionsRoute}
        options={{
          tabBarIcon: ({ color }) => (
            <GearSix color={color} size={35} weight='duotone' />
          ),
        }}
      />
    </Navigator>
  )
}
