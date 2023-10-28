import React from 'react'
import { Item } from '../Item/Item'

export const ItemsList = ({productos}) => {
  return (
    <div className='productos-container'>
        {productos.map(prod => {
            return <Item prod={prod} key={prod.id}/>
        })}
    </div>
  )
}
