import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found1.svg';

const Error = () => {
  /* 
    useRouteError can use not only for 404, it can also
    for other status report.
  */
  const error = useRouteError();
  console.log(error);
  if(error.status === 404){
    return <Wrapper>
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! page not found</h3>
        <p>we can seem to find the page you are looking for</p>
        <Link to='dashboard'>Back home</Link>
      </div>
    </Wrapper>
  }
  return (
    <div>
      <h1>Error Page</h1>
      <Link to="/">Back Home</Link>
    </div>
  )
}

export default Error
