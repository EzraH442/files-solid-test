import { Component } from 'solid-js';
import Template from '../components/Template';
import { A } from '@solidjs/router';

const PageNotFound: Component = () => {
  return (
    <Template>
      <p>Page not found</p>
      <A href="/home">Return to home</A>
    </Template>
  );
};

export default PageNotFound;
