import { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import "./App.css";
import { RootRouter } from "./router";
import { Preloader } from "./components/Preloader";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { auth } from "./config/firebase";
import logging from "./config/logging";

export const Context = createContext<{
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  user: boolean;
  setUser: (value: boolean) => void;
}>({
  isDark: false,
  setIsDark: () => {},
  user: false,
  setUser: () => {},
});

const access = localStorage.getItem("access");

const getInitialTheme = () => {
  const isDark = localStorage.getItem("isDark");
  if (isDark) {
    return JSON.parse(isDark);
  }
  return false;
};

function App() {
  const [isDark, setIsDark] = useState(getInitialTheme());
  const [user, setUser] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        logging.info("User detected.");
      } else {
        logging.info("No user detected.");
      }
      setIsReady(false);
    });
  }, []);
  useEffect(() => {
    let isOk = true;

    if (access) {
      setUser(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isDark", String(isDark));
  }, [isDark]);
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Context.Provider
            value={{ isDark: isDark, setIsDark: setIsDark, user, setUser }}
          >
            {isReady ? <Preloader /> : <RootRouter />}
          </Context.Provider>
          <NotificationContainer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
