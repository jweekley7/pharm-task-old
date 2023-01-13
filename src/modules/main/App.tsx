import './App.scss'
import Home from '../facilityHome/home';
import { useContext, useState } from 'react';
import { FacilityContext } from '../../providers/facility-provider';
import NewFacility from '../new-facility/new-facility';
import BasicModal from '../../components/modals/basic-modal';
import { AuthContext } from '../../providers/auth-provider';
import FacilityLogin from '../login/facility-login';
import UserLogin from '../login/user-login';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';


export default function App() {
  const {isLoggedIn, userDetails, userLogOut} = useContext(AuthContext);
  const {currentFacility} = useContext(FacilityContext);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showCreateFacilityModal, setShowCreateFacilityModal] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  //TODO: check for current login. if not logged in, show welcome page with login options.
  //      if logged in, automatically go to facility home page


  const showAccountLogInModal = () => {
    setShowLogInModal(true);
    setShowCreateFacilityModal(false);
    setShowAdminLoginModal(false);
  }

  const showCreateFacilityAccountModal = () => {
    setShowCreateFacilityModal(true);
    setShowLogInModal(false);
    setShowAdminLoginModal(false);
  }

  const showFacilityAdminLoginModal = () => {
    setShowCreateFacilityModal(false);
    setShowLogInModal(false);
    setShowAdminLoginModal(true);
  }

  return (
    <main>
      {currentFacility ? 
        <Home/> : 
        <div>
          <div className="text-3xl font-bold underline">Welcome to PharmTask!</div>
          <div className='flex mx-6 space-x-4 my-6'>
            <Card 
              sx={{ minWidth: 225 }}
              onClick={() => showAccountLogInModal()}
              className='cursor-pointer hover:transition hover:duration-300 hover:scale-110 text-center'
            >
              <CardContent>
                <div>
                  <p>Existing Facility?</p> 
                  <p>Login <a className='cursor-pointer' onClick={() => showAccountLogInModal()}>here</a></p>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              sx={{ minWidth: 225 }}
              onClick={() => showFacilityAdminLoginModal()}
              className='cursor-pointer hover:transition hover:duration-300 hover:scale-110 text-center'
            >
              <CardContent>
                <div>
                  <p>Facility Admin?</p>
                  <p>Login <a className='cursor-pointer' onClick={() => showFacilityAdminLoginModal()}>here</a></p>
                </div>
              </CardContent>
            </Card>

            <Card               
              sx={{ minWidth: 225 }}
              onClick={() => showCreateFacilityAccountModal()}
              className='cursor-pointer hover:transition hover:duration-300 hover:scale-110 text-center'
            >
              <CardContent>
                <div>
                  <p>New Facility?</p> 
                  <p>Create Account 
                    <a className='cursor-pointer' onClick={() => showCreateFacilityAccountModal()}> here</a>
                  </p>
              </div>
              </CardContent>
            </Card>
          </div>
          <div>
            {showLogInModal &&
              <BasicModal
                headingText='Facility Login'
                bodyText={
                  <FacilityLogin
                    onLoginSuccess={() => setShowLogInModal(false)}
                  />
                }
                openModal={showLogInModal}
                closeModal={() => setShowLogInModal(false)}
              />
            }
          </div>
          <div>
            {showCreateFacilityModal &&
              <BasicModal
                headingText='New Facility'
                bodyText={
                  <NewFacility
                    userLoggedIn={isLoggedIn}
                    user={userDetails}
                    onCreateFacilitySuccess={() => setShowCreateFacilityModal(false)}
                  />
                }
                openModal={showCreateFacilityModal}
                closeModal={() => setShowCreateFacilityModal(false)}
              />
            }
          </div>
          <div>
            {showAdminLoginModal &&
              <BasicModal
                headingText='Facility Admin'
                bodyText={
                  <UserLogin />
                }
                openModal={showAdminLoginModal}
                closeModal={() => setShowAdminLoginModal(false)}
              />              
            }
          </div>
        </div>              
      }
      
      {/* For testing only */}
      <a onClick={userLogOut}>Log Out</a>
      
    </main>
  )
}