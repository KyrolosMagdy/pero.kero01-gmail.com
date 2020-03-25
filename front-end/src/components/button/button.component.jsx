import React from 'react';
import './button.styles.css';

const Button = ({ buttonContent, design, mode, onClick, disabled, loading, type  }) => {
    return (
        <button
            className={[
                'button',
                `button--${design}`,
                `button--${mode}`
            ].join(' ')}
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
        >
            {loading ? 'Loading...' : buttonContent}
        </button>
    )

}

export default Button;