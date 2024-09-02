import React, { useRef, useState } from 'react'
import raiox from '../../img/raiox.jpeg'
import mapaCalor from '../../img/mapa_calor.png'
import imgAnalise from '../../img/img_analise.png'
import Range from '@/Components/Range';
import Image from '@/Components/Image';
import Upload from './Upload';

const ResultadoUpload = ({image}) => {
    const [constraste, setContraste] = useState(100);
    const [brilho, setBrilho] = useState(100);
    const [invert, setInvert] = useState(0);
    const [scr, setScr] = useState(image)
    const [zoom, setZoom] = useState(false);

    return (
        <div className='min-h-full w-100 flex flex-col bg-zinc-800 max-w-7xl m-auto xl:flex-row rounded border border-gray-500'>
            <div className=' flex flex-col xl:flex-[3] flex-1'>
                <div>
                    <h1 className='text-gray-100 p-6 font-semibold text-2xl'>Sinais de Pneumonia Encontrados</h1>
                </div>
                <div className={`h-full relative overflow-hidden ${zoom ? 'cursor-zoom-in' : ''}`} >
                    <Image scr={scr} zoom={zoom} constraste={constraste} brilho={brilho} invert={invert} />
                </div>
            </div>
            <div className='w-100 h-100 flex-1'>
                <div className='p-3 me-4'>
                    <h1 className='text-gray-100 font-medium text-xl p-2'>Filtros</h1>
                    <div className='h-1 bg-gray-500 w-full'></div>
                    <div className='p-5 flex justify-center'>
                        <button className={` rounded border-gray-400 border text-white p-2 ${zoom ? 'bg-primary' : 'bg-zinc-900'} `} onClick={() => setZoom(!zoom)}>Zoom</button>
                    </div>
                    <div className='m-3'>
                        <Range name={'Contraste'} value={constraste} setValue={setContraste} max={200} />
                        <Range name={'Brilho'} value={brilho} setValue={setBrilho} max={200} />
                        <Range name={'Inversão de cores'} value={invert} setValue={setInvert} max={100} />
                    </div>
                    <h1 className='text-gray-100 font-medium text-xl p-2 mt-3'>Alterar Imagem</h1>
                    <div className='h-1 bg-gray-500 w-full'></div>
                    <div className='p-6 flex justify-center content-center xl:flex-col gap-2 flex-wrap'>
                        <button id='original' className='bg-zinc-900 py-2  w-40 text-gray-200 border-gray-400 border rounded-sm text-center hover:bg-zinc-800' onClick={() => setScr(raiox)}>Original</button>
                        <button id='mapa_calor' className='bg-zinc-900 py-2  w-40 text-gray-200 border-gray-400 border rounded-sm text-center hover:bg-zinc-800' onClick={() => setScr(mapaCalor)}>Mapa de Calor</button>
                        <button id='analise' className='bg-zinc-900 py-2  w-40 text-gray-200 border-gray-400 border rounded-sm text-center hover:bg-zinc-800' onClick={() => setScr(image)}>Análise</button>
                    </div>
                    <h1 className='text-gray-100 font-medium text-xl p-2'>Legendas</h1>
                    <div className='h-1 bg-gray-500 w-full'></div>
                    <div className='flex m-3 flex-col justify-center content-center gap-2'>
                        <div className='flex content-center gap-2'>
                            <div className='w-8 h-8 bg-zinc-900 self-center border-gray-400 border rounded-sm '></div>
                            <p className='text-gray-100 self-center'>Sinais de Pneumonia</p>
                        </div>
                        <div className='flex content-center gap-2'>
                            <div className='w-8 h-8 bg-blue-500 self-center border-gray-400 border rounded-sm '></div>
                            <p className='text-gray-100 self-center'>Baixa Densidade</p>
                        </div>
                        <div className='flex content-center gap-2'>
                            <div className='w-8 h-8 bg-green-400 self-center border-gray-400 border rounded-sm '></div>
                            <p className='text-gray-100 self-center'>Média Densidade</p>
                        </div>
                        <div className='flex content-center gap-2'>
                            <div className='w-8 h-8 bg-red-400 self-center border-gray-400 border rounded-sm '></div>
                            <p className='text-gray-100 self-center'>Alta</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultadoUpload