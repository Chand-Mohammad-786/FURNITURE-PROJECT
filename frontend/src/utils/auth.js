// ================================
// Auth Utility Functions
// ================================

// Save token to localStorage
export const saveToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem("authToken");
};

// Get saved token
export const getToken = () => {
  return localStorage.getItem("authToken");
};

//  Correct & Safe JWT Decode Function
export const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

// Check if token is valid
export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;

  const decoded = parseJwt(token);
  if (!decoded) return false;

  if (decoded.exp) {
    return decoded.exp > Math.floor(Date.now() / 1000);
  }

  return true;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return isTokenValid();
};
