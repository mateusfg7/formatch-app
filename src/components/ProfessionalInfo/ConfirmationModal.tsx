import { Pressable, Spinner } from 'native-base'
import { Text } from 'native-base'
import { Box } from 'native-base'
import { Modal } from 'native-base'
import { VStack } from 'native-base'
import { HStack } from 'native-base'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  action: () => void
}

export function ConfirmationModal({ isOpen, setIsOpen, action }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  function handleAction() {
    setIsLoading(true)
    action()
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen}>
      <Modal.Content w='90%' borderRadius='3xl' px='1'>
        <Modal.Body>
          <VStack>
            <Text mb='1' fontSize='2xl' color='complement.500'>
              Você tem certeza?
            </Text>
            <Text mb='16' fontSize='lg' color='complement.400'>
              Essa ação não pode ser desfeita
            </Text>
            <HStack space={2} justifyContent='flex-end'>
              <Pressable
                py='2'
                px='3'
                borderRadius='2xl'
                onPress={() => {
                  setIsOpen(false)
                }}
                _pressed={{
                  bg: 'complement.200',
                }}
                justifyContent='center'
                alignItems='center'
              >
                <Box w='20' alignItems='center'>
                  <Text color='complement.500' fontSize='xl'>
                    Cancelar
                  </Text>
                </Box>
              </Pressable>
              <Pressable
                py='2'
                px='3'
                onPress={handleAction}
                borderRadius='2xl'
                bg='danger.600'
                _pressed={{
                  bg: 'danger.700',
                }}
                justifyContent='center'
                alignItems='center'
              >
                <Box w='16' justifyContent='center' alignItems='center'>
                  {isLoading ? (
                    <Spinner color='white' />
                  ) : (
                    <Text color='white' fontSize='xl'>
                      Deletar
                    </Text>
                  )}
                </Box>
              </Pressable>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
