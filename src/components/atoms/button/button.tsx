import Button from '@mui/joy/Button';

interface ButtonProps {
    label: string;
    filter: Function;
}

const ButtonComponent: React.FC<ButtonProps> = ({label, filter}) => {
    return (
        <Button size="md" variant="outlined" color="neutral" onClick={() => filter(label)}>{label}</Button>
    )
    
}

export default ButtonComponent;