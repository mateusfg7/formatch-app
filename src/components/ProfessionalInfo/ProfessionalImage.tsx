import { Image, IImageProps } from 'native-base'

export const ProfessionalImage = ({ ...props }: IImageProps) => {
  return <Image w='full' h='64' borderRadius='3xl' {...props} />
}
