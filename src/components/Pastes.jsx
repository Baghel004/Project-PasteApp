import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteslice';
import toast,{ Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil,faTrash,faEye,faCopy,faClipboard } from '@fortawesome/free-solid-svg-icons';


const Pastes = () => {
  const pastes = useSelector((state)=>state.paste.pastes)
  const [searchItem,setItem]= useState('');
  const dispatch = useDispatch();
  const filteredData = pastes.filter(
    (paste)=>paste.title.toLowerCase().includes(searchItem.toLowerCase())
  )

  function handleClick(pasteId){
    console.log(pasteId)
    dispatch(removeFromPaste(pasteId));
    console.log("b")

  }

  return (
    <div>
      <input className='my-10 max-w-[600px] min-w-[400px] border text-xl p-2 pl-4 rounded-md bg-[#1a1a1a]' type="search" value={searchItem} placeholder='search' onChange={(e)=>{setItem(e.target.value)}} />
      <div className=' space-y-10'>
        {
        filteredData.length>0 &&
        filteredData.map(
          (paste,index)=>{
            return (
              <div key={index} className='bg-[#1a1a1a] flex border rounded-md p-10 gap-20 max-w-[600px] min-w-[400px]'>
                <div className='flex  flex-col gap-6 w-[50%]'>
                <div className='text-4xl break-words w-full text-start line-clamp-1 ' >
                 <h1>{paste.title}</h1>
                </div>
                <div className=' break-words w-full  text-start  line-clamp-3'>
                 {paste.content}
                </div>
                </div>
               
                <div className='flex flex-col gap-6 justify-start py-3  '>
                  <div className='flex gap-6 text-xl'>
                  <button className='border rounded-md p-1'>
                  <a href={`/?pasteId=${paste?._id}`}>
                  <FontAwesomeIcon icon={faPencil} />
                    </a>
                  </button>
                
                  <button className='border rounded-md  p-1' >
                    <a href={`/pastes/${paste?._id}`}>
                    <FontAwesomeIcon icon={faEye} />
                    </a>
                  </button>
                
                
                  <button className='border rounded-md  p-1' onClick={() => handleClick(paste?._id)}>
                     <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button className='border rounded-md  p-1' onClick={()=>{navigator.clipboard.writeText(paste?.content); toast.success("Copied to clipboard")}}>
                  <FontAwesomeIcon icon={faCopy} />
                    </button>
                    
                  </div>
                 
          
                    <div className='text-xl'>
                    <FontAwesomeIcon icon={faClipboard} />
                    <span className='ml-2'>{paste.createdAt}</span>
                    </div>
                
                </div>
                
                
                
              </div>
            )
          }
        )
        }
      </div>
      
    </div>
  )
}

export default Pastes
