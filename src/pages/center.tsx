import React from 'react'
import { useHistory } from 'umi';

function center(props:any) {
  const history = useHistory()
  return (
    <div>
      center
      <button onClick={() => {
        localStorage.removeItem('token')
        history.push('/login')
      }}>退出登录</button>
    </div>
  )
}

center.wrappers = ['@/wrappers/auth']

export default center
