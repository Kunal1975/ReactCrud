import AddNew from "./Comps/AddNew";
import Newdatacomp from "./Comps/Newdatacomp";
import { BrowserRouter,Route,Router, Routes } from "react-router-dom";
import Header from "./Comps/Header";
import UpdateItem from "./Comps/UpdateItem";
function App() {

  return (
   <>
   
   <BrowserRouter>
        
     <Header/>
     <Routes>
    <Route path="/" element={<Newdatacomp/>}/>
    <Route path="/AddNew" element={<AddNew/>}/>
    <Route path="/UpdateItem" element={<UpdateItem/>}/>
    </Routes>
   </BrowserRouter>
   
   
   </>
  );
}

export default App;
