import React, { useEffect, useRef, useState } from 'react'
import { SearchBar, DotLoading } from 'antd-mobile'
import { SearchBarRef } from 'antd-mobile/es/components/search-bar'
import { connect } from 'dva'
import { useHistory } from 'umi'
import CinemaListContainer from './cinemaComponent/cinemaListContainer'
import '@/layouts/index.less'

function cinemaSearch(props: any) {
  const history = useHistory()
  const searchRef = useRef<SearchBarRef>(null)
  const [filterList, setFilterList] = useState<Array<any>>([])

  useEffect(() => {
    if(props.cinemaList?.length === 0) {
      props.dispatch({
        type: 'cinema/getCinemaList',
        payload: {
          cityId: props.cityId
        }
      })
    }else {
    }
  },[])

  const filterCinema = (cinemaList: Array<any>, searchValue: any) => {
    const filterList = cinemaList.filter(item => {
      return item.name.toUpperCase().includes(searchValue.toUpperCase())
              || item.name.toUpperCase().includes(searchValue.toUpperCase())
    })
    setFilterList(filterList)
  }

  return (
    <div style={{ padding: '10px 10px' }}>
      <SearchBar
        ref={searchRef}
        placeholder='输入影城名称'
        showCancelButton={() => true}
        onCancel={() => {
          history.go(-1)
        }}
        onChange={(value: any)=>filterCinema(props.cinemaList, value)} />
      {
        props.loading && <div style={{ textAlign: 'center' }}><DotLoading /></div>
      }
      <div className='container'
            style={{
              height: window.innerHeight - 130
            }}
      >
        <ol>
          {
            filterList.length > 0 ? filterList.map((item: any) => {
              return <CinemaListContainer cinemaList={filterList} key={item.cinemaId} />
            }) : <span>暂无数据</span>
          }
        </ol>
      </div>

    </div>
  )
}

export default connect((state: any) => {
  return {
    cinemaList: state.cinema.cinemaList,
    loading: state.loading.global,
    cityId: state.city.cityId
  }
})(cinemaSearch)
