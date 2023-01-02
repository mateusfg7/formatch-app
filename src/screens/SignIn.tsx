import { Box, Button, Center, Text } from 'native-base'
import { GoogleLogo } from 'phosphor-react-native'

import { useTypedNavigation } from '../utils/useTypedNavigation'
import { developmentWarning } from '../utils/developmentWarning'
import Logotipo from '../assets/logotipo.svg'

export function SignIn() {
  const { navigate } = useTypedNavigation()

  function handleLogin() {
    developmentWarning()
    navigate('feed')
  }

  return (
    <Center flex={1} backgroundColor='background.500'>
      <Box marginBottom='16'>
        <Logotipo width={335} height={58.1} />
      </Box>
      <Button
        backgroundColor='#DB4437'
        w={335}
        px='6'
        py='5'
        borderRadius='2xl'
        marginBottom='5'
        leftIcon={<GoogleLogo weight='bold' color='#fff' size={35} />}
        _pressed={{
          backgroundColor: '#DD4D41',
        }}
        onPress={() => handleLogin()}
      >
        <Text color='white' fontFamily='bold' fontSize='xl'>
          ENTRAR COM O GOOGLE
        </Text>
      </Button>
      <Text
        color='complement.300'
        w={335}
        textAlign='center'
        fontFamily='regular'
      >
        Não utilizamos nenhuma informação além do{'\n'}
        seu e-mail e foto para criação de sua conta.
      </Text>
    </Center>
  )
}
