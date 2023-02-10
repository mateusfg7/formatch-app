import { useEffect, useMemo, useState } from 'react'
import {
  HStack,
  Pressable,
  Spinner,
  Text,
  Box,
  VStack,
  Center,
  useTheme,
  IBoxProps,
} from 'native-base'
import { CaretDown, WarningCircle } from 'phosphor-react-native'
import { Picker, onOpen } from '../Picker'

import { filterString } from '../../utils/filterString'

export interface City {
  id: number
  nome: string
}

interface Props extends IBoxProps {
  errorMessage?: string
  setCityAction: (...event: any[]) => void
  stateUf?: string
}

export function SelectCityForm({
  errorMessage,
  setCityAction,
  stateUf,
  ...restProps
}: Props) {
  const [cityList, setCityList] = useState<City[] | undefined>(undefined)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<City>()
  const [isLoading, setIsLoading] = useState(false)

  const { colors, sizes } = useTheme()

  function handleSelect(city: City) {
    setCityAction(city.nome)
    setSelected(city)
  }

  function resetSelection() {
    setCityAction(undefined)
    setCityList(undefined)
    setSelected(undefined)
  }

  function handleOpenSelector() {
    if (cityList && !isLoading) onOpen('cityOnForm')
  }

  async function fetchCity() {
    setIsLoading(true)
    const data: City[] = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateUf}/municipios?orderBy=nome`
    ).then((response) => response.json())
    setCityList(data)
    setIsLoading(false)
  }

  useEffect(() => {
    resetSelection()
    if (stateUf) fetchCity()
  }, [stateUf])

  const filteredData = useMemo(() => {
    if (cityList && cityList.length > 0) {
      return cityList.filter((item) => {
        const currentCity = filterString(item.nome)
        const targetCity = filterString(query)

        return currentCity.includes(targetCity)
      })
    }
  }, [cityList, query])

  const onSearch = (text: string) => {
    setQuery(text)
  }

  const invalid = !!errorMessage && !isLoading && cityList

  return (
    <Box
      p='3'
      borderWidth='1'
      borderColor={
        invalid ? 'error.600' : cityList ? 'complement.500' : 'complement.300'
      }
      borderRadius='3xl'
      {...restProps}
    >
      <Pressable onPress={handleOpenSelector}>
        <HStack>
          <VStack flex='1'>
            <Text
              color={cityList ? 'complement.400' : 'complement.300'}
              fontSize='md'
              mb='1'
            >
              Cidade
            </Text>
            <Text
              fontSize='xl'
              color={cityList ? 'complement.500' : 'complement.300'}
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
                <Text color='complement.400'>Carregando municípios</Text>
              </HStack>
            )}
          </VStack>
          <Center>
            <CaretDown
              size={sizes['10']}
              color={cityList ? colors.primary[400] : colors.complement[300]}
            />
          </Center>
        </HStack>
      </Pressable>
      <Picker
        id='cityOnForm'
        data={filteredData}
        inputValue={query}
        label='Selecione seu município'
        setSelected={handleSelect}
        onSearch={onSearch}
      />
    </Box>
  )
}
