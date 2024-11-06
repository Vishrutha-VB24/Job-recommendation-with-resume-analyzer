import UploadForm from '@/components/UploadForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Upload')({
  component: upload,
})

function upload() {
  return (
    <div className="flex justify-center  items-center h-screen">
      <UploadForm></UploadForm>
    </div>
  )
}
