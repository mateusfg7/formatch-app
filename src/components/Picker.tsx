import React, { useRef, createRef, useState } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Text,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native'
import ActionSheet, { SheetManager } from 'react-native-actions-sheet'
import { useTheme } from 'native-base'

type RenderItemProp<T> = {
  renderListItem: (item: T, index: number) => React.ReactElement
}

export type PickerProps<T> = {
  id: string
  data: T[]
  searchable?: boolean
  onSearch?: (value: string) => void
  label?: string
  setSelected: (value: T) => void
  loading?: boolean
  height?: number
  inputValue?: string
} & (T extends { name: string }
  ? Partial<RenderItemProp<T>>
  : RenderItemProp<T>)

export const onOpen = (id: any) => {
  SheetManager.show(id)
}

export const onClose = (id: any) => {
  SheetManager.hide(id)
}

export const Picker = <T,>({
  id,
  data = [],
  searchable = true,
  onSearch,
  label,
  setSelected,
  loading = false,
  height = Math.floor(Dimensions.get('window').height * 0.7),
  inputValue,
  renderListItem,
}: PickerProps<T>) => {
  const [selectedKey, setSelectedKey] = useState(null)

  const actionSheetRef = createRef<ActionSheet>()
  const scrollViewRef = useRef(null)

  const { sizes, colors, fontSizes, radii } = useTheme()

  const onClose = () => {
    SheetManager.hide(id)
  }

  const Item = ({ item, index }: any) => (
    <TouchableOpacity
      style={{
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderColor: '#CDD4D9',
      }}
      onPress={() => {
        itemOnPress(item)
        setSelectedKey(index)
      }}
    >
      <Text style={{ fontWeight: selectedKey !== index ? 'normal' : 'bold' }}>
        {item.nome ? item.nome : null}
      </Text>
    </TouchableOpacity>
  )

  const itemOnPress = (item: T) => {
    setSelected(item)
    onClose()
  }

  const keyExtractor = (_item: T, index: number) => index.toString()

  return (
    <ActionSheet
      id={id}
      ref={actionSheetRef}
      indicatorColor={'transparent'}
      gestureEnabled={true}
      keyboardShouldPersistTaps='always'
    >
      <SafeAreaView
        style={{
          height: height,
          paddingHorizontal: sizes[3],
        }}
      >
        <FlatList<T>
          disableScrollViewPanResponder={true}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <View
              style={{
                backgroundColor: colors.white,
              }}
            >
              {searchable ? (
                <View
                  style={{
                    flexDirection: 'row',
                    width: sizes.full,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: sizes[3],
                  }}
                >
                  <View style={{ flexBasis: '75%' }}>
                    <TextInput
                      style={{
                        height: sizes[12],
                        borderWidth: 1,
                        borderColor: colors.complement[500],
                        borderRadius: radii['2xl'],
                        padding: 10,
                        color: colors.complement[500],
                      }}
                      value={inputValue}
                      placeholderTextColor={colors.complement[400]}
                      onChangeText={onSearch}
                      placeholder='Pesquisar'
                      clearButtonMode='always'
                      autoCapitalize='none'
                      autoCorrect={false}
                    />
                  </View>

                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => {
                      onClose()
                    }}
                  >
                    <Text style={{ color: colors.complement[500] }}>
                      Fechar
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              <View style={{ marginTop: sizes[3], paddingBottom: sizes[2] }}>
                <Text
                  style={{
                    color: colors.complement[500],
                    fontSize: fontSizes.md,
                    fontWeight: 'bold',
                  }}
                >
                  {label}
                </Text>
              </View>

              {loading ? (
                <ActivityIndicator
                  style={{ marginVertical: 20 }}
                  color='#999999'
                />
              ) : null}
            </View>
          }
          ListEmptyComponent={() => {
            if (!loading) {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingTop: 20,
                  }}
                >
                  <Text style={{ color: colors.complement[500] }}>
                    Nenhum dado encontrado.
                  </Text>
                </View>
              )
            }
            return null
          }}
          ref={scrollViewRef}
          nestedScrollEnabled={true}
          data={data}
          renderItem={({ item, index }) => {
            if (renderListItem) {
              return renderListItem(item, index)
            }

            return <Item item={item} index={index} />
          }}
          keyExtractor={keyExtractor}
          onMomentumScrollEnd={() =>
            actionSheetRef.current?.handleChildScrollEnd()
          }
        />
      </SafeAreaView>
    </ActionSheet>
  )
}
