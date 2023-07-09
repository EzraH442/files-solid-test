/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route, Routes } from '@solidjs/router';

import './index.css';
import Home from './pages/Home';
import RouteGuard from './RouteGuard';
import Login from './pages/Login';
import PageNotFound from './pages/404';
import { AuthProvider } from './lib/authContext';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <AuthProvider value={{ authenticated: false }}>
      <Router>
        <Routes>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={RouteGuard}>
            <Route path="home" component={Home}></Route>
            <Route path="/files" component={Login}></Route>
          </Route>
          <Route path="*" component={PageNotFound}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  ),
  root!,
);
