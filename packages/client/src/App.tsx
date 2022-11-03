import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { socket, SocketContext } from './contexts/socket.context';
import IntroductionPage from './pages/introduction/IntroductionPage';
import JoinRoomPage from './pages/join-room/JoinRoomPage';
import RoomPage from './pages/room/RoomPage';
import { store } from './store';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

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

  console.log({
    isConnected,
  });

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <RouterProvider router={router} />;
      </SocketContext.Provider>
    </Provider>
  );
}
