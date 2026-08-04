import React from 'react'
import useChatStore from '../store/useChatStore';
import { useEffect ,useRef} from 'react';
import {useAuthStore} from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import NoChatHistoryPlaceholder from './NoChatHistary';
import MessagesLoading from './MessagesLoading';
import MessageInput from './MessageInput';
const ChatContainer = () => {
const { selectedUser,getMessagesByUserId,messages,isMessageLoading } = useChatStore();
const {authUser} = useAuthStore();
const messageEndRef=useRef(null);
useEffect(() => {  
  getMessagesByUserId(selectedUser.supabaseId);
}, [selectedUser,getMessagesByUserId]);
useEffect(()=>{
  if(messageEndRef.current){
    messageEndRef.current.scrollIntoView({behahvior:"smooth"});
  }
},[messages]);

  return (
    <div className='flex flex-col h-full w-full'>

      <ChatHeader/>

      <div className='flex-1 px-6 overflow-y-auto py-8'>
        {messages.length>0 && !isMessageLoading? (
          <div className='max-w-3xl mx-auto space-y-6'>
            {messages.map(msg=>(<div key={msg.id} 
            className={`chat ${msg.senderId===authUser.id?"chat-end":"chat-start"}`}
            >
              <div className={`chat-bubble relative ${
                msg.senderId===authUser.id? "bg-cyan-600 text-white"
                :"bg-slate-800 text-slate-200"
              }`} >

                {msg.image&&<img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover"/>}
                <p className='text-xs mt-1 opacity-75 flex items-center gap-1'>
                  {new Date(msg.createdAt).toISOString().slice(11,16)}
                </p>
                {msg.text && <p className="mt-2">{msg.text}</p>}
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
