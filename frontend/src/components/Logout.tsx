// import { Button } from "@/components/ui/button";
// import authService from "../appwrite/auth";
// import useauthStore from "@/store/authStore";


// export function Logout() {
//     const clearUserInfo = useauthStore((state) => state.clearUserInfo);

//     async function logout(){
//         try {
//             await authService.logout()
//             alert("Logout successfull")
//             clearUserInfo()
//         } catch (error) {
//             console.log(error)
//         }
//     }
    

//   return <Button onClick={logout} >LOGOUT</Button>
// }




import { useState } from 'react';
import authService from "../appwrite/auth";
import useauthStore from "@/store/authStore";

export function Logout({ isActive, onClick }) {
    const clearUserInfo = useauthStore((state) => state.clearUserInfo);

    async function logout() {
        try {
            await authService.logout();
            alert("Logout successful");
            clearUserInfo();
            onClick(); 
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
            className={`${isActive ? 'font-bold' : ''}`}
        >
            LOGOUT
        </span>
    );
}





