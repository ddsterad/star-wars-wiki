import _ from 'lodash';
import { IPeople, IFilm, IPlanet, ISpecie, IStarship, IVehicle } from '../interfaces/interfaces';
import axios from 'axios';

export enum ResourcesType {
    Films = 'films',
      People = 'people',
      Planets = 'planets',
      Species = 'species',
      Starships = 'starships',
      Vehicles = 'vehicles',
  }
  
  const cache = window.localStorage;
  const prefix = 'swCache'
  
//   async function request(url: string) {
//     const cached = cache.getItem(`${prefix}.${url}`);
//     if (cached) {
//       return JSON.parse(cached);
//     }
  
//     const headers = {
//       "headers": {
//         "accept": "application/json"
//       }
//     };
//     const result = await fetch(url, headers).then(res => res.json());
  
//     cache.setItem(`${prefix}.${url}`, JSON.stringify(result));
  
//     return result;
//   }
async function request(url: string) {
    const cached = cache.getItem(`${prefix}.${url}`);
  
    if (cached) {
      return JSON.parse(cached);
    }
  
    const headers = {
      accept: "application/json"
    };
    
    const config = {
      headers: headers
    };
  
    const response = await axios.get(url, config);
    const result = response.data;
  
    cache.setItem(`${prefix}.${url}`, JSON.stringify(result));
  
    return result;
  }
  
  class Resource < S > {
    constructor(public value: S) {}
  
    public async populate(path: string) {
      await this.populateRec(path, this.value);
  
      return this;
    }
  
    private async populateSingle(path: string, obj: any) {
      if (Array.isArray(obj[path])) {
        obj[path] = await Promise.all((obj[path] as string[]).map(url => request(url)));
  
        return this;
      }
  
      obj[path] = await request((obj[path] as string).replace('http', 'https'));
  
      return this;
    }
  
    private populateRec(path: string, obj: any): Promise < {} > {
      const [next, ...rest] = path.split('.');
  
  
      if (rest.length > 0 && Array.isArray(obj[next])) {
        return Promise.all(obj[next].map((single: any) => this.populateRec(rest.join('.'), single)));
      }
  
      if (rest.length === 0 && Array.isArray(obj)) {
        return Promise.all(obj.map(single => this.populateSingle(next, single)))
      } else if (rest.length === 0) {
        return this.populateSingle(next, obj);
      }
  
  
      return this.populateRec(rest.join('.'), obj[next] as {});
    }
  
  
  }
  
  
  function collectionBuilder < T > (resource: ResourcesType) {
    return class SWCollection {
      static root = `https://swapi.dev/api/${resource}/`;
      public resources: Resource < T > [] = [];
  
      constructor(unparsedResources: T[]) {
        this.resources = unparsedResources.map(resource => new Resource < T > (resource));
      }
  
      async populateAll(path: string) {
        this.resources = await Promise.all(this.resources.map(obj => obj.populate(path)))
  
        return this;
      }
  
      static getPage(page: number = 1, search ? : string) {
        if (search) {
          return request(`${SWCollection.root}?page=${page}&search=${search}`);
        }
  
        return request(`${SWCollection.root}?page=${page}`);
      }
  
      public static async find(predicate ? : (single: T) => boolean) {
        const {
          count,
          results: firstResult
        } = await SWCollection.getPage();
        const pages = Math.ceil(count / firstResult.length);
        const left = Array.from({
          length: (pages - 1)
        }, (_, i) => SWCollection.getPage(2 + i));
        const restResults = await Promise.all(left);
  
        const totalResults: T[] = [{
          results: firstResult
        }, ...restResults].reduce((allResults, {
          results
        }) => {
          return [...allResults, ...results];
        }, []);
  
        return new SWCollection(_.filter(totalResults, predicate));
      }
  
      public static async findBySearch(predicate: string[]) {
        const pages = await Promise.all(predicate.map(query => this.getPage(1, query)))
  
        return new SWCollection(_.flatMap(pages, 'results'));
      }
  
    }
  }
  
  
  export const Films = collectionBuilder < IFilm > (ResourcesType.Films);
  export const People = collectionBuilder < IPeople > (ResourcesType.People);
  export const Planets = collectionBuilder < IPlanet > (ResourcesType.Planets);
  export const Species = collectionBuilder < ISpecie > (ResourcesType.Species);
  export const Starships = collectionBuilder < IStarship > (ResourcesType.Starships);
  export const Vehicles = collectionBuilder < IVehicle > (ResourcesType.Vehicles);