import React, { useEffect } from 'react'
import { NavBar, Space, DotLoading } from 'antd-mobile'
import { SearchOutline, DownOutline } from 'antd-mobile-icons'
import { useHistory } from 'umi'
import { connect } from 'dva'


function Cinema(props: any) {
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
      console.log('缓存');
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

  return (
    <div>
      <NavBar style={{ fontSize: 24 }} backArrow={false} left={left} right={<SearchOutline />}>
        标题
      </NavBar>
      {
        props.loading && <div style={{ textAlign: 'center' }}><DotLoading /></div>
      }
      <ol>
        {
          props.cinemaList.length && props.cinemaList.map((item: any) => {
            return <li key={item.cinemaId}>{item.name}</li>
          })
        }
      </ol>
    </div>
  )
}

export default connect((state: any)=> {
  console.log(state)
  return {
    cityName: state.city.cityName,
    cityId: state.city.cityId,
    cinemaList: state.cinema.cinemaList,
    loading: state.loading.global
  }
})(Cinema)
