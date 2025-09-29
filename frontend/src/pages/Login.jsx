import { Link } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock,Eye,EyeOff,LogIn, Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const location = useLocation();

    // Get loading state from Redux
  const { loading } = useSelector(state => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

    // form data
    const [formData,setformData] = useState({
        email: '',
        password: '',
    })



  // Error messages
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
   if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character';
    }
    
    
    setErrors(newErrors);

    // Return true if there are no errors
    if(Object.keys(newErrors).length === 0){
        return true
    }
    else {
        return false;}
  };

    // Manage form states
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData(prev => ({
            ...prev,
            [name]: value   
        }))


        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Submit function 
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // console.log(formData);
        // console.log("erros:",errors);
        if(!validateForm()){
            return
        }
        
        setIsLoading(true);
        try {
            const response = await dispatch(authService.login(formData));
            if(response.success && response.user){

                // Get the intended destination from location state or default based on role
                // const from = location.state?.from?.pathname;
                let redirectPath;
                
                // Check role and redirect the user
                if (response.user.role === 'admin') {
                    // redirectPath = from && from.startsWith('/dashboard/admin') ? from : '/dashboard/admin';
                    redirectPath = '/dashboard/admin';
                } else if (response.user.role === 'user') {
                    // redirectPath = from && from.startsWith('/dashboard/user') ? from : '/dashboard/user';
                    redirectPath = '/dashboard/user';
                } else {
                  // If the role is unknown
                    redirectPath = '/dashboard/user';
                }
                
                // Navigate to the appropriate dashboard
                navigate(redirectPath, { replace: true });
            }
        } finally {
            setIsLoading(false);
        }

    }

  return (
    <div className='h-screen items-center mt-8 md:mt-32 '>
      <div className='shadow-medium rounded-lg w-fit m-auto sm:min-w-fit md:min-w-[500px]'>
       <div className="max-w-2xl m-auto card-header text-center border-b-[1px] border-gray-100 pb-4 pt-8 bg-gray-50">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        <div className='max-w-2xl m-auto shadow-medium rounded-lg p-8'>

            {/* <h2 className='text-2xl font-bold text-center'>Login</h2> */}
            <form onSubmit={handleSubmit} className='form'>

                {/* Email */}
                <label htmlFor="email" className='form-label mb-1'>Email Address</label>
                <div className='mb-3'>  
                  <div className="relative border-[1px] border-gray-400 rounded-md mb-2">
                      <div className="flex items-center w-full h-10 px-2">
                          <Mail className='w-5 h-5 text-gray-400' />
                          <input type="email" name="email" value= {formData.email} onChange={handleChange} placeholder='Enter your email' className='flex form-input w-full h-10 px-2 focus:outline-none'/>
                      </div>
                  </div>
                  {errors.email && <p className='text-red-600 text-sm'>{errors.email}</p>}
                </div>
                 <br></br>

                {/* Password */}
                <label htmlFor="password" className='form-label mb-1'>Password</label>
                <div className='mb-3'>
                  <div className='relative border-[1px] border-gray-400 rounded-md cursor-pointer'>
                    <div className="flex items-center w-full h-10 px-2">
                      <Lock className='w-5 h-5 text-gray-400' />                    
                      <input type={showPassword?'text':'password'} name="password" value= {formData.password} onChange={handleChange} placeholder='Enter your password' className='flex form-input focus:outline-none w-full h-10 px-2 '/>
                      {showPassword?<EyeOff className='w-5 h-5 text-gray-400' onClick={() => setShowPassword(!showPassword)}/>:<Eye className='w-5 h-5 text-gray-400' onClick={() => setShowPassword(!showPassword)}/>}                     
                    </div>
                  </div>
                  {errors.password && <p className='text-red-600 text-sm'>{errors.password}</p>}
                </div>
                

                <button 
                    className={`mx-auto my-4 flex justify-center items-center px-4 py-2 rounded-md text-white ${
                        isLoading 
                            ? 'bg-primary-600 cursor-not-allowed' 
                            : 'bg-primary-600 hover:bg-primary-700'
                    }`} 
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className='w-5 h-5 animate-spin'/>
                            <p className='ml-2'>Logging in...</p>
                        </>
                    ) : (
                        <>
                            <LogIn className='w-5 h-5'/>
                            <p className='ml-2'>Login</p>
                        </>
                    )}
                </button>
            </form>

             <div className='flex justify-center items-center text-sm'>
                <Link  className='' to={'/register'}>Don't have an account? <span className='text-primary-600'>Register</span></Link>
            </div>
        </div>
      </div>
       
    </div>
  )
}

export default Login