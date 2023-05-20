import React from 'react';
import { useSelector } from 'react-redux';

const FormDataTable = () => {
  const formData = useSelector((state) => state.formData);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Date of Birth</th>
          <th>Phone Number</th>
          {/* ... */}
        </tr>
      </thead>
      <tbody>
        {formData.map((data, index) => (
          <tr key={index}>
            <td>{data.name}</td>
            <td>{data.age}</td>
            <td>{data.dob}</td>
            <td>{data.phone}</td>
            {/* ... */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FormDataTable;
