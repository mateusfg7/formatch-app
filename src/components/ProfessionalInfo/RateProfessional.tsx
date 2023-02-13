import { Center, HStack, useTheme } from 'native-base'
import { Field } from './Field'
import { Star } from 'phosphor-react-native'
import { Pressable } from 'native-base'
import { useState } from 'react'
import { api } from '../../services/api'
import { AxiosError } from 'axios'
import { feedbackToast } from '../../utils/feedbackToast'

interface Props {
  rateValue?: number
  professionalCode: string
}

export const RateProfessional = ({ rateValue, professionalCode }: Props) => {
  const [currentRateValue, setCurrentRateValue] = useState(rateValue ?? 0)

  const { sizes, colors } = useTheme()

  const range = [1, 2, 3, 4, 5]

  async function rate(value: number) {
    const backupRate = currentRateValue

    setCurrentRateValue(value)

    await api
      .post(`/rate/${professionalCode}`, {
        rate: value,
      })
      .catch((error: AxiosError) => {
        console.log(JSON.stringify(error.response.data))
        setCurrentRateValue(backupRate)
        feedbackToast('ERROR', 'Erro ao atualizar a sua nota')
      })
  }

  return (
    <Field title={rateValue ? 'Atualize sua nota' : 'Dê a sua nota'}>
      <Center p='5'>
        <HStack space='4'>
          {range.map((currValueOnRange) => (
            <Pressable
              key={currValueOnRange}
              _pressed={{ opacity: 0.7 }}
              onPress={() => rate(currValueOnRange)}
            >
              <Star
                weight='duotone'
                size={sizes['8']}
                color={
                  currentRateValue >= currValueOnRange
                    ? colors.secondary[500]
                    : colors.complement[500]
                }
              />
            </Pressable>
          ))}
        </HStack>
      </Center>
    </Field>
  )
}
