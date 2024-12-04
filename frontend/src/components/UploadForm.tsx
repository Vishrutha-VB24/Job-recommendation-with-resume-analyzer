import { useRef, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import bucketService from "../appwrite/resume"; // Ensure the path is correct

export default function Upload() {
    const fileRef = useRef<HTMLInputElement>(null);
    const [parsed, setParsed] = useState<Record<string, any> | null>(null);

    async function upload(event: React.FormEvent) {
        event.preventDefault();
        const file = fileRef.current?.files?.[0];
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        try {
            // Step 1: Upload the file to the bucket service
            const response = await bucketService.uploadResume(file);
            if (response && response.$id) {
                console.log("File uploaded successfully with ID:", response.$id);

                // Step 2: Send a POST request to /api/parse-resume/
                const parseResponse = await axios.post("/api/parse-resume/", {
                    fileId: response.$id,
                });

                if (parseResponse.data) {
                    console.log("Parsed response:", parseResponse.data);
                    setParsed(parseResponse.data);
                } else {
                    alert("Failed to parse resume.");
                }
            } else {
                alert("Failed to upload resume.");
            }
        } catch (error) {
            console.error("Error during resume upload or parsing:", error);
            alert("An error occurred while uploading or parsing the resume.");
        }
    }

    return (
      <div className="p-10">
          {parsed ? (
            <div className="parsed-container border p-4 rounded shadow bg-gray-100">
                <h2 className="text-lg font-bold mb-2">Parsed Resume Data:</h2>
                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(parsed, null, 2)}</pre>
                <Button className="mt-4 bg-primary/80" onClick={() => setParsed(null)}>
                    Upload Another Resume
                </Button>
            </div>
          ) : (
            <form
              className="flex flex-col gap-4 p-20 border border-dashed border-black rounded"
              onSubmit={upload}
            >
                <Label>Upload your resume here</Label>
                <Input
                  type="file"
                  ref={fileRef}
                  accept="application/pdf"
                  className="border border-gray-300 rounded p-2"
                />
                <Button type="submit" className="bg-primary/80">
                    UPLOAD
                </Button>
            </form>
          )}
      </div>
    );
}

