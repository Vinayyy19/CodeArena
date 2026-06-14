import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useSEO } from '../lib/useSEO';
import { fetchWithRetry } from '../lib/fetchWithRetry';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileMiddleContent from '../components/ProfileMiddleContent';
import ProfileRightSidebar from '../components/ProfileRightSidebar';

const ProfilePage = () => {
    useSEO({
        title: "Your Profile | CodeArena",
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: userData, isLoading: isUserLoading } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            const res = await fetchWithRetry(`${import.meta.env.VITE_API_URL}/api/user/profile`, { 
                headers: { 'Authorization': `Bearer ${token}` } 
            });
            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem('token');
                navigate('/auth');
                toast.error('Session expired. Please log in again.');
                throw new Error('Unauthorized');
            }
            if (!res.ok) throw new Error('Failed to fetch profile');
            return res.json();
        }
    });

    const { data: userStats, isLoading: isStatsLoading } = useQuery({
        queryKey: ['userStats'],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            const res = await fetchWithRetry(`${import.meta.env.VITE_API_URL}/api/user/profile/stats`, { 
                headers: { 'Authorization': `Bearer ${token}` } 
            });
            if (!res.ok) throw new Error('Failed to fetch stats');
            return res.json();
        },
        enabled: !!userData // Only fetch stats if profile fetched successfully
    });

    const loading = isUserLoading || isStatsLoading;



    if (loading) {
        return (
            <div className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6 custom-scrollbar">
                {/* Left Sidebar Skeleton */}
                <div className="w-full md:w-80 flex flex-col gap-6 flex-shrink-0 animate-pulse">
                    <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl p-6 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-[#2d1e16] mb-4"></div>
                        <div className="w-32 h-6 bg-[#2d1e16] rounded mb-2"></div>
                        <div className="w-24 h-4 bg-[#2d1e16] rounded mb-6"></div>
                        <div className="w-full flex justify-between px-4 border-t border-[#2d1e16] pt-4">
                            <div className="w-12 h-10 bg-[#2d1e16] rounded"></div>
                            <div className="w-12 h-10 bg-[#2d1e16] rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Main Content Skeleton (Middle + Right) */}
                <div className="flex-1 flex flex-col lg:flex-row gap-6 animate-pulse">
                    {/* Middle Content Skeleton */}
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl p-6 h-64"></div>
                        <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl p-6 h-80"></div>
                    </div>

                    {/* Right Sidebar Skeleton */}
                    <div className="w-full lg:w-80 flex flex-col gap-6 flex-shrink-0">
                        <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl p-6 h-48"></div>
                        <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl p-6 flex-1 min-h-[300px]"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!userData || !userStats) return null;

    const handleProfileUpdate = (updatedUser) => {
        // Optimistically update the cache
        queryClient.setQueryData(['profile'], updatedUser);
        toast.success('Profile updated successfully!');
    };

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden w-full max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 custom-scrollbar text-sm">

            {/* Left Sidebar */}
            <div className="w-full md:w-80 flex flex-col gap-6 flex-shrink-0">
                <ProfileSidebar user={userData} onProfileUpdate={handleProfileUpdate} />
            </div>

            {/* Main Content (Middle + Right) */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6 min-w-0">

                {/* Middle Content */}
                <div className="flex-1 flex flex-col gap-6 min-w-0">
                    <ProfileMiddleContent user={userData} stats={userStats} />
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-80 flex flex-col gap-6 flex-shrink-0">
                    <ProfileRightSidebar stats={userStats} />
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
