export default {
  'GET /users' : {name: 'luhq', boyFriend: 'zhaojc'},
  'POST /users/login': (req, res) => {
    console.log(req.body)
    if(req.body.userName === 'luhq' && req.body.password === 'zhaojc') {
      res.send({
        code: 200,
        message: '登录成功'
      })
    }else {
      res.send({
        code: 400,
        message: '用户名或者密码错误'
      })
    }

  }
}
