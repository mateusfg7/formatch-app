import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'

interface Props {
  children: ReactNode
  isContentVisible: boolean
  style?: StyleProp<ViewStyle>
  shimmerColors?: string[]
}

export function LoadingSkeleton({
  children,
  isContentVisible,
  style,
  shimmerColors,
}: Props) {
  return (
    <ShimmerPlaceholder
      visible={isContentVisible}
      LinearGradient={LinearGradient}
      style={
        style ?? {
          height: '100%',
          width: '100%',
          backgroundColor: 'transparent',
        }
      }
      shimmerColors={shimmerColors ?? ['transparent', '#DAE2EE', 'transparent']}
    >
      {children}
    </ShimmerPlaceholder>
  )
}
