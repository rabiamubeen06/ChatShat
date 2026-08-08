import React from 'react'
import useChatStore from '../store/useChatStore';
import { useEffect } from 'react';
import UserLoading from './UserLoading';
import NoChatsFound from './NoChatsFound';
import {useAuthStore} from '../store/useAuthStore';
const ChatsList = () => {
  const {getChats, chats, isUserLoading,setSelectedUser} = useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getChats();
  }, [getChats]);
  if(isUserLoading)return <UserLoading/>
  if(chats.length === 0) return <NoChatsFound/>

  return (
    <>
    {chats.map(chat=>(
      <div key={chat.id} 
      onClick={()=>setSelectedUser(chat)}
        className="bg-lilac-100 dark:bg-lilac-500/20 p-4 rounded-lg cursor-pointer hover:bg-lilac-200 dark:hover:bg-lilac-500/100 transition-colors">
         <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat.supabaseId) ? "avatar-online" : "avatar-offline"}`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
              </div>
            </div>
            <h4 className="text-slate-800 dark:text-slate-100 font-medium truncate">{chat.fullName}</h4>
          </div>

      </div>
    ))}
    </>
  )
}

export default ChatsList