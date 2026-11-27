const API_URL = import.meta.env.VITE_API_URL || "https://saludamepo-neon.onrender.com/api";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "/login";
    throw new Error("Tu sesión ha expirado. Inicia sesión nuevamente.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `Error ${response.status} en el servidor`);
  }

  if (response.status === 204) return null;

  return response.json();
}