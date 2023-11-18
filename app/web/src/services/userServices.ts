export function getUserID() {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userObject = JSON.parse(storedUser);
    return userObject._id;
  }
}
export function getBearerToken() {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userObject = JSON.parse(storedUser);
    return userObject.token;
  }
}
