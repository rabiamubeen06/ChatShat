import React from 'react'
import useChatStore from '../store/useChatStore';
import { useEffect } from 'react';
import UserLoading from './UserLoading';
import {useAuthStore} from '../store/useAuthStore';

const ContactsList = () => {
  const {getAllContacts, allContacts, isUserLoading, setSelectedUser} = useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);
  if(isUserLoading) return <UserLoading />
  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-lilac-100 dark:bg-lilac-500/20 p-4 rounded-lg cursor-pointer hover:bg-lilac-200 dark:hover:bg-lilac-500/100 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3 overflow-x-clip">
            <div className={`avatar ${onlineUsers.includes(contact.supabaseId) ? "avatar-online" : "avatar-offline"}`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
            </div>
            <h4 className="text-slate-800 dark:text-slate-100 font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  )
}

export default ContactsList