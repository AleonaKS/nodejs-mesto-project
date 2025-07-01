export enum ErrorMessages {
  USER_NOT_FOUND_ERROR = 'Запрашиваемый пользователь не найден',
  BAD_REQUEST_ERROR = 'Необходимо заполнить все поля',
  LOGIN_SUCCESS_MESSAGE = 'Авторизация прошла успешно',
  LOGOUT_SUCCESS_MESSAGE = 'Выход из системы прошёл успешно',
  USER_ALREADY_EXISTS_ERROR = 'Пользователь с таким email уже существует',
  UNAUTHORIZED_ERROR = 'Необходима авторизация',
  CARD_NOT_FOUND_ERROR = 'Карточка не найдена',
  DELETE_CARD_RESPONSE = 'Карточка удалена',
  FORBIDDEN_ERROR = 'Вы не можете удалить эту карточку',
  PAGE_NOT_FOUND_ERROR = 'Страница не найдена',
}

export const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';


export enum UserDefaults {
  EMAIL_ERROR_MESSAGE = 'Некорректный email',
  DEFAULT_NAME = 'Жак-Ив Кусто',
  DEFAULT_ABOUT = 'Исследователь',
  DEFAULT_AVATAR = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604387756.png',
}

export const urlPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
