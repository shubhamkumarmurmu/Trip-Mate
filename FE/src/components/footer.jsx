import React from 'react'


const arr=[
    'Planning a trip to Portugal',
    'Planning a trip to Japan',
    'Planning a trip to Korea',
    'Planning a trip to China',
    'Planning a trip to Span'
]

const contact=[
    'Contact',
    'Blog',
    'Twitter',
    'Instagram'
]

const Footer = () => {
  return (
    <div className='mt-10 flex justify-center items-center'>
   <div className='grid sm:grid-cols-2 sm:gap-30 gap-4'>
     <div>
        <div className='font-bold'>Get started</div>
        {
            arr.map((places,index)=>{
                return(
                    
                <div className='text-[12px] py-1' key={index}>{places}</div>
                )
            })
        }
     </div> 

     <div>
        <div className='font-bold'>get connected</div>
        {
            contact.map((media,index)=>{
                return(
                    <div className='text-[12px] py-1' key={index}>{media}</div>
                )
            })
        }
     </div>
     </div>
    </div>
  )
}

export default Footer