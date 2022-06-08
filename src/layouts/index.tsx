import React from 'react'
import { NavLink } from 'umi'
import style from './index.less'

export default function index(props:any) {
  if(props.location.pathname === '/city') {
    return <div>{props.children}</div>
  }else if(props.location.pathname?.includes('/detail')) {
    return (
      <div>
        {props.children}
        <div style={{
          height: '50px',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          lineHeight: '50px',
          backgroundColor: '#FF5F16',
          color: '#fff',
          fontSize: 18
        }}>
            <span style={{
              display: 'inline-block'
            }}>选座购票</span>
        </div>
      </div>
    )
  }else {
    return (
      <div>
        {props.children}
        <div className={style.tabBox}>
          <ol>
            <li>
              <NavLink to='/film' className={style.navLink} activeClassName={style.active}>电影</NavLink>
            </li>
            <li>
              <NavLink to='/cinema' className={style.navLink} activeClassName={style.active}>影院</NavLink>
            </li>
            <li>
              <NavLink to='/center' className={style.navLink} activeClassName={style.active}>我的</NavLink>
            </li>
          </ol>
        </div>
      </div>
    )
  }
}
