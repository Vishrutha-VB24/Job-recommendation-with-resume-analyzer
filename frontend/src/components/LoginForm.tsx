


import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import React from "react"

type LoginFormProps = {
    className: string
}

const LoginForm:React.FC<LoginFormProps> = ({className})=>{
    return(

        <Card className={`${className}`}>
            <CardHeader>
                <CardTitle className="text-xl ">
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

