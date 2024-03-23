import {createRoot} from "solid-js";
import {createStore} from "solid-js/store";

import {User} from "../types/user.ts";
import {Auth} from "../types/auth.ts";
import {Entry} from "../types/entry.ts";

type GlobalStoreData = {
  auth?: Auth;
  user?: User;
  selectedDate: Date;
  entries: { [id: string]: Entry };
}

type GlobalStore = {
  data: GlobalStoreData;
  isAuthenticated: boolean;
}


function createGlobalStore() {
  const [appState, setAppState] = createStore<GlobalStore>({
    data: {
      selectedDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()),
      entries: {},
    },
    get isAuthenticated() {
      return !!this.data.auth;
    }
  });

  const authenticate = (auth: Auth, user?: User) => {
    setAppState('data','auth', auth);
    if (user) {
      setAppState('data','user', user);
    }
  }

  return {authenticate, setAppState, appState};
}

export default createRoot(createGlobalStore);