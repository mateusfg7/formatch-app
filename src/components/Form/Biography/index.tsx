import { Box, Pressable } from 'native-base'
import { HStack, Text, VStack, useTheme, StyledProps } from 'native-base'
import { TextAlignLeft } from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { TextModal } from './TextModal'

interface Props {
  errorMessage?: string | null
  isInvalid?: boolean
  onChange: (...event: any[]) => void
  styles?: StyledProps
}

export function Biography({
  errorMessage = null,
  isInvalid = false,
  onChange,
  styles,
}: Props) {
  const [isFocused, setIsFocused] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const { sizes, colors } = useTheme()

  const invalid = !!errorMessage || isInvalid

  function handleText(text: string) {
    if (text && text.length > 0) {
      setIsCompleted(true)
      onChange(text)
    } else setIsCompleted(false)
  }

  useEffect(() => {
    if (isModalOpen) setIsFocused(true)
    else setIsFocused(false)
  }, [isModalOpen])

  return (
    <Pressable onPress={() => setIsModalOpen(true)}>
      <HStack
        borderWidth='1'
        borderColor={
          invalid ? 'error.600' : isFocused ? 'primary.400' : 'complement.500'
        }
        borderRadius='3xl'
        p='3'
        bg={isFocused ? 'rgba(0, 12, 124, 0.02)' : 'background.200'}
        position='relative'
        {...styles}
      >
        <VStack flex='1'>
          <HStack alignItems='center' justifyContent='space-between'>
            <Text color='complement.400' fontSize='md' mb='1'>
              Biografia
            </Text>
            <Box>
              <TextAlignLeft
                size={sizes['6']}
                color={invalid ? colors.error[600] : colors.primary[400]}
              />
            </Box>
          </HStack>
          <HStack alignItems='center' mt='1'>
            <Text
              fontSize='xl'
              color={isFocused ? 'primary.400' : 'complement.500'}
            >
              Clique para{' '}
              {isCompleted ? (
                <Text underline>editar</Text>
              ) : (
                <Text underline>adicionar</Text>
              )}
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <TextModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleText={handleText}
      />
    </Pressable>
  )
}
