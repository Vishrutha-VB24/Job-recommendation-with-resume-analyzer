import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({context, location}) => {
    // @ts-ignore
    if(!context.auth.userInfo) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      })
    }
  },
})