import React, { useState } from 'react'
import { useHistory } from 'umi';
import CenterList from './centerComponent/centerListContainer'

import centerBg from '@/assets/images/centerbg.png'
import filmOrder from '@/assets/images/电影订单.png'
import productOrder from '@/assets/images/商品订单.png'
import rightArrow from '@/assets/images/右箭头.png'
import wallet from '@/assets/images/钱包.png'
import Coupons from '@/assets/images/卖座券.png'
import redEnvelopes from '@/assets/images/组合红包.png'
import help from '@/assets/images/help.png'
import setting from '@/assets/images/setting.png'
import loginImg from '@/assets/images/登录.png'

function center(props:any) {
  const history = useHistory()

  const [centerList] = useState([
    {
      imgUrl: Coupons,
      rightUrl: rightArrow,
      text: '卖座券',
      id: '001',
      path: '/saleseatticket'
    },
    {
      imgUrl: redEnvelopes,
      rightUrl: rightArrow,
      text: '组合红包',
      id: '002',
      path: '/redpacket'
    },
    {
      imgUrl: wallet,
      rightUrl: rightArrow,
      text: '余额',
      id: '003',
      path: '/balance'
    },
    {
      imgUrl: help,
      rightUrl: rightArrow,
      text: '帮助与客服',
      id: '004',
      path: '/help'
    },
    {
      imgUrl: setting,
      rightUrl: rightArrow,
      text: '设置',
      id: '005',
      path: '/setting'
    }
  ])

  const loginClick = () => {
    history.push('/login')
  }

  return (
    <div style={{ backgroundColor: '#f4f4f4', height: window.innerHeight - 50 }}>
      <div style={{
            width: '100%',
            height: '160px',
            overflow: 'hidden',
            backgroundImage: `url(${centerBg})`,
            backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}
            onClick={loginClick}>
        {
          localStorage.token ? <span style={{ position: 'relative', left: '25%', top: '48%', color: '#fff', fontSize: '16px' }} onClick={() => {
            localStorage.removeItem('token')
            history.push('/login')
          }}>退出登录</span> : <span style={{ position: 'relative', left: '25%', top: '48%', color: '#fff', fontSize: '16px' }}>立即登录</span>
        }

        <div style={{ width: '16%', height: '40%', border: '1px solid #fff', borderRadius: '50%', margin: '8% 20px' }}>
          <img src={loginImg} alt='' style={{ display: 'inline-block', width: '100%', borderRadius: '50%' }} />
        </div>
      </div>
      <div style={{
          height: '70px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          lineHeight: '30px',
          backgroundColor: '#fff',
          color: '#797d82',
          fontSize: '14px'
      }}>
        <span onClick={() => {
          history.push('/filmorder')
        }}>
          <img src={filmOrder} alt='' style={{ display: 'block',  margin: '0 auto',  height: '30px', width: '30px' }} />
          电影订单
        </span>
        <span onClick={() => {
          history.push('/productorder')
        }}>
          <img src={productOrder} alt='' style={{ display: 'block',  margin: '0 auto', height: '30px', width: '30px' }} />
          商品订单
        </span>
      </div>
      <div style={{ width: '100%', marginTop: '10px' }}>
        <CenterList centerList={centerList} />
      </div>
    </div>
  )
}

export default center
