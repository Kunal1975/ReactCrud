import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Product from '../Entity/Product';
import MsgAlert from './MsgAlert';
export const ConfirmBox = (props) => {
     
    const [showModal,setModal]=useState(false);
    const [showAlert,setAlert]=useState(false);
    
    const [prodObj,setProduct]=useState({productid:"",
        productname:"",
        isactive:"",
        manufactdate:"",
        batchno:"",
        productmrp:"",
        createdon:"",
        modifiedon:""} );
  
   const closeModal=()=>{
    document.getElementById("dvModal").setAttribute("hidden", true);
    window.location.reload();
   }
    const doDelete=()=>{
        
       axios
       .get('http://localhost:82/api/Product/getById/getById',{params:{id:props.index},})
        .then((response)=>{
          response.data.isactive=false;
          response.data.productid=props.index;
          response.data.createdon=new Date();
          response.data.modifiedon=new Date();
          axios.post('http://localhost:82/api/Product/updateProduct/updateProduct',response.data)
          .then((result)=>{
              if(result.data!=null)
               setAlert(!showAlert);
         }).catch((err) => {
            
            
           });  
        })
        .catch((Error)=>{

        });
           
      
      document.getElementById("dvModal").setAttribute("hidden", true);
      
    }
  return (
   
    
       <div> 
       
        <div style={{display:props.isvisible?"block":"none"}} id="dvModal">
           
           <div className="modal  block d-flex" tabIndex="-1" >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Delete Confirmation</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} ></button>
                </div>
                <div className="modal-body">
                    <p>Are you Sure to Delete ProductId:{props.index}?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>No</button>
                    <button type="button" className="btn btn-primary" onClick={doDelete}>Confirm</button>
                </div>
                </div>
            </div>
        </div>
         </div>
         <MsgAlert isvisible={showAlert} msg="Row has been deleted Sucessfully"/>
        </div>

            
    
       
       
      
   
 
 
  );
}
export default ConfirmBox;


