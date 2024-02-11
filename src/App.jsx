import Signup from "./components/Signup"
import { Route,Routes } from "react-router-dom"
import EmailOtp from "./components/EmailOtp"
import MobileOtp from "./components/MobileOtp"
import Welcome from "./components/Welcome"
import NotFound from "./components/NotFound"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Signup></Signup>}></Route>
      <Route path="/email" element={<EmailOtp></EmailOtp>}></Route>
      <Route path="/mobile" element={<MobileOtp></MobileOtp>}></Route>
      <Route path="/welcome" element={<Welcome></Welcome>}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
