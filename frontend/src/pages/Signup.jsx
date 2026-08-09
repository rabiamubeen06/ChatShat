import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import ChatShatLogo from "../components/ChatShatLogo";
import CheckInboxNotice from "../components/CheckInboxNotice";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();
  const [showInboxNotice, setShowInboxNotice] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(formData);
    if (success) setShowInboxNotice(true);
  };

  if (showInboxNotice) {
    return <CheckInboxNotice email={formData.email} />;
  }

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
                  <ChatShatLogo className="w-[clamp(10rem,28vh,18rem)] h-auto mx-auto mb-[clamp(0.5rem,2vh,1rem)]" />
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Create Account</h2>
                  <p className="text-slate-500 dark:text-slate-400">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-[clamp(0.75rem,2.5vh,1.5rem)]">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="auth-input"
                        placeholder="Your Name"
                      />
                    </div>
                  </div>

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
                  <button className="auth-btn" type="submit" disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-[clamp(0.75rem,2vh,1.5rem)] text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
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
export default SignUpPage;