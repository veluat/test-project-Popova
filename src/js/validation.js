const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PHONE_REGEXP = /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;

export function validateForm(data) {
  const errors = {};
  const { name, email, phone, message } = data;

  if (!name.trim()) {
    errors.name = "Имя обязательно.";
  }

  if (!email.trim()) {
    errors.email = "Email обязателен.";
  } else if (!EMAIL_REGEXP.test(email)) {
    errors.email = "Введите корректный email.";
  }

  if (!phone.trim()) {
    errors.phone = "Телефон обязателен.";
  } else if (!PHONE_REGEXP.test(phone)) {
    errors.phone = "Введите корректный номер телефона.";
  }

  if (!message.trim()) {
    errors.message = "Сообщение обязательно.";
  }

  return errors;
}