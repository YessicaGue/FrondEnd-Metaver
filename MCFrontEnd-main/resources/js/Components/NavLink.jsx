import { Link } from '@inertiajs/react';
import {Typography} from "@mui/material";

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'inline-flex items-center px-1 pt-1 border-b-4 border-white text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                    : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
            }
        >
            <Typography
                style={{
                    color: 'white',
                    fontWeight: active ? '600' : '400',
                    letterSpacing: 1,
                    opacity: active ? 1 : 0.8,
                }}
            >
                {children}
            </Typography>
        </Link>
    );
}
