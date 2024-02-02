import React from 'react';
import './styles.css';
import logo from './img/logo_mc_blco.png';

export const ContactoFooter = () => {
    return (
        <footer style={{ padding: '1rem 0' }}>
            <div className='wrapper bg-black'>
                <div><img src={logo} /></div>
                <div>
                    <ul>
                        <li><a href="/contacto">Soporte</a></li>
                        <li><a href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales">Aviso de privacidad</a></li>
                    </ul>
                </div>
                <div>
                    <ul>
                        {/* <li><a href="#">Términos y condiciones</a></li> */}
                    </ul>  
                </div>
                <div class="redes">
                    <i class="fa fa-facebook-f"></i>
                    <i class="fa fa-instagram"></i>
                    <i class="fa fa-twitter"></i>
                    <i class="fa fa-youtube"></i>
                    <i class="fa fa-telegram"></i>
                    <i class="fa fa-tiktok"></i>
                    <p>Derechos reservados MOVIMIENTO CIUDADANO 2023</p>

                </div>
            </div>

        </footer>
    );
};
