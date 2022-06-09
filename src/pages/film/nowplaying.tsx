import React from 'react'
import { useEffect, useState } from 'react';
import FilmItem from './components/FilmItem';
import { connect } from 'dva';

function nowplaying(props: any) {
  const [list, setList] = useState([])
  useEffect(()=>{
    fetch(`https://m.maizuo.com/gateway?cityId=${props.cityId}&pageNum=1&pageSize=10&type=1&k=6019471`, {
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1653096841171377785044993","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => res.json()).then(
      res => {
        setList(res.data.films)
      }
    )
  }, [])
  return (
    <div style={{ marginTop: '20px' }}>
      <ol>
        {console.log(list)}
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
})(nowplaying)
