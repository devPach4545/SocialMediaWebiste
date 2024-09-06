import { Button, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { loginUserAction } from '../../Redux/Auth/auth.action'
import { useNavigate } from 'react-router-dom'

const initialValues = {
    email:"",
    password:""
}
const validationSchemas = {email:Yup.string().email("Invalid email").required("Email is required"),
    password:Yup.string().min(6,"Password must be at least 6 characters").required("Password is required")
}
const Login = () => {
    // formValue is the variable and setFormValue is the function to update the variable
    const [formValue, setFormValue] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values) =>{
     
        console.log("hadle submission", values)
        dispatch(loginUserAction({data:values}))
        navigate("/");
    

    }
    return (
        <>
            <Formik onSubmit={handleSubmit}  /*validationSchema={validationSchemas}*/ initialValues={initialValues}>
                <Form className='space-y-5'>
                    <div className='space-y-5'>
                        <div>
                            <Field as={TextField} name='email' placeholder="Email" type="email" variant="outlined" fullWidth />
                            <ErrorMessage name='email' component={'div'} className="text-red-500" />
                            
                            <Field as={TextField} name='Password' placeholder="Password" type="Password" variant="outlined" fullWidth />
                            <ErrorMessage name='Password' component={'div'} className="text-red-500" />
                        </div>

                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{backgroundColor:"#", color:"#fff"}}
                        >
                        Login
                    </Button>
                </Form>
            </Formik>
            <div className='flex gap-2 justify-center items-center pt-5'>
                <p>Don't have an account ?</p>
                <Button onClick={()=>navigate("/signup")}>SIGN UP</Button>
            </div>
        </>
    )
}

export default Login