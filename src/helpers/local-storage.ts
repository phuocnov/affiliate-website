export const isServer = !process.browser;

export const TOKEN_NAME = "_ut.lw";
export const BO_RANK = "_b_r";
export const PLATFORM_SETTING = "_b_s";

export const saveToken = (token: string): void | null =>
  !isServer && token ? localStorage.setItem(TOKEN_NAME, token) : null;
export const getToken = (): string | null =>
  !isServer ? localStorage.getItem(TOKEN_NAME) : null;
export const removeToken = (): void | null =>
  !isServer ? localStorage.removeItem(TOKEN_NAME) : null;
