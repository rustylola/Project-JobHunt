import React from 'react'
import { Link, Form, redirect, useNavigation, useActionData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Logo, FormRow } from '../components'
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = {msg: ''};
  if(data.password.length < 3){
    errors.msg = 'Password too short'
    return errors;
  }
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful.');
    return redirect('/dashboard');
  } catch (error) {
    // toast.error(error?.response?.data?.msg);
    errors.msg = error?.response?.data?.msg;
    // return error;
    return errors;
  }
};

const Login = () => {

  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'Submitting';
  const navigate = useNavigate();
  const loginDemoUser = async () =>{
    const data = {
      email: 'demo@test.com',
      password: 'secret123'
    }
    try {
      await customFetch.post('/auth/login', data);
      toast.success('Demo on rolling...');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  }

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login Account</h4>
        {errors?.msg && <div className='alert alert-danger text-center' role='alert'><strong>{errors.msg}</strong></div> }
        <FormRow type='email' name='email' labelText='Email' defaultValue='' />
        <FormRow type='password' name='password' labelText='Password' defaultValue='' />
        <button type="submit" className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <button type="button" className='btn btn-block' onClick={loginDemoUser}>Demo App</button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register Account
          </Link> 
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
