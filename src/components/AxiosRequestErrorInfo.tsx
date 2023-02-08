import { Box, HStack, Text, VStack } from 'native-base'
import { AxiosError } from 'axios'
import * as Device from 'expo-device'
import * as Application from 'expo-application'

import Error from '../assets/error.svg'

export function AxiosRequestErrorInfo({ error }: { error: AxiosError }) {
  return (
    <Box>
      <Error width='200' height='200' />
      <Text selectable fontSize='xl' color='error.900'>
        Erro {error.response.status}
      </Text>
      <HStack py='3' space='3'>
        <VStack space='1' flex='1' alignItems='flex-end'>
          <Text selectable bold>
            Código
          </Text>

          <Text selectable>Dispositivo</Text>
          <Text selectable>Marca</Text>
          <Text selectable>SO</Text>
          <Text selectable>Versão do App</Text>
        </VStack>
        <VStack space='1' flex='1' alignItems='flex-start'>
          <Text selectable bold>
            {error.code}
          </Text>

          <Text selectable>{Device.modelName}</Text>
          <Text selectable>{Device.brand}</Text>
          <Text selectable>
            {Device.osName} {Device.osVersion}
          </Text>
          <Text selectable>{Application.nativeApplicationVersion}</Text>
        </VStack>
      </HStack>
    </Box>
  )
}
