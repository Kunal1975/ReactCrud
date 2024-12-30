import React, { Component } from 'react'

export default class Product extends Component {
   
   
        constructor(
            productid,
            productname,
            isactive,
            manufactdate,
            batchno,
            productmrp,
            createdon,
            modifiedon 
          ) {
            super(); 
            this.productid = productid;
            this.productname = productname;
            this.batchno = batchno;
            this.productmrp = productmrp;
            this.isactive = isactive;
            manufactdate=this.manufactdate;
            this.modifiedon = modifiedon;
          }
   
        
}

