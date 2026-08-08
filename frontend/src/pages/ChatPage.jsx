import React from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import useChatStore from '../store/useChatStore'
import ProfileHeader from '../components/ProfileHeader'
import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ChatList from '../components/ChatsList'
import ContactList from '../components/ContactsList'
import ChatContainer from '../components/ChatContainer'
import NoMessages from '../components/NoMessages'

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className='relative w-2/3 h-[90vh] max-h-[800px] flex items-center justify-center'>
      <BorderAnimatedContainer>
        {/* LEFT SIDE - sidebar */}
        <div className={`${selectedUser ? "hidden md:flex" : "flex"} w-full md:w-1/3 h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm flex-col border-r border-lilac-200 dark:border-slate-700/50`}>
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE - active chat */}
        <div className={`${selectedUser ? "flex" : "hidden md:flex"} w-full md:w-2/3 h-full bg-lilac-50/60 dark:bg-slate-800/60 backdrop-blur-sm align-center`}>
          {selectedUser ? <ChatContainer /> : <NoMessages />}
        </div>
      </BorderAnimatedContainer>
    </div>
  )
}

export default ChatPage