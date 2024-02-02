import React from "react";
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import LogoVoces from "../../../assets/images/change_org/logo_vocesdelfuturo.png";

const ChangeHeader = (props) => {

    const {hideInfoBy, showExtraToolbar, titleExtraToolbar} = props;

    return (
        <AppBar
            position="static"
            elevation={0}
            color={"transparent"}
            className={'w-full'}
            style={{
                height: showExtraToolbar ? 'auto' : '70px',
            }}
        >
            <Toolbar
                className={'w-full h-full'}
            >
                <IconButton
                    onClick={() => window.location.href = '/vocesdelfuturo'}
                >
                    <img
                        className="block w-auto fill-current text-gray-800 h-[50px] cursor-pointer"
                        src={LogoVoces}
                        alt="Logo Voces del Futuro"
                    />
                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    className={'h-full flex items-center'}
                    style={{
                        color: "#000000",
                        fontFamily: 'Hubot-Sans',
                        fontWeight: "bold",
                        marginLeft: "20px",
                        marginTop: "5px",
                        letterSpacing: "0.1em",
                    }}
                >
                    VOCES DEL FUTURO
                </Typography>

                <div
                    className={'flex-grow'}
                />

                {
                    !hideInfoBy &&
                    <Typography
                        variant="h6"
                        component="div"
                        className={'h-full flex items-center text-mc-primary'}
                        style={{
                            fontFamily: 'Mona-Sans',
                            fontWeight: "600",
                            marginLeft: "20px",
                            marginTop: "5px",
                            letterSpacing: "0.05em",
                        }}
                    >
                        by LAB MC
                    </Typography>
                }
            </Toolbar>

            {
                showExtraToolbar &&
                <Toolbar
                    className={'w-full h-full'}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        className={'h-full flex items-center'}
                        style={{
                            color: "#000000",
                            fontFamily: 'Hubot-Sans',
                            fontWeight: "500",
                            marginLeft: "15px",
                            marginTop: "5px",
                            letterSpacing: "0.1em",
                        }}
                    >
                        {titleExtraToolbar}
                    </Typography>
                </Toolbar>
            }
        </AppBar>
    );
}

export default ChangeHeader;
