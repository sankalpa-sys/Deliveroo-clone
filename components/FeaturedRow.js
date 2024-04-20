import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

export default function FeaturedRow({ id, title, description }) {
  const [restros, setRestros] = useState([]);
  useEffect(() => {
    sanityClient.fetch(`*[_type == "featured" && _id == $id]{
      ...,
      restaurants[]-> {
        ...,
        dishes[]->,
        type-> {
          name
        }
          
        
          
        
      }
      
    }[0]`, {id}).then(data=>{
      setRestros(data?.restaurants)
    })
  }, [id]);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="pt-4"
      >
        {restros.map(restro => (
          <RestaurantCard
            key={restro._id}
            id={restro._id}
            imgUrl={restro.image}
            title={restro.name}
            rating={restro.rating}
            genre={restro.type}
            address={restro.address}
            short_description={restro.short_description}
            dishes={restro.dishes}
            long={restro.long}
            lat={restro.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
}
