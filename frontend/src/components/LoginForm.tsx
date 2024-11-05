import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import React, { useRef } from "react";
import authService from "../appwrite/auth";

type LoginFormProps = {
    className: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    async function login() {
        try {
            // Capture email and password values
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            // Call authService to attempt login
            const userinfo = await authService.login({ email, password });



            // Handle successful login (redirect or show success message)
            console.log("Login successful!");
            console.log(userinfo);
        } catch (error) {
            // Handle error (show error message)
            console.error("Login failed:", error.message);
        }
    }

    return (
        <Card 
            className={`${className} w-96 h-97 p-x-2 shadow-lg relative`} 
            style={{
                borderColor: "black",
                border: '2px solid rgba(0, 0, 0, 0.3)',
                borderTopRightRadius: '6rem',  
                borderTopLeftRadius: '0',     
                borderBottomRightRadius: '0', 
                borderBottomLeftRadius: '0',   
                boxShadow: '-14px 14px 2px rgba(0, 0, 0, 0.3)', 
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
                        ref={emailRef} // Add ref here
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white bg-opacity-60 placeholder-gray-500"
                        placeholder="sample@email.com"
                        type="email"
                    />
                </div>

                {/* Password Field with "Forgot Password" Link */}
                <div className="flex flex-col space-y-1">
                    <Label className="flex justify-between text-sm font-medium text-gray-700">
                        Password
                        <Link to='/' className="text-xs text-black hover:underline italic font-normal">
                            forgot password?
                        </Link>
                    </Label>
                    <Input 
                        ref={passwordRef} // Add ref here
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white bg-opacity-60"
                        type="password"
                    />
                </div>
            </CardContent>

            <CardFooter className="mt-6 flex flex-col items-center space-y-4">
                <Button 
                    onClick={login} // Trigger login on button click
                    className="w-full py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-all duration-150"
                >
                    Login
                </Button>

                <div className="text-sm text-gray-600">
                    New around here? <Link to='/register' className="text-blue-500 hover:underline italic">Sign up</Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default LoginForm;
