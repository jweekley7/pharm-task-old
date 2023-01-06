import './App.scss'
import Home from '../facilityHome/home';
import { useContext, useEffect, useState } from 'react';
import Login from '../login/login';
import ModalWrapper from '../../modals/modal-wrapper';
import { FacilityContext } from '../../providers/facility-provider';
import NewFacility from '../new-facility/new-facility';


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

  // useEffect(() => {
  //   logAllFacilities();
  //   getFacilityFromId('O4MVvp03NUIeCBCiO4Hs');
  // })


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
              <ModalWrapper
                title='Facility Login' 
                children={<Login/>} 
                backEnabled={false} 
                closeOnTapOutside={false}   
                onCloseClicked={() => setShowLogInModal(false)}           
              />
            }
          </div>
          <div>
            {showCreateFacilityModal &&
              <ModalWrapper
                title='Create Facility' 
                children={<NewFacility/>} 
                backEnabled={false} 
                closeOnTapOutside={false}
                onCloseClicked={() => setShowCreateFacilityModal(false)}             
              />
            }
          </div>
        </div>              
      }
    </main>
  )
}