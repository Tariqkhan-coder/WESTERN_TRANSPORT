import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import ErrorMessage from "./ErrorMessage";
import { Textarea } from "@/components/ui/textarea";

import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validateZipCode,
  validateTruckType,
} from "@/pages/Auth/DriverSignupPage/driverValidation"; //

export function PersonalInformationStep({
  formData,
  setFormData,
  errors,
  setErrors,
}) {
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "firstName":
        error = validateFirstName(value);
        break;
      case "lastName":
        error = validateLastName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "zipCode":
        error = validateZipCode(value);
        break;
      case "truckType":
        error = validateTruckType(value);
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    return !error;
  };

  const handleBlur = (field, value) => {
    validateField(field, value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Step 1: Personal Information
      </h2>

      {/* First & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="firstName" className="text-sm font-medium text-text1">
            First Name *
          </Label>
          <Input
            id="firstName"
            value={formData.firstName || ""}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            onBlur={(e) => handleBlur("firstName", e.target.value)}
            className="mt-2"
            error={errors.firstName}
            placeholder="Enter first name"
          />
          {errors.firstName && <ErrorMessage message={errors.firstName} />}
        </div>
        <div>
          <Label htmlFor="lastName" className="text-sm font-medium text-text1">
            Last Name *
          </Label>
          <Input
            id="lastName"
            value={formData.lastName || ""}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            onBlur={(e) => handleBlur("lastName", e.target.value)}
            className="mt-2"
            error={errors.lastName}
            placeholder="Enter last name"
          />
          {errors.lastName && <ErrorMessage message={errors.lastName} />}
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="emailAddress" className="text-sm font-medium text-text1">
            Email Address *
          </Label>
          <Input
            id="emailAddress"
            type="email"
            value={formData.emailAddress || ""}
            onChange={(e) => handleInputChange("emailAddress", e.target.value)}
            onBlur={(e) => handleBlur("emailAddress", e.target.value)}
            className="mt-2"
            error={errors.emailAddress}
            placeholder="Enter email address"
          />
          {errors.emailAddress && <ErrorMessage message={errors.emailAddress} />}
        </div>
        <div>
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-text1">
            Phone Number *
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber || ""}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            onBlur={(e) => handleBlur("phoneNumber", e.target.value)}
            className="mt-2"
            error={errors.phoneNumber}
            placeholder="Enter phone number"
          />
          {errors.phoneNumber && <ErrorMessage message={errors.phoneNumber} />}
        </div>
      </div>

      {/* Address & Truck Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <Label
            htmlFor="streetAddress"
            className="text-sm font-medium text-text1"
          >
            Street Address
          </Label>
          <Input
            id="streetAddress"
            value={formData.streetAddress || ""}
            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
            className="mt-2"
            placeholder="Enter street address"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="truckType" className="text-sm font-medium text-text1">
            Truck Type
          </Label>
          <Input
            id="truckType"
            value={formData.truckType || ""}
            onChange={(e) => handleInputChange("truckType", e.target.value)}
            onBlur={(e) => handleBlur("truckType", e.target.value)}
            className="mt-2"
            placeholder="Enter truck name"
          />
        </div>
      </div>

      {/* Additional Notes */}
      <div className="mb-4">
        <Label
          htmlFor="additionalEquipmentNotes"
          className="text-sm font-medium text-text1"
        >
          Additional Equipment Notes
        </Label>
        <Textarea
          id="additionalEquipmentNotes"
          value={formData.additionalEquipmentNotes || ""}
          onChange={(e) => handleInputChange("additionalEquipmentNotes", e.target.value)}
          className="mt-2"
          placeholder="Add any additional equipment notes or details..."
          rows={6}
        />
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city" className="text-sm font-medium text-text1">
            City
          </Label>
          <Input
            id="city"
            value={formData.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="mt-2"
            placeholder="Enter city"
          />
        </div>
        <div>
          <Label htmlFor="state" className="text-sm font-medium text-text1">
            State
          </Label>
          <Input
            id="state"
            value={formData.state || ""}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="mt-2"
            placeholder="Enter state"
          />
        </div>

        <div>
          <Label htmlFor="zipCode" className="text-sm font-medium text-text1">
            ZIP Code
          </Label>
          <Input
            id="zipCode"
            value={formData.zipCode || ""}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            onBlur={(e) => handleBlur("zipCode", e.target.value)}
            className="mt-2"
            placeholder="Enter ZIP code"
          />
        </div>
      </div>
    </div>
  );
}
