import { createSignal, type Component, Show, createEffect } from 'solid-js';
import { A } from '@solidjs/router';
import Template from '../components/Template';
import parseJwt from '../lib/jwt';
import ImageComponent from '../components/Image';
import PaginatedImages from '../components/PaginatedImages';

const imageRegex = new RegExp('\\.(JPEG|PNG|JPG|GIF)$', 'gmi');
const isImageFileName = (fileName: string) => {
  return imageRegex.test(fileName);
};

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
        <PaginatedImages
          files={fileData().filter((f: any) => isImageFileName(f.name))}
        />
      </Show>
    </Template>
  );
};

export default Home;
