import Container from "@mui/joy/Container"
import { Pagination } from "@mui/material"
import TileComponent from "../../atoms/tile/tile"
import Header from "../../moleculas/header/header"
import Welcome from '../../../images/welcome.png'
import Input from "@mui/joy/Input"
import { Key, useEffect, useState } from "react"
import { IPlanet, IFilm, IPeople, ISpecie, IStarship, IVehicle } from "../../../interfaces/interfaces"
import {getVehicles, getSpecies, getPeople, getFilms, getPlanets, getStarships} from '../../../utils/fetch-data-api';

interface Props {
    setContent: Function
}

const HomepageComponent:React.FC<Props> = ({setContent}) => {
    const ITEMS_PER_PAGE = 10;
    const[filter, setFilter] = useState<string>('');
    const[contentToShow, setContentToShow] = useState<IPlanet[] | IFilm[] | IPeople[] | ISpecie[] | IStarship[] | IVehicle[] | any>();
    const[currentPage, setCurrentPage]=useState(1);
    const[totalPageCount, setTotalPageCount] = useState<number>()
    const[currentItems, setCurrentItems] = useState<any[]>()
    const[detailInfo, setDetailInfo] = useState({});
    const[finalContent, setFinalContent] = useState<IPlanet[] | IFilm[] | IPeople[] | ISpecie[] | IStarship[] | IVehicle[] | any[]>();
    const [inputSearch, setInputSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState<Object[]>([]);
    const[people, setPeople] = useState<IPeople[]>();
    const[films, setFilms] = useState<IFilm[]>();
    const[planets, setPlanets] = useState<IPlanet[]>();
    const[species, setSpecies] = useState<ISpecie[]>();
    const[starships, setStarships] = useState<IStarship[]>();
    const[vehicles, setVehicles] = useState<IVehicle[]>();
    
    useEffect(() => {
        Promise.all([
            getPeople(),
            getSpecies(),
            getVehicles(),
            getFilms(),
            getPlanets(),
            getStarships()
        ]).then(([resPeople, resSpecies, resVehicles, resFilms, resPlanets, resStarships]) => {
            setPeople(resPeople);
            setSpecies(resSpecies);
            setVehicles(resVehicles);
            setFilms(resFilms);
            setPlanets(resPlanets);
            setStarships(resStarships);
        })
      }, []);

    useEffect(() => {
        switch(filter) {
          case 'People':
            setContentToShow(people);
            setFinalContent(people);
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
          case 'All':	
            const allContent:any[] = ([] as any[]).concat(vehicles, people, planets, films, species, starships);
            setContentToShow(allContent)
            generatePagination(allContent, currentPage)	
            break;
        }
        
      }, [filter])

    const setFilterOnClickValue = (label:string) => {
        setCurrentPage(1);
        setInputSearch('');
        setFilteredItems([]);
        setFilter(label);
    } 

    const contentSetter = (event:any) => {
        setDetailInfo(event);
        setContent(event);
    }
    
      const generatePagination = (contentToShow: any, currentPage:number) => {
        const totalPageCount = Math.ceil(contentToShow.length / ITEMS_PER_PAGE);
      
        const currentItems = contentToShow.slice(
      
          (currentPage - 1) * ITEMS_PER_PAGE,
      
          currentPage * ITEMS_PER_PAGE
        );
    
        setTotalPageCount(totalPageCount);
        setCurrentItems(currentItems);
        setFinalContent(currentItems);
      }
    
      const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
        generatePagination(contentToShow, page);
      };
    
      const filteredData = (inputValue: string) => {
    
        const filteredItemsArray:any = [];
    
        setInputSearch(inputValue);
        contentToShow?.filter((element: any) => {
          if (inputValue === '') {
              return element;
          }
          else {
              const result = element?.name?.toLowerCase().includes(inputValue.toLowerCase());
              if(result) {
                filteredItemsArray.push(element);
                setFilteredItems(filteredItemsArray);
                generatePagination(filteredItemsArray, 1)
                //setFinalContent(filteredItemsArray);
                return result
              }
          }
        })
      } 


    return (
      <>
        <Container >
            <div className='search-wrapper'>
                <h2>Star Wars Wiki</h2>
                <Input value={inputSearch} placeholder="Search something" variant="outlined" onChange={(event) => {filteredData(event?.target.value)}} />
            </div>
        </Container>
        <Container>
            <Header data-testid="header-id" filter={filter} filterFunction={setFilterOnClickValue}/>
            
        </Container>
        {filter && (<Container>
            {finalContent?.map((item: any, index: Key | null | undefined) => {
                return <TileComponent key={index} type={filter} content={item} setDetailInfo={contentSetter}/>
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

  export default HomepageComponent;