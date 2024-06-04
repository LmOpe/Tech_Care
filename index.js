// Function to encode credentials in Base64
function encodeCredentials(username, password) {
  const credentials = `${username}:${password}`;
  return btoa(credentials);
}

const username = "coalition";
const password = "skills-team";
const encodedCredentials = encodeCredentials(username, password);
