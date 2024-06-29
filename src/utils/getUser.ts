import { apiGet } from "./api"

export const getUser = async (dispatch: any, setUser: any) => {
    try {
      const res = await apiGet('auth/me')
      dispatch(setUser(res.data))
      return res.data;
    } catch(err) {
      console.log(err)
    }
}