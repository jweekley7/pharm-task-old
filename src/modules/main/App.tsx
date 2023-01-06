import './App.scss'
import Home from '../facilityHome/home';
import { useContext, useState } from 'react';
import Login from '../login/login';
import { FacilityContext } from '../../providers/facility-provider';
import NewFacility from '../new-facility/new-facility';
import BasicModal from '../../modals/basic-modal';


export default function App() {
  const { doesFacilityExist, getFacilityFromId } = useContext(FacilityContext);
  const [facilityLoggedIn, setFacilityLoggedIn] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showCreateFacilityModal, setShowCreateFacilityModal] = useState(false);
  //TODO: check for current login. if not logged in, show welcome page with login options.
  //      if logged in, automatically go to facility home page

  const checkForFacilityLogIn = async (facilityName: string) => {
    const facilityMatch = await doesFacilityExist(facilityName);

  }

  const showAccountLogInModal = () => {
    setShowLogInModal(true)
    setShowCreateFacilityModal(false)
  }

  const showCreateFacilityAccountModal = () => {
    setShowCreateFacilityModal(true)
    setShowLogInModal(false)
  }


  return (
    <main>
      {facilityLoggedIn ? 
        <Home></Home> : 
        <div>
          <div className="text-3xl font-bold underline">Welcome to checklist.</div>
          <div>Existing Facility? Login <a className='cursor-pointer' onClick={() => showAccountLogInModal()}>here</a></div>
          <div>New Facility? Create Account <a className='cursor-pointer' onClick={() => showCreateFacilityAccountModal()}>
              here
            </a>
          </div>
          <div>
            {showLogInModal &&
              <BasicModal
                headingText='Facility Login'
                bodyText={<Login/>}
                openModal={showLogInModal}
                closeModal={() => setShowLogInModal(false)}
              />
            }
          </div>
          <div>
            {showCreateFacilityModal &&
              <BasicModal
                headingText='New Facility'
                bodyText={<NewFacility/>}
                openModal={showCreateFacilityModal}
                closeModal={() => setShowCreateFacilityModal(false)}
              />
            }
          </div>
        </div>              
      }
    </main>
  )
}