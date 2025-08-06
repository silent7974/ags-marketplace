export function createSellerModel(data) {
  const {
    fullName,
    email,
    phone,
    passwordHash,
    category,
    sellerType, // "normal" or "premium"
    createdAt = new Date(),
  } = data;

  return {
    fullName,
    email,
    phone,
    passwordHash,
    category,
    sellerType,
    createdAt,
  };
}