import React, { useEffect, useState } from 'react';
import './App.scss';
import { IPeople, IFilm, IPlanet, ISpecie, IStarship, IVehicle } from './interfaces/interfaces';
import * as Utils from './utils/utils';
import Header from './components/moleculas/header/header';
import { Container, Input } from '@mui/joy';
import TileComponent from './components/atoms/tile/tile';
import Pagination from '@mui/material/Pagination/Pagination';
import { Route, Routes, useLocation } from 'react-router-dom';
import DetailPageComponent from './components/moleculas/detail-page/detail-page';
import Welcome from './images/welcome.png'

function App() {

  const ITEMS_PER_PAGE = 10;
  const[people, setPeople] = useState<IPeople[]>();
  const[films, setFilms] = useState<IFilm[]>();
  const[planets, setPlanets] = useState<IPlanet[]>();
  const[species, setSpecies] = useState<ISpecie[]>();
  const[starships, setStarships] = useState<IStarship[]>();
  const[vehicles, setVehicles] = useState<IVehicle[]>();
  const[filter, setFilter] = useState<string>('');
  const[contentToShow, setContentToShow] = useState<IPlanet[] | IFilm[] | IPeople[] | ISpecie[] | IStarship[] | IVehicle[] | any>();
  const[currentPage, setCurrentPage]=useState(1);
  const[totalPageCount, setTotalPageCount] = useState<number>()
  const[currentItems, setCurrentItems] = useState<any[]>()
  const[detailInfo, setDetailInfo] = useState({});
  const [inputSearch, setInputSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState<Object[]>([]);
  const [pathName, setPathName] = useState('');
  const location = useLocation();

  const getVehicles = async() => {
    await Utils.Vehicles.find(vehicle => vehicle.pilots.length > 0 )
    .then(vehicles => vehicles.resources.map((el) => el.value))
    .then(res => res.map(el => Object.assign(el, {customType: 'Vehicles'})))
    .then(res => setVehicles(res));
  }

  const getSpecies = async() => {
    await Utils.Species.find(species => species.classification.length > 0)
    .then(species => species.resources.map((el) => el.value))
    .then(res => res.map(el => Object.assign(el, {customType: 'Species'})))
    .then(res => setSpecies(res));
  }

  const getPeople = async() => {
    await Utils.People.find(people => people.gender.length > 0)
    .then(people => people.resources.map((el) => el.value))
    .then(res => res.map(el => Object.assign(el, {customType: 'People'})))
    .then(res => setPeople(res));
  }

  const getFilms = async() => {
    await Utils.Films.find(film => film.characters.length > 0)
    .then(film => film.resources.map((el) => el.value))
    .then(res => res.map(el => Object.assign(el, {customType: 'Films'})))
    .then(res => setFilms(res));
  }

  const getPlanets = async() => {
    await Utils.Planets.find(planet => planet.climate.length > 0)
    .then(planet => planet.resources.map((el) => el.value))
    .then(res => res.map(el => Object.assign(el, {customType: 'Planets'})))
    .then(res => {setPlanets(res);});
  }

  const getStarships = async() => {
    await Utils.Starships.find(starship => starship.cargo_capacity.length > 0)
    .then(starship => starship.resources.map((el) => el.value))
    .then(res => res.map(el => Object.assign(el, {customType: 'Starships'})))
    .then(res => {setStarships(res);});
  }

  useEffect(() => {
    getPeople();
    getSpecies();
    getVehicles();
    getFilms();
    getPlanets();
    getStarships();
  }, []);

  useEffect(() => {
    switch(filter) {
      case 'People':
        setContentToShow(people)
        generatePagination(people, currentPage)
        break;
      case 'Vehicles':
        setContentToShow(vehicles)
        generatePagination(vehicles, currentPage)
        break;
      case 'Planets':
        setContentToShow(planets)
        generatePagination(planets, currentPage)
        break;
      case 'Films':
        setContentToShow(films)
        generatePagination(films, currentPage)
        break;
      case 'Species':
        setContentToShow(species)
        generatePagination(species, currentPage)
        break;
      case 'Starships':
        setContentToShow(starships)
        generatePagination(starships, currentPage)
        break;
      // case 'All':	
      //   const allContent:any = {...vehicles, ...people, ...planets, ...films, ...species, ...starships};	
      //   const arrayOfObj = Object.entries(allContent).map((e) => ( e[1] ));
      //   setContentToShow(arrayOfObj)
      //   generatePagination(arrayOfObj, currentPage)	
      //   break;
    }
    
  }, [filter])

  useEffect(() => {
    setPathName(location.pathname);
  }, [location])

  const setFilterOnClickValue = (label:string) => {
    setCurrentPage(1);
    setInputSearch('');
    setFilteredItems([]);
    setFilter(label);
  } 

  const generatePagination = (contentToShow: any, currentPage:number) => {
    const totalPageCount = Math.ceil(contentToShow.length / ITEMS_PER_PAGE);
  
    const currentItems = contentToShow.slice(
  
      (currentPage - 1) * ITEMS_PER_PAGE,
  
      currentPage * ITEMS_PER_PAGE
    );

    setTotalPageCount(totalPageCount);
    setCurrentItems(currentItems);
  }

  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page);
    generatePagination(contentToShow, page);
  };

  const filteredData = (inputValue: string) => {

    const filteredItemsArray:any = [];

    setInputSearch(inputValue);
    console.log("input value", inputValue);
    contentToShow?.filter((element: any) => {
      if (inputValue === '') {
          return element;
      }
      else {
          const result = element.name.toLowerCase().includes(inputValue.toLowerCase());
          console.log('Result:', result);
          if(result) {
            filteredItemsArray.push(element);
            setFilteredItems(filteredItemsArray);
            return result
          }
      }
    })
  } 


  const MainComponent = () => {
    const finalContent = filteredItems && filteredItems.length > 0 ? filteredItems : currentItems
    return (
      <>
        <Container>
            <Header data-testid="header-id" filter={filter} filterFunction={setFilterOnClickValue}/>
            {!filter && (
              <>
                <div className='welcome-image'>
                  <img src={Welcome} alt="welcome" />
                </div>
              </>
            )}
        </Container>
        {filter && (<Container>
            {finalContent?.map((item, index) => {
                return <TileComponent key={index} type={filter} content={item} setDetailInfo={setDetailInfo}/>
            })}
            
            <Pagination
              count={totalPageCount}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"/>
        </Container>)}
      </>
    )
  }

  return (
    <div data-testid="main-app">
      {pathName === '/' && (<Container >
        <div className='search-wrapper'>
          <h2>Star Wars Wiki</h2>
          <Input value={inputSearch} placeholder="Search something" variant="outlined" onChange={(event) => {filteredData(event?.target.value)}} />
        </div>
      </Container>)}
      <Routes>
        <Route path="/" element={<MainComponent />} />
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

