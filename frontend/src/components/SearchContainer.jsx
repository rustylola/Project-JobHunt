import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from '../../../backend/utils/constants.js';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const {searchValues} = useAllJobsContext();
  const {search, jobStatus, jobType, sort} = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) =>{
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    }
  }

  return (
    <Wrapper className='shadow-med'>
      <Form className='form'>
        <h5 className="form-title">
          Search Form
        </h5>
        <div className="form-center">
          <FormRow type='search' name='search' labelText='Search' defaultValue={search}
                         onChange={debounce((form)=>{
                          submit(form);
                         })} />
          <FormRowSelect labelText='Job Status' name='jobStatus' 
                         list={['all',...Object.values(JOB_STATUS)]} defaultValue={jobStatus} 
                         onChange={(e)=>{
                          submit(e.currentTarget.form);
                         }}/>
          <FormRowSelect labelText='Job Type' name='jobType' 
                         list={['all',...Object.values(JOB_TYPE)]} defaultValue={jobType}  
                         onChange={(e)=>{
                          submit(e.currentTarget.form);
                         }}/>
          <FormRowSelect name='sort' defaultValue={sort} 
                         list={[...Object.values(JOB_SORT_BY)]} 
                         onChange={(e)=>{
                          submit(e.currentTarget.form);
                         }}/>
          <Link to='/dashboard/alljobs' className='btn form-btn delete-btn'>
            Reset Filter
          </Link>
          {/* TEMP */}
          {/* <SubmitBtn formBtn labelText='Search' /> */}
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer
