import { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import "./App.css";
import { RootRouter } from "./router";
import { IUser } from "./types/auth";
import { getUser } from "./api/auth";
import { Preloader } from "./components/Preloader";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export const Context = createContext<{
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  user: IUser | null;
  setUser: (value: IUser | null) => void;
}>({
  isDark: false,
  setIsDark: () => {},
  user: null,
  setUser: (value: IUser | null) => {},
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
  const [user, setUser] = useState<IUser | null>(null);
  const [isReady, setIsReady] = useState(!access);

  useEffect(() => {
    let isOk = true;

    if (access) {
      getUser()
        .then((response) => {
          if (response.ok) {
            isOk = true;
          } else {
            isOk = false;
          }
          return response.json();
        })
        .then((json) => {
          if (isOk) {
            setUser(json);
          }
        })
        .finally(() => {
          setIsReady(true);
        });
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
            {isReady ? <RootRouter /> : <Preloader />}
          </Context.Provider>
          <NotificationContainer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
