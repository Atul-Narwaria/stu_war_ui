

const encryptUUID = (uuid:string) => {
  let base64 = btoa(uuid);
  return base64;
};

// Function to decrypt an encrypted UUID
const decryptUUID = (encryptedUUID:string|any) => {
  try {
    const originalUUID = atob(encryptedUUID);
    return originalUUID;
  } catch (error) {
    console.error('Error decrypting UUID:', error);
    return null;
  }
};

export { encryptUUID, decryptUUID };
