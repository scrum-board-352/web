import rlax from "rlax";

export function clearUserState() {
  rlax.clear();
  window.localStorage.clear();
}
