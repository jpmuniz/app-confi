import { authService } from "../infra/authService";

export async function authenticateGuest({ service = authService } = {}) {
  let guest = service.validateToken();
  if (guest) return guest;

  const newId = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  service.generateTokenForGuest(newId);
  guest = service.validateToken();

  if (!guest) {
    throw new Error("Unable to authenticate guest user");
  }

  return guest;
}
