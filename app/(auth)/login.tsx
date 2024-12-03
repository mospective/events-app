import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View, AppState, TextInput,  Button, Pressable, Text} from 'react-native';
import { supabase } from '~/utils/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    console.log("was clicked")

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View className="p-5 bg-white flex-1 pt-10 gap-4">
        <Stack.Screen options={{title: "Sign in"}} />

        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          className="border border-gray-200 p-3 rounded-md p3"
        />

        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          className="border border-gray-200 p-3 rounded-md p3"
        />

        <View className="flex-row gap-2">
            <Pressable onPress={() => signInWithEmail()} disabled={loading} className="flex-1 border-2 border-red-400 p-3 px-8 rounded-md">
              <Text className="text-lg font-bold text-red-400 text-center">Sign in</Text>
            </Pressable>
            <Pressable onPress={() => signUpWithEmail()} disabled={loading} className="flex-1 bg-red-400 p-3 px-8 rounded-md">
              <Text className="text-lg font-bold text-white text-center">Sign up</Text>
            </Pressable>
        </View>

    </View>
  )
}
