import { Box, CircularProgress } from '@mui/material';
import React from 'react';

interface ChartProps {
    value: number
    max: number
}

const ChartComponent: React.FC<ChartProps> = ({ value, max }) => {

    const percentage = (value / max) * 100;

    return <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh' }}>
        <CircularProgress variant='determinate' value={percentage} size={100} />
    </Box>
}

export default ChartComponent;
