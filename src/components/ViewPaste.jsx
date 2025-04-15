import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const {id} = useParams()
  const allPastes = useSelector((state)=>state.paste.pastes)
  const paste = allPastes.find((p)=>p._id===id)
  return (
    <div>
      <div className='my-7 flex gap-5 max-w-[600px] min-w-[400px]' >
      <input className='bg-[#1a1a1a] text-xl w-full p-3 rounded border' type="text" placeholder='Enter title here' value={paste.title} onChange={(e)=>setTitle(e.target.value)} disabled/>
      </div>
      <div className='bg-[#1a1a1a] w-full p-3 rounded-md border border-[#bbb8b8] border-t-[50px]'>
        <textarea value={paste.content} placeholder='Enter content here' onChange={(e)=>setValue(e.target.value)} rows={20} cols={60} disabled></textarea>
      </div>
      
    </div>
  )
}

export default ViewPaste
