import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async({request}) =>{
  const formData = await request.formData();
  const file = formData.get('avatar');
  if(file && file.size > 500000){
    toast.error('Image size too large');
    return null;
  }
  try {
    await customFetch.patch('/users/update-user', formData);
    toast.success('Profile updated successful.');
  } catch (error) {
    // console.log(error);
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const Profile = () => {
  const {user} = useOutletContext();
  const {firstName, lastName, email, location} = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper className='shadow-med'>
      <Form method="post" className='form' encType='multipart/form-data'>
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className='form-label'>
              Select an image file (max 0.5 MB)
            </label>
            <input type="file" name="avatar" id="avatar" className='form-input' accept='image/*' />
          </div>
          {/* {File input} */}
          <FormRow type='text' name='firstName' labelText='First Name' defaultValue={firstName} />
          <FormRow type='text' name='lastName' labelText='Last Name' defaultValue={lastName} />
          <FormRow type='email' name='email' labelText='Email' defaultValue={email} />
          <FormRow type='text' name='location' labelText='Location' defaultValue={location} />
          <button type="submit" className='btn btn-block form-btn' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save Changes'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile
