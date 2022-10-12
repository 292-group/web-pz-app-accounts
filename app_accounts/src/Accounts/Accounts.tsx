import React from 'react';
import { useState } from 'react';
import './Accounts.css'
import database from '../db/db.accounts.json'
import CreateAccount from '../Create_account/Create_account';

const Accounts=()=> {
  let db=database["accounts"];
  const [count, setCount]=useState(db.length);
  const [checkId,setCheckId]=useState(0);
  //state for visible modal window
  const [modalActive,setModalActive]=useState(false);
  //state for transfer id Create_account
  const[idEdit,setIdEdit]=useState(0);
  //state for transfer action(edit or create) to Create_account
  const[action,setAction]=useState("");

  //func for delete accounts
    function onDeleteAccount(item){
      if(item.id===checkId) alert("You can not delete the account you just eddited!!!")
      else{
      db.splice(db.indexOf(item),1);
      setCount(db.length);
    }
    }
   
  return (
    <div className="accounts">
   <div className="header-with-create">
    <h2 className="h2">Account list</h2>
    <button className='create-btn' onClick={()=>{setModalActive(true);setAction("create")}}>Create account </button>
   </div>
   <div className="total">
    <p className="total-num"> Total: <span className='number'>{count}</span></p>
   </div>
   <div className='account-list'>
    <table>
    <tbody>
        <tr>
            <th>Name</th>
            <th>Account name</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Start date</th>
            <th>Expiration date</th>
            <th></th>   
        </tr>
        {db.map(item=>
            <tr className='tr' key={item.id}>
            
                <td className={item.id +"name-td"} ><a className='name'  href={'accounts/'+item.id}>{item.name}</a></td>
                <td>{item.account_name}</td>
                <td>{item.email}</td>
                <td ><span className={item.status==="Pending"?"status-red":""+item.status==="Disable"?"status-yellow":""+item.status==="Active"?"status-blue":""}>{item.status}</span></td>
                <td>{item.start_date}</td>
                <td>{item.expiration_date}</td>
                <td className='edit-delete-btns'>
                    <button className="edit-btn" onClick={()=>{setModalActive(true);setIdEdit(item.id);setAction("edit")}} >Edit</button>
                    <button className="delete-btn" onClick={()=> onDeleteAccount(item)}>Delete</button>
                </td>
            </tr>
            )}
</tbody>
    </table>
   </div>
          <CreateAccount active={modalActive} setActive={setModalActive} id={idEdit} action={action} setCount={setCount} setCheckId={setCheckId}></CreateAccount>
    </div>
  );
}

export default Accounts;