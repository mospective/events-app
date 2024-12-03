import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Profile() {
  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(tabs)/profile.tsx" title="Profile" />
      </Container>
    </>
  );
}
