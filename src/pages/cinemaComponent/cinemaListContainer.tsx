import React from 'react'
import styles from '@/layouts/index.less'

export default function CinemaListContainer(props: any) {
  const { cinemaList } = props
  return (
    <div>
      {
        cinemaList?.map((item: any) => {
          return (
            <li key={ item.cinemaId }>
              <div className={styles.topText}>
                <span className={styles.ellipsisText}>{ item.name }</span>
                <span style={{ color: 'orange' }}>{ '￥' + item.lowPrice + ' 起' }</span>
              </div>
              <div className={styles.bottomText}>
                <span className='ellipsisText ' style={{ width: 'calc(100% - 100px)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{ item.address }</span>
                <span>{ item.Distance + ' km' }</span>
              </div>
            </li>
          )
        })
      }
    </div>
  )
}
