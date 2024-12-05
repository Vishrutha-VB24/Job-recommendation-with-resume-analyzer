import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import dbService from '@/appwrite/db.ts';
import { Button } from '@/components/ui/button.tsx';
import conf from '../../conf/conf.ts';

// Loader function to fetch job data
export const loader = async () => {
  const collectionId = conf.appWriteJobCollectionId;
  try {
    const response = await dbService.listAllDocuments(collectionId);
    return { jobs: response.documents };
  } catch (error) {
    throw new Error('Error fetching jobs');
  }
};

const Index = () => {
  const { jobs } = useLoaderData({from: '/_authenticated/'});
  console.log(jobs.length)// Get jobs data from the loader
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs); // Initialize filtered jobs

  const navigate = useNavigate();

  // Update filtered jobs when search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredJobs(
      jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(lowercasedQuery) ||
          job.company?.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, jobs]);

  // @ts-ignore
  return (
    <>
      <div className="py-8 flex flex-col gap-8">
        <div className="flex  items-center gap-8">
          <input
            type="text"
            placeholder="Search jobs by title or company"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm"
          />
          OR
          <Button onClick={()=>{navigate({to: '/upload'})}}>Upload your Resume</Button>
        </div>

        {filteredJobs.map((job) => (
          <div
            className="flex flex-row items-center justify-between rounded-xl border bg-card text-card-foreground shadow p-6 gap-8"
            key={job.$id}
          >
            <div className="text-xl capitalize flex justify-between w-full">
              <p>
                {job.title}
              </p>
              <p className="text-gray-600 text-lg">
                 -{job.company}
              </p>
            </div>
            <Button
              onClick={() => {
                navigate({
                  to: '/job/$id',
                  params: { id: job.$id },
                });
              }}
            >
              View
            </Button>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <p className="text-center text-gray-500">No jobs found.</p>
        )}
      </div>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/')({
  loader, // Attach loader to the route
  component: Index,
});
