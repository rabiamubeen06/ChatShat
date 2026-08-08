import React from 'react'
import useChatStore from '../store/useChatStore';
import { useEffect } from 'react';
import {useAuthStore} from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { XIcon, SunIcon, MoonIcon ,ArrowLeftIcon} from 'lucide-react';

const ChatHeader = () => {
    const {selectedUser,setSelectedUser} = useChatStore();
    const {onlineUsers}=useAuthStore();
    const { theme, toggleTheme } = useThemeStore();
    const isOnline=selectedUser ? onlineUsers.includes(selectedUser.supabaseId): false;
    useEffect(() => {

            const handleEscKey=(event) => {
                if(event.key==="Escape")setSelectedUser(null);
            }
            window.addEventListener('keydown', handleEscKey);
            return () => {
                window.removeEventListener('keydown', handleEscKey);
            }
    },[setSelectedUser])
  return (
    <div className='flex justify-between items-center bg-white/70 dark:bg-slate-900/80 border-b
   border-lilac-200 dark:border-slate-700/50 max-h-[84px] px-6 flex-1'>
        <div className='flex items-center space-x-3'>
        <div className={`avatar ${isOnline? "avatar-online":"avatar-offline"}`}>
            <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePic || "/avatar.png"} alt={selectedUser?.fullName} />

            </div>
        </div>
      <div>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">{selectedUser?.fullName}</h3>
        <p className="text-sm text-slate-500 dark:text-lilac-300">{isOnline?"Online": "Offline"}</p>
      </div>
      </div>
      <div className='flex items-center gap-3'>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-lilac-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
        <button onClick={()=>setSelectedUser(null)}>
           <XIcon className="hidden md:block w-5 h-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer" />
           <ArrowLeftIcon className="block md:hidden w-5 h-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer" />
        </button>
      </div>

    </div>
  )
}

export default ChatHeader