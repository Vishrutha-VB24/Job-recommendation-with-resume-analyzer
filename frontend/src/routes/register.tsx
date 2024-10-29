import { createFileRoute } from '@tanstack/react-router'
import RegisterForm from '@/components/RegisterForm'
export const Route = createFileRoute('/register')({
  component: register,
})

function register(){
  return(
    <div className='flex justify-center h-screen flex-col items-center bg-white ' style={{ 

       }}>
      <RegisterForm></RegisterForm>
    </div>
    
  )
}