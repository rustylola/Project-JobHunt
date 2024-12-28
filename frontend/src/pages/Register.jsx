import React from 'react'
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo } from '../components'
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) =>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try{
    await customFetch.post('/auth/register', data);
    toast.success('Registration Successful');
    return redirect('/login');
  } catch (error){
      // console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  // console.log(navigation);
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className="form">
        <Logo />
        <h4>Register Account</h4>
        <FormRow type='text' name='firstName' labelText='First Name' defaultValue='' />
        <FormRow type='text' name='lastName' labelText='Last Name' defaultValue='' />
        <FormRow type='text' name='location' labelText='Location' defaultValue='' />
        <FormRow type='email' name='email' labelText='Email' defaultValue='' />
        <FormRow type='password' name='password' labelText='Password' defaultValue='' />
        <FormRow type='password' name='confirmpassword' labelText='Confirm Password' defaultValue='' />
        <button type="submit" className='btn btn-block' disabled={isSubmitting} >
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>Login Account</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
