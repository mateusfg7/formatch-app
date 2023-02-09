import { Box, Text, VStack } from 'native-base'
import { ReactNode } from 'react'

interface FieldProps {
  title: string
  notes?: string
  children: ReactNode
}

export const Field = ({ title, notes, children }: FieldProps) => (
  <VStack>
    <Box mb='4'>
      <Text fontSize='2xl' color='complement.300'>
        {title}
      </Text>
      {notes && (
        <Text fontSize='sm' color='complement.200'>
          {notes}
        </Text>
      )}
    </Box>
    <Box>{children}</Box>
  </VStack>
)
