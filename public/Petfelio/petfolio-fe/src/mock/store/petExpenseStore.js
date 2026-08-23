// Shared mutable store for pet expense overrides.
// Tracks transactions where isPetExpense has been changed via the PATCH API.

const overrides = {};

export function setPetExpense(transactionId, isPetExpense) {
  overrides[transactionId] = isPetExpense;
}

export function getPetExpense(transactionId, defaultValue) {
  if (transactionId in overrides) return overrides[transactionId];
  return defaultValue;
}
