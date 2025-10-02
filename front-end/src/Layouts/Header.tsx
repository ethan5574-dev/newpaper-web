'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, FileText, LogOut, Menu, Search, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import { login, register } from '@/fetching/auth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { toastError } from '@/utils/toast';
import { setCookie, cookieSetting } from '@/utils/cookie';
import { useContextStore } from '@/context/store';

const Header: React.FC = () => {
    const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    const router = useRouter();
    const { setIsAuthentication, isAuthentication, profile, setProfile, logout } = useContextStore();
    const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
    const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const loginMutation = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: (res: any) => {
            const token = res?.data?.accessToken;
            if (token) {
                setCookie('accessToken', token, { ...cookieSetting(), 'max-age': 60 * 60 * 24 * 7, 'sameSite': 'Lax' });
            }
            toast.success('Logged in successfully');
            setIsAuthentication(true);
            setProfile(res?.data?.user);
            setShowAuthModal(false);
        },
        onError: (err: any) => {
            // Log the error message from the API response
            const errorMessage = err?.response?.data?.message?.message || err?.message || 'An error occurred';
            toastError(errorMessage);
        },
    });

    const registerMutation = useMutation({
        mutationFn: () => register(email, password, fullName),
        onSuccess: (res: any) => {
            const token = res?.accessToken;
            if (token) {
                setCookie('accessToken', token, { ...cookieSetting(), 'max-age': 60 * 60 * 24 * 7, 'sameSite': 'Lax' });
            }
            toast.success('Account created');
            setIsAuthentication(true);
            setShowAuthModal(false);
            setProfile(res?.data?.user);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message?.message || err?.message || 'An error occurred';
            toastError(errorMessage);
        },
    });

    const isAuthLoading = loginMutation.isPending || registerMutation.isPending;
    return (
        <>
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
                        {!isAuthentication ? (
                            <button
                                onClick={() => { setAuthTab('login'); setShowAuthModal(true); }}
                                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 cursor-pointer"
                            >
                                Join now!
                            </button>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserDropdown((v) => !v)}
                                    className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-2 py-1 pr-3 hover:bg-zinc-50 cursor-pointer"
                                >
                                    {profile?.avatar ? (
                                        <Image
                                            src={profile.avatar}
                                            alt="avatar"
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-semibold">
                                            {(profile?.username || 'U').charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium">{profile?.username || 'User'}</span>
                                    <ChevronDown className="h-4 w-4 text-zinc-500" />
                                </button>
                                {showUserDropdown && (
                                    <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg">
                                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-50 cursor-pointer" onClick={() => router.push('/manage-post')}>
                                            <FileText className="h-4 w-4" /> Manage Post
                                        </button>
                                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer" onClick={logout}>
                                            <LogOut className="h-4 w-4" /> Logout
                                        </button>
                                    </div>  
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="rounded-md p-2 hover:bg-zinc-100 md:hidden cursor-pointer"
                        onClick={() => setShowMobileMenu(true)}
                        aria-label="Open menu"
                    >
                        <Menu />
                    </button>
                    {isAuthLoading && (
                        <Loader2 className="h-4 w-4 animate-spin text-zinc-300" />
                    )}
                </div>
            </div>

            {/* Mobile/Tablet slide-over */}
            {showMobileMenu && (
                <div className="fixed inset-0 z-40 bg-black/30 cursor-pointer" onClick={() => setShowMobileMenu(false)}></div>
            )}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-[400px] max-w-[90vw] transform bg-white shadow-xl transition-transform duration-300 ${
                    showMobileMenu ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-4">
                    <span className="text-lg font-bold">NewPaper</span>
                    <button className="rounded-md p-2 hover:bg-zinc-100 cursor-pointer" onClick={() => setShowMobileMenu(false)}>
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
                    {!isAuthentication ? (
                        <button
                            onClick={() => {
                                setAuthTab('login');
                                setShowAuthModal(true);
                                setShowMobileMenu(false);
                            }}
                            className="w-full rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 cursor-pointer"
                        >
                            Join now!
                        </button>
                    ) : (
                        <div className="flex items-center gap-3 rounded-md border border-zinc-200 p-3">
                            {profile?.avatar ? (
                                <Image
                                    src={profile.avatar}
                                    alt="avatar"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white text-lg font-semibold">
                                    {(profile?.username || 'U').charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-semibold">{profile?.username || 'User'}</p>
                                <p className="text-xs text-zinc-500">{profile?.email || 'user@example.com'}</p>
                            </div>
                        </div>
                    )}
                    <div className="grid gap-2">
                        <button className="flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50 cursor-pointer" onClick={() => router.push('/manage-post')}>
                            <FileText className="h-4 w-4" /> Manage Post
                        </button>
                        <button className="flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer" onClick={logout}>
                            <LogOut className="h-4 w-4" /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
        {/* Auth Modal */}
        <Modal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} size="md">
            <div className="p-6">
                <div className="mb-4 flex gap-2">
                    <button
                        onClick={() => setAuthTab('login')}
                        className={`flex-1 rounded-md px-3 py-2 text-sm font-medium cursor-pointer ${authTab === 'login' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setAuthTab('register')}
                        className={`flex-1 rounded-md px-3 py-2 text-sm font-medium cursor-pointer ${authTab === 'register' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
                    >
                        Register
                    </button>
                </div>
                {authTab === 'login' ? (
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-zinc-900">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="you@example.com"
                                disabled={isAuthLoading}
                                className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-zinc-900">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                disabled={isAuthLoading}
                                className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                            />
                        </div>
                        {loginMutation.isError && (
                            <p className="text-xs text-red-600">
                                {(() => {
                                    const raw = (loginMutation.error as any)?.response?.data?.message;
                                    if (typeof raw === 'string') return raw;
                                    if (raw && typeof raw === 'object') return raw.message || JSON.stringify(raw);
                                    return 'Login failed';
                                })()}
                            </p>
                        )}
                        <button
                            onClick={() => loginMutation.mutate()}
                            disabled={!email.trim() || !password.trim() || loginMutation.isPending}
                            className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                        >
                            {loginMutation.isPending ? 'Signing in…' : 'Sign In'}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-zinc-900">Full name</label>
                            <input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="John Doe"
                                disabled={isAuthLoading}
                                className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-zinc-900">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="you@example.com"
                                disabled={isAuthLoading}
                                className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-zinc-900">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                disabled={isAuthLoading}
                                className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                            />
                        </div>
                        {registerMutation.isError && (
                            <p className="text-xs text-red-600">
                                {(() => {
                                    const raw = (registerMutation.error as any)?.response?.data?.message;
                                    if (typeof raw === 'string') return raw;
                                    if (raw && typeof raw === 'object') return raw.message || JSON.stringify(raw);
                                    return 'Register failed';
                                })()}
                            </p>
                        )}
                        <button
                            onClick={() => registerMutation.mutate()}
                            disabled={!fullName.trim() || !email.trim() || !password.trim() || registerMutation.isPending}
                            className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                        >
                            {registerMutation.isPending ? 'Creating…' : 'Create Account'}
                        </button>
                    </div>
                )}
            </div>
        </Modal>
        </>
    );
};

export default Header;


