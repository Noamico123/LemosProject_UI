import React, { useState } from 'react'
import { Card, Button, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate  } from 'react-router-dom'
import NavBar from './NavBar'


export default function Dashboard() {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigation = useNavigate ()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigation('/login')
        } catch {
            setError('Failed to log out')
        }

    }

    return (
        <>
        <NavBar/>
        <Container className='d-flex align-items-center justify-content-center mt-5' style={{ minHeight:'50px'}}>
                <div>
                <Card className='mb-2'> 
                    <Card.Body>
                        <h2 className='text-center mb-4'>User Profile</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <strong>Email:</strong> {currentUser.email}
                    </Card.Body>
                </Card>

                <Card> 
                    <Card.Body>
                        
                        <div className='w-100 text-center mt-2'>
                            <Link to='/update-profile'>Edit Profile</Link>
                        </div>

                        <div className='w-100 text-center mt-2'>
                            <Link to='/forgot-password'>Change Password</Link>
                        </div>

                        <div className='w-100 text-center mt-2'>
                            <Button variant='link' onClick={handleLogout}>Log Out</Button>
                        </div>
                    </Card.Body>
                </Card>
                </div>
        </Container>
        </>
    )
}



