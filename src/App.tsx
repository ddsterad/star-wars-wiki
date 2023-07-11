import './App.scss';
import { Route, Routes } from 'react-router-dom';
import DetailPageComponent from './components/moleculas/detail-page/detail-page';
import HomepageComponent from './components/organisms/homepage/homepage';
import { useState } from 'react';

function App() {

  const[detailInfo, setDetailInfo] = useState({});
  
  const setContent = (event: any) => {
    setDetailInfo(event)
  };

  return (
    <div data-testid="main-app">
      <Routes>
        <Route path="/" element={<HomepageComponent setContent={setContent} />} />
        <Route path="/film-detail-page" element={<DetailPageComponent detailInfo={detailInfo} />} />
        <Route path="/vehicle-detail-page" element={<DetailPageComponent detailInfo={detailInfo} />} />
        <Route path="/starships-detail-page" element={<DetailPageComponent detailInfo={detailInfo} />} />
        <Route path="/species-detail-page" element={<DetailPageComponent detailInfo={detailInfo} />} />
        <Route path="/planet-detail-page" element={<DetailPageComponent detailInfo={detailInfo} />} />
        <Route path="/people-detail-page" element={<DetailPageComponent detailInfo={detailInfo} />} />
      </Routes>
    </div>
    
  );
}

export default App;

