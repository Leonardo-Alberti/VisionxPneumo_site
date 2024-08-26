import React, { useRef, useState } from 'react'
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import raiox from '../../img/raiox.jpeg'
import Range from '@/Components/Range';

const Analise = ({ auth }) => {

    const [constraste, setContraste] = useState(100);
    const [brilho, setBrilho] = useState(100);
    const [invert, setInvert] = useState(0);

    const [zoom, setZoom] = useState(false);
    const imageRef = useRef(null)

    const handleMouseMove = (e) => {
        if (zoom) {
            imageRef.current = e.target
            const rect = imageRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100 + "%";
            const y = ((e.clientY - rect.top) / rect.height) * 100 + "%";
    
            imageRef.current.style.transform = "scale(2)";
            imageRef.current.style.transformOrigin = `${x} ${y}`; 
        }     
    };

    const handleMouseLeave = () => {
        if (zoom) {
           imageRef.current.style.transform = "scale(1)";
           imageRef.current.style.transformOrigin = "center center"; 
        }    
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Análise de Raio-X</h2>}
        >
            <Head title="Análise de Raio-X" />

            <div className='min-h-full w-100 flex flex-col bg-zinc-800 max-w-7xl m-auto xl:flex-row rounded border border-gray-500'>
                <div className=' flex flex-col xl:flex-[3] flex-1'>
                    <div>
                        <h1 className='text-gray-100 p-6 font-semibold text-2xl'>Sinais de Pneumonia Encontrados</h1>
                    </div>
                    <div className={`h-full relative overflow-hidden ${zoom ? 'cursor-zoom-in' : ''}`} 
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src={raiox}
                            id='img_raiox'
                            alt="Imagem de Raio-X"
                            className={'h-full p-2 w-auto object-cover rounded transition-transform duration-300 ease-in-out'}
                            style={{
                                filter:
                             `contrast(${constraste}%) 
                             brightness(${brilho}%) 
                             invert(${invert}%)`
                            }}
                        />
                    </div>
                </div>
                <div className='w-100 h-100 flex-1'>
                    <div className='p-3 me-4'>
                        <h1 className='text-gray-100 font-medium text-xl p-2'>Filtros</h1>
                        <div className='h-1 bg-gray-500 w-full'></div>
                        <div className='p-6 flex justify-center'>
                            <button className={` rounded border-gray-400 border text-white p-2 ${zoom ? 'bg-primary' : 'bg-zinc-900'} `} onClick={() => setZoom(!zoom)}>Zoom</button>
                        </div>
                        <div>
                            <Range name={'Contraste'} value={constraste} setValue={setContraste} max={200} />
                            <Range name={'Brilho'} value={brilho} setValue={setBrilho} max={200} />
                            <Range name={'Inversão de cores'} value={invert} setValue={setInvert} max={100} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Analise