export const convertAuthErrorMessage = (error) => {
  switch (error) {
    case 'auth/invalid-login-credentials':
      return 'Email or password is incorrect'
    case 'auth/user-not-found':
      return 'That account does not exist'
    case 'auth/wrong-password':
      return 'Email or password is incorrect'
    default:
      return 'Something went wrong'
  }
}

export const convertUploadErrorMessage = (error) => {
  switch (error) {
    case 'auth/invalid-login-credentials':
      return 'Email or password is incorrect'
    case 'auth/user-not-found':
      return 'That account does not exist'
    case 'auth/wrong-password':
      return 'Email or password is incorrect'
    default:
      return 'Something went wrong'
  }
}
