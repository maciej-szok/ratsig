import {createSignal, Show} from "solid-js";
import {authenticateUser} from "../../services/authProvider.ts";

function Landing() {
  const [username, setUsername] = createSignal('admin@ratsig.com');
  const [password, setPassword] = createSignal('changethis');
  const [errorMsg, setErrorMsg] = createSignal('');

  const loginSubmitHandler = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    // const [authSuccess, authResponse] = await authenticateUser(username(), password());
    // if (!authSuccess) {
    //   setErrorMsg(authResponse.detail);
    //   return;
    // }
    //
    // const [uInfoSuccess, uInfo] = await userInfo(authResponse.token);
    // if (!uInfoSuccess) {
    //   setErrorMsg(uInfo.detail);
    //   return;
    // }

    // authenticate({token: authResponse.token}, {name: uInfo.name, email: uInfo.email})
    const authSuccess = authenticateUser(username(), password());
    if (!authSuccess) {
      setErrorMsg('Invalid username or password');
      return;
    }
    console.log('logged in');
  }

  return (
    <div class="grid h-full auto-rows-min auto-cols-min place-content-center">
      <h1 class="text-4xl mb-2">Ratsig</h1>
      <form onSubmit={loginSubmitHandler} class="grid content-center max-w-2xl">
        <label for="username-input">Username</label>
        <input class="bg-white border-gray-900 border" type="text" placeholder="username" id="username-input" value={username()} onInput={(e) => setUsername(e.target.value)}/>

        <label for="password-input">Password</label>
        <input class="bg-white border-gray-900 border" type="password" placeholder="password" id="password-input" value={password()} onInput={(e) => setPassword(e.target.value)}/>

        <Show when={errorMsg()}>
          <span class="text-red-500">{errorMsg()}</span>
        </Show>
        <button class="bg-green-200 mt-2" type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Landing;