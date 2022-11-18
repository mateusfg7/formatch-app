import { useNavigation } from '@react-navigation/native'
import { Box, Button, Center, Text, useToast } from 'native-base'
import { GoogleLogo } from 'phosphor-react-native'

import Logotipo from '../assets/logotipo.svg'

export function SignIn() {
  const toast = useToast()
  const { navigate } = useNavigation()

  function handleLogin() {
    toast.show({
      description: 'Bem vindo Mateus!',
    })
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
        _text={{
          fontSize: 'xl',
          fontWeight: 'bold',
        }}
        _pressed={{
          backgroundColor: '#DD4D41',
        }}
        onPress={() => handleLogin()}
      >
        ENTRAR COM O GOOGLE
      </Button>
      <Text color='complement.300' w={335} textAlign='center'>
        Não utilizamos nenhuma informação além do{'\n'}
        seu e-mail e foto para criação de sua conta.
      </Text>
    </Center>
  )
}
