import React, { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function Authpage() {
  const { login } = useContext(AuthContext);
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  });
  
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      await login({
        email: formData.email,
        password: formData.password,
      });
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      if (!formData.agreedToTerms) {
        alert('Please agree to terms and conditions');
        return;
      }
      console.log('Register:', formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3004/auth/google";
  };

  return (
    <div className="min-h-screen bg-black flex overflow-hidden" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Left Half - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 relative overflow-y-auto">
        {/* Temple background for mobile */}
        <div 
          className="lg:hidden absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/image.png)',
            opacity: 0.1,
            filter: 'blur(2px)'
          }}
        ></div>
        
        <div className="w-full max-w-md relative z-10 my-auto">
          <div className="border-2 bg-black p-4 md:p-6 shadow-2xl" style={{ borderColor: '#FFD98ACC' }}>
            {/* Header */}
            <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#FFFFFF' }}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-xs md:text-sm mb-0.5" style={{ color: '#FFFFFF' }}>
              {isLogin ? "Login to your account" : "Register your account"}
            </p>
            <p className="text-xs md:text-sm mb-4 md:mb-6" style={{ color: '#FFFFFF' }}>
              To continue your journey to Invictus'26
            </p>

            {/* Form */}
            <div className="space-y-3">
              {/* Full Name - Only for Register */}
              {!isLogin && (
                <div className="relative">
                  <img 
                    src="/user.svg" 
                    alt="User" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(61%) saturate(466%) hue-rotate(359deg) brightness(104%) contrast(101%)' }} 
                  />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full border pl-10 pr-4 py-2.5 focus:outline-none rounded text-sm"
                    style={{ 
                      backgroundColor: '#3E3E3E',
                      borderColor: '#FFD98A',
                      borderWidth: '1px',
                      color: '#FFD98A'
                    }}
                  />
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <img 
                  src="/user.svg" 
                  alt="Email" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(61%) saturate(466%) hue-rotate(359deg) brightness(104%) contrast(101%)' }} 
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email or Username"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border pl-10 pr-4 py-2.5 focus:outline-none rounded text-sm"
                  style={{ 
                    backgroundColor: '#3E3E3E',
                    borderColor: '#FFD98A',
                    borderWidth: '1px',
                    color: '#FFD98A'
                  }}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <img 
                  src="/lock.svg" 
                  alt="Password" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(61%) saturate(466%) hue-rotate(359deg) brightness(104%) contrast(101%)' }} 
                />
                <input
                  type="password"
                  name="password"
                  placeholder={isLogin ? "Password" : "Create Password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border pl-10 pr-4 py-2.5 focus:outline-none rounded text-sm"
                  style={{ 
                    backgroundColor: '#3E3E3E',
                    borderColor: '#FFD98A',
                    borderWidth: '1px',
                    color: '#FFD98A'
                  }}
                />
              </div>

              {/* Confirm Password - Only for Register */}
              {!isLogin && (
                <div className="relative">
                  <img 
                    src="/lock.svg" 
                    alt="Confirm Password" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(61%) saturate(466%) hue-rotate(359deg) brightness(104%) contrast(101%)' }} 
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full border pl-10 pr-4 py-2.5 focus:outline-none rounded text-sm"
                    style={{ 
                      backgroundColor: '#3E3E3E',
                      borderColor: '#FFD98A',
                      borderWidth: '1px',
                      color: '#FFD98A'
                    }}
                  />
                </div>
              )}

              {/* Terms Checkbox - Only for Register */}
              {!isLogin && (
                <label className="flex items-start gap-3 text-sm cursor-pointer" style={{ color: '#FFD98A' }}>
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                    required={!isLogin}
                    className="mt-0.5 w-4 h-4 cursor-pointer"
                    style={{ accentColor: '#FFD98A' }}
                  />
                  <span>I agree to the terms of service and privacy policy</span>
                </label>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full font-semibold py-2.5 tracking-wider uppercase text-sm"
                style={{ 
                  backgroundColor: '#FFD98A', 
                  color: '#000000',
                  border: '2px solid #FFD98A'
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-1.5">
                <div className="flex-1 h-px" style={{ backgroundColor: '#FFD98A', opacity: 0.3 }}></div>
                <span className="text-xs font-medium" style={{ color: '#FFD98A' }}>OR</span>
                <div className="flex-1 h-px" style={{ backgroundColor: '#FFD98A', opacity: 0.3 }}></div>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-transparent font-semibold py-2.5 tracking-wider uppercase flex items-center justify-center gap-3 text-sm"
                style={{ 
                  border: '2px solid #FFD98A',
                  color: '#FFD98A'
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Toggle Login/Register */}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-xs pt-1.5"
                style={{ color: '#FFD98A' }}
              >
                {isLogin 
                  ? "Need an account? Register here" 
                  : "Already have an account? Login here"}
              </button>

              {/* Contact Us */}
              <p className="text-center text-xs pt-2" style={{ color: '#FFFFFF' }}>
                Having Trouble?{' '}
                <button 
                  type="button"
                  className="underline"
                  style={{ color: '#FFFFFF' }}
                >
                  Contact Us
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Half - Map */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 bg-black relative overflow-hidden">
        {/* Background Temple Image - Only left half visible from right edge */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/image.png)',
            backgroundPosition: 'right center',
            opacity: 0.15,
            filter: 'blur(1px)',
            transform: 'translateX(50%)'
          }}
        ></div>
        
        {/* Foreground Map */}
        <img 
          src="/image1.png" 
          alt="India Map" 
          className="w-full max-w-lg object-contain relative z-10"
          style={{ 
            filter: 'drop-shadow(0 0 30px rgba(255, 217, 138, 0.4))',
            transform: isLogin ? 'translate(-80px, 0)' : 'translate(-80px, 0px)'
          }}
        />
      </div>
    </div>
  );
}