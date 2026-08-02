import React from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import  useChatStore from '../store/useChatStore'
import ProfileHeader from '../components/ProfileHeader'
import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ChatList from '../components/ChatsList'
import ContactList from '../components/ContactsList'
import ChatContainer from '../components/ChatContainer'
import NoChat from '../components/NoChat'

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className='relative w-2/3 h-[90vh] max-h-[800px] flex items-center justify-center'>
      <BorderAnimatedContainer>
        {/* LEFT SIDE - sidebar */}
        <div className='w-full md:w-1/3 h-full bg-slate-900/50 backdrop-blur-sm flex flex-col border-r border-slate-700/50'>
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE - active chat */}
        <div className='hidden md:flex md:w-2/3 h-full bg-slate-800/30 backdrop-blur-sm items-center justify-center'>
          {selectedUser ? <ChatContainer /> : <NoChat />}
        </div>
      </BorderAnimatedContainer>
    </div>
  )
}

export default ChatPage