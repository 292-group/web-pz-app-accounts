import React, {useEffect, useState} from 'react';
import "./About.css"

const About = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/info")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
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
    <div className="about-us">
      <ul className={"anchors"}>
        <li><a className='a' href="#1">What is Lorem ipsum?</a></li>
        <li><a className='a' href="#2">Why do we use it?</a></li>
        <li><a className='a' href="#3">Where it comes from?</a></li>
      </ul>
      <div className="info">
        <p id='1'><span>What is Lorem ipsum?</span>{items[0].text}</p>
        <p id='2'> <span>Why do we use it?</span>{items[1].text}</p>
        <p id='3'> <span>Where it comes from?</span>{items[2].text}</p>
      </div>
    </div>
  );}
};

export default About;
