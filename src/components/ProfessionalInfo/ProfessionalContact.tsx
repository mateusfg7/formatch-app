import {
  VStack,
  HStack,
  Pressable,
  Box,
  Text,
  Divider,
  useTheme,
} from 'native-base'
import {
  Envelope,
  InstagramLogo,
  Phone,
  WhatsappLogo,
} from 'phosphor-react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import * as Clipboard from 'expo-clipboard'
import { Field } from './Field'
import { infoToast } from '../../utils/infoToast'

interface Props {
  phone?: string
  email?: string
  whatsapp?: string
  instagram?: string
}

export const ProfessionalContact = ({
  email,
  instagram,
  phone,
  whatsapp,
}: Props) => {
  const { sizes } = useTheme()

  const gradient_codes = ['#fccc63', '#fbad50', '#cd486b', '#8a3ab9']

  const copyToClipboard = async (title: string, text: string) => {
    await Clipboard.setStringAsync(text)

    const lowerTitle = title.toLowerCase()
    const parsedTitle = lowerTitle[0].toUpperCase() + lowerTitle.slice(1)

    infoToast(`${parsedTitle} copiado!`)
  }

  return (
    <Field title='Contato'>
      <VStack space='3'>
        {(phone || email) && (
          <VStack space='2'>
            {phone && (
              <Pressable
                _pressed={{ opacity: 0.5 }}
                onPress={() => copyToClipboard('telefone', phone)}
              >
                <HStack justifyContent='space-between'>
                  <HStack alignItems='center' mr='2'>
                    <Box mr='1'>
                      <Phone weight='duotone' />
                    </Box>
                    <Text fontSize='lg'>Telefone</Text>
                  </HStack>
                  <Text fontSize='lg'>{phone}</Text>
                </HStack>
              </Pressable>
            )}
            {email && (
              <Pressable
                _pressed={{ opacity: 0.5 }}
                onPress={() => copyToClipboard('email', email)}
              >
                <HStack justifyContent='space-between' alignItems='center'>
                  <HStack alignItems='center' mr='2'>
                    <Box mr='1'>
                      <Envelope weight='duotone' />
                    </Box>
                    <Text fontSize='lg'>Email</Text>
                  </HStack>
                  <Text fontSize='lg'>{email}</Text>
                </HStack>
              </Pressable>
            )}
          </VStack>
        )}
        {(phone || email) && (whatsapp || instagram) && <Divider />}
        {(whatsapp || instagram) && (
          <VStack space='2'>
            {whatsapp && (
              <Pressable
                _pressed={{ opacity: 0.5 }}
                onPress={() => copyToClipboard('whatsapp', whatsapp)}
              >
                <HStack justifyContent='space-between' alignItems='center'>
                  <HStack alignItems='center' mr='2'>
                    <Box mr='1'>
                      <WhatsappLogo
                        weight='duotone'
                        color='#075E54'
                        size={sizes['6']}
                      />
                    </Box>
                    <Text fontSize='lg' color='#075E54'>
                      Whatsapp
                    </Text>
                  </HStack>
                  <Text fontSize='lg'>{whatsapp}</Text>
                </HStack>
              </Pressable>
            )}
            {instagram && (
              <Pressable
                _pressed={{ opacity: 0.5 }}
                onPress={() => copyToClipboard('instagram', instagram)}
              >
                <HStack justifyContent='space-between' alignItems='center'>
                  <HStack alignItems='center' mr='2'>
                    <Box mr='1' alignItems='center'>
                      <MaskedView
                        maskElement={
                          <InstagramLogo weight='duotone' size={sizes['6']} />
                        }
                      >
                        <Box
                          size='6'
                          bg={{
                            linearGradient: {
                              colors: gradient_codes,
                              start: [0, 0.9],
                              end: [0.5, 0],
                            },
                          }}
                        />
                      </MaskedView>
                    </Box>
                    <MaskedView
                      maskElement={
                        <Text
                          fontSize='lg'
                          borderWidth='1'
                          borderColor='transparent'
                        >
                          Instagram
                        </Text>
                      }
                    >
                      <Box
                        bg={{
                          linearGradient: {
                            colors: gradient_codes,
                            start: [0, 0.9],
                            end: [0.5, 0],
                          },
                        }}
                      >
                        <Text
                          fontSize='lg'
                          borderWidth='1'
                          borderColor='transparent'
                          color='transparent'
                        >
                          Instagram
                        </Text>
                      </Box>
                    </MaskedView>
                  </HStack>
                  <Text fontSize='lg'>{instagram}</Text>
                </HStack>
              </Pressable>
            )}
          </VStack>
        )}
      </VStack>
    </Field>
  )
}
