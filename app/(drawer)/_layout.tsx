import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link, Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '../../components/HeaderButton';
import { useAuth } from '~/contexts/AuthProvider';

const DrawerLayout = () => {
  // This setups the redirect to login when not logged but protects Drawer.
  const {isAuthenticated} = useAuth();
  console.log("auth ", isAuthenticated);
  // console.warn(isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href="../login" />;
  }

  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'Events',
          drawerLabel: 'Events',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Tabs',
          drawerLabel: 'Tabs',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="border-bottom" size={size} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
