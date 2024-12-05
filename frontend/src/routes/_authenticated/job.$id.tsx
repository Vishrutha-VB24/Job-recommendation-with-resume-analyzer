import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import dbService from "@/appwrite/db.ts";
import conf from '../../conf/conf.ts';
import {Button} from "@/components/ui/button.tsx";

export const Route = createFileRoute('/_authenticated/job/$id')({
  loader: async ({ params }) => {
    const { id } = params;
    try {
      const jobDocument = await dbService.getDocument(conf.appWriteJobCollectionId, id);
      return { job: jobDocument };
    } catch (err) {
      throw new Error(err.message || "Error fetching job details.");
    }
  },
  component: JobPage,
});

function JobPage() {
  const { job } = useLoaderData({ from: '/_authenticated/job/$id' });

  return (
    <div className="pt-8">
      <h1 className="text-2xl capitalize font-bold">{job.title} Role</h1>
      <p className="text-xl"><strong>Company:</strong> {job.company}</p>
      <p><strong>Description:</strong><br/> {job.description}</p>
      <Button className="my-4">Apply</Button>
    </div>
  );
}

export default JobPage;

