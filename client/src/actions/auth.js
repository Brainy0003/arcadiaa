import axios from "axios";
import jwt from "jsonwebtoken";
import store, { flash } from "../configureStore";

export const SIGNOUT = "SIGNOUT";
export const AUTH_USER = "AUTH_USER";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const token = localStorage.getItem("jwt");
if (token) {
  axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
  store.dispatch({
    type: AUTH_USER,
    user: jwt.decode(token)
  });
}

/* signup */

export const signup = ({
  username,
  password,
  passwordVerification
}) => dispatch => {
  axios
    .post("/api/auth/signup", {
      username,
      password,
      passwordVerification
    })
    .then(response => {
      const token = response.data;
      localStorage.setItem("jwt", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch({
        type: AUTH_USER,
        user: jwt.decode(token)
      });
      flash("Bienvenue!");
    })
    .catch(error => {
      dispatch({
        type: AUTH_FAILURE,
        errors: error.response.data
      });
    });
};

/* signin */

export const signin = ({ username, password }) => dispatch => {
  axios
    .post("/api/auth/signin", {
      username,
      password
    })
    .then(response => {
      const token = response.data;
      localStorage.setItem("jwt", token);
      axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
      dispatch({
        type: AUTH_USER,
        user: jwt.decode(token)
      });
      flash("Bonjour!");
    })
    .catch(error => {
      dispatch({
        type: AUTH_FAILURE,
        errors: error.response.data
      });
    });
};

/* signout */

export const signout = () => {
  localStorage.removeItem("jwt");
  delete axios.defaults.headers.common["Authorization"];
  flash("Au revoir!");
  return {
    type: SIGNOUT
  };
};

/* clear errors */

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});
