const successAlert = (toast: any, message: string) => {
  toast({
    status: 'success',
    title: message,
    duration: 2000,
    position: 'top',
    isClosable: true,
  });
};
const errorAlert = (toast: any, message: string) => {
  toast({
    status: 'error',
    title: message,
    duration: 2000,
    position: 'top',
  });
};

export { successAlert, errorAlert };
