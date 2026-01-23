import React, { useContext,useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { Eye,EyeOff } from 'lucide-react';
import { useRouter } from "next/router";


export default function Authpage({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  const { user, isAdmin, authLoading, login, register, Adminlogin, loading, regError } = useContext(AuthContext);
  const backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [isLogin, setIsLogin] = useState(true);
  const [eyeToggle, setEyeToggle] = useState(false);
  const [errors, setErrors] = useState({});
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const router = useRouter();

useEffect(() => {
  if (authLoading) return;

  if (isAdmin) {
    router.replace("/Admin");
    return;
  }

  if (user) {
    router.replace("/Dashboard");
  }
}, [user, isAdmin, authLoading, router]);


  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  });
  
  useEffect(() => {
    if (regError) {
      showErrors({
        server: regError,
      });
    }
  }, [loading]);


  useEffect(() => {
      if (!setLotusClass) return
      setLotusStyle({})
  
      setLotusClass(`absolute
        top-3/4 left-1/2
        -translate-x-1/2 -translate-y-1/2
        w-[160px]
        opacity-80
        z-999
        transition-all duration-700 ease-in-out
      `)
  
      const timeout = setTimeout(() => {
        setLotusClass(`absolute
          top-3/4 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[160px]
          opacity-0
          
          -z-999
          transition-all duration-500 ease-in-out
        `)
      }, 500)
  
      return () => clearTimeout(timeout)
    }, [setLotusClass, setLotusStyle])

    useEffect(() => {
      if (!setFigureClass || !setFigureStyle) return;
    
      setFigureStyle({
        left: "0px",
        bottom: "0px",
        transform: "translate(10%, 10%)",
      });
    
      setFigureClass(`
        fixed
        w-[120px]
        md:w-[140px]
        lg:w-[190px]
        pointer-events-none
        z-[30]
        opacity-90
        drop-shadow-[0_0_30px_rgba(255,215,138,0.4)]
        transition-all duration-700 ease-out
      `)

      const timeout = setTimeout(() => {
        setFigureClass(`fixed
        w-[120px]
        md:w-[140px]
        lg:w-[190px]
        pointer-events-none
        z-[30]
        opacity-0
        drop-shadow-[0_0_30px_rgba(255,215,138,0.4)]
        transition-all duration-700 ease-out
        `)
      }, 500)
  
      return () => clearTimeout(timeout)
    }, [setFigureClass, setFigureStyle]);
  
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const validate = () => {
  const newErrors = {};

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (!isLogin && formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }

  if (!isLogin) {
    if (!formData.fullName.trim() || formData.fullName.length > 30) {
      newErrors.fullName = "Full name is required";
      if(formData.fullName.length > 30) newErrors.fullName = "Name should be less than 30 letters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = "You must agree to the terms";
    }
  }

  if (Object.keys(newErrors).length > 0) {
    showErrors(newErrors);
    return false;
  }

  return true;

};

const showErrors = (newErrors) => {
  setErrors(newErrors);

  setTimeout(() => {
    setErrors({});
  }, 3000);
};

const adminLogin = () => {
  setIsAdminLogin(!isAdminLogin);
  setIsLogin(true);
}

const handleSubmit = async (e) => {
  e.preventDefault();

    if (isAdminLogin) {
    if (!formData.userName || !formData.password) {
      showErrors({ admin: "Username and password required" });
      return;
    }

    if (!formData.userName.trim() || formData.userName.length > 30) {
      showErrors({ admin: "username too long" });
      return;
    }

    if (!formData.password.trim() || formData.password.length > 30) {
      showErrors({ admin: "password too long" });
      return;
    }

    try {
      await Adminlogin({
      username: formData.userName,
      password: formData.password,
    });
    } catch (error) {
      console.log(error);
    }

    return;
  }

  if (!validate()) return;

  try {
    if (isLogin) {
      await login({
        email: formData.email,
        password: formData.password,
      });
      return;
    } else {
    const result = await register({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    });

    if (result?.success) {
      await login({
        email: formData.email,
        password: formData.password,
      });
}

    }
  } catch (err) {
    console.error(err);
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
    window.location.href = `${backend_URL}/auth/google`;
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
            opacity: 0.7,
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
                  {errors.fullName && (
                    <p className="text-xs mt-1 text-red-400">{errors.fullName}</p>
                  )}

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
                  type={isAdminLogin ? "text" : "email"}
                  name={isAdminLogin ? "userName" : "email"}
                  placeholder={isAdminLogin ? "userName" : "Email"}
                  value={isAdminLogin ? formData.userName : formData.email}
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
                {errors.email && (
                  <p className="text-xs mt-1 text-red-400">{errors.email}</p>
                )}

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
                  type = {eyeToggle ? "text" : "password"}
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
                {errors.password && (
                  <p className="text-xs mt-1 text-red-400">{errors.password}</p>
                )}

                <div
                className="absolute right-5 top-[40%] -translate-y-1/2 w-4 h-4"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(78%) sepia(61%) saturate(466%) hue-rotate(359deg) brightness(90%) contrast(101%)",
                }}
                onClick={() => setEyeToggle(v => !v)}
              >
                {eyeToggle ? <Eye /> : <EyeOff />}
              </div>
    
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
                    type = {eyeToggle ? "text" : "password"}
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

                  {errors.confirmPassword && (
                    <p className="text-xs mt-1 text-red-400">{errors.confirmPassword}</p>
                  )}

                <div
                  className="absolute right-5 top-[40%] -translate-y-1/2 w-4 h-4"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(78%) sepia(61%) saturate(466%) hue-rotate(359deg) brightness(90%) contrast(101%)",
                  }}
                  onClick={() => setEyeToggle(v => !v)}
                >
                  {eyeToggle ? <Eye /> : <EyeOff />}
              </div>

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
                  {errors.agreedToTerms && (
                    <p className="text-xs text-red-400">{errors.agreedToTerms}</p>
                  )}

                  <span>I agree to the terms of service and privacy policy</span>
                </label>
              )}

              {/* Submit Button */}
              {errors.admin && (
                <p className="text-xs text-red-400 text-center mb-1">
                  {errors.admin}
                </p>
                )}
                {errors.server && (
                  <p className="text-xs text-red-400 text-center mb-1">
                    {errors.server}
                  </p>
                )}
              <button
                type="button"
                onClick={handleSubmit}
                className={`w-full font-semibold py-2.5 bg-[#FFD98A] hover:bg-[#917d53] cursor-pointer tracking-wider uppercase text-sm 
                    ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:bg-[#917d53]"}  ` }
                style={{ 
                  color: '#000000',
                  border: '2px solid #FFD98A'
                }}
              >

              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  {isLogin ? "LOGGING IN" : "REGISTERING"}
                </>
              ) : (
                isLogin ? "LOGIN" : "REGISTER"
              )}
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
                className={`w-full bg-transparent hover:bg-[#917d53] cursor-pointer font-semibold py-2.5 tracking-wider uppercase flex items-center justify-center gap-3 text-sm ${isAdminLogin ? "hidden" : ""} `}
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
              onClick={() => setIsLogin(v => !v)}
              className={`w-full text-xs pt-1.5 text-[#FFD98A] relative
                        after:absolute after:left-1/2 after:-bottom-0.5
                        after:h-px after:w-0 after:bg-[#FFD98A]
                        after:transition-all after:duration-300
                        after:-translate-x-1/2 hover:after:w-[70%] cursor-pointer ${isAdminLogin ? "hidden" : ""} `}
            >
              {isLogin
                ? "Need an account? Register here"
                : "Already have an account? Login here"}
            </button>

              {/* admin login */}
              <p className="text-center text-xs pt-2" style={{ color: '#FFFFFF' }}>
                {isAdminLogin ? "User?" : "Admin?"}{' '}
                <button 
                  type="button"
                  className="underline cursor-pointer"
                  onClick={adminLogin}
                  style={{ color: '#FFFFFF' }}
                >
                  Login here
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