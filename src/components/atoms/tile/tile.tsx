import './tile.scss';
import { IFilm, IPeople, IPlanet, ISpecie, IStarship, IVehicle } from '../../../interfaces/interfaces';

interface TileProps {
    type: string;
    content: any;
}



const TileComponent: React.FC<TileProps> = ({type, content}) => {
    const filmTile = (
        <div className="tile-wrapper">
            <div className='tile-label'>{content.director}</div>
            <div className='tile-label'>{content.episode_id}</div>
            <div className='tile-label'>{content.producer}</div>
            <div className='tile-label'>{content.url}</div>
            <div className='tile-label'>{content.title}</div>
        </div>
    )
    const vehicleTile = (
        <div className="tile-wrapper">
            <div className='tile-label'>{content.cargo_capacity}</div>
            <div className='tile-label'>{content.consumables}</div>
            <div className='tile-label'>{content.crew}</div>
            <div className='tile-label'>{content.model}</div>
            <div className='tile-label'>{content.name}</div>
        </div>
    )
    const starshipsTile = (
        <div className="tile-wrapper">
            <div className='tile-label'>{content.MGLT}</div>
            <div className='tile-label'>{content.crew}</div>
            <div className='tile-label'>{content.manufacturer}</div>
            <div className='tile-label'>{content.model}</div>
            <div className='tile-label'>{content.name}</div>
        </div>
    )
    const speciesTile = (
        <div className="tile-wrapper">
            <div className='tile-label'>{content.average_height}</div>
            <div className='tile-label'>{content.average_lifespan}</div>
            <div className='tile-label'>{content.hair_colors}</div>
            <div className='tile-label'>{content.eye_colors}</div>
            <div className='tile-label'>{content.classification}</div>
        </div>
    )
    const planetTile = (
        <div className="tile-wrapper">
            <div className='tile-label'>{content.climate}</div>
            <div className='tile-label'>{content.diameter}</div>
            <div className='tile-label'>{content.gravity}</div>
            <div className='tile-label'>{content.name}</div>
            <div className='tile-label'>{content.orbital_period}</div>
        </div>
    )
    const peopleTile = (
        <div className="tile-wrapper">
            <div className='tile-label'>{content.birth_year}</div>
            <div className='tile-label'>{content.eye_color}</div>
            <div className='tile-label'>{content.gender}</div>
            <div className='tile-label'>{content.hair_color}</div>
            <div className='tile-label'>{content.name}</div>
        </div>
    )
    return (
        <>
       {
        type === 'Films' && (
            filmTile
        )
       } 
       {
        content.consumables && (
            vehicleTile
        )
       } 
       {
        content.MGLT && (
            starshipsTile
        )
       } 
       {
        content.classification && (
            speciesTile
        )
       } 
       {
        content.gravity && (
            planetTile
        )
       } 
       {
        content.birth_year && (
            peopleTile
        )
       } 
       </>
    )   
    
}

export default TileComponent;