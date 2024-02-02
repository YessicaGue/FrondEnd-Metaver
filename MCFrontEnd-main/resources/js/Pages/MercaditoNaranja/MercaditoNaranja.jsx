import React from 'react';
import { Container } from '@mui/material';
import CustomLayout from '@/Layouts/CustomLayout';
import a from '../MercaditoNaranja/c.png'; 
import b from '../MercaditoNaranja/b.png'; 
import d from '../MercaditoNaranja/d.png'; 
import e from '../MercaditoNaranja/e.png';



const AsideMenu = () => (
    <aside className='w-full h-full bg-stone-100 p-4'>
                    <h1 className='uppercase font-[Poppins] text-center text-xl font-semibold'>MarketPlace</h1>

                    <h2 className='font-[Poppins] text-center underline text-mc-primary mt-12'>Categorías</h2>

                    <ul className='w-full mt-4 flex flex-col gap-2'>
                        <li className=' hover:border-mc-primary border-4 border-solid border-transparent  rounded-lg py-2 px-4'><a href="">Todos los productos</a></li>
                        <li className=' hover:border-mc-primary border-4 border-solid border-transparent  rounded-lg py-2 px-4'><a href={'../mercadito-naranja-bebidas' }>Bebidas</a></li>
                        <li className=' hover:border-mc-primary border-4 border-solid border-transparent  rounded-lg py-2 px-4'><a href={'../mercadito-naranja-gadgets' } >Gadgets</a></li>
                        <li className=' hover:border-mc-primary border-4 border-solid border-transparent  rounded-lg py-2 px-4'><a href={'../mercadito-naranja-oficinas' }>Oficina</a></li>
                        <li className=' hover:border-mc-primary border-4 border-solid border-transparent  rounded-lg py-2 px-4'><a href={'../mercadito-naranja-textiles' }>Textiles</a></li>
                        <li className=' bg-mc-primary rounded-lg  text-white border-4 border-mc-primary border-solid border-transparent  py-2 px-4'><a href={'../mercadito-naranja-nivel' }>Ver productos de nivel</a></li>
                       
                    </ul>
                
                </aside>

);

const MercaditoNaranja =() => {
return(
    <CustomLayout visible={true}>
        <main className='w-full min-h-max pt-16'>
            
            <section className={'min-h-screen grid grid-cols-4 [&>*:last-child]:col-span-3 max-md:grid-cols-1'}>
            
                <AsideMenu />   

                <aside className='w-full h-full grid grid-cols-3 gap-8 p-8 max-md:grid-cols-1'>
                    <article className='aspect-square w-full border-mc-primary border-2 rounded-xl flex flex-col justify-between items-center'>
                        <div className='h-full w-full object-cover object-t'><img  src={b} alt="Termo"/></div>
                        <div className='bg-slate-100 w-full h-16 flex text-xs items-center justify-between ' p-4>
                            <h2>Obten 2 naranjas</h2>
                            <a className='text-mc-primary' href="">Ver producto</a>
                        </div>
                    </article>

                    <article className='aspect-square w-full border-mc-primary border-2 rounded-xl flex flex-col justify-between'>
                        <div className='aspect-square  h-full w-full object-cover object-t'><img src={a} alt="Termo"/></div>
                        <div className='bg-slate-100 w-full h-16 flex text-xs items-center justify-between' p-4>
                            <h2>Obten 2 naranjas</h2>
                            <a className='text-mc-primary' href="">Ver producto</a>
                        </div>
                    </article>
                    <article className='aspect-square w-full border-mc-primary border-2 rounded-xl flex flex-col justify-between'>
                        <div className='aspect-square  h-full w-full object-cover object-t'><img  src={d} alt="Termo"/></div>
                        <div className='bg-slate-100 w-full h-16 flex text-xs items-center justify-between' p-4>
                            <h2>Obten 2 naranjas</h2>
                            <a className='text-mc-primary' href="">Ver producto</a>
                        </div>
                    </article>

                    <article className='aspect-square w-full border-mc-primary border-2 rounded-xl flex flex-col justify-between'>
                        <div className='h-full w-full object-cover object-t'> <img  src={b} alt="Termo"/>  </div>
                        <div className='bg-slate-100 w-full h-16 flex text-xs items-center justify-between' p-4>
                            <h2>Obten 2 naranjas</h2>
                            <a className='text-mc-primary' href="">Ver producto</a>
                        </div>
                    </article>

                    <article className='aspect-square w-full border-mc-primary border-2 rounded-xl flex flex-col justify-between'>
                        <div className='aspect-square  h-full w-full object-cover object-t'><img  src={e} alt="Termo"/></div>
                        <div className='bg-slate-100 w-full h-16 flex text-xs items-center justify-between' p-4>
                            <h2>Obten 2 naranjas</h2>
                            <a className='text-mc-primary' href="">Ver producto</a>
                        </div>
                    </article>

                    <article className='aspect-square w-full border-mc-primary border-2 rounded-xl flex flex-col justify-between'>
                        <div className='aspect-square  h-full w-full object-cover object-t'><img  src={b} alt="Termo"/></div>
                        <div className='bg-slate-100 w-full h-16 flex text-xs items-center justify-between' p-4>
                            <h2>Obten 2 naranjas</h2>
                            <a className='text-mc-primary' href="">Ver producto</a>
                        </div>
                    </article>
                   
                </aside>
              
            </section>
        
        </main>
    </CustomLayout>
)

}

export default MercaditoNaranja;