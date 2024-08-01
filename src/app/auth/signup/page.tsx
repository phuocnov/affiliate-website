'use client';
import { useAuth } from "@/contexts/authContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { signup } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    signup(formInput);
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
    <main className="flex min-h-screen flex-col items-center p-24">
      <Typography variant="h1">Sign up</Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '20px',
        }}>
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
          <Button type="submit" variant="outlined">Submit</Button>
        </Box>
      </form>
    </main>
  );
}
