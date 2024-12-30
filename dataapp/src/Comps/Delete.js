import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { ConfirmBox } from './ConfirmBox';



export const Delete = (props) => {
    const[showConfirm,setConfirm]=useState(false);
    useEffect(()=>{setConfirm(!showConfirm)
         
    });
    
  return (
    <>
      <ConfirmBox deleteIndex={props.index}>{showConfirm?'show':'Hide'}</ConfirmBox>
    </>
      
  );
}
export default Delete;