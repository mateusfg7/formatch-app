import { useState } from 'react'
import { ScrollView, Text, VStack } from 'native-base'
import { Envelope, IdentificationCard, Phone } from 'phosphor-react-native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import * as Haptics from 'expo-haptics'

import { formatBrPhoneNumber } from '../../../utils/formatBrPhoneNumber'
import { developmentWarning } from '../../../utils/developmentWarning'
import { errorToast } from '../../../utils/errorToast'

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

import { api } from '../../../services/api'

interface FormDataProps {
  imageUri: string
  name: string
  phone: string
  email: string
  stateUf: string
  city: string
  occupation: string
  bio: string
  whatsapp: string
  instagram: string
}

const registerSchema = yup.object({
  imageUri: yup.string().required('Selecione uma imagem de perfil'),
  name: yup.string().required('Informe seu nome'),
  phone: yup.string().length(15, 'Número inválido').optional(),
  email: yup.string().email('Email inválido').optional(),
  stateUf: yup.string().required('Selecione seu estado'),
  city: yup.string().required('Selecione sua cidade'),
  occupation: yup.string().required('Selecione pelo menos uma área de atuação'),
  bio: yup.string().required('Conte sobre você e seus projetos'),
  whatsapp: yup.string().length(15, 'Número inválido').optional(),
  instagram: yup.string().optional(),
})

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

  async function handleData(data: FormDataProps) {
    setIsRequesting(true)

    if (!data.email && !data.phone && !data.whatsapp && !data.instagram) {
      setIsRequesting(false)
      errorToast('Você deve ter pelomenos um meio de contato')
      return
    }

    const imageRequest = await fetch(data.imageUri)
    const imageBlob = await imageRequest.blob()
    const imageFileType = imageBlob.type.split('/')[1]

    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('state_uf', data.stateUf)
    formData.append('city', data.city)
    formData.append('biography', data.bio)
    formData.append('services', data.occupation)
    formData.append('profile_picture_file', {
      uri: data.imageUri,
      type: imageBlob.type,
      name: `profile.${imageFileType}`,
    } as unknown as Blob)

    if (data.email) formData.append('email', data.email)
    if (data.phone) formData.append('phone', data.phone)
    if (data.whatsapp) formData.append('whatsapp', data.whatsapp)
    if (data.instagram) formData.append('instagram', data.instagram)

    await api
      .postForm('/professional/create', formData)
      .then((response) => {
        console.log(`STATUS | ${response.status} ${response.statusText}`)
        console.log('DATA:')
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        setIsRequesting(false)
        errorToast('Ocorreu um erro durante o registro de profissional')
        errorToast(error)
      })

    setIsRequesting(false)
    developmentWarning()
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
          {isRequesting && <Text>Loading...</Text>}
        </VStack>
      </ScrollView>
    </VStack>
  )
}
