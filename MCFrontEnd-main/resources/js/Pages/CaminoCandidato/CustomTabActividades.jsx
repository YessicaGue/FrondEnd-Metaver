import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import fallback_url from './imagen-componentes.png';
import fallback from './imagen-eventos.png';




const Tab = ({ label, active, onClick }) => {
  const activeClasses = active ? 'bg-orange-500 justify-center rounded-lg items-center rounded-xl px-4' : '';

  return (
    <button
      className={`px-4 py-2 text-white font-black text-lg ${activeClasses}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const TabActividades = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  let content;
  switch (activeTab) {
    case 0:
      content = 
    //   <div className="w-full min-h-[420px] shadow-xl relative pt-4 bg-white">
        <section className='grid grid-cols-2 gap-6 p-5'>
            <div className="w-full min-h-[400px] bg-gray-100 rounded-xl shadow-xl mt-2 relative">
                <p className='text-blue-600 font-bold pl-5 pt-10 text-lg'>Contenido</p>
                <p className='pl-5 text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="w-full min-h-[400px] bg-gray-100 rounded-xl shadow-xl mt-2 relative">
                <div
                    className='max-sm:h-60 shadow-lg h-full p-5 relative rounded-2xl overflow-hidden flex items-center bg-mc-primary'
                    style={{
                        backgroundImage: `url(${fallback}), url(${fallback})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }}
                >
                </div>                        
            </div>
        </section>
    //   </div>;
      break;
    case 1:
      content = 
      <div className="w-full min-h-[420px] shadow-xl relative pt-4 bg-white">
        <div className="">
            <div className='grid grid-cols-2 m-10'>

            </div>
        </div>
      </div>;        
      break;
    case 2:
      content = 
      <div className="w-full min-h-[420px] shadow-xl relative pt-4 bg-white">
        <div className="">
            <div className='grid grid-cols-2 m-10'>
                
            </div>
        </div>
      </div>;        
      break;
    default:
      content = null;
  }

  return (
    <div>
      <div className="flex border-b">
      <div className='bg-gray-400 mx-2 items-center rounded-xl text-white text-xl shadow-lg font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }}>
        
          <Tab
            label="Actividad 1"
            active={activeTab === 0}
            onClick={() => handleTabClick(0)}
          />
        </div>
        <div className='bg-gray-400 mx-2 items-center rounded-xl text-white text-lg shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }}>
          <Tab
            label="Actividad 2"
            active={activeTab === 1}
            onClick={() => handleTabClick(1)}
          />
        </div>
        <div className='bg-gray-400 mx-2 items-center rounded-xl text-white text-lg shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }}>
          <Tab
            label="Actividad 3"
            active={activeTab === 2}
            onClick={() => handleTabClick(2)}
          />
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default TabActividades;
