import Button from '@mui/joy/Button';

interface ButtonProps {
    active: Boolean;
    label: string;
    filterFunction: Function;
}

const ButtonComponent: React.FC<ButtonProps> = ({active, label, filterFunction}) => {
    return (
        <Button size="md" variant={active ? "soft":"outlined"} color={active ? "success" : "neutral"} onClick={() => filterFunction(label)}>{label}</Button>
    )
    
}

export default ButtonComponent;