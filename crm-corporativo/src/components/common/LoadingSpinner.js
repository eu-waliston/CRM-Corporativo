import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className={`flex justify-center ites-center ${className}`}>
            <div className={`${sizes[size]} vorder-4 border-primary-200 border-t-primary-600 rounded-full animate-spin`}>

            </div>
        </div>
    )
}

export default LoadingSpinner;