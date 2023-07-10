import { Container, Table, Link} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ConnectingAirportsOutlinedIcon from '@mui/icons-material/ConnectingAirportsOutlined';
import './detail-page.scss';

interface DetailPageProps {
    detailInfo?: any;
}

const DetailPageComponent: React.FC<DetailPageProps> = (detailInfo) => {
    const navigate = useNavigate();

    return (
        <div className="background">
            <Container>
                <div className="header-container">
                    <h3>{detailInfo.detailInfo.name}</h3>
                    <Link color="primary" variant="plain" onClick={() => navigate(-1)}>Back to search</Link>
                </div>
                <div className="info-wrapper">
                    <div className="personal-info">
                        <Table aria-label="basic table">
                            <thead>
                                <tr>
                                <th>Info</th>
                                <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Name</td>
                                <td>{detailInfo.detailInfo.name}</td>
                                </tr>
                                <tr>
                                <td>Height</td>
                                <td>{detailInfo.detailInfo.height}</td>
                                </tr>
                                <tr>
                                <td>Mass</td>
                                <td>{detailInfo.detailInfo.mass}</td>
                                </tr>
                                <tr>
                                <td>Hair Color</td>
                                <td>{detailInfo.detailInfo.hair_color}</td>
                                </tr>
                                <tr>
                                <td>Skin Color</td>
                                <td>{detailInfo.detailInfo.skin_color}</td>
                                </tr>
                                <tr>
                                <td>Eye Color</td>
                                <td>{detailInfo.detailInfo.eye_color}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="other-info">
                        <div className="column">
                            <div className="info-section">
                                <div className="info-section-headline">
                                    <MovieCreationOutlinedIcon className="info-section-headline-icon"></MovieCreationOutlinedIcon>
                                    <p>Movies</p>
                                </div>
                                {detailInfo.detailInfo.films?.map((item: any,index:any) => {
                                    return <p key={index}>{item}</p>
                                })}
                            </div>
                            <div className="info-section">
                                <div className="info-section-headline">
                                    <ConnectingAirportsOutlinedIcon className="info-section-headline-icon"></ConnectingAirportsOutlinedIcon>
                                    <p>Vehicles</p>
                                </div>
                                {detailInfo.detailInfo.vehicles?.map((item: any,index:any) => {
                                    return <p key={index}>{item}</p>
                                })}
                            </div>
                        </div>
                        <div className="column">
                            <div className="info-section">
                                <div className="info-section-headline">
                                    <PeopleAltOutlinedIcon className="info-section-headline-icon"></PeopleAltOutlinedIcon>
                                    <p>Species</p>
                                </div>
                                {detailInfo.detailInfo.species?.map((item: any,index:any) => {
                                    return <p key={index}>{item}</p>
                                })}
                            </div>
                            <div className="info-section">
                                <div className="info-section-headline">
                                    <RocketLaunchOutlinedIcon className="info-section-headline-icon"></RocketLaunchOutlinedIcon>
                                    <p>Starship</p>
                                </div>
                                {detailInfo.detailInfo.starships?.map((item: any,index:any) => {
                                    return <p key={index}>{item}</p>
                                }) }
                            </div>
                        </div>
                        <div className="column">
                            <div className="info-section">
                            <div className="info-section-headline">
                                    <InfoOutlinedIcon className="info-section-headline-icon"></InfoOutlinedIcon>
                                    <p>General Info</p>
                                </div>
                                <p>Created: {(detailInfo.detailInfo.created).split('T')[0]}</p>
                                <p>Edited: {(detailInfo.detailInfo.edited).split('T')[0]}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default DetailPageComponent