import { Box, Text, VStack } from 'native-base'
import { ReactNode } from 'react'

interface FieldProps {
  title: string
  children: ReactNode
}

export const Field = ({ title, children }: FieldProps) => (
  <VStack>
    <Text fontSize='2xl' color='complement.300' mb='3'>
      {title}
    </Text>
    <Box>{children}</Box>
  </VStack>
)
