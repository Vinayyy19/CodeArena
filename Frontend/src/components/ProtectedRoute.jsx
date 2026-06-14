import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * A wrapper for routes that require authentication and specific roles.
 * Prevents restricted pages from mounting if the user is unauthorized.
 * 
 * @param {JSX.Element} children - The protected page component.
 * @param {Array<string>} [allowedRoles] - Optional. If provided, user.preference must match one.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    // 1. Check Authentication
    if (!token || !userStr) {
        return <Navigate to="/auth" replace />;
    }

    let user;
    try {
        user = JSON.parse(userStr);
    } catch (err) {
        // Corrupt user data in localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return <Navigate to="/auth" replace />;
    }

    // 2. Check Authorization (Role-Based Access Control)
    if (allowedRoles && allowedRoles.length > 0) {
        const hasRole = allowedRoles.includes(user.role);
        const hasPreference = allowedRoles.includes(user.preference);
        
        if (!hasRole && !hasPreference) {
            // User is logged in but lacks the required role/preference
            return <Navigate to="/profile" replace />;
        }
    }

    // 3. Authorized! Render the component.
    return children;
};

export default ProtectedRoute;
