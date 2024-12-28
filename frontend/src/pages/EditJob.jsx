import { FormRow, FormRowSelect, SubmitBtn} from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../backend/utils/constants.js';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) =>{
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/alljobs');
  }
};

export const action = async ({ request, params }) =>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success('Job edited successful.');
    return redirect('/dashboard/alljobs');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditJob = () => {
  const { job } = useLoaderData();
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow type='text' name='position' labelText='Position' defaultValue={job.position} />
          <FormRow type='text' name='company' labelText='Comapny' defaultValue={job.company} />
          <FormRow type='text' name='jobLocation' labelText='Job Location' defaultValue={job.jobLocation} />
          <FormRowSelect name='jobStatus' labelText='Job Status' defaultValue={job.jobStatus} 
                         list={Object.values(JOB_STATUS)} />
          <FormRowSelect name='jobType' labelText='Job Type' defaultValue={job.jobType} 
                         list={Object.values(JOB_TYPE)} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob
