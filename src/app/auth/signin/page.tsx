'use client';
import { useAuth } from "@/contexts/authContext";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { login } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    login(formInput);
    router.push("/");
  };

  const handleInput: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography variant="h1">Login</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={formInput.username}
          onChange={handleInput}
        />
        <TextField
          label="Password"
          name="password"
          value={formInput.password}
          onChange={handleInput}
        />
        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
}
