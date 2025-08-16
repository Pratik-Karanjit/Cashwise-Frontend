"use client"

import { createContext, ReactNode, useContext, useState } from "react";

type User = {
    _id: string;
    email: string;
    role: string;
    token?: string;
}

type AuthContextType = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("CashWise User", JSON.stringify(userData)); // optional
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("CashWise User");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider.");
    return ctx;
}