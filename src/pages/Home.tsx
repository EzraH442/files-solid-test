import {
  createSignal,
  type Component,
  Show,
  createEffect,
  For,
} from 'solid-js';
import { A } from '@solidjs/router';
import Template from '../components/Template';
import parseJwt from '../lib/jwt';
import ImageComponent from '../components/Image';

const Home: Component = () => {
  const [email, setEmail] = createSignal('');

  const [fileData, setFileData] = createSignal([]);

  const getFileInfo = () => {
    return fetch(`${import.meta.env.VITE_gatewayUrl}/list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => res.json());
  };

  createEffect(() => {
    const token = localStorage.getItem('token');
    const email = parseJwt(token!).email;
    setEmail(email);

    getFileInfo().then((data) => setFileData(data.files));
  });

  return (
    <Template>
      <Show
        when={email().length > 0}
        fallback={
          <>
            <p>Not logged in</p>
            <A href="/login" activeClass="underlined">
              Login
            </A>
          </>
        }
      >
        <p>Logged in as {email()}</p>
        <div>
          <For each={fileData()}>
            {(file: any, i) => (
              <li>
                {file.name ?? ''}

                <ImageComponent
                  src={`https://static.ezrahuang.com/file/ezrah442-testing/${file.name}`}
                />
              </li>
            )}
          </For>
        </div>
      </Show>
    </Template>
  );
};

export default Home;
