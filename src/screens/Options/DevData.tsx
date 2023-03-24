import {
  HStack,
  Pressable,
  Text,
  VStack,
  ScrollView,
  useTheme,
} from 'native-base'
import * as Clipboard from 'expo-clipboard'
import * as Application from 'expo-application'
import * as Device from 'expo-device'
import Constants from 'expo-constants'

import { feedbackToast } from '../../utils/feedbackToast'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'
import { ReactNode } from 'react'

export function DevData() {
  const { fontSizes } = useTheme()

  const copyToClipboard = async (title: string, text: string) => {
    await Clipboard.setStringAsync(text)

    feedbackToast('INFO', `${title} copiado!`)
  }

  const Info = ({ title, data }: { title: string; data: string }) => (
    <VStack space='1'>
      <HStack alignItems='center'>
        <Text fontSize='xl'>{title}</Text>
      </HStack>
      <Pressable onPress={() => copyToClipboard(title, data)}>
        <Text fontSize='xl' bold isTruncated>
          {data}
        </Text>
      </Pressable>
    </VStack>
  )

  const Section = ({
    title,
    children,
  }: {
    title: string
    children: ReactNode
  }) => (
    <VStack
      borderWidth='1'
      borderColor='complement.500'
      p='2'
      borderRadius='xl'
    >
      <Text fontSize='2xl' mb='9' bold underline>
        {title}
      </Text>
      <VStack space='7'>{children}</VStack>
    </VStack>
  )

  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header showBackButton />
      <Title text='Test laboratory' />
      <ScrollView bg='white' borderRadius='3xl'>
        <VStack px='5' py='6' pb='48' flex='1' space='9'>
          <Section title='Application'>
            <Info title='ID' data={Application.applicationId} />
            <Info title='Name' data={Application.applicationName} />
            <Info
              title='Native Application Version'
              data={Application.nativeApplicationVersion}
            />
            <Info
              title='Native Build Version'
              data={Application.nativeBuildVersion}
            />
          </Section>
          <Section title='General'>
            <Info title='App Ownership' data={String(Constants.appOwnership)} />
            <Info title='Debug Mode' data={String(Constants.debugMode)} />
            <Info title='Device Name' data={String(Constants.deviceName)} />
            <Info
              title='Execution Environment'
              data={String(Constants.executionEnvironment)}
            />
            <Info
              title='Experience URL'
              data={String(Constants.experienceUrl)}
            />
            <Info title='Expo version' data={String(Constants.expoVersion)} />
            <Info
              title='System version'
              data={String(Constants.systemVersion)}
            />
            <Info
              title='Expo runtime version'
              data={String(Constants.expoRuntimeVersion)}
            />
          </Section>
          <Section title='Expo Config'>
            <Info title='Name' data={String(Constants.expoConfig.name)} />
            <Info
              title='Description'
              data={String(Constants.expoConfig.description)}
            />
            <Info title='Slug' data={String(Constants.expoConfig.slug)} />
            <Info title='Owner' data={String(Constants.expoConfig.owner)} />
            <Info
              title='Current full name'
              data={String(Constants.expoConfig.currentFullName)}
            />
            <Info
              title='SDK Version'
              data={String(Constants.expoConfig.sdkVersion)}
            />
            <Info
              title='Runtime version'
              data={String(Constants.expoConfig.runtimeVersion)}
            />
            <Info
              title='Platforms'
              data={String(Constants.expoConfig.platforms)}
            />
            <Info
              title='Github URL'
              data={String(Constants.expoConfig.githubUrl)}
            />
            <Info
              title='JS Engine'
              data={String(Constants.expoConfig.jsEngine)}
            />
          </Section>
          <Section title='Device'>
            <Info title='Brand' data={String(Device.brand)} />
            <Info title='Design Name' data={String(Device.designName)} />
            <Info title='Year Class' data={String(Device.deviceYearClass)} />
            <Info title='Manufacturer' data={String(Device.manufacturer)} />
            <Info
              title='OS Build fingerprint'
              data={String(Device.osBuildFingerprint)}
            />
            <Info title='OS Name' data={String(Device.osName)} />
            <Info title='OS Version' data={String(Device.osVersion)} />
            <Info
              title='Platform API Level'
              data={String(Device.platformApiLevel)}
            />
            <Info
              title='Supported CPU Architectures'
              data={String(Device.supportedCpuArchitectures)}
            />
            <Info
              title='Total memory'
              data={String(Device.totalMemory / 1000 / 1000)}
            />
          </Section>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
