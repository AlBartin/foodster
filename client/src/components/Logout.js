import { useRecoilState } from "recoil"
import { currentUserState, currentAuthState } from "../recoil/atoms"

function Logout() {

const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
const [auth, setAuth] = useRecoilState(currentAuthState)

const handleLogout = () => {
    try {
        //localStorage.removeItem('user')
        setCurrentUser(null)
        console.log('user logged out successfully')
        console.log(auth)
        console.log(currentUser)
    }
    catch (error) {
        console.log(error)
    }
}    
  
return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default Logout