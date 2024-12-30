import React from 'react'

export const MsgAlert = (props) => {
    const closeModal=()=>{
        window.location.reload()
    }
  return (
    <div style={{display:props.isvisible?"block":"none"}}>

    <div className="modal d-flex" role="alert">
<div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Alert</h5>
                    <button type="button" className="btn-close float-right" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} ></button>
                </div>
                <div className="modal-body">
                    {props.msg}
                </div>
    </div>
    </div>
    </div>
    </div>
  );
}
export default MsgAlert;