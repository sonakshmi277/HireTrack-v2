import React,{useState} from 'react'

function SignIn() {
  const [formData, setFormData] = useState({email: "", password: "" });
       const handleSubmit = (e) => {
           e.preventDefault();
           if (formData.email !== "" && formData.password !== "") {
               console.log("Form submitted");
           }
           else {
               alert("Please fill all details")
           }
       };
       const handleChange = (e) => {
           const { name, value } = e.target;
           setFormData((prev) => ({
               ...prev,
               [name]: value
           }));
       };
       return (
           <div>
               <form onSubmit={handleSubmit}>
                   <input type="text" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                   <input type="text" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                   <button type="submit">Login</button>
               </form>
           </div>
       )
   }

export default SignIn