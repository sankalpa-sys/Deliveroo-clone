import { View, Text, SafeAreaView,Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {ChevronDownIcon, UserIcon,SearchIcon,AdjustmentsIcon} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'



export default function HomeScreen() {
  const [featuredCategories, setFeaturedCategories] = useState([])
    const navigation = useNavigation()
    useLayoutEffect(() => {
     
        navigation.setOptions({
            headerShown: false
        })
      return () => {
       
      };
    }, [])

    useEffect(() => {
    
      sanityClient.fetch(`*[_type == "featured"]{
        ...,
        restaurants[] -> {
          ...,
          dishes[] ->,
          type->{
            name
          }
            
          
        }
      }
        `).then(data => {
          setFeaturedCategories(data)
        })
    }, [])

    
    
  return (
    // safe view will keep the items in the viewing plane
    <SafeAreaView className='bg-white pt-5'>
     
        {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
            <Image source={
                {
                    uri:'https://links.papareact.com/wru'
                }
            } className="h-7 w-7 bg-gray-300 p-4 rounded-full"/>

            <View className="flex-1">
                <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
                <Text className="font-bold text-xl">Current Location
                <ChevronDownIcon size={20} color='#00CCBB'/>
                </Text>
            </View>
            <UserIcon size={35} color='#00CCBB'/>
      </View>

      {/* search */}

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className='flex-row space-x-2 flex-1 bg-gray-200 p-3'>
            <SearchIcon color={"gray"} size={20}/>
            <TextInput placeholder='Restaurants and cuisines' keyboardType='default'/>
        </View>
        <AdjustmentsIcon color='#00CCBB'/>
      </View>
      <ScrollView className="bg-gray-100" contentContainerStyle = {{
        paddingBottom: 100
      }}>
        {/* categories */}
        <Categories/>

        {featuredCategories?.map((cat)=>(

          <FeaturedRow 
          key={cat._id} 
          id={cat._id} 
          title={cat.name} 
          description = {cat.short_description} 
          />
        )

        
        )}

      
        

        {/* featured row */}
      </ScrollView>
    </SafeAreaView>
  )
}