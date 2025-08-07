import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import Notification from '../components/Notification';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

const AuthPage = () => {
    const [mode, setMode] = useState('login');
    const [notification, setNotification] = useState({
        isVisible: false,
        message: '',
        type: 'success'
    });

    const { login, signup, isLoading } = useAuth();

    const showNotification = (message, type = 'success') => {
        setNotification({
            isVisible: true,
            message,
            type
        });
    };

    const hideNotification = () => {
        setNotification(prev => ({ ...prev, isVisible: false }));
    };

    const handleAuthSubmit = async (formData) => {
        const authFunction = mode === 'login' ? login : signup;
        const result = await authFunction(formData);

        if (result.success) {
            showNotification(result.message, 'success');
        } else {
            showNotification(result.message, 'error');
        }
    };

    const handleToggleMode = () => {
        setMode(prev => prev === 'login' ? 'signup' : 'login');
    };

    return (
        <div className="auth-page">
            <div className="auth-background">
                {/* Animated background elements */}
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                    <div className="shape shape-5"></div>
                </div>
            </div>

            <div className="auth-content">
                <div className="brand-section">
                    <div className="brand-logo">
                        <span className="logo-icon">✅</span>
                        <h1 className="brand-title">TodoApp</h1>
                    </div>
                    <p className="brand-tagline">
                        Organize your life, one task at a time
                    </p>
                    <div className="brand-features">
                        <div className="feature">
                            <span className="feature-icon">🚀</span>
                            <span>Lightning Fast</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">🔒</span>
                            <span>Secure & Private</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">📱</span>
                            <span>Works Everywhere</span>
                        </div>
                    </div>
                </div>

                <AuthForm
                    mode={mode}
                    onSubmit={handleAuthSubmit}
                    onToggleMode={handleToggleMode}
                    isLoading={isLoading}
                />
            </div>

            <Notification
                isVisible={notification.isVisible}
                message={notification.message}
                type={notification.type}
                onClose={hideNotification}
            />
        </div>
    );
};

export default AuthPage; 