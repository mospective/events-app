import { Redirect, Stack } from "expo-router";
import { useAuth } from '~/contexts/AuthProvider';

export default function AuthLayout() {
    // This is for login redirect upon success 
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Redirect href={"/"} />
    }

    return <Stack />
}