

export const Login = () => {

  const loginForm = (
    <form>
      <label htmlFor="facilityName">Facility Name</label>
      <input inputMode="text" id="facilityName"></input>
      <label htmlFor="facilityId">Facility ID</label>
      <input inputMode="text" id="facilityId"></input>
      <label htmlFor="facilityPw">Facility Password</label>
      <input inputMode="text" id="facilityPw"></input>
      <button type="submit">Log In</button>
    </form>
  )
  
  return (
    <div>
      {loginForm}
    </div>   
  )
}

export default Login;