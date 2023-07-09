import type { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js';
import Form from '../components/Form';
import Template from '../components/Template';
import { useAuth } from '../lib/authContext';

const Login: Component = () => {
  const navigate = useNavigate();

  const [authenticated, _] = useAuth();

  const login = (token: string) => {
    localStorage.setItem('token', token);
    navigate('/home', { replace: true });
    _.login();
  };

  createEffect(() => {
    if (authenticated()) {
      navigate('/home', { replace: true });
    }
  });

  return (
    <>
      <Template>
        <h1>Log in</h1>

        <Form onSucess={(token) => login(token)} />
      </Template>
    </>
  );
};

export default Login;
