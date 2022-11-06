import React, {useEffect, useReducer, useState} from 'react';
import "./Modal.css"
import moment from "moment";

const Modal = ({active, setActive, get, item, mode, current}) => {
  const initialState = current;
  const [state, updateState] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );


  function close(){
    setActive(false)
  }
  function post(e, setActive, state){
    e.preventDefault()
    try {
      fetch('/accounts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          "name": state.name,
          "account_name": state.account,
          "status": state.status,
          "email": state.email,
          "start-date": state.startDate,
          "exp-date": state.expDate
        })
      }).then(res => res.json())
        .then(res => {
          get();
          setActive(false)
         updateState({ name: "", account: "", status:"Active", email:"", startDate:"", expDate:""})
        });
    }catch (e){
      console.log(e.message)
    }
  }
  function put(e, setActive, state){
    e.preventDefault()
    try {
      fetch(`/accounts/${item.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          "name": state.name,
          "account_name": state.account,
          "status": state.status,
          "email": state.email,
          "start-date": state.startDate,
          "exp-date": state.expDate
        })
      }).then(res => res.json())
        .then(res => {
          get();
          setActive(false)
          //updateState({ name: "", account: "", status:"Active", email:"", startDate:"", expDate:""})
      });
    }catch (e){
      console.log(e.message)
    }
  }
  function isEmpty(obj) {
    for(let key in obj)
    {
      return false;
    }
    return true;
  }
  // useEffect(()=>{
  //   console.log(item)
  //   if(!isEmpty(item))
  //   updateState({ name: item.name, account: item.account, status:item.status, email:item.email, startDate:item.startDate, expDate:item.expDate})
  // },[])

  return (
    <div className={active ?"modal active":"modal"} onClick={()=> setActive(false)}>
      <div className={"modal__content"} onClick={e=> e.stopPropagation()}>
        <div className={"content-type"}>
          <h1 onClick={()=>console.log(current)}>{mode==="create"?"Create account":"Edit profile"}</h1>
          <div className={"close"} onClick={()=> setActive(false)}>X</div>
        </div>
        <form action="" method="post" className="form-sub">
          <div className="form-input">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" defaultValue={mode==="create"?state.name:item.name} onChange={e => updateState({name:e.target.value})} required/>
          </div>
          <div className="form-input">
            <label htmlFor="name">Account name: </label>
            <input type="text" name="account-name" id="name" defaultValue={mode==="create"?state.account:item.account_name} onInput={e => updateState({account:e.target.value})} required/>
          </div>
          <div className="form-input">
            <label htmlFor="status">Status: </label>
            <select name="status" value={mode==="create"?"Active":item.status} onChange={e => updateState({status:e.target.value})}>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Disable">Disable</option>
            </select>
          </div>
          <div className="form-input">
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" defaultValue={mode==="create"?state.email:item.email} onInput={e => updateState({email:e.target.value})} required/>
          </div>
          <div className="form-date">
            <div className={"form-date__block"}>
              <label htmlFor="start-date">Start date: </label>
              <input type="date" name="start-date" id="start-date" defaultValue={mode==="create"?"":moment(item.start_date*1000)} onChange={e => updateState({startDate:moment(e.target.value, "DD MMM YYYY").format("X")})} required/>
            </div>
           <div className={"form-date__block"}>
             <label htmlFor="exp-date">Expiration date: </label>
             <input type="date" name="exp-date" id="exp-date" onChange={e => updateState({expDate:moment(e.target.value, "DD MMM YYYY").format("X")})} required/>
           </div>
          </div>
          <div className="form-send">
            <button type="" className={'confirm'} onClick={ e =>{
              mode==="create"?post(e, setActive, state):put(e,setActive, state)}}>{mode==="create"?"Create":"Update"}</button>
            <button className={'close'} onClick={close}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
//moment(e.target.value, "YYYY-MM-DD").format("x")
export default Modal;
