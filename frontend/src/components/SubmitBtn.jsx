import React from 'react';
import { useNavigation } from 'react-router-dom';

const SubmitBtn = ({ formBtn, labelText }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'Submitting';
  return (
    <button type="submit" className={`btn btn-block ${formBtn && 'form-btn'}`} disabled={isSubmitting}>
        {isSubmitting? 'Submitting' : (labelText ? labelText : 'Submit')}
    </button>
  )
}

export default SubmitBtn
