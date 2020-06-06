import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleToaster } from 'h:/coot-apps/src/app/State/reducers/ToasterReducer';

import './index.css'
const Toaster = (props) => {

  const toaster = useSelector(state=>state.toaster)
  const dispatch  = useDispatch()


  useEffect(() => {
    if(toaster.msg){
      setTimeout(() => {
        dispatch(toggleToaster({msg:null}))      
      }, toaster.timeout);
    }
  }, [toaster]);


  return (
    <>
      <div
        className='cms-overlay cms-notification-toast cms-toast'
        style={{
          opacity: toaster.msg?1:0,
          backgroundColor: 'blue',
          zIndex:99999999
        }}
      >
        <div className='cms-toast-text'> {toaster.msg}</div>
      </div>
    </>
  );
};



export default Toaster;
