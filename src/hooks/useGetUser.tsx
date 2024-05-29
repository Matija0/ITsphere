export const useGetUser = () => {
  const user = window.localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
