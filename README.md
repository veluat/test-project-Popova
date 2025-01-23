#  Тест формы (javascript ES6-ES12, scss, webpack)

## Описание:

Этот проект реализует форму для отправки данных, которая включает в себя валидацию и обработку ошибок.

## Основные функции:

- **Моковый запрос:** При отправке формы данные имитируют отправку на сервер с помощью мокового запроса. Это позволяет
  протестировать функциональность без необходимости взаимодействия с реальным сервером.
- **Валидация формы:** Перед отправкой данных выполняется валидация, которая проверяет корректность введенных данных.
  Если есть ошибки, они отображаются рядом с соответствующими полями.
- **Индикатор загрузки:** При отправке формы отображается индикатор загрузки, который показывает пользователю, что
  данные обрабатываются. Индикатор скрывается после завершения обработки.
- **Обработка ответов:** После отправки данных отображается сообщение об успехе или ошибке. Если произошла ошибка,
  пользователю будет показано соответствующее сообщение.

## Использование

**Клонируйте репозиторий:**

```bash
git clone https://github.com/veluat/test-project-Popova.git
```

Откройте файл index.html в браузере.

Заполните форму и нажмите кнопку отправки.

Проверьте сообщения об ошибках или успешной отправке.