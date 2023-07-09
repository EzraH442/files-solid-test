import {
  Navigate,
  Outlet,
  _mergeSearchString,
  useNavigate,
} from '@solidjs/router';
import { Component, createEffect, Show } from 'solid-js';
import { useAuth } from './lib/authContext';
import { makeVerifyRequest } from './lib/requests';

const RouteGuard: Component = () => {
  const navigate = useNavigate();
  const [authenticated, { login, logout }] = useAuth();

  createEffect(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const verifyResposne = await makeVerifyRequest(
      new URLSearchParams({ token }),
    );

    if (verifyResposne.valid && !authenticated()) {
      login();
    } else if (!verifyResposne.valid && authenticated()) {
      logout();
    }

    if (!authenticated()) {
      navigate('/login', { replace: true });
    }

    // TODO error handling
  });

  return (
    <>
      <Show when={authenticated()}>
        <div>
          <button
            onclick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
        <Outlet />
      </Show>
    </>
  );
};

export default RouteGuard;
