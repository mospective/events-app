import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import events from '~/assets/events.json';
import dayjs from 'dayjs';

const event = () => {
  const { eventId } = useLocalSearchParams();
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return <Text>Event not found</Text>;
  }

  return (
    <View className="flex-1 p-3 bg-white gap-3">
      <Stack.Screen options={{ title: "Event", headerBackTitleVisible: false, headerTintColor: "black" }} />

      <Image source={{ uri: event.image }} className="aspect-video w-full rounded-2xl" />
      <Text className="text-3xl font-bold" numberOfLines={2}>
        {event.title}
      </Text>
      <Text className="text-lg font-semibold uppercase text-amber-700">
        {dayjs(event.datetime).format('ddd, D MMM')} · {dayjs(event.datetime).format('hh:mm A')}
      </Text>
      <Text className="text-lg" numberOfLines={3}>
        {event?.description}
      </Text>

      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 p-5 border-t-2 pb-10 border-gray-300 flex-row items-center justify-between">
        <Text className="font-semibold text-xl">Free</Text>
        <Pressable className="bg-red-300 p-5 px-8 rounded-md">
          <Text className="text-lg font-bold text-white">Join and RSVP</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default event;
