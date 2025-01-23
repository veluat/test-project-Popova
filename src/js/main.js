import './../css/styles.scss'
import {validateForm} from './validation.js'
import {sendFormData} from './api.js'
import IMask from 'imask'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form')
  const responseMessage = document.getElementById('response-message')
  const modal = document.getElementById('modal')
  const openModalBtn = document.getElementById('open-modal-btn')
  const closeModalBtn = document.getElementById('close-modal-btn')
  const closeModalButton = document.getElementById('close-modal')
  const emailInput = document.getElementById('email')
  const nameInput = document.getElementById('name')
  const phoneInput = document.getElementById('phone')
  const messageInput = document.getElementById('message')

  // Маска для телефона
  IMask(phoneInput, {
    mask: '+{375} (00) 000-00-00',
    lazy: true
  })

  // Функция для сброса ошибок
  const resetError = (inputField) => {
    const errorElement = inputField.nextElementSibling
    if (errorElement) {
      errorElement.textContent = ''
      inputField.classList.remove('error')
    }
  };

  // Обработка ввода в полях
  [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      resetError(input)
    })
  })

// Обработка отправки формы
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Индикатор загрузки, пока отрабатывает моковый запрос
    const loadingIndicator = document.getElementById("loading");
    loadingIndicator.style.display = "block";

    // Сброс ошибок
    const errorMessages = form.querySelectorAll(".error-message");
    errorMessages.forEach((el) => (el.textContent = ""));
    responseMessage.textContent = "";
    responseMessage.classList.remove("error-message", "success-message");

    // Валидация
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const validationErrors = validateForm(data);

    // Обработка ошибок валидации
    if (Object.keys(validationErrors).length > 0) {
      setTimeout(() => {
        loadingIndicator.style.display = "none";
        responseMessage.textContent = "Исправьте ошибки в форме.";
        responseMessage.classList.add("error-message");
        for (const [field, message] of Object.entries(validationErrors)) {
          const errorElement = form.querySelector(`#${field} ~ .error-message`);
          const inputField = form[field];
          if (errorElement) {
            errorElement.textContent = message;
            inputField.classList.add("error");
          }
        }
      }, 1000);
      return;
    }

    // Отправка данных
    const response = await sendFormData(data);
    responseMessage.classList.remove("error-message", "success-message");

    if (response.status === "error") {
      setTimeout(() => {
        loadingIndicator.style.display = "none";
        responseMessage.classList.add("error-message");
        responseMessage.textContent = "Ошибка на сервере.";
        for (const [field, message] of Object.entries(response.fields)) {
          const errorElement = form.querySelector(`#${field} ~ .error-message`);
          if (errorElement) {
            errorElement.textContent = message;
            form[field].classList.add("error");
          }
        }
      }, 1000);
    } else {
      loadingIndicator.style.display = "none";
      responseMessage.classList.remove("error-message");
      responseMessage.classList.add("success-message");
      responseMessage.textContent = response.msg;
      form.reset();

      // Сброс стилей ошибок
      const inputFields = form.querySelectorAll("input, textarea");
      inputFields.forEach((inputField) => {
        inputField.classList.remove("error");
      });
    }
  });

  // Модальное окно
  openModalBtn.addEventListener('click', () => {
    modal.classList.add('open')
  })

  // Функция для закрытия модального окна
  const closeModal = () => {
    modal.classList.remove('open')
  }

  // Обработчики событий для закрытия модального окна
  closeModalBtn.addEventListener('click', closeModal)
  closeModalButton.addEventListener('click', closeModal)
})