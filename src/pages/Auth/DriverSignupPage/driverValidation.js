export const validateFirstName = (name) => {
  if (!name.trim()) return "First name is required";
  return "";
};

export const validateLastName = (name) => {
  if (!name.trim()) return "Last name is required";
  return "";
};

export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};

export const validatePhone = (phone) => {
  if (!phone.trim()) return "Phone number is required";
  const phoneRegex =
    /^(\+?\d{1,4}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/;
  if (!phoneRegex.test(phone.trim()))
    return "Please enter a valid phone number";
  return "";
};

export const validateZipCode = (zip) => {
  if (!zip) return "";
  const zipRegex = /^\d{5}(-\d{4})?$/;
  if (!zipRegex.test(zip)) return "Please enter a valid ZIP code";
  return "";
};

export const validateTruckType = (truckType) => {
  if (!truckType.trim()) return "Truck type is required";
  return "";
};

export const validateEmailRegex = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneRgex = (phone) => {
  const phoneRegex =
    /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d\s]{6,15}$/;
  return phoneRegex.test(phone.trim());
};
