import { useEffect, useMemo, useState } from 'react'
import {
  HStack,
  Pressable,
  Spinner,
  Text,
  Box,
  IBoxProps,
  VStack,
  Center,
  useTheme,
} from 'native-base'
import { CaretDown, WarningCircle } from 'phosphor-react-native'
import { Picker, onOpen } from '../Picker'
import { filterString } from '../../utils/filterString'

export interface State {
  id: number
  nome: string
  sigla?: string
}

interface Props extends IBoxProps {
  errorMessage?: string
  setStateAction: (...event: any[]) => void
  setUfState: (value: string) => void
}

export function SelectStateForm({
  errorMessage,
  setStateAction,
  setUfState,
  ...restProps
}: Props) {
  const [stateList, setStateList] = useState<State[]>()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<State>()
  const [isLoading, setIsLoading] = useState(false)

  const { colors, sizes } = useTheme()

  function handleSelect(state: State) {
    setStateAction(state.sigla)
    setUfState(state.sigla)
    setSelected(state)
  }

  function resetSelection() {
    setStateAction(undefined)
    setUfState(undefined)
    setSelected(undefined)
  }

  function handleOpenSelector() {
    if (stateList && !isLoading) onOpen('state')
  }

  async function fetchStates() {
    setIsLoading(true)
    const data: State[] = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
    ).then((response) => response.json())
    setStateList(data)
    setIsLoading(false)
  }

  useEffect(() => {
    resetSelection()
    fetchStates()
  }, [])

  const filteredData = useMemo(() => {
    if (stateList && stateList.length > 0) {
      return stateList.filter((item) => {
        const currentState = filterString(item.nome)
        const targetState = filterString(query)

        return currentState.includes(targetState)
      })
    }
  }, [stateList, query])

  const onSearch = (text: string) => {
    setQuery(text)
  }

  const invalid = !!errorMessage && !isLoading && stateList

  return (
    <Box
      p='3'
      borderWidth='1'
      borderColor={
        invalid ? 'error.600' : isLoading ? 'complement.300' : 'complement.500'
      }
      borderRadius='3xl'
      {...restProps}
    >
      <Pressable onPress={handleOpenSelector}>
        <HStack>
          <VStack flex='1'>
            <Text
              color={isLoading ? 'complement.300' : 'complement.400'}
              fontSize='md'
              mb='1'
            >
              Estado
            </Text>
            <Text
              fontSize='xl'
              color={isLoading ? 'complement.300' : 'complement.500'}
            >
              {selected ? selected.nome : 'Clique para selecionar'}
            </Text>
            {invalid && (
              <HStack mt='2' alignItems='center'>
                <Box mr='1'>
                  <WarningCircle color={colors.error[600]} size={sizes['4']} />
                </Box>
                <Text color='error.600'>{errorMessage}</Text>
              </HStack>
            )}
            {isLoading && (
              <HStack mt='2' alignItems='center'>
                <Spinner mr='1' size={sizes['4']} color='complement.400' />
                <Text color='complement.400'>Carregando estados</Text>
              </HStack>
            )}
          </VStack>
          <Center>
            <CaretDown
              size={sizes['10']}
              color={isLoading ? colors.complement[300] : colors.primary[400]}
            />
          </Center>
        </HStack>
      </Pressable>
      <Picker
        id='state'
        data={filteredData}
        inputValue={query}
        label='Selecione seu estado'
        setSelected={handleSelect}
        onSearch={onSearch}
      />
    </Box>
  )
}
