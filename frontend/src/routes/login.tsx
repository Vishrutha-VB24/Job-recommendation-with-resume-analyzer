import {createFileRoute, redirect} from '@tanstack/react-router'
import LoginForm from '@/components/LoginForm'

export const Route = createFileRoute('/login')({
  beforeLoad: ({context, location}) => {
    // @ts-ignore
    if(context.auth.userInfo) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href
        }
      })
    }
  },
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