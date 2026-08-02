import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon,  LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-2/3 h-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl h-[90vh] max-h-[800px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 min-h-0 p-[clamp(1rem,4vh,2rem)] flex items-center justify-center md:border-r border-slate-600/30 overflow-hidden">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-[clamp(0.75rem,3vh,2rem)]">
                  <MessageCircleIcon className="w-[clamp(2rem,5vh,3rem)] h-[clamp(2rem,5vh,3rem)] mx-auto text-slate-400 mb-[clamp(0.5rem,2vh,1rem)]" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back!</h2>
                  <p className="text-slate-400">Sign in to your account</p>
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
                </form>

                <div className="mt-[clamp(0.75rem,2vh,1.5rem)] text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? Sign up
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex flex-col min-h-0 items-center justify-center p-[clamp(1rem,3vh,1.5rem)]  overflow-hidden">
            
<div className="hidden md:flex items-center justify-center">
  <img
    src="/chat.jpg"
    alt="chat"
    className="w-full h-full object-cover filter brightness-100 opacity-60"
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