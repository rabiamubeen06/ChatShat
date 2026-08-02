import { Navigate,Routes ,Route} from "react-router";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageLoader from "./components/PageLoader";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
function App(){
  const {checkAuth,isCheckingAuth,authUser}=useAuthStore();
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  console.log(authUser);
  if(isCheckingAuth)return <PageLoader/>
  return(
    // Background grid
    <div className="min-h-screen bg-[#062837]
     relative flex items-center justify-center
    p-4 overflow-hidden">
      {/* glow shapes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-position-[40px_40px] bg-size-[20px_20px]"/>
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-600 rounded-full opacity-20 blur-3xl"></div>
<div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-600 rounded-full opacity-20 blur-3xl"></div>
    <Routes>
      <Route path='/' element={authUser?<ChatPage/>:<Navigate to={"/login"}/>}/>
      <Route path='/login' element={ !authUser?<Login/>:<Navigate to={"/"}/>}/>
      <Route path='/signup' element={ !authUser?<Signup/>:<Navigate to={"/"}/>}/>


    </Routes>
    <Toaster/>
    </div>
  )
}
export default App;