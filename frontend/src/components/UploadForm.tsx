import { useRef, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import bucketService from "../appwrite/resume";
import dbService from "@/appwrite/db.ts";
import conf from '../conf/conf.ts'
import useAuthStore from "@/store/authStore.ts";
import {useNavigate} from "@tanstack/react-router";

export default function Upload() {
    const fileRef = useRef<HTMLInputElement>(null);
    const [parsed, setParsed] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(false);
    const [genLoad, setGenLoad] = useState(false);

    async function upload(event: React.FormEvent) {
        event.preventDefault();

        const file = fileRef.current?.files?.[0];
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        try {
            setLoading(true);
            const response = await bucketService.uploadResume(file);
            if (response && response.$id) {
                console.log("File uploaded successfully with ID:", response.$id);

                // Step 2: Send a POST request to /api/parse-resume/
                const parseResponse = await axios.post("/api/parse-resume/", {
                    file_id: response.$id,
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
        finally {
            setLoading(false);
        }
    }
    const {userInfo} = useAuthStore();
    const navigate = useNavigate();

    async function updateResume() {
        if (!parsed) {
            alert("No parsed data available to update.");
            return;
        }

        try {
            setGenLoad(true);
            const collectionId = conf.appWriteUserCollectionId;
            // @ts-ignore
            const documentData = {
                skills: parsed.skills,
                exp: parsed.exp,
                userId: userInfo.$id
            };

            const document = await dbService.createDocument(collectionId, documentData);
            console.log("Resume data saved to database:", document);
            navigate({to: '/recommendation'});
        } catch (error) {
            console.error("Error saving resume data:", error);
            alert("Failed to save resume data.");
        }

    }


    return (
      <div className="p-10">
          {parsed ? (
            <div className="p-4 rounded mx-auto w-2/3 border border-dashed border-black rounded">
                <h1 className="py-2 text-xl font-semibold">Skills mentioned</h1>
                <div className="flex flex-wrap w-full gap-4">
                    {parsed.skills.map((skill) => (
                      <div className="bg-primary/50 p-2 rounded" key={skill}>
                          {skill}
                      </div>
                    ))}
                </div>
                <h1 className="py-2 text-xl font-semibold">Years of Experience: {parsed.exp}</h1>
                <div className="flex items-center gap-4">
                    <Button className="mt-4 bg-secondary/80 text-secondary-foreground" onClick={() => setParsed(null)}>
                        Upload Another Resume
                    </Button>
                    <Button className="mt-4 bg-primary/80" onClick={updateResume}>
                        Generate Recommendations
                    </Button>
                </div>
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
                    {loading ? "Uploading..." : "UPLOAD"}
                </Button>
            </form>
          )}
      </div>
    );
}

