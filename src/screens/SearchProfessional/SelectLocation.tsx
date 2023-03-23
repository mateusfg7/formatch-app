import { useEffect, useState } from 'react'
import { Box, Pressable, Text, VStack, useTheme } from 'native-base'
import { ArrowRight } from 'phosphor-react-native'

import { professionalNavigation } from '../../utils/typedNavigation'
import { useSearchProfessional } from '../../hooks/useSearchProfessional'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'
import { SelectState, State } from '../../components/SelectState'
import { SelectCity, City } from '../../components/SelectCity'
import { AdBanner } from '../../components/AdBanner'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

export function SelectLocation() {
  const [selectedState, setSelectedState] = useState<State>()
  const [selectedCity, setSelectedCity] = useState<City>()

  const { setCity, setUf } = useSearchProfessional()

  const { sizes, colors } = useTheme()

  const navigator = professionalNavigation()

  const stateOnStorage = useAsyncStorage('@Formatch:location:state')
  const cityOnStorage = useAsyncStorage('@Formatch:location:city')

  function handleSelectedState(state: State) {
    setSelectedState(state)
    stateOnStorage.setItem(JSON.stringify(state))

    setSelectedCity(undefined)
  }
  function handleSelectedCity(city: City) {
    setSelectedCity(city)
    cityOnStorage.setItem(JSON.stringify(city))
  }

  function handleSubmitButton() {
    setUf(selectedState.sigla)
    setCity(selectedCity.nome)

    navigator.navigate('professional.service')
  }

  async function fetchLocationFromStorage() {
    const state = await stateOnStorage.getItem()
    if (state) setSelectedState(JSON.parse(state))

    const city = await cityOnStorage.getItem()
    if (city) setSelectedCity(JSON.parse(city))
  }

  useEffect(() => {
    fetchLocationFromStorage()
  }, [])

  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header />
      <Title text='Informe sua localização' />
      <VStack px='5'>
        <Box borderRadius='3xl' px='3' py='5' bg='white' shadow='9'>
          <Text color='complement.500' fontSize='2xl' mb='5' fontFamily='bold'>
            De onde você é?
          </Text>
          <SelectState
            selected={selectedState}
            setSelected={handleSelectedState}
            mb={selectedState && '3'}
          />
          {selectedState && (
            <SelectCity
              selected={selectedCity}
              setSelected={handleSelectedCity}
              stateUf={selectedState.sigla}
              mb={selectedCity && '5'}
            />
          )}
          {selectedCity && (
            <Pressable
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              p='3'
              borderWidth='1'
              borderColor='secondary.600'
              borderRadius='2xl'
              bg='secondary.200'
              _pressed={{
                bg: 'secondary.300',
              }}
              onPress={handleSubmitButton}
            >
              <Box w='8' h='8' />
              <Text fontFamily='bold' fontSize='md' color='secondary.600'>
                SERVIÇOS
              </Text>
              <ArrowRight size={sizes[8]} color={colors.secondary[600]} />
            </Pressable>
          )}
        </Box>
        <AdBanner />
      </VStack>
    </VStack>
  )
}
