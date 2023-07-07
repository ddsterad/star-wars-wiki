import ButtonComponent from "../../atoms/button/button";

interface HeaderProps {
    label: string;
    filter: Function;
}

const Header: React.FC<HeaderProps> = ({label, filter}) => {

    return (
        <>
            <h1>{label}</h1>
            <ButtonComponent label='All' filter={filter}/>
            <ButtonComponent label='People' filter={filter}/>
            <ButtonComponent label='Vehicles' filter={filter}/>
            <ButtonComponent label='Planets' filter={filter}/>
            <ButtonComponent label='Films' filter={filter}/>
            <ButtonComponent label='Species' filter={filter}/>
            <ButtonComponent label='Starships' filter={filter}/>
        </>
    )
}

export default Header;