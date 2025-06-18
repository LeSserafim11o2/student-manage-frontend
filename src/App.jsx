import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateStudent from "./components/CreateStudent";
import ShowStudentDetails from "./components/ShowStudentDetails";
import ShowStudentList from "./components/ShowStudentList";
import UpdateStudentInfo from "./components/UpdateStudentInfo";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{success: {style: {backgroundColor: "green", color: "white"}}, error: {style: {backgroundColor: "red", color: "white"}}}}
        containerStyle={{top: 30}}
      />
      <Router>
        <Routes>
          <Route path="/" element={<ShowStudentList/>}/>
          <Route path="/create" element={<CreateStudent/>}/>
          <Route path="/details/:id" element={<ShowStudentDetails/>}/>
          <Route path="/update/:id" element={<UpdateStudentInfo/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
