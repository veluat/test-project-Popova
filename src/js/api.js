import { validateForm } from './validation.js';

export async function sendFormData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const errors = validateForm(data);

      if (Object.keys(errors).length > 0) {
        resolve({
          status: "error",
          fields: errors,
        });
      } else {
        resolve({
          status: "success",
          msg: "Ваша заявка успешно отправлена",
        });
      }
    }, 1000);
  });
}