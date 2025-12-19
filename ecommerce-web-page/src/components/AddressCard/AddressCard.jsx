import React from 'react';

const AddressCard = ({ address }) => {
  if (!address) {
    return <p className="text-gray-500">Loading address...</p>; 
  }

  return (
    <div>
      <div className="space-y-3">
        <p className="font-semibold">
          {address.firstName + " " + address.lastName}
        </p>

        <p>
          {address.state}, {address.streetAddress}, {address.zipCode}
        </p>

        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p>{address.mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
