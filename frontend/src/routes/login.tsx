import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '@/components/LoginForm'

export const Route = createFileRoute('/login')({
  component: login,
})


function login(){
    return(
      <div className='flex justify-center h-screen flex-col items-center ' style={{ 

         }}>
        <LoginForm className=""></LoginForm>
      </div>
      
    )
  }