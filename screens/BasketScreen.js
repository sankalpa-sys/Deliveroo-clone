import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { removeFromBasket, selectBasketTotal, selectedBasket } from '../features/basketSlice'
import {XCircleIcon} from "react-native-heroicons/solid"
import { urlFor } from '../sanity'
import Currency from "react-currency-formatter";
const BasketScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectedBasket)
  const dispatch = useDispatch()
  const [groupedItemsinBasket, setgroupedItemsinBasket] = useState([])

  useMemo(() => {
    const groupedItems = items.reduce((results, item)=>{
      (results[item.id] = results[item.id]||[]).push(item)
      return results
    }, {})

    setgroupedItemsinBasket(groupedItems)
  }, [items])

  const basketTotal = useSelector(selectBasketTotal)

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 bg-gray-100 '>
        <View className='p-5 border-b border-[#00CCBB] bg-white shadow-sm'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>{restaurant.title}</Text>
          </View>
          <TouchableOpacity className='rounded-full bg-gray-100 absolute top-3 right-5' onPress={navigation.goBack}>
            <XCircleIcon color='#00CCBB' size={50}/>

          </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
          <Image className='h-7 w-7 bg-gray-300 p-4 rounded-full' source={{
            uri:'https://links.papareact.com/wru'
          }}/>
          <Text className='flex-1'>Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className='text-[#00CCBB]'>
              Change
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView className='divide-y divide-gray-100'>
          {Object.entries(groupedItemsinBasket).map(([key, items]) => (
            <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
              <Text className='text-[#00CCBB]'>
                {items.length} x
              </Text>
              <Image source={{uri: urlFor(items[0]?.image).url()}} className='h-12 w-12 rounded-full'/>
              <Text className='flex-1'>{items[0]?.name}</Text>
              <Text className='text-gray-600'>
              <Currency quantity={items[0]?.price} currency='NPR'/>
              </Text>
              <TouchableOpacity>
                <Text onPress={()=>dispatch(removeFromBasket({id: key}))} className='text-[#00CCBB] text-xs'>
                    Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className='p-5 bg-white mt-5 space-y-4'>
            <View className='flex-row justify-between'>
              <Text className='text-gray-400 '>
                Subtotal
              </Text>
              <Text className='text-gray-400'>
              <Currency quantity={basketTotal} currency='NPR'/>
              </Text>
            </View>
            <View className='flex-row justify-between'>
              <Text className='text-gray-400 '>
               Delivery Fee
              </Text>
              <Text className='text-gray-400'>
              <Currency quantity={599} currency='NPR'/>
              </Text>
            </View>
            <View className='flex-row justify-between'>
              <Text className=' '>
               Order total
              </Text>
              <Text className=' font-extrabold'>
              <Currency quantity={basketTotal + 499} currency='NPR'/>
              </Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("PreparingOrderScreen")} className='rounded-lg bg-[#00CCBB] p-4'>
              <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen