import React from 'react';
import CustomLayout from '@/Layouts/CustomLayout';

function MultiversoTutorial() {
  return (
    <CustomLayout visible={ true } >
        <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
            <div className='bg-gray-200 w-full py-10 pl-20 pr-10'>
                <div className='text-4xl font-bold border-l-4 border-black pl-20 py-10'>
                    BIENVENID@ AL MULTIVERSO <br /> TUTORIAL PARA EMPEZAR
                </div>
            </div>
        </div>
    </CustomLayout>
  );
}

export default MultiversoTutorial;