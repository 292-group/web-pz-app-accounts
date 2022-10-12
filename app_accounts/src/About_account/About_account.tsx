import './About_account.css'
import { useParams } from 'react-router-dom';
import db from '../db/db.accounts.json'
import React from 'react';
function AboutAccount() {
    //useParams to know by which name was selected
    const {ID}=useParams();
    const intID=Number(ID);
    let numArr;
    for(let i=0;i<db["accounts"].length;i++) if(db["accounts"][i].id===intID) numArr=i;

  return (
    <div className="about-account">
     <h2>{db["accounts"][numArr].name}</h2>
     <ul className="account-info-ul">
        <li className="account-info-li">
            <p><span className='span-info'>Name: </span>{db["accounts"][numArr].name}</p>
        </li>
        <li className="account-info-li">
            <p><span className='span-info'>Account name: </span>{db["accounts"][numArr].account_name}</p>
        </li>
        <li className="account-info-li">
            <p><span className='span-info'>E-mail: </span>{db["accounts"][numArr].email}</p>
        </li>
        <li className="account-info-li">
            <p><span className='span-info'>Status: </span><span className={db["accounts"][numArr].status==="Pending"?"status-red":""+db["accounts"][numArr].status==="Disable"?"status-yellow":""+db["accounts"][numArr].status==="Active"?"status-blue":""}>{db["accounts"][numArr].status}</span></p>
        </li>
        <li className="account-info-li">
            <p><span className='span-info'>Start date: </span>{db["accounts"][numArr].start_date}</p>
        </li>
        <li className="account-info-li">
            <p><span className='span-info'>Expiration date: </span>{db["accounts"][numArr].expiration_date}</p>
        </li>
     </ul>
    </div>
  );
}

export default AboutAccount;