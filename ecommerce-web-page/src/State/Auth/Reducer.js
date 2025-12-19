import { REGISTER_REQUEST  ,
  GET_USER_REQUEST,
  LOGIN_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  GET_USER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_FAILURE,
  GET_USER_FAILURE,
  LOGOUT} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    // -------------------------
    // REQUEST CASES
    // -------------------------
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };

    // -------------------------
    // SUCCESS CASES
    // -------------------------
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        jwt: action.payload?.jwt || null,
        error: null
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        jwt: action.payload?.jwt || null,
        error: null
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null
      };

    // -------------------------
    // FAILURE CASES
    // -------------------------
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return { 
        ...state, 
        isLoading: false, 
        error: action.payload 
      };

    // -------------------------
    // LOGOUT
    // -------------------------
    case LOGOUT:
      return {
        ...state,
        user: null,
        jwt: null,
        isLoading: false,
        error: null
      };

    // -------------------------
    default:
      return state;
  }
};
