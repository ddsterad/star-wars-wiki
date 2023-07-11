import './header.scss';
import ButtonComponent from "../../atoms/button/button";
interface HeaderProps {
    filter: string;
    filterFunction: Function;
}

const Header: React.FC<HeaderProps> = ({filter, filterFunction}) => {

    return (
        <>
            
            <div data-testid="header-to-be-tested" className='button-wrapper'>
                <ButtonComponent active={filter === 'All'} label='All' filterFunction={filterFunction}/>
                <ButtonComponent active={filter === 'People'} label='People' filterFunction={filterFunction}/>
                <ButtonComponent active={filter === 'Vehicles'} label='Vehicles' filterFunction={filterFunction}/>
                <ButtonComponent active={filter === 'Planets'} label='Planets' filterFunction={filterFunction}/>
                <ButtonComponent active={filter === 'Films'} label='Films' filterFunction={filterFunction}/>
                <ButtonComponent active={filter === 'Species'} label='Species' filterFunction={filterFunction}/>
                <ButtonComponent active={filter === 'Starships'} label='Starships' filterFunction={filterFunction}/>
            </div>
        </>
    )
}

export default Header;