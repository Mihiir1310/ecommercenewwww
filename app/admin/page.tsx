"use client";

import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <p>Welcome, {session?.user?.name ?? "Admin"}!</p>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
}
