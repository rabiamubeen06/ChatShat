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
      className='flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors'>
         <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat.id) ? "avatar-online" : "avatar-offline"}`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
          </div>

      </div>
    ))}
    </>
  )
}

export default ChatsList
