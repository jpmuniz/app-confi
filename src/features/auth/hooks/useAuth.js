import { useState, useEffect, useCallback } from "react";
import { authenticateGuest } from "../application/authenticateGuest";
import { logout as logoutUseCase } from "../application/logout";

export function useAuth({
  authenticate = authenticateGuest,
  logoutUser = logoutUseCase
} = {}) {
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const guest = await authenticate();
        if (!cancelled) {
          setUser(guest);
        }
      } catch (err) {
        console.error("useAuth::authenticate failed", err);
      } finally {
        if (!cancelled) {
          setInitialized(true);
        }
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [authenticate]);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, [logoutUser]);

  return {
    user,
    isAuthenticated: Boolean(user),
    initialized,
    logout
  };
}
