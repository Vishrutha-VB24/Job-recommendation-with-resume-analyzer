import authService from "../appwrite/auth";
import useauthStore from "@/store/authStore";
import {useRouter} from "@tanstack/react-router";

export function Logout() {
    const clearUserInfo = useauthStore((state) => state.clearUserInfo);
    const router = useRouter();
    async function logout() {
        try {
            await authService.logout();
            alert("Logout successful");
            clearUserInfo();
            router.invalidate();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <span
            onClick={logout}
            style={{
                cursor: "pointer",
            }}
        >
            LOGOUT
        </span>
    );
}





