import './Create.account.css'
import React from 'react';

function CreateAccount({active,setActive,id,action,setCount,setCheckId,setdb,db,getAccounts}) {
  let nameValue=React.createRef();
  let accountValue=React.createRef();
  let emailValue=React.createRef();
  let exampleValue=React.createRef()
  let dataStartValue=React.createRef();
  let dataEndValue=React.createRef();
  let idCount=0,numArr;
  let nameEdit,accountEdit,emailEdit;

  //filling in the fielder during edition
if(action==="edit"){
 for(let i=0;i<db.length;i++) if(db[i].id===id) numArr=i;
 nameEdit=db[numArr].name;
 accountEdit=db[numArr].account_name;
 emailEdit=db[numArr].email;
}
//func for add new accound or edit account
  const saveAllValue= ()=>{
    if(action==="edit"){
 fetch(`http://localhost:3000/accounts/${db[numArr].id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({ 
          "id": db[numArr].id,
          "name": `${nameValue.current.value}`,
          "account_name": `${accountValue.current.value}`,
          "email": `${emailValue.current.value}`,
          "status": `${exampleValue.current.value}`,
          "start_date": `${dataStartValue.current.value}`,
          "expiration_date": `${dataEndValue.current.value}`})
      })
      .then((resp) => {
        getAccounts();
        setCount(db.length);
      }, (error) => {
        console.error(error)
      });

setCheckId(db[numArr].id);
}

    else if(action==="create"){
      for(let i=0;i<db.length;i++) if(db[i].id>idCount) idCount=db[i].id;

      fetch(`http://localhost:3000/accounts`, {
        method: 'POST',headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({ 
          "id": ++idCount,
          "name": `${nameValue.current.value}`,
          "account_name": `${accountValue.current.value}`,
          "email": `${emailValue.current.value}`,
          "status": `${exampleValue.current.value}`,
          "start_date": `${dataStartValue.current.value}`,
          "expiration_date": `${dataEndValue.current.value}`})
      })
      .then((resp) => {
        getAccounts();
        setCount(db.length);
      }, (error) => {
        console.error(error)
      });
    }
    setCount(db.length);
    setActive(false);
  }
  return (
    <div className={active? "create-account active":"create-account"} onClick={()=>{setActive(false)}}>
      <div className="modal-content" onClick={e=>e.stopPropagation()}>
        <div className="header-modal-content">
          <h2 className="title-modal">Create account</h2>
          <button  className='X-btn' onClick={()=>{setActive(false)}}>X</button>
        </div>
        <form action="" className='modal-form'>
          <div className="name-div div">
            <label htmlFor="name" className="name-label">Name</label>
            <input type='text'  defaultValue={nameEdit}  ref={nameValue}     id="name" name="textfield"  className="name-input" />
          </div>

          <div className="account-div div">
            <label htmlFor="account" className="account-label">Account</label>
            <input type="text" defaultValue={accountEdit}   ref={accountValue} id="account"  className="account-input" />
          </div>

          <div className="example-div div">
            <label htmlFor="example" className="example-label">Example select</label>
            <select name="example" ref={exampleValue} id="example" className="example-select">
            <option defaultValue="Active">Active</option>
            <option defaultValue="Disable">Disable</option>
            <option defaultValue="Pending">Pending</option>
            </select>
          </div>

          <div className="email-div div">
            <label htmlFor="email" className="email-label">Email</label>
            <input type="text" defaultValue={emailEdit} ref={emailValue} id="email" className="email-input" />
          </div>
          <div className="start-with-end-date ">
            <div className="start-date-div div">
            <label htmlFor="start" className="start-date-label">Start date</label>
            <input type="date" ref={dataStartValue} id="start" name="trip-start" defaultValue="2022-10-08" min="2018-01-01" max="2025-12-31"/>
          </div>

          <div className="end-date-div div">
            <label htmlFor="end" className="end-date-label">Expiration date</label>
            <input type="date" id="end" ref={dataEndValue} name="trip-start" defaultValue="2022-10-08" min="2018-01-01" max="2025-12-31"/>
          </div>
          </div>
</form>
<div className="buttons">
  <button className="cancel-btn" onClick={()=>{setActive(false)}}>Cancel</button>
  <button className="save-btn" onClick={()=>{saveAllValue()}}>Save</button>
</div>      
      </div>
    </div>
  );
}

export default CreateAccount;