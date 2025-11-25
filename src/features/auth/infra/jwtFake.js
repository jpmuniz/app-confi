function base64url(str) {
    return btoa(str)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
}
  
export function createFakeJWT(payload) {
    const header = { alg: "HS256", typ: "JWT" };
  
    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));
  
    const signature = base64url("fake-signature-key");
  
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}
  
export function decodeFakeJWT(token) {
    try {
      const [, payload] = token.split(".");
      const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(json);
    } catch (err) {
      return null;
    }
}
  