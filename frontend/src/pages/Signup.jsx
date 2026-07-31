import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import { MessageCircleIcon, UserIcon } from 'lucide-react';

const Signup = () => {
    const [formData,setFormData]=useState({fullName:"",email:"",password:""});
    const {signUp,isSigningUp}=useAuthStore();
    const handleSubmit=(e)=>{

    }
  return (
    <div className='w-full flex items-center justify-center p-4 bg-blue-950'>
      <div className='relative w-full max-w-6xl md:h-[800px] h-[650px]'>
        <BorderAnimatedContainer>
            <div className='w-full flex flex-col md:flex-row'>
                {/* form left side */}
                <div className='md:1/2 p-8 flex items-center justify-center
                md:border-r border-slate-600/30'>
                    <div className='w-full max-w-md'>
                        {/* heading */}
                       <div className='text-center mb-8'>

                        <MessageCircleIcon className='w-12 h-12 mx-auto text-slate-400 mb-4'/>
                         <h2 className='text-3xl font-bold mb-6 text-slate-200'>Create an Account</h2>
                         <p className='text-slate-400'>Signup for a new account</p>
                       </div>
                       {/* form */}
                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div>
                                
                                  <label className='auth-input-label'>Full Name</label>
                                  <div className='relative'>
                                    <UserIcon className='auth-input-icon'/>
                                    <input type='text'
                                    value={formData.fullName}
                                    onChange={(e)=>{setFormData({...formData,fullName:e.target.value})}}
                                    className='auth-input'
                                    placeholder='e.g Alex'/>
                                  </div>
                            </div>
                        </form>


                    </div>
                    
                </div>
            </div>

        </BorderAnimatedContainer>
      </div>

    </div>
  )
}

export default Signup
