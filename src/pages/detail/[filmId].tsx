import React, { useState, useEffect } from 'react'
import { request, useParams } from 'umi'
import { Image } from 'antd-mobile'
import { connect } from 'dva';
import axios from 'axios'

interface IParams {
  filmId: string
}
function Detail(props: any) {
  const params = useParams<IParams>()
  const { filmId } = params
  const [detailObj, setDetailObj] = useState<any>()
  useEffect(() =>{
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${filmId}&k=3043097`,
      headers: {
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.0","e":"1653096841171377785044993","bc":${props.cityId}}`,
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      console.log(res);
      setDetailObj(res.data.data.film)
    })
  },[filmId])
  return (
    <div>
      {
        detailObj && <div>
          <Image src={detailObj.poster} />
            <div style={{lineHeight: '25px', margin: '10px 15px', color: 'gray'}}>
              <p style={{fontSize: '20px', color: 'black'}}>
                {detailObj.name}
                <span style={{ display: 'inline-block', backgroundColor: '#D2D6DC', color: 'white', borderRadius: '2px', fontSize: '12px', width: '20px', textAlign: 'center' }}>{}</span>
                <i><span color='orange'>{detailObj.grade}分</span></i>
              </p>
              <p>{detailObj.category}</p>
              <p>{detailObj.premiereAt}上映</p>
              <p>
                <span>{detailObj.nation}</span> |
                <span>{detailObj.runtime}分钟</span>
              </p>
              <p style={{marginTop: '10px'}}>
                {detailObj.synopsis}
              </p>
            </div>
        </div>
      }
    </div>
  )
}

export default connect((state: any) => {
  return {
    cityId: state.city.cityId
  }
})(Detail)
