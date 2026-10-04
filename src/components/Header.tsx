import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Shield, Sparkles, BookOpen, User, Users } from 'lucide-react';
import { StudentProfile } from '../types';
import { SoundFX } from '../utils/sound';

interface HeaderProps {
  title: string;
  slogan: string;
  profile: StudentProfile;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTeacher: (tab?: any) => void;
  onGoHome: () => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  slogan,
  profile,
  soundEnabled,
  onToggleSound,
  onOpenTeacher,
  onGoHome,
  currentView
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    SoundFX.playClick(soundEnabled);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const totalStars = Object.values(profile.stars).reduce((a, b) => a + b, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs px-2.5 sm:px-6 py-2 sm:py-2.5 pt-safe">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        {/* Logo and App Title */}
        <button
          onClick={() => {
            SoundFX.playClick(soundEnabled);
            onGoHome();
          }}
          className="flex items-center gap-2 text-left group transition-transform active:scale-95 flex-shrink-0 touch-action-manipulation"
          title="Về trang chính"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
            <BookOpen className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm sm:text-lg tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent truncate max-w-[130px] xs:max-w-[160px] sm:max-w-none">
                {title}
              </span>
              <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-md border border-amber-300">
                KNTT 6
              </span>
            </div>
            <p className="hidden md:block text-xs text-slate-500 font-medium">
              {slogan}
            </p>
          </div>
        </button>

        {/* Student Stats & Quick Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {profile.name && (
            <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-100/95 hover:bg-slate-200/80 border border-slate-200 rounded-full px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-slate-700 transition-colors max-w-[130px] sm:max-w-none">
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 flex-shrink-0" />
              <span className="truncate max-w-[55px] xs:max-w-[80px] sm:max-w-[140px] font-bold text-slate-800">{profile.name}</span>
              {profile.className && (
                <span className="hidden sm:inline bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {profile.className}
                </span>
              )}
              <div className="flex items-center gap-0.5 text-amber-600 font-black ml-0.5 pl-1 border-l border-slate-300 flex-shrink-0">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-500" />
                <span className="text-[11px]">{totalStars}★</span>
              </div>
            </div>
          )}

          {/* Sound toggle button */}
          <button
            onClick={() => {
              SoundFX.playClick(soundEnabled);
              onToggleSound();
            }}
            className={`min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] p-2 rounded-xl transition-all border flex items-center justify-center touch-action-manipulation active:scale-95 ${
              soundEnabled
                ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            aria-label="Bật tắt âm thanh"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Fullscreen toggle button (hidden on mobile, native OS handles full screen) */}
          <button
            onClick={toggleFullscreen}
            className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 transition-all hidden md:flex items-center justify-center active:scale-95"
            title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
            aria-label="Toàn màn hình"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Classroom Management Direct Button */}
          <button
            onClick={() => {
              SoundFX.playClick(soundEnabled);
              onOpenTeacher('students');
            }}
            className="min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center gap-1 p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all active:scale-95 touch-action-manipulation shadow-xs"
            title="Quản lý Lớp học (Điểm danh, thi đua, vòng quay, chia nhóm)"
            aria-label="Quản lý lớp học"
          >
            <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="hidden sm:inline">Quản lý Lớp</span>
          </button>

          {/* Teacher Mode Button */}
          <button
            onClick={() => {
              SoundFX.playClick(soundEnabled);
              onOpenTeacher('questions');
            }}
            className="min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center gap-1 p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200/90 text-slate-700 border border-slate-200 transition-all active:scale-95 touch-action-manipulation"
            title="Dành cho Giáo viên"
            aria-label="Không gian giáo viên"
          >
            <Shield className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span className="hidden sm:inline">Giáo viên</span>
          </button>
        </div>
      </div>
    </header>
  );
};
