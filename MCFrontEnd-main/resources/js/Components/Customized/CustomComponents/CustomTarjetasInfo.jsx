import React from 'react';
import { Button } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { Instagram as InstagramIcon, Twitter as TwitterIcon, WhatsApp as WhatsAppIcon, LinkedIn as LinkedInIcon  } from '@mui/icons-material';
import { GiCheckMark } from 'react-icons/gi';
import { Favorite as HeartIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const CustomTarjetasInfo = (props) => {
    const { 
      seguidores, 
      eventos, 
      siguiendo, 
      onModalOpen, 
      followable, 
      followed, 
      seguir,
      perfilGrupal,
      urlFacebook,
      urlInstagram, 
      urlTwitter,
      urlTiktok, 
      urlWhatsapp,
      urlLinkedin,
      onFollowersModalOpen
    } = props;

    console.log(props)

    const handleFollowButton = () => {
      const body = { seguidoId: perfilGrupal.perfilGrupal.id };

      const formData = new FormData();
      formData.append('data', JSON.stringify(body));

      axios.post(route('post.perfil.grupal.follow'), formData)
          .then(async (response) => {
              if (response.status !== 200 || !response.data.success)
                  return Swal.fire({
                      title: `Algo salió mal al intentar seguir este perfil. Por favor, inténtalo más tarde.`,
                      icon: 'info',
                      confirmButtonText: 'Aceptar',
                  });

              await Swal.fire({
                  title: `Ahora ya sigues este perfil`,
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
              });

              location.reload();
          });
      };

    return (
        <div className='w-full flex flex-col gap-4 py-2'>
            <div className="w-full bg-[rgba(255,255,255,0.7)] rounded-xl p-3 max-md:mt-2">
                <div className='grid grid-cols-4'>
                    <div 
                        className='w-full rounded-xl py-3 text-center text-white relative cursor-pointer' style= {{ backgroundColor:'#3f9675', clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)' }}
                        onClick={ onFollowersModalOpen }
                    >
                        <h1 className="text-3xl font-[Montserrat] font-black">{ seguidores.length }</h1>

                        <h1 className='font-bold text-md font-sans-serif' style={{ fontFamily: 'Montserrat'}} >seguidores</h1>

                    </div>
                <div className='w-full text-center text-white rounded-xl bg-green-600 border-1 py-3 relative' style={{ backgroundColor:'#3f9675', margin: '0 -2% 0 -2%', clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%,15% 50%)' }}>
                <h1 className="text-3xl" style={{ fontFamily: 'Montserrat' ,fontWeight: '900' }}>{ eventos.length }</h1>
                <h1 className='font-bold text-md font-sans-serif' style={{ fontFamily: 'Montserrat'}} >eventos</h1>
                </div>
                <>
                  {
                        followable
                        ?
                        <div className='flex flex-wrap font-bold text-md font-sans-serif' style={{ fontFamily: 'Montserrat', color: 'white', fontWeight: '700', textTransform: 'lowercase' }} > 
                        <Button className='w-full text-center rounded-xl text-white text-xl border-1 py-8' style={{ backgroundColor:'#6f1f9c', clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%, 15% 50%)' }} 
                          variant={`${!followed ? 'outlined' : 'contained'}`} onClick={ () => !followed ? handleFollowButton() : null }
                          >
                              <GiCheckMark className='font-bold text-2xl mr-1' style={{ fontStyle: 'italic', fontWeight: '900' }}/> 
                              {
                                  !followed ? 'Unirse' : 'Te has unido a este perfil'
                              }
                        </Button>
                        </div>
                      :   null
                    }
                </>
                {/* <Button className='w-full text-center rounded-xl text-white text-xl border-1 py-8' style={{ backgroundColor:'#6f1f9c', clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%, 15% 50%)' }}>
                <div className='flex flex-wrap font-bold text-md font-sans-serif' style={{ fontFamily: 'Montserrat', color: 'white', fontWeight: '700', textTransform: 'lowercase' }} >
                    <GiCheckMark className='font-bold text-2xl mr-1' style={{ fontStyle: 'italic', fontWeight: '900' }}/> 
                  {'unirse'}</div>
                </Button> */}
                <div className='w-full rounded-xl border-1 pl-0 py-3 pl-8'>
                    {/* <a href=""><InstagramIcon className='mx-1' style={{ color: 'purple' }} /></a>
                    <a href=""><FontAwesomeIcon icon={faFacebookF} className='mx-2' style={{ color: 'purple' }} /></a>
                    <a href=""><TwitterIcon className='' style={{ color: 'purple' }} /></a> <br /> */}
                    {urlInstagram && <a href={urlInstagram} target="_blank" rel="noopener noreferrer"><InstagramIcon className='mx-1' style={{ color: 'purple' }}  /></a>}
                    {urlFacebook && <a href={urlFacebook} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} className='mx-2 pt-1 text-xl' style={{ color: 'purple' }}   /></a>}
                    {urlTwitter && <a href={urlTwitter} target="_blank" rel="noopener noreferrer"><TwitterIcon className='' style={{ color: 'purple' }}  /></a>}
                    {urlWhatsapp && <a href={urlWhatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className='' style={{ color: 'purple' }}  /></a>}
                    {urlLinkedin && <a href={urlLinkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon className='' style={{ color: 'purple' }}  /></a>}
                    {urlTiktok && <a href={urlTiktok} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTiktok} className='' style={{ color: 'purple' }}  /></a>}
                    <Button color='secondary' className="border-2 px-1 py-1 rounded-md">
                      <HeartIcon  style={{  margin: '5%', fill: 'none', stroke: 'purple', fontFamily: 'Poppins, sans-serif' }} />
                    </Button>
                </div> 
              </div>
          </div>
        </div>
      );
      
};

export default CustomTarjetasInfo;