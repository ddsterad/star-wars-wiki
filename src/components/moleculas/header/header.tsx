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
                {/* <ButtonComponent active={filter=== 'All' ? true:false} label='All' filterFunction={filterFunction}/> */}
                <ButtonComponent active={filter=== 'People' ? true:false} label='People' filterFunction={filterFunction}/>
                <ButtonComponent active={filter=== 'Vehicles' ? true:false} label='Vehicles' filterFunction={filterFunction}/>
                <ButtonComponent active={filter=== 'Planets' ? true:false} label='Planets' filterFunction={filterFunction}/>
                <ButtonComponent active={filter=== 'Films' ? true:false} label='Films' filterFunction={filterFunction}/>
                <ButtonComponent active={filter=== 'Species' ? true:false} label='Species' filterFunction={filterFunction}/>
                <ButtonComponent active={filter=== 'Starships' ? true:false} label='Starships' filterFunction={filterFunction}/>
            </div>
        </>
    )
}

export default Header;