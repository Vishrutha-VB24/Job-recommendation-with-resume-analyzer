import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"

export default function Register() {
  return (
    <div className="flex items-center justify-center bg-white">
      <Card className="p-6 shadow-lg rounded-lg bg-white rounded-tr-[6rem] shadow-[-14px_14px_2px_rgba(0,0,0,0.3)] border-2 border-black ">
        <CardHeader>
          <p className=" text-gray-600 text-2xl font-semibold">REGISTER</p>
        </CardHeader>
        <CardContent>
          <form className=" grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
              <Input id="fullname" placeholder="Your Name" type="text" className="w-full mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input id="email" placeholder="you@example.com" type="email" className="w-full mt-1" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input id="password" placeholder="••••••••" type="password" className="w-full mt-1" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <Input id="confirmPassword" placeholder="••••••••" type="password" className="w-full mt-1" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="grid w-full grid-cols-2 ">
          <Button className="col-span-2 w-1/2 mx-auto">Register</Button>
          <p className="mt-4 text-center text-sm text-gray-600 col-span-2">
            New around here?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
