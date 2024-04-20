import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { LocationMarkerIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'


export default function RestaurantCard({id, imgUrl,title,rating,genre,address,short_description,dishes,long,lat}) {
const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>{
      navigation.navigate("Restaurant", {
        id,
        imgUrl,
        title,
        short_description,
        rating,
        address,
        genre,
        long,
        lat,
        dishes
      })
    }} className='bg-white mr-3 shadow'>
      <Image source={{
        uri: urlFor(imgUrl).url()
      }} className = 'h-36 w-64 rounded-sm'/>
      <View className='px-3 pb-4'>
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className='flex-row space-x-1 items-center'>
            <StarIcon color='green' size={22} opacity={0.5}/>
            <Text className='text-xs text-gray-500'>
                <Text className='text-green-500'>{rating}</Text> . {genre.name}
            </Text>
        </View>
        <View className='flex-row space-x-1'>
            <LocationMarkerIcon color='gray' size={22} opacity={0.4}/>
            <Text className='text-xs text-gray-500'>Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}