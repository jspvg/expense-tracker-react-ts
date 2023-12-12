export const useGetUserInfo = () => {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  let userId, name, profilePicture, isAuth;

  if (auth) {
    ({ userId, name, profilePicture, isAuth } = auth);
  }

  return { userId, name, profilePicture, isAuth };
};
