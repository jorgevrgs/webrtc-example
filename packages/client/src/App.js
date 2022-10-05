import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import IntroductionPage from './pages/introduction/IntroductionPage';
import JoinRoomPage from './pages/join-room/JoinRoomPage';
import RoomPage from './pages/room/RoomPage';
import { connectWithSocketIOServer } from './utils/wss';

const router = createBrowserRouter([
  {
    path: '/join-room',
    element: <JoinRoomPage />,
  },
  {
    path: '/room',
    element: <RoomPage />,
  },
  {
    path: '/',
    element: <IntroductionPage />,
  },
]);

function App() {
  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
