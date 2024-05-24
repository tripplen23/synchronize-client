import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/layouts";
import { useAppDispatch, useAppSelector } from "./redux/utils/hooks";
import { getAuthProfile } from "./redux/features/auth/authSlice";
import { getCartByUserId } from "./redux/features/newCart/cartSlice";

function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getAuthProfile()).then((resultAction) => {
        if (getAuthProfile.fulfilled.match(resultAction)) {
          const user = resultAction.payload;
          if (user) {
            dispatch(getCartByUserId(user.id));
          }
        }
      });
    }
  }, [token, dispatch]);

  return (
    <div>
      <Layout></Layout>
    </div>
  );
}

export default App;
