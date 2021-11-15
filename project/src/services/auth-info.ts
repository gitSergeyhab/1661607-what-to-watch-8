const AUTH_TOKEN_KEY = 'what-to-watch-token';
const USER_EMAIL_KEY = 'what-to-watch-email';
const USER_AVATAR_KEY = 'what-to-watch-avatar';


const getToken = (): string => localStorage.getItem(AUTH_TOKEN_KEY) ?? '';
const saveToken = (token: string): void => localStorage.setItem(AUTH_TOKEN_KEY, token);
const removeToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY);

const getUserEmail = (): string => localStorage.getItem(USER_EMAIL_KEY) ?? '';
const saveUserEmail = (userEmail: string): void => localStorage.setItem(USER_EMAIL_KEY, userEmail);
const removeUserEmail = (): void => localStorage.removeItem(USER_EMAIL_KEY);

const getAvatar = (): string => localStorage.getItem(USER_AVATAR_KEY) ?? '';
const saveAvatar = (avatar: string): void => localStorage.setItem(USER_AVATAR_KEY, avatar);
const removeAvatar = (): void => localStorage.removeItem(USER_AVATAR_KEY);


export {
  getUserEmail,
  saveUserEmail,
  removeUserEmail,
  getToken,
  saveToken,
  removeToken,
  getAvatar,
  saveAvatar,
  removeAvatar
};
