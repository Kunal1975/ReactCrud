import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns/format';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import { Delete } from "./Delete";
import MsgAlert from "./MsgAlert";

export const UpdateItem = () => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState();
    const location = useLocation();
    const [error, setError] = useState(null);
    const [showAlert,setAlert]=useState(false);
    const[updateData,setUpdateData]=useState({
      productid:"",
      productname:"",
      isactive:"",
      manufactdate:"",
      batchno:"",
      productmrp:"",
      createdon:"",
      modifiedon:""
      });

    const[showDelete,setDelete]=useState(false);
    const [prodid,setprodid]=useState(0);
    const[selctData,setSelectData]=useState(
      {productid:"",
        productname:"",
        isactive:"",
        manufactdate:"",
        batchno:"",
        productmrp:"",
        createdon:"",
        modifiedon:""} 
    );
    const param=new URLSearchParams(location.search);
     const formatDate=((dateString)=>format(new Date(dateString),'dd-MM-yyy'));
     const mindate=new Date("2024-06-01");
     const maxdate=new Date();
    useEffect(() => {
       const id=param.toString().split("=");
        setprodid(id[1]);
      
        axios
      .get('http://localhost:82/api/Product/getById/getById',{params:{id:id[1]},})

      .then((response) => {
        setSelectData(response.data);
       
      })
    
      .catch((err) => {
        
      });
    
    });
    const OnHandleChange = (e) => {
     
    
      setUpdateData({...updateData,[e.target.name]:e.target.value});
    };
    
    
     const OnSubmit=(e)=>{
    
      
      updateData.productid=prodid;
     
      updateData.isactive=true;
      updateData.modifiedon=new Date();
      
       if(startDate!=null)
       {
         const prevdate=(startDate+1);
         updateData.manufactdate=format(new Date(prevdate),"yyy-MM-dd");
       }
       
      else
         updateData.manufactdate=selctData.manufactdate;
      if(updateData.productname==="")
      {
        updateData.productname=selctData.productname
      }

      if(updateData.batchno==="")
      {
        updateData.batchno=selctData.batchno;
      }
      if(updateData.productmrp==="")
      {
        updateData.productmrp=selctData.productmrp;
      }
      
        axios.post("http://localhost:82/api/Product/updateProduct/updateProduct",updateData)
        .then((response)=>{
              if(response.data!=null)
               setAlert(!showAlert);
        }).catch((err) => {
          setError('Error fetching data');
         
        });
       
      };
   const setReset=()=>{ window.location.reload()}
  return (
    <>
      
       <div className="container fluid">
         
           <div className="col-sm-12">
               <span style={{fontWeight:"bold",fontSize:"20px"}}>Update Product</span>
           </div>
        <div className="row">
           <div className="col-sm-2">
           <label htmlFor="getingProductName" className="form-label float-right">Product Name</label>
           </div>
           <div className="col-sm-4">
           <input type="text" className="form-control"
            name="productname" placeholder={selctData.productname} onChange={OnHandleChange}></input>
           </div>
           <div className="col-sm-2">
           <label htmlFor="getBatchNo" className="form-label float-right">BatchNo</label>
           </div>
           <div className="col-sm-4">
           <input type="text" className='form-control' name="batchno" placeholder={selctData.batchno} onChange={OnHandleChange}></input>
           </div>
        </div>
        <div className="row my-4">
           <div className="col-sm-2">
           <label htmlFor="getProductMrp" className="form-label float-right">Product MRP</label>
           </div>
           <div className="col-sm-4">
           <input type="text" className='form-control' name="productmrp" placeholder={selctData.productmrp} onChange={OnHandleChange}></input>
           </div>
           <div className="col-sm-2">
           <label htmlFor="getBatchNo" className="form-label float-right">Manufacturing Date</label>
           </div>
           <div className="col-sm-4">
           <DatePicker
           selectsStart
           selected={startDate}
           onChange={(date)=>{setStartDate(date)}}
           startDate={startDate}
           format="DD-MM-YYYY"
           minDate={mindate}
           maxDate={maxdate}
           placeholderText={selctData.manufactdate}
           name="manufactdate"
         />
           </div>
         
        </div>
         <div className="row">
           <div className='text-center'>
               <button className="btn btn-primary" onClick={OnSubmit}>Update</button>
               <button className="btn btn-primary mx-2" onClick={setReset}>Reset</button>
           </div>
         </div>
         <div>
          <MsgAlert isvisible={showAlert} msg={showAlert?"Row Updated SucessFully" :"Error has Occured"}/>
         </div>
       </div>
       </>
  );
}
export default UpdateItem;