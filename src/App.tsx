import React, { useEffect, useState } from 'react';
import './App.scss';
import { IPeople, IFilm, IPlanet, ISpecie, IStarship, IVehicle } from './interfaces/interfaces';
import * as Utils from './utils/utils';
import Header from './components/moleculas/header/header';
import { Container } from '@mui/joy';
import TileComponent from './components/atoms/tile/tile';
import Pagination from '@mui/material/Pagination/Pagination';

function App() {

  const ITEMS_PER_PAGE = 10;
  const[people, setPeople] = useState<IPeople[]>();
  const[films, setFilms] = useState<IFilm[]>();
  const[planets, setPlanets] = useState<IPlanet[]>();
  const[species, setSpecies] = useState<ISpecie[]>();
  const[starships, setStarships] = useState<IStarship[]>();
  const[vehicles, setVehicles] = useState<IVehicle[]>();
  const[filter, setFilter] = useState<string>('');
  const[contentToShow, setContentToShow] = useState<IPlanet[] | IFilm[] | IPeople[] | ISpecie[] | IStarship[] | IVehicle[]>();
  const[currentPage, setCurrentPage]=useState(1);
  const[totalPageCount, setTotalPageCount] = useState<number>()
  const[currentItems, setCurrentItems] = useState<any[]>()

  const getVehicles = async() => {
    await Utils.Vehicles.find(vehicle => vehicle.pilots.length > 0 )
    .then(vehicles => vehicles.resources.map((el) => el.value))
    .then(res => setVehicles(res));
  }

  const getSpecies = async() => {
    await Utils.Species.find(species => species.classification.length > 0)
    .then(species => species.resources.map((el) => el.value))
    .then(res => setSpecies(res));
  }

  const getPeople = async() => {
    await Utils.People.find(people => people.gender.length > 0)
    .then(people => people.resources.map((el) => el.value))
    .then(res => setPeople(res));
  }

  const getFilms = async() => {
    await Utils.Films.find(film => film.characters.length > 0)
    .then(film => film.resources.map((el) => el.value))
    .then(res => setFilms(res));
  }

  const getPlanets = async() => {
    await Utils.Planets.find(planet => planet.climate.length > 0)
    .then(planet => planet.resources.map((el) => el.value))
    .then(res => {setPlanets(res);});
  }

  const getStarships = async() => {
    await Utils.Starships.find(starship => starship.cargo_capacity.length > 0)
    .then(starship => starship.resources.map((el) => el.value))
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
    console.log('Filter', filter);
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
    }
  }, [filter])


  

  const setFilterOnClickValue = (label:string) => {
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
    console.log('Page:', page)
    generatePagination(contentToShow, page);
  };

  return (
    
    <>
      <Container>
          <Header label='Star Wars Wiki' filter={setFilterOnClickValue}/>
      </Container>
      <Container>
          {currentItems?.map((item, index) => {
              return <TileComponent key={index} type={filter} content={item}/>
          })}
          
          <Pagination
            count={totalPageCount}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"/>
      </Container>
      
    </>
    
  );
}

export default App;
