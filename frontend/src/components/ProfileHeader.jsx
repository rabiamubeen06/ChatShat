import React, { useState, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import usechatStore from '../store/useChatStore';
import { LogOutIcon } from 'lucide-react'

const ProfileHeader = () => {
    const { logout, authUser, updateProfile } = useAuthStore();

    const [selectImg, setSelectImg] = useState(null);
    const fileInputRef = useRef(null);

    if (!authUser) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            const base64Image = reader.result;
            setSelectImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    return (
        <div className='p-6 border-b border-lilac-200 dark:border-slate-700/50'>
            <div className='flex items-center justify-between'>
                <div className="flex items-center gap-3">
                    <div className="avatar avatar-online">
                        <div className="w-14 rounded-full">
                            <button
                                className='w-full h-full relative group block'
                                onClick={() => fileInputRef.current.click()}
                            >
                                <img
                                    src={selectImg || authUser.profilePic || "/avatar.png"}
                                    alt="User Img"
                                    className='w-full h-full object-cover'
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-white text-xs">Change</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <div>
                        <h3 className="text-slate-800 dark:text-slate-100 font-medium text-base max-w-[180px]">
                            {authUser.fullName}
                        </h3>
                       
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    {/* LOGOUT BTN */}
                    <button
                        className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        onClick={logout} title="Logout"
                    >
                        <LogOutIcon className="size-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader