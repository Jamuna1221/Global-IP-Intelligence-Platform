export const login = (username, role) => {
  localStorage.setItem("user", JSON.stringify({ username, role }));
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getRole = () => {
  const user = getUser();
  return user ? user.role : null;
};
