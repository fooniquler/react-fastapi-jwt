import React from 'react';
import { ChartData, DecodedToken } from './Models';
import { Snackbar } from '@mui/material';
import LoginForm from './components/LoginForm';
import { jwtDecode } from 'jwt-decode';
import ChartComponent from './components/Chart';

const App: React.FC = () => {
    const [token, setToken] = React.useState<string | null>(localStorage.getItem('token') || null);
    const [chartData, setChartData] = React.useState<ChartData | null>(null);
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');

    const isTokenExpired = (token: string): boolean => {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    };

    React.useEffect(() => {
        if (token) {
            if (isTokenExpired(token)) {
                handleLogout();
            }
            else {
                fetchChartData();
            }
        }
    }, [token]);

    const handleLogin = async (username: string, password: string) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const data = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Disposition': 'form-data;'
            },
            body: formData
        });

        if (!data.ok) {
            setSnackbarMessage('Неверные данные');
            setOpenSnackbar(true);
        }
        else {
            const newToken = (await data.json()).access_token;
            setToken(newToken);
            localStorage.setItem('token', newToken);

            setSnackbarMessage('Вы успешно авторизовались');
            setOpenSnackbar(true);
        }
    };

    const handleLogout = () => {
        setToken(null);
        setChartData(null);
        localStorage.removeItem('token');
        
        setSnackbarMessage('Истек токен');
        setOpenSnackbar(true);
    };

    const fetchChartData = async () => {
        const data = await fetch('/chart-data', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
            
        if (!data.ok) {
            if (data.status == 401) {
                handleLogout();
            }
        }
        else {
            setChartData(await data.json());
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    
    return <div>
        {token ? (
            <ChartComponent value={chartData?.value!} max={chartData?.max!} />
        ) : (
            <LoginForm onLogin={handleLogin}/>
        )}
        <Snackbar 
            message={snackbarMessage}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            open={openSnackbar}
        />
    </div>
};

export default App;
