import React, {useEffect, useState} from 'react';
import "./Accounts.css"
import moment from "moment";
import Modal from "../Modal/Modal";
import {PROFILE_ROUTE} from "../../utils/consts";
import {Link, NavLink} from "react-router-dom";

const Accounts = () => {
  const [modalActive, setModalActive]= useState(false)
  const [current, updateCurrent] = useState({ name: "", account: "", status:"Active", email:"", startDate:"", expDate:""})
  const [mode, setMode] = useState()
  const [total, setTotal] = useState()

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [itemm, setItemm] = useState([]);

  function get(){
    fetch("/accounts")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setTotal(result.length)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  useEffect(() => {
    get()
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={"accounts-holder"}>
        <div className={"accounts-holder__title"}>
          <h1 className={"title"}>Account list</h1>
          <button className={"create-account"} onClick={()=> {setModalActive(true)
            updateCurrent( { name: "", account: "", status:"Active", email:"", startDate:"", expDate:""});
            setMode("create")
          }}>Create account</button>
        </div>
        <div className={"total"}>
          <p>Total accounts: {total}</p>
        </div>
        <table className={"table"}>
          <tr>
            <th>Name</th>
            <th>Account name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Start date</th>
            <th>Expiration date</th>
            <th></th>
          </tr>
            {items.map(item => (
              <tr>
                <td><NavLink to={PROFILE_ROUTE+"/"+item.id} className={"profile"}><p>{item.name}</p></NavLink></td>
                <td>{item.account_name}</td>
                <td>{item.email}</td>
                <td className={item.status=="Active"?"blue":item.status=="Pending"?"red":"yellow"}><div className={"status"}><p>{item.status}</p></div></td>
                <td>{moment(item.start_date*1000).format('DD MMM YYYY')}</td>
                <td>{moment(item.expiration_date*1000).format('DD MMM YYYY')}</td>
                <td><div className={"buttons"}>
                  <button className={'edit'} onClick={()=>{

                    setMode("edit")
                    setModalActive(true)
                    setItemm(item)
                    updateCurrent( { name: item.name, account: item.account_name, status:item.status, email:item.email, startDate:"", expDate:""});
                    console.log(itemm)
                  }
                }>Edit</button>
                  <button className={'delete'} onClick={()=>{
                  fetch('/accounts/'+item.id, {
                    method: 'DELETE'
                  })
                    get()
                }}>Delete</button></div></td>
              </tr>
            ))}
        </table>
        <Modal active={modalActive} setActive={setModalActive} get={get} item={itemm} mode={mode} current={current}/>
      </div>
    );
  }
};

export default Accounts;
