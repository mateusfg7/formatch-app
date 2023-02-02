import { useState } from 'react'
import {
  HStack,
  Pressable,
  Text,
  Box,
  VStack,
  Center,
  useTheme,
  Flex,
} from 'native-base'
import { CaretDown, WarningCircle, X } from 'phosphor-react-native'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'
import { Picker, onOpen } from './Picker'

export interface State {
  id: number
  nome: string
  sigla?: string
}

interface Props extends InterfaceBoxProps {
  errorMessage?: string
  setStateAction: (...event: any[]) => void
}

export function SelectOccupation({
  errorMessage,
  setStateAction,
  ...restProps
}: Props) {
  const [selected, setSelected] = useState<Occupation[]>()

  const { colors, sizes } = useTheme()

  function handleSelectOccupation(occupation: Occupation) {
    let occupationList: Occupation[]

    if (selected) {
      if (!selected.includes(occupation)) {
        occupationList = [...selected, occupation]
      }
    } else occupationList = [occupation]

    setSelected(occupationList)
    setStateAction(String(occupationList))
  }

  function handleRemoveOccupation(occupation: Occupation) {
    const newOccupationList = selected.filter((value) => value != occupation)

    setSelected(newOccupationList)
    setStateAction(String(newOccupationList))
  }

  function handleOpenSelector() {
    onOpen('occupation')
  }

  const invalid = !!errorMessage

  return (
    <Box {...restProps}>
      <Flex direction='row' wrap='wrap'>
        {selected &&
          selected.map((occupation) => (
            <HStack
              key={occupation}
              borderWidth='1'
              borderColor='primary.500'
              borderRadius='xl'
              p='2'
              mr='1'
              mb='1'
            >
              <Text mr='2' color='primary.500'>
                {occupation}
              </Text>
              <Pressable onPress={() => handleRemoveOccupation(occupation)}>
                {({ isPressed }) => <X color={isPressed ? '#f00' : '#000'} />}
              </Pressable>
            </HStack>
          ))}
      </Flex>
      <Box
        p='3'
        borderWidth='1'
        borderColor={invalid ? 'error.600' : 'complement.500'}
        borderRadius='3xl'
        mt='1'
      >
        <Pressable onPress={handleOpenSelector}>
          <HStack>
            <VStack flex='1'>
              <Text color={'complement.400'} fontSize='md' mb='1'>
                Áreas de atuação
              </Text>
              <Text fontSize='xl' color={'complement.500'}>
                Clique para selecionar
              </Text>
              {invalid && (
                <HStack mt='2' alignItems='center'>
                  <Box mr='1'>
                    <WarningCircle
                      color={colors.error[600]}
                      size={sizes['4']}
                    />
                  </Box>
                  <Text color='error.600'>{errorMessage}</Text>
                </HStack>
              )}
            </VStack>
            <Center>
              <CaretDown size={sizes['10']} color={colors.primary[400]} />
            </Center>
          </HStack>
        </Pressable>
        <Picker id='occupation' setSelected={handleSelectOccupation} />
      </Box>
    </Box>
  )
}
