import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import {useDispatch} from 'react-redux'
import {setRestaurant} from '../features/restaurantSlice'
const RestaurantScreen = () => {

  const {
    params: {
      id,
      imgUrl,
      title,
      short_description,
      rating,
      address,
      genre,
      long,
      lat,
      dishes,
    },
  } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(setRestaurant({
    id,
    imgUrl,
    title,
    short_description,
    rating,
    address,
    genre,
    long,
    lat,
    dishes,
   }))
  }, [dispatch])
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    return () => {};
  }, []);
  return (
<>
<BasketIcon/>
<ScrollView>
      <View className="relative">
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full "
        >
          <ArrowLeftIcon size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="text-3xl font-bold">{title}</Text>
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row items-center space-x-1">
              <StarIcon color={"green"} size={22} opacity={0.5} />
              <Text className="text-xs text-gray-500">
                <Text className="text-green-500">{rating}</Text> . {genre.name}
              </Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <LocationMarkerIcon color={"gray"} size={22} opacity={0.4} />
              <Text className="text-xs text-gray-500">Nearby . {address}</Text>
            </View>
          </View>

          <Text className="pb-4 mt-2 text-gray-500">{short_description}</Text>
        </View>
        <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
          <QuestionMarkCircleIcon color={"gray"} size={20} opacity={0.6} />
          <Text className="pl-2 flex-1 text-md font-bold">
            Have a food allergy?
          </Text>
          <ChevronRightIcon color={"#00CCBB"} />
        </TouchableOpacity>
      </View>
      <View className='pb-36'>
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
        {/* //todo: Dishrows */}

        {dishes.map((dish) => (
          <DishRow key={dish._id} id={dish._id} name={dish.name} description={dish.short_description} price={dish.price} image={dish.image} />
        ))}
      </View>
    </ScrollView>
</>
  );
};

export default RestaurantScreen;
