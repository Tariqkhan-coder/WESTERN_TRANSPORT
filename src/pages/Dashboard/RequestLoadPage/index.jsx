import React, { useState, useEffect } from "react";
import { animate } from "motion";
import { toast } from "react-toastify";
import { loadService } from "../../../services/fetchData"; // ✅ Use centralized service
import LoadForm from "./LoadForm";
import Sidebar from "./Sidebar";
import SectionTitle from "@/components/SectionTitle";

export default function RequestLoadPage() {
  const [formData, setFormData] = useState({
    emailAddress: "",
    contactNumber: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    deliveryDate: "",
    equipmentType: "",
    weight: "",
    dimensions: "",
    description: "",
    documents: "",
    targetRate: "",
    additionalNotes: "",
  });

  useEffect(() => {
    animate("main", { opacity: [0, 1], y: [-30, 0] }, { duration: 0.8 });
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📦 Submitted Load Data:", formData);

    try {

      const payload = {
        emailAddress: formData.emailAddress,
        contactNumber: formData.contactNumber,
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
        pickupDate: formData.pickupDate,
        deliveryDate: formData.deliveryDate,
        equipmentType: formData.equipmentType,
        weight: formData.weight,
        dimensions: formData.dimensions,
        description: formData.description,
        documents: formData.documents,
        targetRate: formData.targetRate,
        additionalNotes: formData.additionalNotes,
      };

      const res = await loadService.requestLoad(payload);
      const successMsg =
        res?.message ||
        res?.responseMessage ||
        "✅ Load request submitted successfully!";
      toast.success(successMsg);

      console.log("✅ Load request successful:", res);

      // Clear form
      setFormData({
        emailAddress: "",
        contactNumber: "",
        pickupLocation: "",
        dropoffLocation: "",
        pickupDate: "",
        deliveryDate: "",
        equipmentType: "",
        weight: "",
        dimensions: "",
        description: "",
        documents: "",
        targetRate: "",
        additionalNotes: "",
      });
    } catch (err) {
      console.error("❌ Error submitting load request:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Unknown error occurred";
      toast.error(`Error: ${errorMsg}`);
    }
  };

  return (
    <div className="min-h-screen w-full px-6 py-8 sm:px-10 lg:px-20 font-sans text-white">
      <SectionTitle
        title="Request a Load"
        paragraph="Fill out the details below and we'll match you with available carriers"
        center
        mb="40px"
      />

      <main className="flex flex-col lg:flex-row gap-8">
        <form onSubmit={handleSubmit} className="flex-1 p-6 rounded-2xl">
          {/* ✅ Pass correct prop names */}
          <LoadForm formData={formData} handleChange={handleChange} />
        </form>

        <div className="w-full lg:w-1/3">
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
