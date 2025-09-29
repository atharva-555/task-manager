import { Link } from 'react-router-dom';
import { Lock, Mail, UserPlus, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // form data
    const [formData,setformData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })


const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
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
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

        // console.log(validateForm());
        if(!validateForm()){
            return
        }
        
        setIsLoading(true);
        try {
            // console.log(formData);
            await dispatch(authService.register(formData,navigate));
        } finally {
            setIsLoading(false);
        }
    }

  return (
     <div className='h-screen items-center mt-8 md:mt-24 '>
      <div className='shadow-medium rounded-lg w-fit m-auto sm:min-w-fit md:min-w-[500px]'>
       <div className="max-w-2xl m-auto card-header text-center border-b-[1px] border-gray-100 pb-4 pt-4 bg-gray-50">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-100 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
          <p className="text-gray-600 mt-2">Begin your journey with us</p>
        </div>
        <div className='max-w-2xl m-auto shadow-medium rounded-lg p-8'>
            <form onSubmit={(e)=>handleSubmit(e)} className='form'>

                {/* Name */}
                <div className='mb-3'>      
                    <label htmlFor="name" className='form-label flex mb-1'>Name</label>
                    <div className="relative border-[1px] border-gray-400 rounded-md ">
                        <div className="flex items-center w-full h-10 px-2">
                            <User className='w-5 h-5 text-gray-400' />
                            <input  type="text" name="name" value= {formData.name} onChange={handleChange} placeholder='Enter your Name'  className='flex form-input w-full h-10 px-2 focus:outline-none'/>
                        </div>
                    </div>
                    {errors.name && <span className='text-red-500 text-sm'>{errors.name}</span>}
                </div>
                


                {/* Email */}
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label mb-1'>Email Address</label>
                    <div className="relative border-[1px] border-gray-400 rounded-md ">
                        <div className="flex items-center w-full h-10 px-2">
                            <Mail className='w-5 h-5 text-gray-400' />
                            <input type="email" name="email" value= {formData.email} onChange={handleChange} placeholder='Enter your email' className='flex form-input w-full h-10 px-2 focus:outline-none'/>
                        </div>

                    </div>
                {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
                </div>


               {/* Password */}
               <div className='mb-3'>
                 <label htmlFor="password" className='form-label mb-1'>Password</label>
                    <div className='relative border-[1px] border-gray-400 rounded-md cursor-pointer'>
                        <div className="flex items-center w-full h-10 px-2">
                            <Lock className='w-5 h-5 text-gray-400' />                    
                            <input type={showPassword?'text':'password'} name="password" value= {formData.password} onChange={handleChange} placeholder='Enter your password' className='flex form-input focus:outline-none w-full h-10 px-2 '/>
                            {showPassword?<EyeOff className='w-5 h-5 text-gray-400' onClick={() => setShowPassword(!showPassword)}/>:<Eye className='w-5 h-5 text-gray-400' onClick={() => setShowPassword(!showPassword)}/>}
                        </div>
                    </div>
                    {errors.password && <span className='text-red-500 text-sm'>{errors.password}</span>}
                </div>
               

                {/* Confirm Password */}
                <div className='mb-3'>
                    <label htmlFor="confirmPassword" className='form-label mb-1'>Confirm Password</label>
                    <div className='relative border-[1px] border-gray-400 rounded-md cursor-pointer'>
                        <div className="flex items-center w-full h-10 px-2">
                            <Lock className='w-5 h-5 text-gray-400' />                    
                            <input type={showConfirmPassword?'text':'password'} name="confirmPassword" value= {formData.confirmPassword} onChange={handleChange} placeholder='Confirm password' className='flex form-input focus:outline-none w-full h-10 px-2 '/>
                            {showConfirmPassword?<EyeOff className='w-5 h-5 text-gray-400' onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>:<Eye className='w-5 h-5 text-gray-400' onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>}
                        </div>
                    </div>
                    {errors.confirmPassword && <span className='text-red-500 text-sm'>{errors.confirmPassword}</span>}
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
                            <p className='ml-2'>Creating account...</p>
                        </>
                    ) : (
                        <>
                            <UserPlus className='w-5 h-5'/>
                            <p className='ml-2'>Register</p>
                        </>
                    )}
                </button>
            </form>

            <div className='flex justify-center items-center text-sm'>
                <Link  className='' to={'/login'}>Already have an account? <span className='text-primary-600'>Login</span></Link>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Register