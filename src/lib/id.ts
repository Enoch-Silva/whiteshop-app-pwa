export function createId(): string {
  // randomUUID só existe em contexto seguro (HTTPS ou localhost);
  // ao testar no telemóvel pelo IP da rede local, usa o fallback.
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}