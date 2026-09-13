import {
  validatePublicEmail,
  validatePublicName,
  validatePublicPhone,
} from "./contextForm";

export const validateBookingForm = (
  values
) => {
  const errors = {
    name: validatePublicName(
      values.name
    ),

    email: validatePublicEmail(
      values.email
    ),

    phone: validatePublicPhone(
      values.phone
    ),
  };

  return {
    errors,

    isValid:
      Object.values(errors).every(
        (error) => !error
      ),
  };
};