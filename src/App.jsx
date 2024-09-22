
import React, { useState } from 'react'

function App() {
    const [search, setSearch] = useState('');
  
  const [images, setImages] = React.useState([]);
  const [Data,setData] = React.useState([]);
  useState(() => {
    const fetchImages = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const data = await response.json();
      setImages(data);
    } 
   
    fetchImages();
  }, []);
  const fetchData = async (id)=>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    setData(data);
    console.log(data)
    return res;
  }
  console.log(images)
  const data = images.results;
  const pad = (number, length)=> {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  return (
    <>
      <div className=' mt-4 items-center justify-center text-3xl bg-blue-400 font-bold'>

            <h1 className=' ml-[600px] '>Kanto Pokemon</h1>
     
      </div>
      <div class="flex items-center justify-center p-4">
  <div class="relative w-full max-w-md">
    <input
      type="text"
      class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
    />
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M10 2a8 8 0 105.293 14.707l4.587 4.586a1 1 0 001.415-1.414l-4.586-4.586A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"
        />
      </svg>
    </div>
  </div>
</div>
      
    <div className='flex gap-4 flex-wrap items-center justify-center'>
      {data?.filter((item)=>{
        return search.toLowerCase === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())
      }).map((item,index)=>{
        const segments = item.url.split('/');
        const pokemonId = segments[segments.length - 2];
        const imageUrl ='https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/' + 
                        pad(pokemonId, 3) + '.png';
                        const name = item.name.toUpperCase();
                         
       return  (
        <div key={index} className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
    <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">
      <img
        src={imageUrl}
        alt="card-image"
        className="h-full w-full object-cover rounded-md"
      />
    </div>
    <div className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-slate-800 text-xl font-semibold">
          
        {name}
        </p>
        <p className="text-cyan-600 text-xl font-semibold">
        {pokemonId}
        </p>
      </div>
     
     
    </div>
  </div>
       )
      })}
    </div>
    </>
  )
}

export default App
