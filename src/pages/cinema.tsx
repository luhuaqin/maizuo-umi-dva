import React, { useEffect } from 'react'
import { NavBar, Space, DotLoading } from 'antd-mobile'
import { SearchOutline, DownOutline } from 'antd-mobile-icons'
import { useHistory } from 'umi'
import { connect } from 'dva'
import CinemaListContainer from './cinemaComponent/cinemaListContainer'
import '@/layouts/index.less'


function cinema(props: any) {
  const history = useHistory()

  useEffect(()=> {
    if(props.cinemaList.length === 0) {
      props.dispatch({
        type: 'cinema/getCinemaList',
        payload: {
          cityId: props.cityId
        }
      })
    }else {
      // props.dispatch({
      //   type: 'cinema/getCinemaOldList'
      // })
    }
  },[])

  const left = (
    <div style={{ fontSize: 17 }} onClick={() => {

      props.dispatch({
        type: 'cinema/clearList'
      })
      history.push('/city')
    }}>
      <Space style={{ '--gap': '5px' }}>
        {props.cityName}
        <DownOutline />
      </Space>
    </div>
  )

  const right = (
    <div style={{ fontSize: 17 }} onClick={() => {
      history.push('/cinemasearch')
    }}>
      <Space style={{ '--gap': '5px' }}>
        <SearchOutline />
      </Space>
    </div>
  )

  return (
    <div style={{ padding: '10px 10px' }}>
      <NavBar
        style={{ fontSize: 24 }}
        backArrow={false}
        left={left}
        right={right}>
        标题
      </NavBar>
      {
        props.loading && <div style={{ textAlign: 'center' }}><DotLoading /></div>
      }
      <ol>
        {
          props.cinemaList && props.cinemaList.map((item: any) => {
            return <CinemaListContainer cinemaList={props.cinemaList} key={item.cinemaId} />
          })
        }
      </ol>
    </div>
  )
}

export default connect((state: any)=> {
  return {
    cityName: state.city.cityName,
    cityId: state.city.cityId,
    cinemaList: state.cinema.cinemaList,
    loading: state.loading.global
  }
})(cinema)
