import React from 'react'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer.js';
import { useAllJobsContext } from '../pages/AllJobs';
import PageBtnContainer from './PageBtnContainer';


const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numberOfPages } = data;
  if(jobs.length === 0){
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5> 
      <div className="jobs">
        {
          jobs.map((job) => {
            return <Job key={job._id} {...job} />
          })
        }
      </div>
      {numberOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer
