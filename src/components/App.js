import React, {Fragment} from 'react'
import Signup from './Signup'
import Dashboard from './Dashboard'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import CustomerPage from './CustomerPage'
import AdminPage from './AdminPage'
import PageNotFound from './PageNotFound'
import Settings from './Settings'
import PrintersTable from './PrintersTable'
import OrdersTable from './OrdersTable'

function App() {
  return (
    <AuthProvider>
          <Router>
            <AuthProvider>
              <Fragment>
              <Routes>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/signup' element={<Signup/>}/>
                <Route exact path='/forgot-password' element={<ForgotPassword/>}/>
                <Route path="*" element={<PageNotFound/>} />

                <Route exact path='/' element={<PrivateRoute/>}>
                  <Route exact path='/customer' element={<CustomerPage/>}/>
                  <Route exact path='/admin' element={<AdminPage/>}/>
                  <Route exact path='/dashboard' element={<Dashboard/>}/>
                  <Route exact path='/settings' element={<Settings/>}/>
                  <Route exact path='/printers' element={<PrintersTable/>}/>
                  <Route exact path='/orders' element={<OrdersTable/>}/>
                </Route>
              
              </Routes>
              </Fragment>
            </AuthProvider>
            {/* <Footer style={{ position: 'absolute', bottom: 0, }}/> */}


          </Router>
    </AuthProvider>

  )
}

export default App;
