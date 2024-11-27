const BE_URL = process.env.REACT_APP_BE_URL

export const loginUserUsingGoogle = () => {
  try {
    window.open(`${BE_URL}/api/auth/google/callback`, "_self")
  } catch (error) {
    console.log(error)
  }
}
