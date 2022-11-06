import React, {useEffect, useState} from 'react';
import "./Profile.css"
import {useParams} from "react-router-dom";
import hat from "../img/hat.jpg"
import moment from "moment/moment";

const Profile = () => {
  const params = useParams();
  const userId = params.id;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`/accounts/${userId}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUser(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={'content'}>
        <img className={'hat'} src={hat} alt={"some"}/>
        <div className={"user"}>
          <h1>{user.name}</h1>
          <div className={"user__row"}>
            <p className={"field"}>&#128512; Name:</p>
            <p>{user.name}</p>
          </div>
          <div className={"user__row"}>
            <p className={"field"}>&#128100; Account name: </p>
            <p>{user.account_name}</p>
          </div>
          <div className={"user__row"}>
            <p className={"field"}>&#128231; Email: </p>
            <p>{user.email}</p>
          </div>
          <div className={"user__row"}>
            <div className={"field"}>&#9733; Status: </div>
            <div className={user.status=="Active"?"blue-profile":user.status=="Pending"?"red-profile":"yellow-profile"}>
              <div className={"status-profile"}>
                <p>{user.status}</p>
              </div>
              </div>
          </div>
          <div className={"user__row"}>
            <p className={"field"}>&#128197; Start date: </p>
            <p>{moment(user.start_date*1000).format('D MMM YYYY')}</p>
          </div>
          <div className={"user__row"}>
            <p className={"field"}>&#9203; Expitation date: </p>
            <p>{moment(user.expiration_date*1000).format('D MMM YYYY')}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
