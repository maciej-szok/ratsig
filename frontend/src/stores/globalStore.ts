import {createRoot} from "solid-js";
import {createStore} from "solid-js/store";

import {User} from "../types/user.ts";
import {Auth} from "../types/auth.ts";

type GlobalStoreData = {
  auth?: Auth;
  user?: User;
  selectedDate?: Date;
}

type GlobalStore = {
  data: GlobalStoreData;
  isAuthenticated: boolean;
}


function createGlobalStore() {
  const [appState, setAppState] = createStore<GlobalStore>({
    data: {
      selectedDate: new Date(),
    },
    get isAuthenticated() {
      return !!this.data.auth;
    }
  });

  const authenticate = (auth: Auth, user?: User) => {
    console.log('setting auth', auth, user)
    setAppState('data','auth', auth);
    if (user) {
      setAppState('data','user', user);
    }
  }

  return {authenticate, setAppState, appState};
}

export default createRoot(createGlobalStore);