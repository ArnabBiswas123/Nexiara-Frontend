import Signup from "./components/Signup"
import { Route,Routes } from "react-router-dom"
import EmailOtp from "./components/EmailOtp"
import MobileOtp from "./components/MobileOtp"
import Welcome from "./components/Welcome"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Signup></Signup>}></Route>
      <Route path="/email" element={<EmailOtp></EmailOtp>}></Route>
      <Route path="/mobile" element={<MobileOtp></MobileOtp>}></Route>
      <Route path="/welcome" element={<Welcome></Welcome>}></Route>
    </Routes>
    </>
  )
}

export default App
