import React from 'react';
import { useNavigate } from 'react-router';
import { MailIcon } from 'lucide-react';
import BorderAnimatedContainer from './BorderAnimatedContainer';
import ChatShatLogo from './ChatShatLogo';

const CheckInboxNotice = ({ email }) => {
  const navigate = useNavigate();

  return (
    <div className="w-2/3 h-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl h-[90vh] max-h-[800px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex items-center justify-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-[clamp(1rem,4vh,2rem)]">
            <div className="w-full max-w-md text-center">
              <ChatShatLogo className="w-[clamp(10rem,26vh,16rem)] h-auto mx-auto mb-[clamp(0.5rem,2vh,1rem)]" />

              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
                Check your inbox
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-1">
                We sent a confirmation link{email ? <> to <span className="text-slate-700 dark:text-slate-300">{email}</span></> : ""}.
              </p>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Once you've confirmed your email, log in to continue.
              </p>

              <button onClick={() => navigate('/login')} className="auth-btn">
                Continue to login
              </button>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default CheckInboxNotice;