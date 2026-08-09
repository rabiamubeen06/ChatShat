import React from 'react'
import useChatStore from '../store/useChatStore';
import { useEffect ,useRef} from 'react';
import {useAuthStore} from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import NoChatHistoryPlaceholder from './NoChatHistary';
import MessagesLoading from './MessagesLoading';
import MessageInput from './MessageInput';
const ChatContainer = () => {
const { selectedUser,getMessagesByUserId,messages,isMessageLoading,subscribeToMessages ,unsubscribeFromMessages} = useChatStore();
const { socket } = useAuthStore();

const {authUser} = useAuthStore();
const messageEndRef=useRef(null);
useEffect(() => {
  if (!selectedUser) return;
  getMessagesByUserId(selectedUser.supabaseId);
}, [selectedUser, getMessagesByUserId]);

useEffect(() => {
  if (!selectedUser || !socket) return;
  subscribeToMessages();
  return () => unsubscribeFromMessages();
}, [selectedUser, socket, subscribeToMessages, unsubscribeFromMessages]);
useEffect(()=>{
  if(messageEndRef.current){
    messageEndRef.current.scrollIntoView({behavior:"smooth", block: "nearest" });
  }
},[messages]);

if (!selectedUser) return null;

  return (
    <div className='flex flex-col h-full w-full '>

      <ChatHeader/>

      <div className='relative flex-1 px-6 overflow-y-auto py-8 '>
        {messages.length>0 && !isMessageLoading? (
          <div className='max-w-3xl mx-auto space-y-6'>
            {messages.map(msg=>(<div key={msg.id} 
            className={`chat ${msg.senderId===authUser.profileId?"chat-end":"chat-start"}`}
            >
              <div className={`chat-bubble relative ${
                msg.senderId===authUser.profileId? "bg-lilac-500 text-white"
                :"bg-lilac-100 dark:bg-lilac-500/20 text-slate-800 dark:text-slate-100"
              }`} >

                {msg.image&&<img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover"/>}
                
                {msg.text && <p className="mt-2">{msg.text}</p>}
                <p className='text-xs mt-1 opacity-75 flex items-center gap-1'>
                  {new Date(msg.createdAt).toLocaleTimeString(undefined
                    ,{
                      hour:"2-digit",
                      minute:"2-digit",
                    }
                  )}
                </p>

              </div>
            </div>))}
            <div ref={messageEndRef}/>
          </div>
        ): isMessageLoading?<MessagesLoading/>:( 
          <NoChatHistoryPlaceholder name={selectedUser.fullName}/>)}
        </div>
        <MessageInput/>


    </div>
  )
}

export default ChatContainer