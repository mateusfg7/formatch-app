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
  Chat,
  Envelope,
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

  const { professionalData, errorOnProfessionalRequest } = useProfessional()

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
      <VStack px='5' py='7' flex='1' justifyContent='space-between'>
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
      </VStack>
    </VStack>
  )
}
