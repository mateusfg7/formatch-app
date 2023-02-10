import { useEffect, useMemo, useState } from 'react'
import { HStack, Pressable, Spinner, Text, Box, IBoxProps } from 'native-base'
import { CaretDown } from 'phosphor-react-native'
import { Picker, onOpen } from './Picker'

import { filterString } from '../utils/filterString'

export interface State {
  id: number
  nome: string
  sigla?: string
}

interface Props extends IBoxProps {
  selected: State
  setSelected: React.Dispatch<React.SetStateAction<State>>
}

export function SelectState({ selected, setSelected, ...restProps }: Props) {
  const [stateList, setStateList] = useState<State[]>()
  const [query, setQuery] = useState('')

  async function fetchStates() {
    const data: State[] = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
    ).then((response) => response.json())
    setStateList(data)
  }

  useEffect(() => {
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

  return stateList ? (
    <Box
      p='3'
      borderWidth='1'
      borderColor='complement.300'
      borderRadius='2xl'
      px='4'
      py='3'
      {...restProps}
    >
      <Pressable
        flexDirection='row'
        justifyContent='space-between'
        onPress={() => {
          onOpen('state')
        }}
      >
        <Text
          color={selected ? 'complement.400' : 'complement.500'}
          fontSize='md'
        >
          {selected ? selected.nome : 'Selecione seu estado'}
        </Text>
        <CaretDown />
      </Pressable>
      <Picker
        id='state'
        data={filteredData}
        inputValue={query}
        label='Selecione seu estado'
        setSelected={setSelected}
        onSearch={onSearch}
      />
    </Box>
  ) : (
    <HStack justifyContent='center' alignItems='center'>
      <Text fontSize='lg' mr='2'>
        Carregando estados
      </Text>
      <Spinner mr='3' color='complement.500' />
    </HStack>
  )
}
