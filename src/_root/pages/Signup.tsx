import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${baseUrl}/users`, {
      name,
      email,
      password,
     
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      alert(res.data.message)
      navigate('/login')
    }).catch(err => {
      console.log(err);
    })
  };
  return (
    <div className=" w-1/2 mx-auto mt-8">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Name"
          className="shad-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <Input
          type="email"
          placeholder="Email"
          className="shad-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Password"
          className="shad-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        <Button type="submit" className="shad-button_primary">
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Signup;
