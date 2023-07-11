import * as Utils from './utils';

export const getVehicles = async() => {
  return await Utils.Vehicles.find()
  .then(vehicles => vehicles.resources.map((el) => el.value))
  .then(res => res.map(el => Object.assign(el, {customType: 'Vehicles'})))
  
}

export const getSpecies = async() => {
  return await Utils.Species.find()
  .then(species => species.resources.map((el) => el.value))
  .then(res => res.map(el => Object.assign(el, {customType: 'Species'})))
}

export const getPeople = async() => {
  return await Utils.People.find()
  .then(people => people.resources.map((el) => el.value))
  .then(res => res.map(el => Object.assign(el, {customType: 'People'})))
}

export const getFilms = async() => {
  return await Utils.Films.find()
  .then(film => film.resources.map((el) => el.value))
  .then(res => res.map(el => Object.assign(el, {customType: 'Films'})))
}

export const getPlanets = async() => {
  return await Utils.Planets.find()
  .then(planet => planet.resources.map((el) => el.value))
  .then(res => res.map(el => Object.assign(el, {customType: 'Planets'})))
}

export const getStarships = async() => {
  return await Utils.Starships.find()
  .then(starship => starship.resources.map((el) => el.value))
  .then(res => res.map(el => Object.assign(el, {customType: 'Starships'})))
}