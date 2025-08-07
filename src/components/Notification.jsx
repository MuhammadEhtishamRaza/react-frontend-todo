import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'success', isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'info':
                return 'ℹ️';
            default:
                return '✅';
        }
    };

    return (
        <div className={`notification ${type} ${isVisible ? 'show' : ''}`}>
            <div className="notification-content">
                <span className="notification-icon">{getIcon()}</span>
                <span className="notification-message">{message}</span>
                <button className="notification-close" onClick={onClose}>
                    ×
                </button>
            </div>
            <div className="notification-progress"></div>
        </div>
    );
};

export default Notification; 