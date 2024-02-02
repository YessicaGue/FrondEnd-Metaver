import React from 'react';
import { Container } from '@mui/material';
import CustomLayout from '@/Layouts/CustomLayout';


const AsideMenu = () => (
    <aside className='w-full h-full bg-stone-100 p-4'>
                    <h1 className='uppercase font-[Poppins] text-center text-xl font-semibold'>MarketPlace</h1>

                    <h2 className='font-[Poppins] text-center underline text-mc-primary mt-12'>Categorías</h2>

                    <ul className='w-full mt-4'>
                        <li className=' hover:border-mc-primary border-4 border-solid border-transparent  rounded-lg py-2 px-4'><a href="">Todos los productos</a></li>
                        <li className=' hover:border-mc-primary border-4 border-solid border-transparent  rounded-lg py-2 px-4'><a href="">Bebidas</a></li>
                        <li className=' hover:border-mc-primary border-4 border-solid border-transparent  rounded-lg py-2 px-4'><a href="">Gadgets</a></li>
                        <li className=' hover:border-mc-primary border-4 border-solid border-transparent  rounded-lg py-2 px-4'><a href="">Oficina</a></li>
                        <li className=' hover:border-mc-primary border-4 border-solid border-transparent  rounded-lg py-2 px-4'><a href="">Textiles</a></li>
                        <li className=' hover:border-mc-primary border-4 border-solid border-transparent  rounded-lg py-2 px-4'><a href="">Ver productos de nivel</a></li>
                       
                    </ul>
                
                </aside>

);

const Gadgets =() => {
return(
    <CustomLayout visible={true}>
        <main className='w-full min-h-max pt-16'>
            <section className={'min-h-screen grid grid-cols-4 [&>*:last-child]:col-span-3 max-md:grid-cols-1'}>
                
                <AsideMenu />
                <aside className='w-full h-full grid grid-cols-3 gap-8 p-8 max-md:grid-cols-1'>
                    <article className='aspect-square w-full border-mc-primary border-2 rounded-xl flex flex-col justify-between'>
                        <div className='aspect-square w-40'></div>
                        <div className='bg-slate-100 w-full h-16 flex text-xs items-center justify-between' p-4>
                            <h2>Obten 2 naranjas</h2>
                            <a className='text-mc-primary' href="">Ver producto</a>
                        </div>
                    </article>

                    <article className='aspect-square w-full border-mc-primary border-2 rounded-xl flex flex-col justify-between'>
                        <div className='aspect-square w-40'></div>
                        <div className='bg-slate-100 w-full h-16 flex text-xs items-center justify-between' p-4>
                            <h2>Obten 2 naranjas</h2>
                            <a className='text-mc-primary' href="">Ver producto</a>
                        </div>
                    </article>
                    <article className='aspect-square w-full border-mc-primary border-2 rounded-xl flex flex-col justify-between'>
                        <div className='aspect-square w-40'></div>
                        <div className='bg-slate-100 w-full h-16 flex text-xs items-center justify-between' p-4>
                            <h2>Obten 2 naranjas</h2>
                            <a className='text-mc-primary' href="">Ver producto</a>
                        </div>
                    </article>

                    <article className='aspect-square w-full border-mc-primary border-2 rounded-xl flex flex-col justify-between'>
                        <div className='aspect-square w-40'></div>
                        <div className='bg-slate-100 w-full h-16 flex text-xs items-center justify-between' p-4>
                            <h2>Obten 2 naranjas</h2>
                            <a className='text-mc-primary' href="">Ver producto</a>
                        </div>
                    </article>

                    <article className='aspect-square w-full border-mc-primary border-2 rounded-xl flex flex-col justify-between'>
                        <div className='aspect-square w-40'></div>
                        <div className='bg-slate-100 w-full h-16 flex text-xs items-center justify-between' p-4>
                            <h2>Obten 2 naranjas</h2>
                            <a className='text-mc-primary' href="">Ver producto</a>
                        </div>
                    </article>

                    <article className='aspect-square w-full border-mc-primary border-2 rounded-xl flex flex-col justify-between'>
                        <div className='aspect-square w-40'></div>
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


export default Gadgets;