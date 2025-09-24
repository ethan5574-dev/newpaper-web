'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, FileText, LogOut, Menu, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    const router = useRouter();
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
                {/* Brand */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
                    <span className="text-xl font-extrabold tracking-tight text-zinc-100">NewPaper</span>
                </div>

                {/* Search - hidden on mobile */}
                <div className="hidden flex-1 items-center justify-center px-6 md:flex">
                    <div className="relative w-full max-w-xl">
                        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full placeholder:text-zinc-400 rounded-full border text-zinc-400 border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Desktop */}
                    <div className="hidden items-center gap-3 md:flex">
                        {!isLoggedIn ? (
                            <button
                                onClick={() => setIsLoggedIn(true)}
                                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                            >
                                Join now!
                            </button>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserDropdown((v) => !v)}
                                    className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-2 py-1 pr-3 hover:bg-zinc-50"
                                >
                                    <Image
                                        src="https://randomuser.me/api/portraits/women/65.jpg"
                                        alt="avatar"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                    <span className="text-sm font-medium">Jane Doe</span>
                                    <ChevronDown className="h-4 w-4 text-zinc-500" />
                                </button>
                                {showUserDropdown && (
                                    <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg">
                                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-50">
                                            <FileText className="h-4 w-4" /> Manage Post
                                        </button>
                                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                                            <LogOut className="h-4 w-4" /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="rounded-md p-2 hover:bg-zinc-100 md:hidden"
                        onClick={() => setShowMobileMenu(true)}
                        aria-label="Open menu"
                    >
                        <Menu />
                    </button>
                </div>
            </div>

            {/* Mobile/Tablet slide-over */}
            {showMobileMenu && (
                <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setShowMobileMenu(false)}></div>
            )}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-[400px] max-w-[90vw] transform bg-white shadow-xl transition-transform duration-300 ${
                    showMobileMenu ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-4">
                    <span className="text-lg font-bold">NewPaper</span>
                    <button className="rounded-md p-2 hover:bg-zinc-100" onClick={() => setShowMobileMenu(false)}>
                        <X />
                    </button>
                </div>
                <div className="space-y-4 p-4">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm outline-none"
                        />
                    </div>
                    {!isLoggedIn ? (
                        <button
                            onClick={() => {
                                setIsLoggedIn(true);
                                setShowMobileMenu(false);
                            }}
                            className="w-full rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                        >
                            Join now!
                        </button>
                    ) : (
                        <div className="flex items-center gap-3 rounded-md border border-zinc-200 p-3">
                            <Image
                                src="https://randomuser.me/api/portraits/women/65.jpg"
                                alt="avatar"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <div>
                                <p className="text-sm font-semibold">Jane Doe</p>
                                <p className="text-xs text-zinc-500">jane@example.com</p>
                            </div>
                        </div>
                    )}
                    <div className="grid gap-2">
                        <button className="flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50">
                            <FileText className="h-4 w-4" /> Manage Post
                        </button>
                        <button className="flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                            <LogOut className="h-4 w-4" /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;


