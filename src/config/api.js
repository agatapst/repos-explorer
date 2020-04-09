export const API_ROOT = 'https://api.github.com';

export const searchUsersUrl = (username) => `${API_ROOT}/search/users?q=${username}`;
