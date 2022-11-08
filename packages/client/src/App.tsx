import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import IntroductionPage from './pages/introduction/IntroductionPage';
import JoinRoomPage from './pages/join-room/JoinRoomPage';
import RoomPage from './pages/room/RoomPage';
import { store } from './store';

export default function App() {
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

  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}
