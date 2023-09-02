import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorPage from './routes/root.tsx';
import RandomColor from './components/RandomColor.tsx';
import RandomLetter from './components/RandomLetter.tsx';
import TicTacToe from './components/TicTacToe.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "random-letter",
        element: <RandomLetter />,
      },
      {
        path: "random-color",
        element: <RandomColor />,
      },
      {
        path: "tic-tac-toe",
        element: <TicTacToe />,
      },
    ]
  },
], {
  basename: import.meta.env.APP_ENV === 'prod' ? "/kidsgames" : ''
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
