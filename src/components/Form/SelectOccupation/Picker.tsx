import React, { createRef, useState } from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import ActionSheet, {
  SheetManager,
  ActionSheetRef,
} from 'react-native-actions-sheet'
import {
  HStack,
  Text,
  VStack,
  Box,
  useTheme,
  Pressable,
  Divider,
} from 'native-base'
import {
  Buildings,
  Cpu,
  Drop,
  IconProps,
  Mountains,
  PaintRoller,
  PencilSimpleLine,
  SuitcaseSimple,
  Wall,
} from 'phosphor-react-native'

export type PickerProps = {
  id: string
  setSelected: (value: Occupation) => void
}

export const onOpen = (id: any) => {
  SheetManager.show(id)
}

export const onClose = (id: any) => {
  SheetManager.hide(id)
}

export const Picker = ({ id, setSelected }: PickerProps) => {
  const actionSheetRef = createRef<ActionSheetRef>()

  const { sizes, colors } = useTheme()

  const occupationList: {
    occupation: Occupation
    Icon: (props: IconProps) => JSX.Element
  }[] = [
    { occupation: 'Alvenaria', Icon: ({ ...props }) => <Wall {...props} /> },
    {
      occupation: 'Arquitetura',
      Icon: ({ ...props }) => <PencilSimpleLine {...props} />,
    },
    { occupation: 'Elétrica', Icon: ({ ...props }) => <Cpu {...props} /> },
    {
      occupation: 'Engenharia Civil',
      Icon: ({ ...props }) => <Buildings {...props} />,
    },
    { occupation: 'Hidráulica', Icon: ({ ...props }) => <Drop {...props} /> },
    {
      occupation: 'Pintura',
      Icon: ({ ...props }) => <PaintRoller {...props} />,
    },
    {
      occupation: 'Topologia',
      Icon: ({ ...props }) => <Mountains {...props} />,
    },
    {
      occupation: 'Outros',
      Icon: ({ ...props }) => <SuitcaseSimple {...props} />,
    },
  ]

  type OccupationElement = typeof occupationList[0]

  const onClose = () => {
    SheetManager.hide(id)
  }

  const itemOnPress = (occupation: Occupation) => {
    setSelected(occupation)
    onClose()
  }

  const Item = ({
    item: { Icon, occupation },
  }: {
    item: OccupationElement
  }) => (
    <Pressable
      _pressed={{
        opacity: 0.6,
      }}
      onPress={() => {
        itemOnPress(occupation)
      }}
    >
      <HStack alignItems='center' py='5'>
        <Box mr='3'>
          <Icon weight='regular' />
        </Box>
        <Text fontSize='xl' fontFamily='regular'>
          {occupation}
        </Text>
      </HStack>
    </Pressable>
  )

  const keyExtractor = (_item: OccupationElement, index: number) =>
    index.toString()

  return (
    <ActionSheet
      id={id}
      ref={actionSheetRef}
      containerStyle={{
        padding: sizes[3],
      }}
      indicatorStyle={{
        backgroundColor: colors.complement[300],
      }}
      gestureEnabled
      animated
    >
      <SafeAreaView
        style={{
          paddingTop: sizes[3],
        }}
      >
        <FlatList
          disableScrollViewPanResponder={true}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <VStack mt='3' pb='2' bg='white'>
              <Text color='complement.500' fontSize='md' fontFamily='bold'>
                Selecione sua área de atuação
              </Text>
              <Text color='complement.300' fontSize='sm'>
                Você pode selecionar mais de uma área
              </Text>
            </VStack>
          }
          nestedScrollEnabled={true}
          data={occupationList}
          ItemSeparatorComponent={() => <Divider ml='10' />}
          renderItem={({ item }) => {
            return <Item item={item} />
          }}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </ActionSheet>
  )
}
