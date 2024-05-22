import React from 'react';
import './LoadingSpinner.css'

export function LoadingSpinner({size})
{
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" style={{ height: `${size}rem`, width: `${size}rem` }} role="status"></div>
      </div>
    );
}