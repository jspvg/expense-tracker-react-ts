export const useGetUserInfo = () => {
  const { userId, name, profilePicture, isAuth } = JSON.parse(
    localStorage.getItem("auth")!
  );

  return { userId, name, profilePicture, isAuth };
};
