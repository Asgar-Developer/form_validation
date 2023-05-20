import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFormData } from '../actions/formDataActions';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    phone: '',
    addresses: [''],
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleAddressChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const addresses = [...prevFormData.addresses];
      addresses[index] = value;
      return { ...prevFormData, addresses };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(addFormData(formData));
      setFormData({
        name: '',
        age: '',
        dob: '',
        phone: '',
        addresses: [''],
        password: '',
        confirmPassword: '',
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleAddAddress = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      addresses: [...prevFormData.addresses, ''],
    }));
  };

  const handleRemoveAddress = (index) => {
    setFormData((prevFormData) => {
      const addresses = [...prevFormData.addresses];
      addresses.splice(index, 1);
      return { ...prevFormData, addresses };
    });
  };

  const validateFormData = (data) => {
    const errors = {};

    // Name validation
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.length > 20) {
      errors.name = 'Name cannot exceed 20 characters';
    } else if (!/^[a-zA-Z ]+$/.test(data.name)) {
      errors.name = 'Name can only contain letters and spaces';
    }

    // Age validation
    if (!data.age) {
      errors.age = 'Age is required';
    } else if (data.age < 0) {
      errors.age = 'Age cannot be negative';
    }

    // Date of birth validation
     if (!data.dob) {
      errors.dob = 'Date of birth is required';
    } else {
      const today = new Date();
      const selectedDate = new Date(data.dob);
      if (selectedDate > today) {
        errors.dob = "Date of birth can't be in the future";
      }
    }

    // Phone number validation
    if (!data.phone.trim()) {
  errors.phone = 'Phone number is required';
} else if (!/^[0-9]{8,10}$/.test(data.phone)) {
  errors.phone = 'Phone number should be 8-10 digits';
}

    // Address validation
    data.addresses.forEach((address, index) => {
      if (!address.trim()) {
        errors[`address${index}`] = 'Address is required';
      }
    });

    // Password validation
    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }

    // Confirm password validation
    if (!data.password.trim()) {
  errors.password = 'Password is required';
} else if (data.password.length < 8) {
  errors.password = 'Password should be at least 8 characters long';
} else if (!/\d/.test(data.password)) {
  errors.password = 'Password should contain at least one digit';
} else if (!/[a-zA-Z]/.test(data.password)) {
  errors.password = 'Password should contain at least one letter';
}

    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name field */}
      <div>
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

      {/* Age field */}
      <div>
        <label htmlFor="age">Age*</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          required
        />
        {errors.age && <p>{errors.age}</p>}
      </div>

      {/* Date of birth field */}
      <div>
        <label htmlFor="dob">Date of Birth*</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />
        {errors.dob && <p>{errors.dob}</p>}
      </div>

      {/* Phone number field */}
      <div>
        <label htmlFor="phone">Phone Number*</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        {errors.phone && <p>{errors.phone}</p>}
      </div>

      {/* Address fields */}
      {formData.addresses.map((address, index) => (
        <div key={index}>
          <label htmlFor={`address${index}`}>Address*</label>
          <input
            type="text"
            id={`address${index}`}
            name="address"
            value={address}
            onChange={(e) => handleAddressChange(e, index)}
            required
          />
          {index > 0 && (
            <button type="button" onClick={() => handleRemoveAddress(index)}>
              -
            </button>
          )}
          {errors[`address${index}`] && <p>{errors[`address${index}`]}</p>}
        </div>
      ))}
      <button type="button" onClick={handleAddAddress}>
        +
      </button>

      {/* Password field */}
      <div>
        <label htmlFor="password">Password*</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      {/* Confirm Password field */}
      <div>
        <label htmlFor="confirmPassword">Confirm Password*</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
