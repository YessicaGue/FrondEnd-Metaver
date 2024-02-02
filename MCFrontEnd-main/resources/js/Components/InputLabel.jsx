import {Typography} from "@mui/material";

export default function InputLabel({ forInput, value, className, children }) {
    return (
        <Typography
            component="label"
            htmlFor={forInput} className={`block text-sm text-gray-700 ` + className}
            style={{
                fontWeight: '600',
            }}
        >
            {value ? value : children}
        </Typography>
    );
}
