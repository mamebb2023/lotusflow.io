"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Users", href: "/admin/users" },
    { name: "Settings", href: "/admin/settings" },
  ];

  const activities = [
    "New users joined today",
    "Email list updated",
    "Database synced successfully",
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data.users || []);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Left Sidebar */}
      <aside className="w-60 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
        <h1 className="text-xl font-semibold mb-6 text-white">Admin Panel</h1>
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-zinc-400 hover:text-indigo-400 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-4 text-white">Email List</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 overflow-auto shadow">
          {loading ? (
            <p className="text-zinc-400">Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-zinc-500">No users found.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="p-2 font-semibold text-zinc-300">#</th>
                  <th className="p-2 font-semibold text-zinc-300">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
                  >
                    <td className="p-2 text-zinc-400">{index + 1}</td>
                    <td className="p-2 text-zinc-100">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Right Info Panel */}
      <aside className="w-80 bg-zinc-900 border-l border-zinc-800 p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Recent Activity
        </h3>
        <ul className="text-sm text-zinc-400 space-y-2">
          {activities.map((activity, i) => (
            <li key={i}>• {activity}</li>
          ))}
        </ul>
        <div className="mt-6 text-sm text-zinc-300">
          <p>
            Total Users:{" "}
            <span className="font-semibold text-indigo-400">
              {users.length}
            </span>
          </p>
        </div>
      </aside>
    </div>
  );
}
