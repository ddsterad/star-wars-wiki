import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { IPeople, IFilm, IPlanet, ISpecie, IStarship, IVehicle } from './interfaces/interfaces';
import * as Utils from './utils/utils';
import Header from './components/moleculas/header/header';

function App() {

  const[people, setPeople] = useState<IPeople[]>();
  const[films, setFilms] = useState<IFilm[]>();
  const[planets, setPlanets] = useState<IPlanet[]>();
  const[species, setSpecies] = useState<ISpecie[]>();
  const[starships, setStarships] = useState<IStarship[]>();
  const[vehicles, setVehicles] = useState<IVehicle[]>();
  const[filter, setFilter] = useState<string>('');

//   useEffect(() => {
//     axios.get('https://swapi.dev/api/people/').then(res => {

//     console.log(res.data);
// })
//   })

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
    .then(res => setPlanets(res));
  }

  const getStarships = async() => {
    await Utils.Starships.find(starship => starship.cargo_capacity.length > 0)
    .then(starship => starship.resources.map((el) => el.value))
    .then(res => setStarships(res));
  }

  useEffect(() => {
    getPeople();
    getSpecies();
    getVehicles();
    getFilms();
    getPlanets();
    getStarships();
  }, [])

  useEffect(() => {
    console.log('Filter:', filter);
  })
  
  const setFilterOnClickValue = (label:string) => {
    setFilter(label);
  } 

  return (
    <Header label='Star Wars Wiki' filter={setFilterOnClickValue}/>
  );
}

export default App;
