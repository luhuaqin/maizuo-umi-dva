import React from 'react'
import { Redirect } from 'umi'

export default function auth(props:any) {
  if(localStorage.getItem('token')) {
    return (
      <div>
        {props.children}
      </div>
    )
  }
  return <Redirect to='/login' />
}
