import { useState,useCallback, useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword]=useState('')

  //useref hook

  const passwordRef = useRef(null)


   const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str +="0123456789"
      
    }
    if (charAllowed) {
      str +="!@#$%^&*()_+={}`~"
      
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipbard =useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
      window.navigator.clipboard.writeText(password)
  },[password])

useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
    
 
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" value={password} ref={passwordRef} className='outline-none w-full py-1 px-3' placeholder='password' readOnly />
   <button onClick={copyPasswordToClipbard} className='text-white bg-blue-800 px-4'>Copy</button>
   
  
   
    </div>
    <div className='flex text-sm gap-x-2 '>
    <div className='flex items-center gap-x-1'>
      <input type="range" min={6} max={100} onChange={(e)=>{setLength(e.target.value)}} value={length} className='cursor-pointer' />
      <label> Length:{length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
    <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={()=>{setNumberAllowed((prev)=>!prev);}} />
    <label> Number </label>
   </div>
   <div className='flex items-center gap-x-1'>
    <input type="checkbox" defaultChecked={charAllowed} id='CharacterInput' onChange={()=>{setNumberAllowed((prev)=>!prev);}} />
    <label htmlFor='characterInput'> Characters </label>
   </div>

   </div>
  

   </div>

    </>
  )
}

export default App
