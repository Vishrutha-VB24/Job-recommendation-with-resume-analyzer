// import { Link } from "@tanstack/react-router"
// import { Button } from "./ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
// import { Input } from "./ui/input"
// import { Label } from "./ui/label"
// import React from "react"

// type LoginFormProps = {
//     className:string
// }

// const LoginForm:React.FC<LoginFormProps> = ({className})=>{
//     return(

//         <Card className={`${className}`}>
//             <CardHeader>
//                 <CardTitle className="text-xl ">
//                     LOGIN FORM 
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div>
//                     <Label>
//                         Username
//                     </Label>
//                     <Input className="bg-white bg-opacity-60 ">
//                     </Input>
//                 </div>
//                 <div>
//                     <Label>
//                         Password
//                     </Label>
//                     <Input className="bg-white bg-opacity-60 ">
//                     </Input>
//                 </div>
//             </CardContent>
//             <CardFooter className="grid grid-cols-2 ">
//                 <Button className="">LOGIN</Button>
//                 <Link to='/register' className="flex justify-center ">
//                     <Button variant="link" className="text-white">Register</Button>
//                 </Link>

//             </CardFooter>
//         </Card>
//     )
// }


// export default LoginForm





// import { Link } from "@tanstack/react-router"
// import { Button } from "./ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
// import { Input } from "./ui/input"
// import { Label } from "./ui/label"
// import React from "react"

// type LoginFormProps = {
//     className: string
// }

// const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
//     return (
//         // <Card className={`${className} max-w-md p-12 rounded-lg shadow-lg relative`}>
//         <Card className={`${className} w-100 h-100 p-12 rounded-tr-3xl border-black shadow-lg relative`}>
//             <div className="absolute top-0 right-0 w-12 h-12 bg-white rounded-tr-lg rounded-bl-lg" />

//             <CardHeader className="mb-4">
//                 <CardTitle className="text-2xl font-bold text-gray-900">
//                     LOGIN
//                 </CardTitle>
//             </CardHeader>

//             <CardContent className="space-y-6">

//                 <div className="flex flex-col space-y-1">
//                     <Label className="text-sm font-medium text-gray-700">Email</Label>
//                     <Input 
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white bg-opacity-60 placeholder-gray-500"
//                         placeholder="sample@email.com"
//                         type="email"
//                     />
//                 </div>

                
//                 <div className="flex flex-col space-y-1">
//                     <Label className="flex justify-between text-sm font-medium text-gray-700">
//                         Password
//                         <Link to='/forgot-password' className="text-xs text-black hover:underline italic">
//                             forgot password?
//                         </Link>
//                     </Label>
//                     <Input 
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white bg-opacity-60" 
//                         type="password"
//                     />
//                 </div>
//             </CardContent>

//             <CardFooter className="mt-6 flex flex-col items-center space-y-4">
               
//                 <Button 
//                     className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-all duration-150 border-black"
//                 >
//                     Login
//                 </Button>

               
//                 <div className="text-sm text-gray-600">
//                     New around here? <Link to='/register' className="text-blue-500 hover:underline italic">Sign up</Link>
//                 </div>
//             </CardFooter>
//         </Card>
//     )
// }

// export default LoginForm


import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import React from "react"

type LoginFormProps = {
    className: string
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
    return (
        <Card 
            className={`${className} w-96 h-97 p-12 shadow-lg relative`} 
            style={{
                borderColor: "black",
                border: '2px solid rgba(0, 0, 0, 0.3)',
                borderTopRightRadius: '6rem',  // Custom large border radius for top-right corner
                borderTopLeftRadius: '0',      // No rounding on top-left
                borderBottomRightRadius: '0',  // No rounding on bottom-right
                borderBottomLeftRadius: '0',   // No rounding on bottom-left
                boxShadow: '-14px 14px 2px rgba(0, 0, 0, 0.3)', // Soft, lifted shadow effect
            }}
        >
            <CardHeader className="mb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                    LOGIN
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Email Field */}
                <div className="flex flex-col space-y-1">
                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                    <Input 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white bg-opacity-60 placeholder-gray-500"
                        placeholder="sample@email.com"
                        type="email"
                    />
                </div>

                {/* Password Field with "Forgot Password" Link */}
                <div className="flex flex-col space-y-1">
                    <Label className="flex justify-between text-sm font-medium text-gray-700">
                        Password
                        <Link to='/forgot-password' className="text-xs text-black hover:underline italic font-normal">
                            forgot password?
                        </Link>
                    </Label>
                    <Input 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white bg-opacity-60"
                        type="password"
                    />
                </div>
            </CardContent>

            <CardFooter className="mt-6 flex flex-col items-center space-y-4">
                {/* Login Button */}
                <Button 
                    className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-all duration-150"
                >
                    Login
                </Button>

                {/* Sign Up Link */}
                <div className="text-sm text-gray-600">
                    New around here? <Link to='/register' className="text-blue-500 hover:underline italic">Sign up</Link>
                </div>
            </CardFooter>
        </Card>
    )
}

export default LoginForm

