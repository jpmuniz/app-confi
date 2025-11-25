export function GuestUser({ id }) {
    return Object.freeze({
      id,
      role: "guest",
      name: "Guest User",
      isGuest: true
    });
  }
  