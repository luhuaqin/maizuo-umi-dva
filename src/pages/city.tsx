import { IndexBar, List } from 'antd-mobile';
import React from 'react'
import { useEffect, useState } from 'react';
import { request, useHistory } from 'umi';
import { connect } from 'dva';

function city(props:any) {
  const [cityList, setCityList] = useState<Array<any>>([])
  const history = useHistory()
  const filterCities = (cities: any) => {
    const letterArr:Array<any> = []
    const newCities = []
    for (let i = 65; i < 91; i ++) {
      letterArr.push(String.fromCharCode(i))
    }

    for(let index in letterArr) {
      const cityItems = cities.filter((item: any) => item.pinyin.substring(0, 1).toUpperCase() === letterArr[index])
      cityItems.length && newCities.push({
        title: letterArr[index],
        items: cityItems
      })
    }

    return newCities
  }
  useEffect(() => {
    request('https://m.maizuo.com/gateway?k=7533353', {
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1653096841171377785044993"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      setCityList(filterCities(res.data.cities))
    })
  },[])

  const goCinema = (item:any): any => {
    props.dispatch({
      type: 'city/changeCity',
      payload: {
        cityName: item.name,
        cityId: item.cityId
      }
    })

    history.push('/cinema')
  }

  return (
    <div style={{ height: window.innerHeight }}>
      <IndexBar>
        {cityList.map(group => {
          const { title, items } = group
          return (
            <IndexBar.Panel
              index={title}
              title={title}
              key={title}
            >
              <List>
                {items.map((item:any, index:number) => (
                  <List.Item key={index} onClick={()=>goCinema(item)}>{item.name}</List.Item>
                ))}
              </List>
            </IndexBar.Panel>
          )
        })}
      </IndexBar>
    </div>
  )
}

export default connect()(city)
