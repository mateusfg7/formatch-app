import {
  VStack,
  ScrollView,
  HStack,
  Text,
  Box,
  useTheme,
  Center,
  Pressable,
} from 'native-base'
import { CaretRight } from 'phosphor-react-native'

import { occupationList } from '../../utils/occupationList'
import { useTypedProfessionalNavigation } from '../../utils/useTypedProfessionalNavigation'
import { feedbackToast } from '../../utils/feedbackToast'

import { useSearchProfessional } from '../../hooks/useSearchProfessional'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'

export function SelectService() {
  const { fontSizes, sizes, colors } = useTheme()

  const { data, setService } = useSearchProfessional()

  const navigation = useTypedProfessionalNavigation()

  function handleNavigate(service: string) {
    if (!data.filter.city && !data.filter.uf) {
      feedbackToast(
        'WARNING',
        'Você precisa selecionar a cidade e o estado primeiro'
      )
    } else {
      setService(service)
      navigation.navigate('professional.list')
    }
  }

  return (
    <VStack flex='1' backgroundColor='background.500'>
      <Header showBackButton navigateToScreen='professional.location' />
      <Title text='Qual tipo de profissional você procura?' />
      <ScrollView>
        <VStack pb='40'>
          {occupationList.map(({ Icon, occupation }) => (
            <Pressable
              key={occupation}
              onPress={() => handleNavigate(occupation)}
            >
              {({ isPressed }) => (
                <HStack
                  bg='white'
                  alignItems='center'
                  shadow='2'
                  rounded='3xl'
                  my='2 '
                  mx='5'
                >
                  <Center
                    size='24'
                    bg={isPressed ? 'white' : 'secondary.500'}
                    rounded='3xl'
                    borderWidth='1'
                    borderColor='secondary.500'
                  >
                    <Icon
                      size={sizes['10']}
                      color={isPressed ? colors.secondary[500] : '#fff'}
                    />
                  </Center>
                  <HStack
                    flex='1'
                    alignItems='center'
                    justifyContent='space-between'
                    p='3'
                  >
                    <Text
                      fontSize='2xl'
                      color={isPressed ? 'secondary.500' : 'complement.500'}
                    >
                      {occupation}
                    </Text>
                    <Box>
                      <CaretRight
                        weight='bold'
                        size={fontSizes['3xl']}
                        color={
                          isPressed
                            ? colors.secondary[500]
                            : colors.complement[500]
                        }
                      />
                    </Box>
                  </HStack>
                </HStack>
              )}
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  )
}
