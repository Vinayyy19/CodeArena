import React, { useState } from 'react';
import { Mail, KeyRound, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchWithRetry } from '../lib/fetchWithRetry';
import { useSEO } from '../lib/useSEO';

const AuthPage = () => {
    useSEO({
        title: "Login | CodeArena",
    });
    const [step, setStep] = useState('EMAIL'); // 'EMAIL' or 'OTP'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email) return toast.error('Email is required');

        setLoading(true);
        try {
            const res = await fetchWithRetry(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (res.ok) {
                setStep('OTP');
                toast.success(`OTP sent to ${email}`);
            } else {
                toast.error(data.message || 'Failed to send OTP');
            }
        } catch (err) {
            toast.error('Server error. Backend might be down.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp) return toast.error('OTP is required');

        setLoading(true);
        try {
            const res = await fetchWithRetry(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();

            if (res.ok) {
                // Save token
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                if (data.isNewUser) {
                    toast.success('Account created successfully!');
                    navigate('/onboarding');
                } else {
                    toast.success('Logged in successfully!');
                    navigate('/profile');
                }
            } else {
                toast.error(data.message || 'Invalid OTP');
            }
        } catch (err) {
            toast.error('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex-1 flex items-center justify-center p-6 bg-black min-h-screen overflow-hidden">
            
            {/* Animated Ambient Background */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-osu rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob"></div>
                <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-[10%] left-[30%] w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="w-full max-w-md bg-[#1a1310]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative z-10">

                {/* Decorative header */}
                <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-[var(--color-primary)] to-yellow-500 opacity-80"></div>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(246,107,21,0.5)]">
                            <img 
                                src="/code-arena_shield.webp" 
                                alt="CodeArena" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Welcome to CodeArena</h2>
                        <p className="text-sm text-gray-400 mt-2">
                            {step === 'EMAIL' ? 'Sign in or create an account via Email OTP' : `We sent a code to ${email}`}
                        </p>
                    </div>

                    {step === 'EMAIL' ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[var(--color-primary)] focus:bg-white/10 transition-all placeholder-gray-500"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-lg shadow-[0_0_15px_rgba(246,107,21,0.2)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : (
                                    <>Send Secure OTP <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                                <label htmlFor="otp" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">One-Time Password</label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        autoComplete="one-time-code"
                                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[var(--color-primary)] focus:bg-white/10 transition-all font-mono tracking-widest text-center text-xl placeholder-gray-600 shadow-inner"
                                        placeholder="------"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-lg shadow-[0_0_15px_rgba(246,107,21,0.2)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Verify & Login'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep('EMAIL')}
                                className="w-full text-center text-sm text-gray-500 hover:text-white transition-colors"
                            >
                                Change Email Address
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
