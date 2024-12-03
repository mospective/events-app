import { View, Text, Image, Pressable } from 'react-native';
import { Link } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import dayjs from "dayjs";

interface Event {
    id: string;
    title: string;
    location: string;
    image: string;
    datetime: string;
  }
  
  interface EventListItemProps {
    event: Event;
  }

export default function EventListItem({ event }: EventListItemProps) {
  return (
    <Link href={`/${event.id}`} asChild>
        <Pressable className="m-3 pb-3 gap-3 border-b-2 border-gray-100">
            <View className="flex-row">
              <View className="flex-1 gap-2">
                <Text className="text-lg font-semibold uppercase text-amber-700">
                  {dayjs(event.datetime).format("ddd, D MMM")} · {dayjs(event.datetime).format("hh:mm A")}
                </Text>
                <Text className="text-xl font-bold" numberOfLines={2}>{ event.title }</Text>
                <Text className="text-gray-700">{ event.location }</Text>
              </View>
              {/* Event image */}
              <Image
                source={{ uri: event.image }}
                className="aspect-video w-2/5 rounded-xl"
              />
            </View>
            {/* Footer */}
            <View className="flex-row gap-3">
              <Text className="mr-auto text-gray-700">16 going</Text>
              <Feather name="share" size={20} color="gray" />
              <Feather name="bookmark" size={20} color="gray" />
            </View>
          </Pressable>
    </Link>
  );
}