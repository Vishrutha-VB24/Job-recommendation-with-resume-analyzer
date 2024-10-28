import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Upload')({
  component: () => <div>Hello /Upload!</div>,
})
