import React from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns/format';
import axios from "axios";
import { useState } from 'react';
import MsgAlert from './MsgAlert';

export const AddNew = () => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState();
    const [showAlert,SetAlert]=useState(false);
     const[selctData,setSelectData]=useState({productname:"",isactive:false,manufactdate:"",batchno:"",productmrp:"",creadedon:""});

     const onChangeHandle=(e)=>{
      setSelectData({...selctData,[e.target.name]:e.target.value});
       }

       const OnSubmit=()=>{
        const prevdate=startDate+1;
        const currentDate=format(new Date(prevdate),"yyy-MM-dd");
        selctData.isactive=true;
        selctData.manufactdate=currentDate;
        selctData.creadedon=new Date();
        console.log(JSON.stringify(selctData));
        axios.post('http://localhost:82/api/Product/insertNew/insertNew',selctData)
        .then((response)=>{
          if(response.data!=null)
          {
            SetAlert(!showAlert);
          }
          else
          {
            alert("Fail to Insert")
          }
        }).catch((error)=>{
          alert("Error occured");
        });

     }
  return (
    <>
   
    <div className="container fluid">
      
        <div className="col-sm-12">
            <span style={{fontWeight:"bold",fontSize:"20px"}}>Add A New Product</span>
        </div>
     <div className="row">
        <div className="col-sm-2">
        <label htmlFor="getingProductName" className="form-label float-right">Product Name</label>
        </div>
        <div className="col-sm-4">
        <input type="text" className='form-control' name="productname" onChange={onChangeHandle}></input>
        </div>
        <div className="col-sm-2">
        <label htmlFor="getBatchNo" className="form-label float-right">BatchNo</label>
        </div>
        <div className="col-sm-4">
        <input type="text" className='form-control' name="batchno" onChange={onChangeHandle}></input>
        </div>
     </div>
     <div className="row my-4">
        <div className="col-sm-2">
        <label htmlFor="getProductMrp" className="form-label float-right">Product MRP</label>
        </div>
        <div className="col-sm-4">
        <input type="text" className='form-control' name="productmrp" onChange={onChangeHandle}></input>
        </div>
        <div className="col-sm-2">
        <label htmlFor="getBatchNo" className="form-label float-right">Manufacturing Date</label>
        </div>
        <div className="col-sm-4">
        <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        form='yyy-MM-dd'
        startDate={startDate}
        name="manufactdate"
      />
        </div>
      
     </div>
      <div className="row">
        <div className='text-center'>
            <button className="btn btn-primary" onClick={OnSubmit}>Submit</button>
            <button className="btn btn-primary mx-2">Reset</button>
        </div>
      </div>
      <div>
      <MsgAlert  isvisible={showAlert} msg={showAlert?"Row Added SucessFully":"Error Occrued"}/>
      </div>
      
    </div>
    </>
  );
}
export default AddNew;