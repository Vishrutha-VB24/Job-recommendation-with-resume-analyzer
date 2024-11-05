import { createFileRoute } from '@tanstack/react-router'
import c from '../conf/conf.ts'
import {useEffect} from "react";
const index = ()=> {
  useEffect(() => {

    console.log(c);
  }, [])
  return (
    <div>Hello</div>
  )
}


export const Route = createFileRoute('/')({
  component: () => index,
})
