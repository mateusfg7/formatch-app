import {
  Box,
  Button,
  KeyboardAvoidingView,
  VStack,
  useTheme,
} from 'native-base'
import { TextArea } from 'native-base'
import { HStack } from 'native-base'
import { Text } from 'native-base'
import { Modal } from 'native-base'
import { useState } from 'react'
import { WarningCircle } from 'phosphor-react-native'
import * as Haptics from 'expo-haptics'

interface Props {
  handleText: (text: string) => void
  isOpen: boolean
  setIsOpen: (state: boolean) => void
}

export function TextModal({ isOpen, setIsOpen, handleText }: Props) {
  const [text, setText] = useState<string>()
  const [isInvalid, setIsInvalid] = useState(false)

  const { colors, sizes } = useTheme()

  function saveText() {
    if (text && text.length > 0) {
      handleText(text)
      setIsOpen(false)
    } else {
      setIsInvalid(true)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    }
  }

  function cleanText() {
    setText('')
    handleText(undefined)
  }

  function handleSetText(text: string) {
    setText(text)
    setIsInvalid(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <KeyboardAvoidingView
        behavior='padding'
        size='full'
        alignItems='center'
        justifyContent='center'
      >
        <Modal.Content w='95%' borderRadius='3xl'>
          <Modal.CloseButton />
          <Modal.Header>Biografia</Modal.Header>
          <Modal.Body>
            <VStack w='full' h='full' maxH='5/6'>
              <TextArea
                autoCompleteType=''
                variant='unstyled'
                p='0'
                fontSize='xl'
                placeholder='Fale mais sobre você e seu trabalho'
                placeholderTextColor='complement.300'
                color='complement.500'
                minH='16'
                h='full'
                value={text}
                onChangeText={handleSetText}
                _input={{
                  selectionColor: 'rgba(0,0,0, 0.1)',
                }}
                _hover={{
                  bg: 'red.600',
                }}
              />
              {isInvalid && (
                <HStack mt='2' space='1' alignItems='center'>
                  <Box>
                    <WarningCircle
                      color={colors.error[600]}
                      size={sizes['4']}
                    />
                  </Box>
                  <Text color='error.600'>
                    Adicione suas informações pessoais
                  </Text>
                </HStack>
              )}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <HStack space='5'>
              <Button
                borderRadius='xl'
                px='4'
                py='3'
                bg='danger.50'
                _pressed={{ bg: 'danger.100' }}
                onPress={cleanText}
              >
                <Text color='danger.900'>Limpar</Text>
              </Button>
              <Button
                borderRadius='xl'
                px='4'
                py='3'
                bg='primary.500'
                _pressed={{ bg: 'primary.600' }}
                onPress={saveText}
              >
                Salvar
              </Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>
  )
}
