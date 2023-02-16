import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import Channel from './routes/Channels';
import Main from './routes/Main';
import NotFound from './routes/NotFound';
import SearchChannels from './routes/SearchChannels';
import Video from './routes/Video';

function App() {
  return (
    <CookiesProvider>
      <div className="bg-black">
        {/** header */}
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="channel/:userId" element={<Channel />} />
          <Route path="search/:channels" element={<SearchChannels />} />
          <Route path="video/:sereadId" element={<Video />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CookiesProvider>
  );
}

export default App;
