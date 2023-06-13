import React, { useContext, useState, useEffect} from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()


export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    

    // sign up via firebase server
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    // log in via firebase server
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    // log in via firebase server
    function logout() {
        return auth.signOut()
    }

    // reset password via firebase server
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    // get email
    function getEmail() {
        return auth.currentUser.email
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        getEmail,
        signup,
        login,
        logout,
        resetPassword
    }

    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
    )
}
