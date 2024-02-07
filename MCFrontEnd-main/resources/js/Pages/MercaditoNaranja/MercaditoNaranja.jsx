import React from 'react';
import { Container } from '@mui/material';
import CustomLayout from '@/Layouts/CustomLayout';
import a from '../MercaditoNaranja/c.png'; 
import b from '../MercaditoNaranja/b.png'; 
import d from '../MercaditoNaranja/d.png'; 
import e from '../MercaditoNaranja/e.png';



const AsideMenu = () => (
    <aside className='w-full h-full bg-stone-100 p-4 static'>
                    <h1 className='uppercase font-[Poppins] text-center text-xl font-semibold'></h1>

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

        <main className='w-full min-h-max pt-16 '>
            
        










        <div class="grid grid-rows-1 grid-cols-4 min-w-20 bg-stone-100 pl-2 border-spacing-2 p-2 max-md:grid-cols-1">
            <aside>
                <div>
                <h1 className='uppercase font-[Poppins] text-center pt-6 text-4xl font-semibold'>MarketPlace</h1>
                </div>
            </aside>  

            <form class="flex items-center ">   
    <label for="Buscar" class="sr-only">Search</label>
    <div class="relative min-w-3 ">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required></input>
    </div>
    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-gray-100 rounded-lg border border-black hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-700 dark:hover:bg-gray-100 dark:focus:bg-gray-100">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
</form>

    
    <div class="grid-cols-4 min-h-3 bg-stone-100  max-md:grid-cols-1  ">
    <aside className='w-full   grid grid-cols-4 gap-2   '>
    
    <article className=' aspect-square border-mc-primary border-2  '>
               
    </article>
    <article className=' border-mc-primary border-2    '>
               
    </article>
    <article className=' border-mc-primary border-2  '>
               
    </article>
    <article className=' border-mc-primary border-2   '>
               
    </article>
</aside>
  
    </div>

        <aside className=' grid-cols-4 min-h-3 bg-stone-100  max-md:grid-cols-1 pl-56 '>
            <div>
               <h2 className='text-mc-primary font-semibold'>Nivel Bronce </h2> 
               <a className='text-mc-primary'>ver mi avance  </a>
            </div>
        </aside>  

 </div>





            






        

            <section className={'min-h-screen grid grid-cols-4 [&>*:last-child]:col-span-3 max-md:grid-cols-1'}>
        
                  <AsideMenu />   
                
               <aside className='w-full h-full grid grid-cols-3 gap-8 p-8 max-md:grid-cols-1 '>
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