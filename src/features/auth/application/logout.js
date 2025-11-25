import { authService } from "../infra/authService";

export function logout({ service = authService } = {}) {
  service.logout();
}

