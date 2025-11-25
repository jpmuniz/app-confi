import { authService } from "../infra/authService";

/**
 * Retorna um usuário convidado autenticado. Reutiliza o token existente ou
 * gera um novo caso não exista/esteja inválido.
 */
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
