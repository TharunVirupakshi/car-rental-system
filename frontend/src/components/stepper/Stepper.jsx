import React from 'react'
import { useState, useEffect } from 'react'

const Stepper = ({itemsData, activeItem}) => {

    const [items, setItems] = useState([])
    const [activeItm, setActiveItm] = useState(0)

    useEffect(() => {
      setItems(itemsData)
      setActiveItm(activeItem)
      
    }, [itemsData, activeItem])
    



  return (
    
        <ol class="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">

{items.map((item, index) => (
  index === activeItem ? (
    <li className="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse" key={index}>
      <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
        {index+1}
      </span>
      <span>
        <h3 className="font-medium leading-tight">{item ?? 'item'}</h3>
        {/* Additional content */}
      </span>
    </li>
  ) : (
    <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse" key={index}>
      <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
        {index+1}
      </span>
      <span>
        <h3 className="font-medium leading-tight">{item ?? 'item'}</h3>
        {/* Additional content */}
      </span>
    </li>
  )
))}

            
        </ol>


  )
}

export default Stepper