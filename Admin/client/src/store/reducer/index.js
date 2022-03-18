import { combineReducers } from "redux";
import authReducer from "./login";
import vpnReducer from "./vpn";

const rootreducer = combineReducers({
  auth: authReducer,
  vpn: vpnReducer,
  // product: productReducer,
  // category: categoryReducer,
});

export default rootreducer;
