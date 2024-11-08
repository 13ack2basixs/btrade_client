import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  
  const [errors, setErrors] = useState({})
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios.post('https://orbital-api-6a176aff984e.herokuapp.com/signup', values)
      .then(res => {
        navigate('/');
      })
      .catch(err => console.log(err));
    }
  }
  
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-30'>
            <h2>Sign up for an account</h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input type='text' placeholder='Enter your username' name='name' className='form-control rounded-0' onChange={handleInput}/>
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter your email' name='email' className='form-control rounded-0' onChange={handleInput}/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter your password' name='password' className='form-control rounded-0' onChange={handleInput}/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Sign Up</strong></button>
                <p>You agree to our terms and conditions</p>
                <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Back to Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup