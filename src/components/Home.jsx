import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addToPaste,updateToPaste } from '../redux/pasteslice'
import toast,{ Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const allPastes = useSelector((state)=>state.paste.pastes);
  const [title,setTitle] = useState('')
  const [value,setValue] = useState('')
  const [searchParams,setSearchParams] = useSearchParams()
  const pasteId = searchParams.get("pasteId")
  const dispatch = useDispatch()
  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((item)=>item._id===pasteId)
      setTitle(paste.title)
      setValue(paste.content)
    } 
   
  }, [pasteId])
  
  function createPaste(){
    const paste = {
      title:title,
      content:value,
      _id:pasteId || Date.now().toString(35),
      createdAt:new Date().toISOString().split('T')[0],
    }
    if(pasteId){
      dispatch(updateToPaste(paste))
    }else{
      dispatch(addToPaste(paste))
    }

    setValue("")
    setTitle("")
    setSearchParams({})
  
  }

  return (
    <div>
      <div className='my-7 flex gap-[100px] justify-between' >
      <input className='bg-[#1a1a1a] min-w-[300px] border rounded-md p-4 text-lg' type="text" placeholder='Enter title here' value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <button className='bg-[#1a1a1a]  border rounded-md text-lg p-4' onClick={createPaste}>{pasteId ? "Update My Paste" :"Create My Paste"}</button>
      </div>
      <div className='relative'>
        <textarea className='bg-[#1a1a1a] min-w-[100%] p-5 text-xl border-t-[50px] border-2 border-[#bbb8b8] rounded-md' value={value} placeholder='Enter content here' onChange={(e)=>setValue(e.target.value)} rows={20} cols={60}></textarea>
        <button className='border rounded-md  p-2 absolute top-17 right-5 ' onClick={()=>{navigator.clipboard.writeText(value);    toast.success("Copied to clipboard")}}>
                  <FontAwesomeIcon icon={faCopy} />
          </button>
      </div>
      
    </div>
  )
}

export default Home
