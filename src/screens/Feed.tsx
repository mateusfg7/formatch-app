import { Box, ScrollView, Text, useTheme, VStack } from 'native-base'
import { Header } from '../components/Header'
import { Title } from '../components/Title'

const TmpCardComponent = () => (
  <Box
    borderWidth={4}
    borderColor='secondary.500'
    backgroundColor='secondary.200'
    px='10'
    py='7'
    mx='5'
    borderRadius='3xl'
    mb='5'
  >
    <Text fontFamily='bold' fontSize='5xl'>
      Feed
    </Text>
  </Box>
)

export function Feed() {
  const { sizes } = useTheme()

  return (
    <VStack flex={1} backgroundColor='background.500'>
      <ScrollView>
        <Header />
        <Title text='Novidades e dicas' />
        <VStack pb={sizes[22] * 2}>
          <TmpCardComponent />
          <TmpCardComponent />
          <TmpCardComponent />
          <TmpCardComponent />
          <TmpCardComponent />
          <TmpCardComponent />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
