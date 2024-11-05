import { createFileRoute } from '@tanstack/react-router'
const index = ()=> {

  return (
    <div>Hello</div>
  )
}


export const Route = createFileRoute('/')({
  component: () => index,
})
