import React, { useEffect, useState } from 'react'
import { request, useHistory } from 'umi'
import { Grid, Image, Form, Button, Input,  } from 'antd-mobile'
import logoImg from '@/assets/images/logo.png'

export default function login() {
  const history = useHistory()
  useEffect(() => {
    fetch('/users').then(res => res.json()).then(res => {
      console.log(res);
    })
  },[])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div>
      <Grid columns={1} style={{height: '220px', alignContent: 'center'}}>
        <Grid.Item style={{alignContent: 'center'}}>
          <Image style={{margin: '0 auto'}} width={60} height={60} src={logoImg} />
        </Grid.Item>
      </Grid>
      <Form
        layout='horizontal'
        style={{margin: '0 10px'}}
        footer={
          <Button block type='submit' color='warning' size='large'onClick={() => {
            request('/users/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                userName,
                password
              })
            }).then(res => {
              if(res.code === 200) {
                localStorage.setItem('token', 'let it go')
                history.push('/center')
              }else {
                alert(res.message)
              }
            })
          }} style={{marginTop: '50px'}}>
            登录
          </Button>
        }
      >
        <Form.Item
          name='name'
          label='用户名'
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input value={userName} onChange={(value) => {
            setUserName(value)
          }} placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item
          name='password'
          label='密码'
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input value={password} onChange={(value) => {
            setPassword(value)
          }} placeholder='请输入密码' />
        </Form.Item>
      </Form>
    </div>
  )
}
