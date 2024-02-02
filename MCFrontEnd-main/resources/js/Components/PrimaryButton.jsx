import {appColors} from "@/utils/AppColors";
import {Button} from "@mui/material";

export default function PrimaryButton({ type = 'submit', className = '', processing, children, onClick }) {
    return (
        <Button
            type={type}
            variant={'contained'}
            onClick={onClick}
            className={`w-full ${className}`}
            disabled={processing}
            style={{ fontFamily: 'Poppins, sans-serif' }}
        >
            {children}
        </Button>
    );
}
