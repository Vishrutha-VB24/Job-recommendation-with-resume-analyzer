import { useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import bucketService from "../appwrite/resume"; // Make sure the path is correct

export default function Upload() {
    const fileRef = useRef(null);

    async function upload(event) {
        event.preventDefault();
        const file = fileRef.current.files[0];
        
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        try {
            const response = await bucketService.uploadResume(file);
            if (response) {
                alert("Resume uploaded successfully!");
            } else {
                alert("Failed to upload resume.");
            }
        } catch (error) {
            console.error("Error uploading resume:", error);
            alert("An error occurred while uploading the resume.");
        }
    }

    return (
        <form className="flex flex-col gap-4 p-20 border border-dashed border-black" onSubmit={upload}>
            <Label>Upload your resume here</Label>
            <Input type="file" ref={fileRef} />
            <Button type="submit" className="bg-primary/80">UPLOAD</Button>
        </form>
    );
}
