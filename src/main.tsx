import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorPage from './routes/root.tsx';
import RandomColor from './components/RandomColor.tsx';
import RandomLetter from './components/RandomLetter.tsx';
import TicTacToe from './components/TicTacToe.tsx';
import DrawingCanvas from './components/DrawingCanvas.tsx';
import PopIt from './components/PopIt.tsx';

const router = createHashRouter([
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
      {
        path: "draw",
        element: <DrawingCanvas />,
      },
      {
        path: "popit",
        element: <PopIt />,
      },
    ]
  },
], {
  // basename: import.meta.env.NODE_ENV !== 'local' ? "/kidsgames" : '/'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
