import React, { useState } from "react";
import LoadForm from "./LoadForm"; 

export default function LoadFormContainer() {
  const [formData, setFormData] = useState({
    emailAddress:"",
    contactNumber:"",
    documents:"",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    deliveryDate: "",
    equipmentType: "",
    weight: "",
    dimensions: "",
    cargoDescription: "",
    targetRate: "",
    additionalNotes: "",
  });

  return (
    <div className="p-6">
      <LoadForm formData={formData} setFormData={setFormData} />
    </div>
  );  
}
