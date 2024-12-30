
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEraser,faEdit} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ConfirmBox from './ConfirmBox';
import Header from './Header';
import Delete from './Delete';

export const Newdatacomp = () => {
    const [index,setdelIndex]=useState()
    const navtoupdate=useNavigate();
    const [showDelete,setDelete]=useState(false);
    const[filterData,SetFilter]=useState();
    const [data, setData] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling
    const [options, setOptions] = useState([]); 
    const [curIndex,setIndex]=useState(0);
    const toUpdate=(e)=>{
      
      navtoupdate("/UpdateItem?id="+e);
    }

    const onDeleteClick=(e)=>{
      setDelete(!showDelete);
      setdelIndex(e);
         
     }
     const formatDate=((dateString)=>format(new Date(dateString),'dd-MM-yyy'));
     const HandleChanger=(e)=>{
           setIndex(e.target.vale);
           if(e.target.value >0)
           {
           const result = filterData.filter((item) =>
                 item.productid==e.target.value);
          setData(result);
          }
          else
             {
                const result = filterData.filter((item) =>
                    item.productid>0);
             setData(result);
             }
     };
    
       useEffect(() => {
        setDelete(showDelete);
      axios
    .get('http://localhost:82/api/Product/getAll/getAll') // E/xample API
    .then((response) => {
      setData(response.data); // Update state with the fetched data
      setOptions(response.data);
      SetFilter(response.data);
      setLoading(false); // Turn off loading state
     
    })
    .catch((err) => {
      setError('Error fetching data');
      setLoading(false);
    });
  
  }, []);
    return (
     <>
      <div className="col-sm-12 mx-2 my-2">
      <span  style={{fontSize:"16px",fontWeight:"bold"}}>Data Display Module</span>
      </div>
       <div className="container fluid">
       <div className="col-sm-12">
        <div className="row">
        <div className="col-sm-7">
        
        </div>
        <div className="col-sm-2">
        <span  style={{fontSize:"11px",fontWeight:"bold",float:"right"}}>Search By ProductId</span>
        </div>
        <div className="col-sm-3">
        <select id="drpProduct" className="form-select " value={curIndex} onChange={HandleChanger} style={{fontSize:"11px",float:"left"}}>
                <option value="0"> All </option>
                {options.map((option) => (
                <option key={option.productid} value={option.value}>
                    {option.productid}
                </option>

        ))}

          </select>
        </div>
        </div>
       
       </div>
        <table className="table table-bordered" style={{fontSize:"11px",marginTop:"4%"}}>
          <thead className="table-dark">
            <tr>
              <th>Product Id</th>
              <th> Product Name</th>
              <th>Bach No</th>
              <th>Product Mrp</th>
              <th>Product Manufacture Date</th>
              <th>Action</th>
            </tr>
          </thead>
         <tbody >
          {
            data.map((product,index)=>{
              return<tr key={index}>
              <td>{product.productid}</td>
              <td>{product.productname}</td>
                <td>{product.batchno}</td>
                <td>{product.productmrp}</td>
                <td>{formatDate(product.manufactdate)}</td>
                <td> <button className="btn btn-primary btn-sm" title="Edit" onClick={() => toUpdate(product.productid)} ><FontAwesomeIcon icon={faEdit} /></button> 
                     <button className="btn btn-danger btn-sm mx-2" title="Delete" onClick={()=>onDeleteClick(product.productid)}><FontAwesomeIcon icon={faEraser}/></button> </td>
              </tr>
            })
          }
         </tbody>
        </table>
        <div >
        {/* Calling ConfirmBox */}
          <ConfirmBox isvisible={showDelete} index={index}>{showDelete?'show':'Hide'}</ConfirmBox>
         
        </div>
        </div> 
        </>
      
    );
}
export default Newdatacomp;