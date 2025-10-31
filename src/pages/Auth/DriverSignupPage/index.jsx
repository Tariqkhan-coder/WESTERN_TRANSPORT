import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from "@/components/SectionTitle";
import ProgressIndicator from "./ProgressIndicator";
import FormSteps from "./FormSteps";
import { driverStepValidaton } from "./driverStepValidation";
import { toast } from "react-toastify";
import { driverService } from "../../../services/fetchData";

const steps = [
  { id: 1, title: "Personal Information", subtitle: "Basic contact details" },
  { id: 2, title: "Document Upload", subtitle: "Required certificates and licenses" },
];

function DriverSignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleStepSubmit = async (e) => {
    e.preventDefault();

    try {
      const isValid = driverStepValidaton(formData, currentStep, setErrors);
      if (!isValid) return;

      // ---------------------
      // STEP 1 - Create Driver
      // ---------------------
      if (currentStep === 1) {
        const payload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.emailAddress,
          phoneNumber: formData.phoneNumber,
          streetAddress: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          additionalEquipmentNotes: formData.additionalEquipmentNotes,
          truckType: formData.truckType,
        };

        const res = await driverService.createDriver(payload);
        console.log("✅ Driver create response:", res);

        // Handle conflict (existing user)
        if (res?.responseCode === 409) {
          toast.info("Driver already exists. Please use a new email address.");
          return;
        }

        // Handle success
        const driverId =
          res?.data?.driverId ||
          res?.data?.DriverId ||
          res?.driverId ||
          res?.DriverId ||
          null;

        if (driverId) {
          setFormData((prev) => ({ ...prev, driverId }));
          console.log("🔹 Driver ID obtained:", driverId);
          toast.success("Driver created successfully!");
          setCurrentStep(2);
        } else {
          toast.error("Driver ID not found in server response.");
          console.warn("⚠️ Missing driverId in response:", res);
        }
      }

      // ---------------------
      // STEP 2 - Upload Docs
      // ---------------------
      else if (currentStep === 2) {
        if (!formData.driverId) {
          toast.error("Driver ID missing. Please complete Step 1 first.");
          return;
        }

        const files = formData.documents || [];
        if (files.length === 0) {
          toast.error("Please upload at least one document.");
          return;
        }

        const uploadFormData = new FormData();
        uploadFormData.append("DriverId", formData.driverId);
        files.forEach((file) => uploadFormData.append("Images", file));

        const uploadRes = await driverService.uploadDocuments(uploadFormData);
        console.log("📄 Upload Response:", uploadRes);

        if (uploadRes?.responseCode === 200) {
          toast.success("Documents uploaded successfully!");
          setCurrentStep(3);
        } else {
          toast.error(uploadRes?.errorMessage || "Upload failed.");
        }
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Unknown error occurred";
      toast.error(`Error: ${errorMessage}`);
      console.error("❌ Driver Registration Error:", err);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  return (
    <div className="min-h-screen py-8 px-2.5">
      <form onSubmit={handleStepSubmit} className="max-w-4xl mx-auto">
        <SectionTitle
          title="Driver Registration"
          paragraph="Complete all steps to join our network of professional drivers"
          center
          width="665px"
          showIcon={true}
        />

        <ProgressIndicator currentStep={currentStep} steps={steps} />

        <Card className="bg-bg2 shadow-sm">
          <CardContent className="p-4 md:p-8">
            <FormSteps
              currentStep={currentStep}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />

            <div className="flex justify-between pt-8 mt-8 border-t border-white/30">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-6"
              >
                Previous
              </Button>

              <Button type="submit" variant="secondary" className="px-6">
                {currentStep === steps.length ? "Finish" : "Next / Submit Step"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default DriverSignupPage;







