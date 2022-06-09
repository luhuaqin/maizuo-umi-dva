import React, { useEffect, useState } from 'react'
import { request } from 'umi';
import FilmItem from './components/FilmItem';
import { connect } from 'dva';

function comingsoon(props: any) {
  const [list, setList] = useState([])
  useEffect(()=>{
    request(`https://m.maizuo.com/gateway?cityId=${props.cityId}&pageNum=1&pageSize=10&type=2&k=2915957`, {
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1653096841171377785044993","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(
      res => {
        setList(res.data.films)
      }
    )
  }, [])

  return (
    <div style={{ marginTop: '20px' }}>
      <ol>
        {
          list.map((item:any) => {
            return (
              <FilmItem filmContent={item} key={item.filmId} />
            )
          })
        }
      </ol>
    </div>
  )
}

export default connect((state: any) => {
  return {
    cityId: state.city.cityId
  }
})(comingsoon)
