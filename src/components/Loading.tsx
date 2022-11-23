import { Center, Spinner } from 'native-base'

export function Loading() {
  return (
    <Center flex={1} bg='background.500'>
      <Spinner color='secondary.500' size='lg' />
    </Center>
  )
}
