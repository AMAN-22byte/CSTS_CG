function Validation(values){
    let error={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if(values.email===""){
        error.email="Email is required"
    }
    else if (!email_pattern.test(values.email)){
        error.email="Invalid email"
    }

    if(values.password===""){
        error.password="Password is required"
    }
    return error;
}

export default Validation;