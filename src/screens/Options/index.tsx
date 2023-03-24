import {
  Box,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
  useTheme,
} from 'native-base'
import {
  BookmarksSimple,
  Briefcase,
  Code,
  Envelope,
  SketchLogo,
  User,
} from 'phosphor-react-native'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'

import { optionsNavigation } from '../../utils/typedNavigation'

import { useProfessional } from '../../hooks/useProfessional'
import { useAuth } from '../../hooks/useAuth'
import { TESTERS } from '../../constants'

export function Options() {
  const { fontSizes } = useTheme()

  const { user } = useAuth()
  const { professionalData, errorOnProfessionalRequest } = useProfessional()

  const isTester = TESTERS.includes(user.email)

  const Division = () => (
    <Box px='9'>
      <Divider />
    </Box>
  )

  const { navigate } = optionsNavigation()
  return (
    <VStack flex={1} backgroundColor='background.500' pb='32'>
      <Header />
      <Title text='Opções' />
      <VStack px='5' py='7' flex='1' space={isTester ? '5' : '6'}>
        <Pressable
          onPress={() => navigate('options.profile')}
          _pressed={{ opacity: 0.6 }}
        >
          <HStack alignItems='center'>
            <Box mr='4'>
              <User weight='bold' size={fontSizes['2xl']} />
            </Box>
            <Text fontSize='2xl'>Meus dados</Text>
          </HStack>
        </Pressable>
        <Division />
        <Pressable
          onPress={() => navigate('options.premium')}
          _pressed={{ opacity: 0.6 }}
        >
          <HStack alignItems='center'>
            <Box mr='4'>
              <SketchLogo weight='bold' size={fontSizes['2xl']} />
            </Box>
            <Text fontSize='2xl'>Assinatura premium</Text>
          </HStack>
        </Pressable>
        <Division />
        <Pressable
          onPress={() => navigate('options.saved')}
          _pressed={{ opacity: 0.6 }}
        >
          <HStack alignItems='center'>
            <Box mr='4'>
              <BookmarksSimple weight='bold' size={fontSizes['2xl']} />
            </Box>
            <Text fontSize='2xl'>Profissionais salvos</Text>
          </HStack>
        </Pressable>
        {!errorOnProfessionalRequest && (
          <>
            <Division />
            <Pressable
              onPress={() => navigate('options.register')}
              _pressed={{ opacity: 0.6 }}
            >
              <HStack alignItems='center'>
                <Box mr='4'>
                  <Briefcase weight='bold' size={fontSizes['2xl']} />
                </Box>
                <Text fontSize='2xl'>
                  {professionalData.code ? 'Ver cadastro' : 'Se cadastrar'}
                </Text>
              </HStack>
            </Pressable>
          </>
        )}
        <Division />
        <Pressable
          onPress={() => navigate('options.contact')}
          _pressed={{ opacity: 0.6 }}
        >
          <HStack alignItems='center'>
            <Box mr='4'>
              <Envelope weight='bold' size={fontSizes['2xl']} />
            </Box>
            <Text fontSize='2xl'>Contate-nos</Text>
          </HStack>
        </Pressable>
        {isTester && (
          <>
            <Division />
            <Pressable
              onPress={() => navigate('options.devdata')}
              _pressed={{ opacity: 0.6 }}
            >
              <HStack alignItems='center'>
                <Box mr='4'>
                  <Code weight='bold' size={fontSizes['2xl']} />
                </Box>
                <Text fontSize='2xl'>Test laboratory</Text>
              </HStack>
            </Pressable>
          </>
        )}
      </VStack>
    </VStack>
  )
}
