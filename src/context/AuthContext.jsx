import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load user from localStorage on app start
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    // Mock user database (in real app, this would be an API)
    const mockUsers = [
        {
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            password: 'demo123'
        }
    ];

    const login = async (credentials) => {
        setIsLoading(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Find user in mock database
            const foundUser = mockUsers.find(
                u => u.email === credentials.email && u.password === credentials.password
            );

            if (foundUser) {
                const userData = {
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email
                };

                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(userData));

                return { success: true, message: 'Login successful!' };
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            return { success: false, message: error.message || 'Login failed' };
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (userData) => {
        setIsLoading(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check if user already exists
            const existingUser = mockUsers.find(u => u.email === userData.email);
            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            // Create new user (in real app, this would be saved to database)
            const newUser = {
                id: Date.now().toString(),
                name: userData.name,
                email: userData.email,
                password: userData.password
            };

            // Add to mock database
            mockUsers.push(newUser);

            const userInfo = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            };

            setUser(userInfo);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(userInfo));

            return { success: true, message: 'Account created successfully!' };
        } catch (error) {
            return { success: false, message: error.message || 'Signup failed' };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 