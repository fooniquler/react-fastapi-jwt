import React from 'react';
import { Box, Button, InputLabel, TextField } from '@mui/material';

interface LoginFormProps {
    onLogin: (username: string, password: string) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password)
    }

    return <Box 
                component='form' 
                onSubmit={handleSubmit} 
                sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100vh'
                }}
            >
        <TextField
            margin='normal'
            required
            sx={{ width: '500px' }}
            id='username'
            label='Логин'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
            margin='normal'
            required
            sx={{ width: '500px' }}
            id='password'
            label='Пароль'
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit' sx={{ width: '500px' }} variant="contained">
            Авторизоваться
        </Button>
    </Box>
};

export default LoginForm;
