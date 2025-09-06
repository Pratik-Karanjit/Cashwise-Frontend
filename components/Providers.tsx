"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <Navbar />
                <div style={{ paddingTop: "10vh" }}>{children}</div>
            </SessionProvider>
        </QueryClientProvider>
    );
}
