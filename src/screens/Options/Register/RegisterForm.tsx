import { useState } from 'react'
import { ScrollView, VStack } from 'native-base'
import { Envelope, IdentificationCard, Phone } from 'phosphor-react-native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import * as Haptics from 'expo-haptics'

import { formatBrPhoneNumber } from '../../../utils/formatBrPhoneNumber'

import { Header } from '../../../components/Header'
import { Title } from '../../../components/Title'
import {
  Input,
  Submit,
  SelectStateForm,
  SelectCityForm,
  SelectOccupation,
  ImagePicker,
  WhatsAppInput,
  InstagramInput,
  Biography,
} from '../../../components/Form'

import { useProfessional } from '../../../hooks/useProfessional'

const registerSchema = yup.object().shape(
  {
    imageUri: yup.string().required('Selecione uma imagem de perfil'),
    name: yup.string().required('Informe seu nome'),
    /* FIX: this block has a deprecated code listed on BREAKING CHANGE of yup@1.0.0-alpha.4
     * see https://github.com/jquense/yup/blob/HEAD/CHANGELOG.md#100-alpha4-2021-12-29
     */
    phone: yup.string().when('phone', (value) => {
      if (value) {
        return yup.string().length(15, 'Número inválido')
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            // Convert empty values to undefined
            if (!value) {
              return undefined
            }
            return originalValue
          })
          .nullable()
          .optional()
      }
    }),
    /* FIX: this block has a deprecated code listed on BREAKING CHANGE of yup@1.0.0-alpha.4
     * see https://github.com/jquense/yup/blob/HEAD/CHANGELOG.md#100-alpha4-2021-12-29
     */
    email: yup.string().when('email', (value) => {
      if (value) {
        return yup.string().email('Email inválido')
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            // Convert empty values to undefined
            if (!value) {
              return undefined
            }
            return originalValue
          })
          .nullable()
          .optional()
      }
    }),
    stateUf: yup.string().required('Selecione seu estado'),
    city: yup.string().required('Selecione sua cidade'),
    occupation: yup
      .string()
      .required('Selecione pelo menos uma área de atuação'),
    bio: yup.string().required('Conte sobre você e seus projetos'),
    /* FIX: this block has a deprecated code listed on BREAKING CHANGE of yup@1.0.0-alpha.4
     * see https://github.com/jquense/yup/blob/HEAD/CHANGELOG.md#100-alpha4-2021-12-29
     */
    whatsapp: yup.string().when('whatsapp', (value) => {
      if (value) {
        return yup.string().length(15, 'Número inválido')
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            // Convert empty values to undefined
            if (!value) {
              return undefined
            }
            return originalValue
          })
          .nullable()
          .optional()
      }
    }),
    /* FIX: this block has a deprecated code listed on BREAKING CHANGE of yup@1.0.0-alpha.4
     * see https://github.com/jquense/yup/blob/HEAD/CHANGELOG.md#100-alpha4-2021-12-29
     */
    instagram: yup.string().when('instagram', (value) => {
      if (value) {
        return yup.string()
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            // Convert empty values to undefined
            if (!value) {
              return undefined
            }
            return originalValue
          })
          .nullable()
          .optional()
      }
    }),
  },
  [
    ['phone', 'phone'],
    ['email', 'email'],
    ['instagram', 'instagram'],
    ['whatsapp', 'whatsapp'],
  ]
)

export function RegisterForm() {
  const {
    control,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<FormDataProps>({
    resolver: yupResolver(registerSchema),
  })

  const [isRequesting, setIsRequesting] = useState(false)
  const [selectedStateUf, setSelectedStateUf] = useState<string | undefined>(
    undefined
  )

  const { createProfessional } = useProfessional()

  async function handleData(data: FormDataProps) {
    setIsRequesting(true)

    await createProfessional(data, setIsRequesting)

    setIsRequesting(false)
  }

  async function handleRegister() {
    await handleSubmit(handleData)()

    if (!isValid) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    }
  }

  return (
    <VStack bg='background.500' flex='1'>
      <Header showBackButton />
      <Title text='Se cadastrar' />
      <ScrollView
        px='5'
        py='8'
        bg='background.200'
        borderRadius='3xl'
        shadow='1'
        showsVerticalScrollIndicator={false}
      >
        <VStack pb='40'>
          <Controller
            control={control}
            name='imageUri'
            render={({ field: { onChange } }) => (
              <ImagePicker
                onChange={onChange}
                errorMessage={errors.imageUri?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='name'
            render={({ field: { onChange } }) => (
              <Input
                label='Nome'
                inputProps={{
                  placeholder: 'Seu nome completo',
                  onChangeText: onChange,
                }}
                errorMessage={errors.name?.message}
                IconComponent={IdentificationCard}
                styles={{ mb: '4' }}
              />
            )}
          />
          <Controller
            control={control}
            name='phone'
            render={({ field: { onChange, value } }) => (
              <Input
                label='Telefone'
                inputProps={{
                  placeholder: '(99) 99999-9999',
                  value,
                  onChangeText: (e) => onChange(formatBrPhoneNumber(e)),
                }}
                errorMessage={errors.phone?.message}
                IconComponent={Phone}
                styles={{ mb: '4' }}
              />
            )}
          />
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange } }) => (
              <Input
                label='Email'
                inputProps={{
                  placeholder: 'contato@email.com',
                  onChangeText: onChange,
                }}
                errorMessage={errors.email?.message}
                IconComponent={Envelope}
                styles={{ mb: '16' }}
              />
            )}
          />

          <Controller
            control={control}
            name='stateUf'
            render={({ field: { onChange } }) => (
              <SelectStateForm
                setStateAction={onChange}
                setUfState={setSelectedStateUf}
                errorMessage={errors.stateUf?.message}
                mb='4'
              />
            )}
          />

          <Controller
            control={control}
            name='city'
            render={({ field: { onChange } }) => (
              <SelectCityForm
                stateUf={selectedStateUf}
                setCityAction={onChange}
                errorMessage={errors.city?.message}
                mb='16'
              />
            )}
          />

          <Controller
            control={control}
            name='occupation'
            render={({ field: { onChange } }) => (
              <SelectOccupation
                setStateAction={onChange}
                errorMessage={errors.occupation?.message}
                mb='4'
              />
            )}
          />
          <Controller
            control={control}
            name='bio'
            render={({ field: { onChange } }) => (
              <Biography
                onChange={onChange}
                errorMessage={errors.bio?.message}
                styles={{ mb: '16' }}
              />
            )}
          />

          <Controller
            control={control}
            name='whatsapp'
            render={({ field: { onChange, value } }) => (
              <WhatsAppInput
                inputProps={{
                  placeholder: '(99) 99999-9999',
                  value,
                  onChangeText: (e) => onChange(formatBrPhoneNumber(e)),
                }}
                errorMessage={errors.whatsapp?.message}
                styles={{ mb: '4' }}
              />
            )}
          />
          <Controller
            control={control}
            name='instagram'
            render={({ field: { onChange, value } }) => (
              <InstagramInput
                inputProps={{
                  placeholder: '@exemplo',
                  value,
                  onChangeText: (e) => {
                    let text: string
                    if (e != '') {
                      const parse = e.replaceAll('@', '')
                      text = '@' + parse
                    } else text = e
                    onChange(text)
                  },
                }}
                styles={{ mb: '16' }}
              />
            )}
          />

          <Submit
            onPress={handleRegister}
            disabled={!isValid}
            isLoading={isRequesting}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
