import React, {useEffect, useState} from 'react';
import "./Accounts.css"
import moment from "moment";
import Modal from "../Modal/Modal";
import {PROFILE_ROUTE} from "../../utils/consts";
import {Link, NavLink} from "react-router-dom";

const Accounts = () => {
  const [modalActive, setModalActive]= useState(false)
  const [mode, setMode] = useState()
  const [total, setTotal] = useState()

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [itemm, setItemm] = useState([]);
  function timeConverter(UNIX_timestamp){
    if (UNIX_timestamp.indexOf('-') > -1) return UNIX_timestamp;
    else{
      let a = new Date(UNIX_timestamp * 1000);
      let year = a.getFullYear();
      let month = a.getMonth()+1;
      let date = a.getDate();
      let time = year + '-' + month + '-' + date;
      return time;
    }
  }
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
            setMode("create")
          }}>Create account</button>
        </div>
        <div className={"total"}>
          <p>Total accounts: {total}</p>
        </div>
        <table className={"table"}>
          <thead>
          <tr>
            <th>Name</th>
            <th>Account name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Start date</th>
            <th>Expiration date</th>
            <th></th>
          </tr>
          </thead>
      <tbody>
      {items.map(item => (
        <tr key={item.id}>
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
      </tbody>

        </table>
        <Modal active={modalActive} setActive={setModalActive} get={get} item={itemm} mode={mode}/>
      </div>
    );
  }
};

export default Accounts;
