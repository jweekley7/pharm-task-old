import { useContext } from 'react';
import { FacilityContext } from '../../providers/facility-provider';

export const Home = () => {
  const { currentFacility } = useContext(FacilityContext);
  //TODO: create dashboard view for homepage
  
  return (
    <div>
      {/*TODO: put logout in header (also needs to be available on the initial screen*/}
      <a>LogOut</a>

      {/*Just for testing to see if current facility is accurate*/}
      <h1>{currentFacility?.facilityName}</h1>
    </div>
  )
}

export default Home;
