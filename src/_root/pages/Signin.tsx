import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { baseUrl } from "@/constants/baseUrl"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"


const Signin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.post(`${baseUrl}/login`, {username, password}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data))
      navigate('/')
    }).catch(err => {
      console.log(err)
    })
  };

  return (
    <div className="sm:w-420 flex-center flex-col">
      <h1>Signin</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
          <Input className="shad-input" type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
          <Input className="shad-input" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          <Button className="shad-button_primary" type="submit">Signin</Button>
      </form>
      <span>Don't have an account click <Link className=" underline" to={"/register"}>here!</Link></span>
    </div>
  )
}

export default Signin