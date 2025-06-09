import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'


export default function Home() {

    const [users,setUsers] = useState([])
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}`)
        .then(res=> {
            setUsers(res.data)
        })
        .catch(err=> console.log(err))
    },[])

    const handleDelete = (id)=>{
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/deleteUser/`+id)
        .then(res => {
            console.log(res);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='flex justify-center items-center min-h-[100vh] flex-col'>
            <h2 className='mb-5 text-lg font-semibold uppercase'>CRUD Using MERN</h2>

            <div className='bg-white rounded w-[95%] lg:w-[68%] md:w-[90%] p-10'>
                <a href="/add" className='bg-blue-500 text-white rounded px-4 py-2'>+ Add User</a>
                
                <div className="relative overflow-x-auto mt-5">
                    <table className='text-sm text-left w-full text-gray-500 min-w-[600px]'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Age</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users.map((user,index)=>{
                                    return <tr className='bg-white border-b' key={index}>
                                        <td className="px-6 py-4">{user.userName}</td>
                                        <td className="px-6 py-4">{user.userEmail}</td>
                                        <td className="px-6 py-4">{user.userAge}</td>
                                        <td className="px-6 py-4 flex gap-3">
                                            <Link to={`/update/${user._id}`} className='bg-blue-500 text-white rounded px-4 py-2'>Update</Link>
                                            <a href="" onClick={(e)=> {e.preventDefault(); handleDelete(user._id)}} className='bg-red-500 text-white rounded px-4 py-2'>Delete</a>
                                        </td>
                                    </tr>
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
