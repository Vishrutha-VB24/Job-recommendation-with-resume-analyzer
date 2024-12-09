import { createFileRoute } from '@tanstack/react-router'
import RegisterForm from '@/components/RegisterForm'
export const Route = createFileRoute('/register')({
  component: register,
})

function register(){
  return(
    <div className='flex justify-center h-[calc(100vh-3.5rem)] flex-col items-center bg-white ' style={{

       }}>
      <RegisterForm></RegisterForm>
    </div>
    
  )
}