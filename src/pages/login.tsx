import React from 'react'
import { request, useHistory } from 'umi'
import { useEffect, useState } from 'react';

export default function login() {
  const history = useHistory()
  useEffect(() => {
    fetch('/users').then(res => res.json()).then(res => {
      console.log(res);
    })
  },[])
  // const [userName, setUserName] = useState('')
  // const [password, setPassword] = useState('')
  const userName = React.createRef<HTMLInputElement>()
  const password = React.createRef<HTMLInputElement>()
  return (
    <div>
      <label htmlFor='userName'>用户名</label>
      {/* <input type="text" id='userName' onChange={(event)=>setUserName(event?.target.value)} /> */}
      <input type="text" id='userName' ref={userName} />
      <label htmlFor='password'>密码</label>
      {/* <input type="text" id='password' onChange={(event)=>setPassword(event?.target.value)} /> */}
      <input type="text" id='password' ref={password} />
      <button onClick={() => {
        request('/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            // userName,
            // password
            userName: userName.current?.value,
            password: password.current?.value
          })
        }).then(res => {
          if(res.code === 200) {
            localStorage.setItem('token', 'let it go')
            history.push('/center')
            alert(res.message)
          }else {
            alert(res.message)
          }
        })
      }}>登录</button>
    </div>
  )
}
