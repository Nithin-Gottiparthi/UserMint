import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function AddUser() {
    const [userName,setUserName] = useState();
    const [userEmail,setUserEmail] = useState();
    const [userAge,setUserAge] = useState();
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_SERVER_URL}/createUser`,{userName,userEmail,userAge})
        .then(res=> {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))
        
        
    }
    
    return (
        <div className='flex justify-center items-center min-h-[100vh]'>
            <div className='bg-white rounded  w-[95%] md:w-1/2 p-10'>
                <p className='font-bold text-lg'>Add User</p>

                <form onSubmit={handleSubmit} className="w-full mt-4">
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input type="text" id="name" onChange={(e)=> setUserName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none block w-full p-2.5" placeholder="Enter user name" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" id="email" onChange={(e)=> setUserEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none block w-full p-2.5" placeholder="user@email.com" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">Age</label>
                        <input type="number" id="age" onChange={(e)=> setUserAge(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none block w-full p-2.5 " placeholder='Age' required />
                    </div>
                    <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded text-sm w-full sm:w-auto px-10 py-2.5 text-center ">Submit</button>
                </form>

            </div>
        </div>
    )
}
