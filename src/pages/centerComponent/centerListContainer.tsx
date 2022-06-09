import React from 'react'
import { useHistory } from 'umi';


export default function CenterList(props: any) {
  const history = useHistory()
  const { centerList } = props
  return (
    <div>
      <ol>
        {
          centerList.map((item: any) => {
            return (
              <li style={{
                    height: '50px',
                    backgroundColor: '#fff',
                    borderBottom: '0.5px solid #D2D6DC',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
              }} key={item.id} onClick={() => {
                history.push(item.path)
              }}>
                <span style={{ width: '10%' }}>
                  <img alt={item.text} src={item.imgUrl} style={{ width: '50%', margin: '0 25%' }} />
                </span>

                <span style={{ width: '80%' }}>{item.text}</span>
                <span style={{ width: '10%' }}>
                  <img alt={item.text} src={item.rightUrl} style={{ width: '15%', margin: '0 42%' }} />
                </span>
              </li>
            )
          })
        }

      </ol>
    </div>
  )
}
