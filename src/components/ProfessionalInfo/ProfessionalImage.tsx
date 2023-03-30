import { useState } from 'react'
import { Box } from 'native-base'
import { Image, IImageProps } from 'native-base'
import { LoadingSkeleton } from '../LoadingSkeleton'

export const ProfessionalImage = ({ ...props }: IImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <Box w='full' h='64' borderRadius='3xl' overflow='hidden'>
      <LoadingSkeleton isContentVisible={isImageLoaded}>
        <Image
          size='full'
          onLoadEnd={() => setIsImageLoaded(true)}
          {...props}
        />
      </LoadingSkeleton>
    </Box>
  )
}
