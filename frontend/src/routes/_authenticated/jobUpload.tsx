import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { useState } from 'react';
import {Button} from '@/components/ui/button.tsx'
import {Input} from '@/components/ui/input.tsx'
import {Label} from "@/components/ui/label.tsx"
import {Textarea} from '@/components/ui/textarea'
export const Route = createFileRoute('/_authenticated/jobUpload')({
  component: jobUpload,
});

function jobUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/parse-job-posting/', {
        title,
        description,
        company,
      });
      setMessage('Job uploaded successfully!');
      setTitle('');
      setDescription('');
      setCompany('');
    } catch (error) {
      setMessage('Failed to upload job. Please try again.');
    }
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full justify-center flex items-center">
      <div className="w-1/2">
        <form onSubmit={handleSubmit} className=" p-6 border border-dashed border-black rounded">
          <h1 className="text-xl font-semibold">Upload Job</h1>
          <div>
            <Label htmlFor="title">Job Title:</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Job Description:</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></Textarea>
          </div>

          <div>
            <Label htmlFor="company">Company Name:</Label>
            <Input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="my-4">Upload Job</Button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default jobUpload;