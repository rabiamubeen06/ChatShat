import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { LockIcon, MailIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import ChatShatLogo from "../components/ChatShatLogo";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn,guestLogin } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
   <div className="w-full h-[100dvh] md:w-2/3 md:h-full flex items-center justify-center p-0 md:p-4">
  <div className="relative w-full h-full md:max-w-6xl md:h-[90vh] md:max-h-[800px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col justify-center md:flex-row md:justify-normal">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 min-h-0 p-[clamp(1rem,4vh,2rem)] flex items-center justify-center md:border-r border-lilac-200 dark:border-slate-700/50 overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-[clamp(0.75rem,3vh,2rem)]">
                  <ChatShatLogo className="w-[clamp(12rem,28vh,18rem)] h-auto mx-auto mb-[clamp(0.5rem,2vh,1rem)]" />
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Welcome Back!</h2>
                  <p className="text-slate-500 dark:text-slate-400">Login to continue Chatting</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-[clamp(0.75rem,2.5vh,1.5rem)]">
                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="auth-input"
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="auth-input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button className="auth-btn" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Login"
                    )}
                  </button>
                 <button
    type="button"
    onClick={guestLogin}
    disabled={isLoggingIn}
    className="w-full mt-3 py-2.5 rounded-lg border border-lilac-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-lilac-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
>
    Continue as Guest
</button>
                </form>

                <div className="mt-[clamp(0.75rem,2vh,1.5rem)] text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? Sign up
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex flex-col min-h-0 items-center justify-center p-[clamp(1rem,3vh,1.5rem)] overflow-hidden bg-lilac-50/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <div className="hidden md:flex items-center justify-center">
                <img
                  src="/chat.jpeg"
                  alt="chat"
                  className="w-full h-full object-cover filter brightness-100 dark:brightness-75 opacity-80"
                />
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default LoginPage;