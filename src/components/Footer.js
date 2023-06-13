import React from 'react'
import image from "../images/lemos_cover_photo.jpg"; 
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (


    <>
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>
        <MDBContainer className='p-4 pb-0'>
            <section className=''>
            {/* <div className='d-flex align-items-center justify-content-center' style={{ 
        backgroundImage: `url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover", backgroundPosition: 'center',
        height: "200px", width: "1500px", marginTop:"100px", position: 'absolute', height: "40",left: "0"
      }}>
      </div> */}
            </section>
        </MDBContainer>

        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2020 Copyright:
            <a className='text-white' href='https://mdbootstrap.com/'>
            MDBootstrap.com
            </a>
        </div>
        </MDBFooter>

        </>
  )
}
