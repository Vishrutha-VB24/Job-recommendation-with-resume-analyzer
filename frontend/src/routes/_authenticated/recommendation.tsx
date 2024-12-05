import {createFileRoute, useNavigate} from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import useAuthStore from '@/store/authStore.ts'

export const Route = createFileRoute('/_authenticated/recommendation')({
  component: jobRecommendations,
})

function jobRecommendations() {
  const { userInfo } = useAuthStore() // Access user information from auth store
  const userId = userInfo?.$id // Extract the user ID
  const [recommendations, setRecommendations] = useState(['hi', 'bi'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<String | null>(null)
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) return

    const fetchRecommendations = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.post('/api/recommendation/', { user_id: userId })
        setRecommendations(response.data.recommendations)
      } catch (err) {
        console.error('Error fetching recommendations:', err)
        setError('Failed to fetch recommendations.')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [userId])

  if (loading) {
    return <div>Loading recommendations...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (recommendations.length === 0) {
    return <div>No recommendations found.</div>
  }

  return (
    <>
      <div className="py-8 flex flex-col gap-8">
        {recommendations.map((job) => (
          <div
            className="flex flex-row items-center justify-between rounded-xl border bg-card text-card-foreground shadow p-6 gap-8"
            key={job.$id}
          >
            <div className="text-xl capitalize flex justify-between w-full">
              <div className="flex flex-row items-center gap-4">
                <p>{Number(job.similarity).toFixed(2)}% <span className="text-sm"> match</span></p>
                <p>{job.title}</p>
              </div>
              <p className="text-gray-600 text-lg">-{job.company}</p>
            </div>
            <Button
              onClick={() => {
                navigate({
                  to: '/job/$id',
                  params: { id: job.job_id },
                })
              }}
            >
              View
            </Button>
          </div>
        ))}

        {recommendations.length === 0 && (
          <p className="text-center text-gray-500">No jobs found.</p>
        )}
      </div>
    </>
  )
}

export default jobRecommendations
