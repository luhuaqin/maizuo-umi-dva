import React, { useEffect, useState } from 'react'
import { Redirect, useLocation, NavLink, request } from 'umi'
import styles from '../../layouts/index.less'
import { Button, Space, Swiper, Toast } from 'antd-mobile'
import { connect } from 'dva';


function film(props:any) {
  const [bannerList, setBannerList] = useState<Array<any>>()
  const location = useLocation()
  useEffect(() => {
    request(`https://m.maizuo.com/gateway?cityId=${props.cityId}&k=9138870`, {
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1653096841171377785044993","bc":"110100"}',
        'X-Host': 'mall.cfg.film-float.banner'
      }
    }).then(res => {
      const list = []
      list.push(res.data)
      setBannerList(list)
    })
  },[])

  if(location.pathname === '/film' || location.pathname === '/film/') {
    return <Redirect to='/film/nowplaying' />
  }

  console.log(bannerList);

  const items = bannerList?.map((item, index) => (
    <Swiper.Item key={item.bannerId}>
      <div
        className={styles.content}
        onClick={() => {
          // Toast.show(`你点击了卡片 ${index + 1}`)
        }}
      >
        <img src={item.imgUrl} alt="banner" width='100%'></img>
      </div>
    </Swiper.Item>
  ))

  return (
    <div>
      <div style={{ height: '200px', width: '100%' }}>
        <Swiper autoplay>{items}</Swiper>
      </div>
      <div className={styles.tabBox} style={{position: 'sticky', top: 0, left: 0}}>
        <ol>
          <li>
            <NavLink
              to='/film/nowplaying'
              className={styles.navLink}
              activeClassName={styles.active}>
                <span>
                  正在热映
                </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/film/comingsoon'
              className={styles.navLink}
              activeClassName={styles.active}>
                <span>
                  即将上映
                </span>
            </NavLink>
          </li>
        </ol>
      </div>
      {props.children}
    </div>
  )
}

export default connect((state: any) => {
  return {
    cityId: state.city.cityId
  }
})(film)
