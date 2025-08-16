"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Navbar />
            <div style={{ paddingTop: "10vh" }}>{children}</div>
        </SessionProvider>
    );
}
