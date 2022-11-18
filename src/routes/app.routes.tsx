import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'
import { Article, MagnifyingGlass, GearSix } from 'phosphor-react-native'

import { Feed } from '../screens/Feed'
import { ListProfessionals } from '../screens/ListProfessionals'
import { Options } from '../screens/Options'
import { SignIn } from '../screens/SignIn'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { colors, sizes } = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.complement[500],
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
        name='sign-in'
        component={SignIn}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
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
        name='list-professionals'
        component={ListProfessionals}
        options={{
          tabBarIcon: ({ color }) => (
            <MagnifyingGlass color={color} size={35} weight='duotone' />
          ),
        }}
      />
      <Screen
        name='options'
        component={Options}
        options={{
          tabBarIcon: ({ color }) => (
            <GearSix color={color} size={35} weight='duotone' />
          ),
        }}
      />
    </Navigator>
  )
}
