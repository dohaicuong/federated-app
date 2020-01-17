export default {
  Query: {
    isAuth: () => Boolean(localStorage.ACCESS_TOKEN)
  }
}