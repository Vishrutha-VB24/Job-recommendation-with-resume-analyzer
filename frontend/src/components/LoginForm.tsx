import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import React from "react"

type LoginFormProps = {
    className:string
}

const LoginForm:React.FC<LoginFormProps> = ({className})=>{
    return(

        <Card className={`${className}`}>
            <CardHeader>
                <CardTitle className="text-xl ">
                    LOGIN 
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>
                        Username
                    </Label>
                    <Input className="bg-white bg-opacity-60 ">
                    </Input>
                </div>
                <div>
                    <Label>
                        Password
                    </Label>
                    <Input className="bg-white bg-opacity-60 ">
                    </Input>
                </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 ">
                <Button className="">LOGIN</Button>
                <Link to='/' className="flex justify-center ">
                    <Button variant="link" className="text-white">Register</Button>
                </Link>

            </CardFooter>
        </Card>
    )
}


export default LoginForm