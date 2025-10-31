import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
} from "./driverValidation";

export const driverStepValidaton = (formData, currentStep, setErrors) => {
  const newErrors = {};

  switch (currentStep) {
    case 1:
      const firstNameError = validateFirstName(formData.firstName || "");
      if (firstNameError) newErrors.firstName = firstNameError;

      const lastNameError = validateLastName(formData.lastName || "");
      if (lastNameError) newErrors.lastName = lastNameError;

      const emailError = validateEmail(formData.emailAddress || "");
      if (emailError) newErrors.emailAddress = emailError;

      const phoneError = validatePhone(formData.phoneNumber || "");
      if (phoneError) newErrors.phoneNumber = phoneError;
      break;

    case 2:
      // const truckError = validateTruckType(formData.truckType || "");
      // if (truckError) newErrors.truckType = truckError;
      break;

    default:
      break;
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
