export const validateEmail = (email: string) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const result = regex.test(email);
  if(!result) {
    return true;
  }
  return false;
};