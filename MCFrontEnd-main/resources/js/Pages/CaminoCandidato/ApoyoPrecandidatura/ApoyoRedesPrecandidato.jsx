import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faInstagram,
    faLinkedin,
    faTiktok,
    faTwitter,
    faWhatsapp, faYoutube
} from "@fortawesome/free-brands-svg-icons";

const ApoyoRedesPrecandidato = (props) => {

    const {urlFacebook, urlInstagram, urlTwitter, urlTiktok, urlLinkedin, urlWhatsapp, urlYoutube} = props;

    console.log('Props ApoyoRedesPrecandidato', props);
    return (
        <div className='flex justify-center items-center m-auto gap-4 py-6 '>
            {
                urlFacebook ?
                    <a
                        href={urlFacebook} target={"_blank"} rel={"noopener noreferrer"}
                    >
                        <FontAwesomeIcon
                            icon={faFacebookF} size='3x' className='lg:mx-2 md:mx-0'
                        />
                    </a>
                    : null
            }

            {
                urlInstagram ?
                    <a
                        href={urlInstagram} target={"_blank"} rel={"noopener noreferrer"}
                    >
                        <FontAwesomeIcon
                            icon={faInstagram} size='3x' className='lg:mx-2 md:mx-0'
                        />
                    </a>
                    : null
            }

            {
                urlTwitter ?
                    <a
                        href={urlTwitter} target={"_blank"} rel={"noopener noreferrer"}
                    >
                        <FontAwesomeIcon
                            icon={faTwitter} size='3x' className='lg:mx-2 md:mx-0'
                        />
                    </a>
                    : null
            }

            {
                urlTiktok ?
                    <a
                        href={urlTiktok} target={"_blank"} rel={"noopener noreferrer"}
                    >
                        <FontAwesomeIcon
                            icon={faTiktok} size='3x' className='lg:mx-2 md:mx-0'
                        />
                    </a>
                    : null
            }

            {
                urlLinkedin ?
                    <a
                        href={urlLinkedin} target={"_blank"} rel={"noopener noreferrer"}
                    >
                        <FontAwesomeIcon
                            icon={faLinkedin} size='3x' className='lg:mx-2 md:mx-0'
                        />
                    </a>
                    : null
            }

            {
                urlWhatsapp ?
                    <a
                        href={urlWhatsapp} target={"_blank"} rel={"noopener noreferrer"}
                    >
                        <FontAwesomeIcon
                            icon={faWhatsapp} size='3x' className='lg:mx-2 md:mx-0'
                        />
                    </a>
                    : null
            }

            {
                urlYoutube ?
                    <a
                        href={urlYoutube} target={"_blank"} rel={"noopener noreferrer"}
                    >
                        <FontAwesomeIcon
                            icon={faYoutube} size='3x' className='lg:mx-2 md:mx-0'
                        />
                    </a>
                    : null
            }
        </div>
    );
}

export default ApoyoRedesPrecandidato;
