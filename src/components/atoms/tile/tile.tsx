import { To, useNavigate } from 'react-router-dom';
import './tile.scss';
import Button from '@mui/joy/Button';

interface TileProps {
    type: string;
    content: any;
    setDetailInfo: Function;
}



const TileComponent: React.FC<TileProps> = ({type, content, setDetailInfo}) => {
    const navigate = useNavigate();

    const handleDetailClick = (path: To) => {
        navigate(path);
        setDetailInfo(content);
    }

    
    const filmTile = (
        <div className="tile-wrapper">
            <div className='tile-label'>{content.director}</div>
            <div className='tile-label'>{content.episode_id}</div>
            <div className='tile-label'>{content.producer}</div>
            <div className='tile-label'>{content.url}</div>
            <div className='tile-label'>{content.title}</div>
            <Button size="md" variant="soft" color="info" onClick={() => handleDetailClick("/film-detail-page") }>Info</Button>
        </div>
    )
    const vehicleTile = (
        <div className="tile-wrapper">
            <div className='tile-label'>{content.name}</div>
            <div className='tile-label'>{content.model}</div>
            <div className='tile-label'>{content.cargo_capacity}</div>
            <div className='tile-label'>{content.consumables}</div>
            <div className='tile-label'>{content.crew}</div>
            <Button size="md" variant="soft" color="info" onClick={() => handleDetailClick("/vehicle-detail-page")}>Info</Button>
        </div>
    )
    const starshipsTile = (
        <div className="tile-wrapper">
            <div className='tile-label'>{content.name}</div>
            <div className='tile-label'>{content.model}</div>
            <div className='tile-label'>{content.MGLT}</div>
            <div className='tile-label'>{content.crew}</div>
            <div className='tile-label'>{content.manufacturer}</div>
            <Button size="md" variant="soft" color="info" onClick={() => handleDetailClick("/starships-detail-page")}>Info</Button>
        </div>
    )
    const speciesTile = (
        <div className="tile-wrapper">
            <div className='tile-label'>{content.average_height}</div>
            <div className='tile-label'>{content.average_lifespan}</div>
            <div className='tile-label'>{content.hair_colors}</div>
            <div className='tile-label'>{content.eye_colors}</div>
            <div className='tile-label'>{content.classification}</div>
            <Button size="md" variant="soft" color="info" onClick={() => handleDetailClick("/species-detail-page")}>Info</Button>
        </div>
    )
    const planetTile = (
        <div className="tile-wrapper">
            <div className='tile-label'>{content.name}</div>
            <div className='tile-label'>{content.climate}</div>
            <div className='tile-label'>{content.diameter}</div>
            <div className='tile-label'>{content.gravity}</div>
            <div className='tile-label'>{content.orbital_period}</div>
            <Button size="md" variant="soft" color="info" onClick={() => handleDetailClick("/planet-detail-page")}>Info</Button>
        </div>
    )
    const peopleTile = (
        <div className="tile-wrapper">
            <div className='tile-label'>{content.name}</div>
            <div className='tile-label'>{content.birth_year}</div>
            <div className='tile-label'>{content.eye_color}</div>
            <div className='tile-label'>{content.gender}</div>
            <div className='tile-label'>{content.hair_color}</div>
            <Button size="md" variant="soft" color="info" onClick={() => handleDetailClick("/people-detail-page")}>Info</Button>
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