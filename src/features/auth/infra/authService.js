import { GuestUser } from "../domain/GuestUser.js";
import { createFakeJWT, decodeFakeJWT } from "./jwtFake.js";

const TOKEN_KEY = "auth_token";
const DEFAULT_EXPIRATION_MS = 24 * 60 * 60 * 1000;

const isStorageValid = (storage) =>
  storage &&
  typeof storage.getItem === "function" &&
  typeof storage.setItem === "function" &&
  typeof storage.removeItem === "function";

const getDefaultStorage = () => {
  if (typeof window === "undefined") return null;
  return isStorageValid(window.localStorage) ? window.localStorage : null;
};

export function createAuthService({
  storage = getDefaultStorage(),
  expirationMs = DEFAULT_EXPIRATION_MS
} = {}) {
  const resolvedStorage = isStorageValid(storage)
    ? storage
    : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
      };

  const persistToken = (token) => {
    resolvedStorage.setItem(TOKEN_KEY, token);
  };

  const readToken = () => resolvedStorage.getItem(TOKEN_KEY);
  const clearToken = () => resolvedStorage.removeItem(TOKEN_KEY);

  const generateTokenForGuest = (id) => {
    if (!id) throw new Error("guest id is required");

    const payload = {
      id,
      role: "guest",
      exp: Date.now() + expirationMs
    };

    const token = createFakeJWT(payload);
    persistToken(token);
    return token;
  };

  const getToken = () => readToken();
  const logout = () => clearToken();

  const validateToken = () => {
    const token = readToken();
    if (!token) return null;

    let payload;
    try {
      payload = decodeFakeJWT(token);
    } catch (err) {
      clearToken();
      return null;
    }

    if (!payload || Date.now() > payload.exp) {
      clearToken();
      return null;
    }

    return GuestUser({ id: payload.id });
  };

  return {
    generateTokenForGuest,
    getToken,
    logout,
    validateToken
  };
}

export const authService = createAuthService();
