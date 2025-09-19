const validate = {
    email:(email,field="email")=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
            return { field, message: 'Invalid Email format' };
        }
        if(email.trim().length > 255){
            return {field, message: 'Email cannot exceed 255 characters'};
        }

    },

    name: (name,field="name")=>{
        if (!name || typeof name !== 'string' ) {
            return { field, message: 'Invalid Name format' };
        }

        if(name.trim().length === 0){
            return {field, message: 'Name is required'};
        }

        if(name.trim().length > 255){
            return {field, message: 'Name cannot exceed 255 characters'};
        }
    }
    ,

    password :(password,field="password",required=false)=>{
        // console.log("paswword=",password,"password Length=",password.trim());
        if (required && !password) {
            return { field, message: `${field} is required` };
        }
        if (password && typeof password !== 'string') {
            return { field, message: `${field} must be a string` };
        }
        
        if (password && password.trim().length < 6) {
            return { field, message: `${field} must be at least 6 characters long` };
        }
        // Must contain at least 1 number
        if (password && !/[0-9]/.test(password)) {
            return { field, message: `${field} must contain at least one number` };
        }

        // Must contain at least 1 special character
        if (password && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return { field, message: `${field} must contain at least one special character` };
        }
    },

    userId: (userId, field = 'userId') => {
    if (userId && !Number.isInteger(userId)) {
      return { field, message: `${field} must be an integer` };
    }
  },

  title: (value, field = "title") => {
    if (typeof value !== "string") {
      return { field, message: `${field} must be a string` };
    }
    if (!value || value.trim().length === 0) {
      return { field, message: `${field} is required` };
    }
    if (value.length < 3) {
      return { field, message: `${field} must be at least 3 characters long` };
    }
    if (value.length > 255) {
      return { field, message: `${field} must not exceed 255 characters` };
    }
   
  },

  enum: (value, field, allowedValues) => {
    // console.log(value.length,"-<")
    if(value === undefined || value === null || value.length===0) return { field, message: `${field} must be one of: ${allowedValues.join(', ')}` };;
    if (!allowedValues.includes(value)) {
        return { field, message: `${field} must be one of: ${allowedValues.join(', ')}` };
    }
},



  string: (value, field, required = false) => {
    if (required && !value) {
      return { field, message: `${field} is required` };
    }
    if (value && typeof value !== 'string') {
      return { field, message: `${field} must be a string` };
    }
    if (value && value.trim() === '') {
      return { field, message: `${field} cannot be empty` };
    }
  },
  
  assignedTo: (value, field = "assignedTo") => {
    if (value === undefined || value === null) return;
    if (typeof value !== "number" || !Number.isInteger(value)) {
      return { field, message: `${field} must be an integer` };
    }
  },

    dueDate: (value, field = "dueDate") => {
    if (!value) return;

    // YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 
    if (!dateRegex.test(value)) {
      return { field, message: `${field} must be in YYYY-MM-DD format` };
    }
    if (isNaN(new Date(value).getTime())) {
      return { field, message: `${field} is not a valid date` };
    }
  },


};


export default validate;
