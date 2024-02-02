import {appColors} from "@/utils/AppColors";
import {Checkbox as MuiCheckbox} from "@mui/material";

export default function Checkbox({ name, value, handleChange }) {
    return (
        <MuiCheckbox
            type="checkbox"
            name={name}
            value={value}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-blue-700"
            style={{
                color: appColors.secondary,
            }}
            onChange={(e) => handleChange(e)}
        />
    );
}