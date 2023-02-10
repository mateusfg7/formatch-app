import { useEffect, useMemo, useState } from 'react'
import { HStack, Pressable, Spinner, Text, Box, IBoxProps } from 'native-base'
import { Picker, onOpen } from './Picker'
import { CaretDown } from 'phosphor-react-native'

import { filterString } from '../utils/filterString'

export interface City {
  id: number
  nome: string
}

interface Props extends IBoxProps {
  selected: City
  setSelected: React.Dispatch<React.SetStateAction<City>>
  stateUf: string
}

export function SelectCity({
  selected,
  setSelected,
  stateUf,
  ...restProps
}: Props) {
  const [cityList, setCityList] = useState<City[]>()
  const [query, setQuery] = useState('')

  async function fetchCity() {
    setCityList(undefined)
    const data: City[] = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateUf}/municipios?orderBy=nome`
    ).then((response) => response.json())
    setCityList(data)
  }

  useEffect(() => {
    fetchCity()
  }, [stateUf])

  const onSearch = (text: string) => {
    setQuery(text)
  }

  const filteredData = useMemo(() => {
    if (cityList && cityList.length > 0) {
      return cityList.filter((item) => {
        const currentCity = filterString(item.nome)
        const targetCity = filterString(query)

        return currentCity.includes(targetCity)
      })
    }
  }, [cityList, query])

  return cityList ? (
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
          onOpen('city')
        }}
      >
        <Text
          color={selected ? 'complement.400' : 'complement.500'}
          fontSize='md'
        >
          {selected ? selected.nome : 'Selecione seu município'}
        </Text>
        <CaretDown />
      </Pressable>
      <Picker
        id='city'
        data={filteredData}
        inputValue={query}
        searchable={true}
        label='Selecione seu município'
        setSelected={setSelected}
        onSearch={onSearch}
      />
    </Box>
  ) : (
    <HStack justifyContent='center' alignItems='center'>
      <Text fontSize='lg' mr='2'>
        Carregando municípios
      </Text>
      <Spinner mr='3' color='complement.500' />
    </HStack>
  )
}
