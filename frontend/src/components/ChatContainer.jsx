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
  getMessagesByUserId(selectedUser.supabaseId);
    if (!socket) return;
  subscribeToMessages();
  return ()=>unsubscribeFromMessages();
}, [selectedUser,getMessagesByUserId,subscribeToMessages,unsubscribeFromMessages]);
useEffect(()=>{
  if(messageEndRef.current){
    messageEndRef.current.scrollIntoView({behavior:"smooth", block: "nearest" });
  }
},[messages]);


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
                msg.senderId===authUser.profileId? "bg-cyan-600 text-white"
                :"bg-slate-500 text-slate-200"
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
