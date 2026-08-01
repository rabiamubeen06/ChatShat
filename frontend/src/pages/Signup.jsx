import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import { MessageCircleIcon, UserIcon ,MailIcon,LockIcon} from 'lucide-react';

const Signup = () => {
    const [formData,setFormData]=useState({fullName:"",email:"",password:""});
    const {signup,isSigningUp}=useAuthStore();
    const handleSubmit=(e)=>{
       e.preventDefault();
    signup(formData);
    }
  return (
    
      <div className='relative w-full max-w-6xl md:h-200 h-162.5'>
        <BorderAnimatedContainer>
            <div className='w-full flex flex-col md:flex-row'>
                {/* form left side */}
                <div className='md:w-1/2 p-8 flex items-center justify-center
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
                                   <label className='auth-input-label'>Email</label>
                                  <div className='relative'>
                                    <MailIcon className='auth-input-icon'/>
                                    <input type='email'
                                    value={formData.email}
                                    onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
                                    className='auth-input'
                                    placeholder='e.g alex@example.com'/>
                                    

                                  </div>
                                   <label className='auth-input-label'>Password</label>
                                  <div className='relative'>
                                    <LockIcon className='auth-input-icon'/>
                                    <input type='password'
                                    value={formData.password}
                                    onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
                                    className='auth-input'
                                    placeholder='********'/>
                                    

                                  </div>
                            </div>
                        </form>


                    </div>
                    
                </div>
            </div>

        </BorderAnimatedContainer>
      

    </div>
  )
}

export default Signup
