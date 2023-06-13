import React from 'react'

import image from "../images/404Page.png"; 


export default function PageNotFound() {
  return (
    <div className='d-flex align-items-center justify-content-center' style={{ 
      backgroundImage: `url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover", backgroundPosition: 'center',
      height: "600px", width: "1500px", marginTop:"100px"
    }}>
    </div>
  )
}
