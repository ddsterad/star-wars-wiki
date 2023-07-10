import { Container, Table } from "@mui/joy";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
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
                    <Button size="md" variant="solid" color="primary" onClick={() => navigate(-1)}>Back to search</Button>
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
                                Film
                                {detailInfo.detailInfo.films?.map((item: any,index:any) => {
                                    return <p key={index}>{item}</p>
                                })}
                                <p>{detailInfo.detailInfo.films.length === 0 && 'No Vehicles available'}</p>
                            </div>
                            <div className="info-section">
                                Vehicles
                                {detailInfo.detailInfo.vehicles?.map((item: any,index:any) => {
                                    return <p key={index}>{item}</p>
                                })}
                                <p>{detailInfo.detailInfo.vehicles.length === 0 && 'No Vehicles available'}</p>
                            </div>
                        </div>
                        <div className="column">
                            <div className="info-section">
                                Species
                                {detailInfo.detailInfo.species?.map((item: any,index:any) => {
                                    return <p key={index}>{item}</p>
                                })}
                                <p>{detailInfo.detailInfo.species.length === 0 && 'No Species available'}</p>
                            </div>
                            <div className="info-section">
                                Starships
                                {detailInfo.detailInfo.starships.length > 0 && (detailInfo.detailInfo.starships?.map((item: any,index:any) => {
                                    return <p key={index}>{item}</p>
                                })) }
                                <p>{detailInfo.detailInfo.starships.length === 0 && 'No Starships available'}</p>
                            </div>
                        </div>
                        <div className="column">
                            <div className="info-section">
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