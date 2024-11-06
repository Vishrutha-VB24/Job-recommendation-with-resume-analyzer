import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function upload(){
    return(
        
        <form action=" " className="flex flex-col  gap-4 p-20 border border-dashed border-black">
            <Label>Upload your resume here </Label>
            <Input className="" type="file"/>
            <Button className="">UPLOAD</Button>
        </form>
    )
}