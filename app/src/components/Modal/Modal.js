import React, {useEffect, useReducer, useState} from 'react';
import "./Modal.css"
import moment from "moment";

const Modal = ({active, setActive, get, item, mode}) => {
  let nameValue=React.createRef();
  let accountValue=React.createRef();
  let emailValue=React.createRef();
  let exampleValue=React.createRef()
  let dataStartValue=React.createRef();
  let dataEndValue=React.createRef();
  let id;

useEffect(()=>{
  if(mode==="edit"){
    nameValue.current.value = item.name;
    accountValue.current.value = item.account_name;
    emailValue.current.value = item.email;
    exampleValue.current.value = item.status;
    dataStartValue.current.value = moment(item.start_date*1000).format('YYYY-MM-DD');
    dataEndValue.current.value = moment(item.expiration_date*1000).format('YYYY-MM-DD');
    id = item.id;
  }
  if(mode==="create"){
    nameValue.current.value = "";
    accountValue.current.value = "";
    emailValue.current.value = "";
    exampleValue.current.value = "Active";
    dataStartValue.current.value = "";
    dataEndValue.current.value = "";
  }
},[item, mode])

  function close(){
    setActive(false)
    item = {}
  }
  function post(e, setActive){
    try {
      fetch('/accounts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          "name": nameValue.current.value,
          "account_name": accountValue.current.value,
          "status": exampleValue.current.value,
          "email": emailValue.current.value,
          "start_date": new Date(dataStartValue.current.value).getTime() / 1000,
          "expiration_date": new Date(dataEndValue.current.value).getTime() / 1000
        })
      }).then(res => res.json())
        .then(res => {

          get();
          setActive(false)
        });
    }catch (e){
      console.log(e.message)
    }
  }
  function put(e, setActive){
    e.preventDefault()
      try {
        fetch(`/accounts/${id}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
            "name": nameValue.current.value,
            "account_name": accountValue.current.value,
            "status": exampleValue.current.value,
            "email": emailValue.current.value,
            "start_date": new Date(dataStartValue.current.value).getTime() / 1000,
            "expiration_date": new Date(dataEndValue.current.value).getTime() / 1000
          })
        }).then(res => res.json())
          .then(res => {
            get();
            setActive(false)
          });
      }catch (e){
        console.log(e.message)
      }

  }

  return (
    <div className={active ?"modal active":"modal"} onClick={()=> {setActive(false)}}>
      <div className={"modal__content"} onClick={e=> e.stopPropagation()}>
        <div className={"content-type"}>
          <h1>{mode==="create"?"Create account":"Edit profile"}</h1>
          <div className={"close"} onClick={()=> setActive(false)}>X</div>
        </div>
        <form className="form-sub">
          <div className="form-input">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" ref={nameValue} required/>
          </div>
          <div className="form-input">
            <label htmlFor="name">Account name: </label>
            <input type="text" name="account-name" id="name" ref={accountValue} required/>
          </div>
          <div className="form-input">
            <label htmlFor="status">Status: </label>
            <select name="status" ref={exampleValue}>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Disable">Disable</option>
            </select>
          </div>
          <div className="form-input">
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" ref={emailValue} required/>
          </div>
          <div className="form-date">
            <div className={"form-date__block"}>
              <label htmlFor="start-date">Start date: </label>
              <input type="date" name="start-date" id="start-date"ref={dataStartValue} required/>
            </div>
           <div className={"form-date__block"}>
             <label htmlFor="exp-date">Expiration date: </label>
             <input type="date" name="exp-date" id="exp-date" ref={dataEndValue} required/>
           </div>
          </div>
          <div className="form-send">
            <input type="submit" className={'confirm'} onClick={ e =>{
              mode==="create"?post(e, setActive):put(e,setActive)}} value={mode==="create"?"Create":"Update"}></input>
            <button className={'close'} onClick={close}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
//moment(e.target.value, "YYYY-MM-DD").format("x")
export default Modal;
