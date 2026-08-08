import React from 'react'
import useChatStore from '../store/useChatStore';

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className='tabs tabs-boxed bg-transparent p-2 m-2 flex gap-2'>
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab flex-1 ${activeTab === "chats" ? "tab-active bg-lilac-100 dark:bg-lilac-500/20 text-lilac-700 dark:text-lilac-300" : "text-slate-500 dark:text-slate-400"}`}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab flex-1 ${activeTab === "contacts" ? "tab-active bg-lilac-100 dark:bg-lilac-500/20 text-lilac-700 dark:text-lilac-300" : "text-slate-500 dark:text-slate-400"}`}
      >
        Contacts
      </button>
    </div>
  )
}

export default ActiveTabSwitch