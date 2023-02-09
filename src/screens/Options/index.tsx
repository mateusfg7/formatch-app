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
  SketchLogo,
  User,
} from 'phosphor-react-native'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'

import { feedbackToast } from '../../utils/feedbackToast'
import { optionsNavigation } from '../../utils/typedNavigation'

import { useProfessional } from '../../hooks/useProfessional'

export function Options() {
  const { fontSizes } = useTheme()

  const { professionalData } = useProfessional()

  const { navigate } = optionsNavigation()
  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header />
      <Title text='Opções' />
      <VStack px='5' py='7'>
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
        <Box px='9' my='7'>
          <Divider />
        </Box>
        <Pressable
          onPress={() => feedbackToast('WARNING', 'Em desenvolvimento')}
          _pressed={{ opacity: 0.6 }}
        >
          <HStack alignItems='center'>
            <Box mr='4'>
              <SketchLogo weight='bold' size={fontSizes['2xl']} />
            </Box>
            <Text fontSize='2xl'>Assinatura premium</Text>
          </HStack>
        </Pressable>
        <Box px='9' my='7'>
          <Divider />
        </Box>
        <Pressable
          onPress={() => feedbackToast('WARNING', 'Em desenvolvimento')}
          _pressed={{ opacity: 0.6 }}
        >
          <HStack alignItems='center'>
            <Box mr='4'>
              <BookmarksSimple weight='bold' size={fontSizes['2xl']} />
            </Box>
            <Text fontSize='2xl'>Profissionais salvos</Text>
          </HStack>
        </Pressable>
        <Box px='9' my='7'>
          <Divider />
        </Box>
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
      </VStack>
    </VStack>
  )
}
