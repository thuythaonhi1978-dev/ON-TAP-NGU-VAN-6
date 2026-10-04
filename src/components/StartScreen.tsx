import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, HelpCircle, BookOpen, Compass, Feather, Mic, Sparkles, User, Award, Shield } from 'lucide-react';
import { StudentProfile } from '../types';
import { Mascot } from './Mascot';
import { SoundFX } from '../utils/sound';

interface StartScreenProps {
  title: string;
  slogan: string;
  profile: StudentProfile;
  onUpdateProfile: (name: string, className: string) => void;
  onStart: () => void;
  onOpenInstructions: () => void;
  onOpenTeacher: (tab?: any) => void;
  soundEnabled: boolean;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  title,
  slogan,
  profile,
  onUpdateProfile,
  onStart,
  onOpenInstructions,
  onOpenTeacher,
  soundEnabled
}) => {
  const [name, setName] = useState(profile.name || '');
  const [className, setClassName] = useState(profile.className || '');
  const [error, setError] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập họ và tên của em để bước vào đấu trường!');
      SoundFX.playWrong(soundEnabled);
      return;
    }
    setError('');
    SoundFX.playClick(soundEnabled);
    onUpdateProfile(name.trim(), className.trim() || 'Lớp 6');
    onStart();
  };

  const totalStars = Object.values(profile.stars).reduce((a, b) => a + b, 0);

  return (
    <div className="relative min-h-[calc(100dvh-60px)] flex flex-col items-center justify-center p-3 sm:p-6 pb-safe overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-56 sm:w-80 h-56 sm:h-80 bg-purple-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center text-center my-auto py-2">
        {/* Mascot Greeting */}
        <div className="mb-2 sm:mb-4">
          <Mascot
            mood="waving"
            size="lg"
            message="Xin chào bạn nhỏ! Mình là Cú Tri Thức. Em đã sẵn sàng chinh phục đấu trường Ngữ văn 6 chưa?"
          />
        </div>

        {/* Main Logo & Headline */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-8 px-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/90 text-blue-800 text-[11px] sm:text-xs font-bold border border-blue-200 mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span className="truncate">Kết nối tri thức với cuộc sống • Lớp 6</span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="text-xs sm:text-xl font-bold text-amber-600 max-w-md mx-auto">
            {slogan}
          </p>
        </motion.div>

        {/* Student Entry Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200/90"
        >
          <form onSubmit={handleStart} className="space-y-3.5 sm:space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Họ và tên học sinh <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Ví dụ: Nguyễn Văn An"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-slate-800 font-bold transition-all text-base placeholder:font-normal placeholder:text-slate-400 min-h-[48px]"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Lớp học của em
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Ví dụ: 6A1, 6B..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-slate-800 font-bold transition-all text-base placeholder:font-normal placeholder:text-slate-400 min-h-[48px]"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold"
              >
                {error}
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="pt-1.5 space-y-2.5">
              <button
                type="submit"
                className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 touch-action-manipulation"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                BẮT ĐẦU KHÁM PHÁ
              </button>

              <button
                type="button"
                onClick={() => {
                  SoundFX.playClick(soundEnabled);
                  onOpenInstructions();
                }}
                className="w-full min-h-[44px] py-2.5 sm:py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200/90 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 touch-action-manipulation active:scale-[0.98]"
              >
                <HelpCircle className="w-4 h-4 text-slate-500" />
                HƯỚNG DẪN LUẬT CHƠI
              </button>

              <button
                type="button"
                onClick={() => {
                  SoundFX.playClick(soundEnabled);
                  onOpenTeacher('students');
                }}
                className="w-full min-h-[44px] py-2.5 sm:py-3 px-6 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 touch-action-manipulation active:scale-[0.98] border border-indigo-200"
              >
                <Shield className="w-4 h-4 text-indigo-600" />
                DÀNH CHO GIÁO VIÊN: QUẢN LÝ LỚP HỌC
              </button>
            </div>
          </form>

          {/* Quick returning stats */}
          {profile.name && totalStars > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Tiến độ trước đó:</span>
              <span className="font-bold text-amber-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                {totalStars} Ngôi sao
              </span>
            </div>
          )}
        </motion.div>

        {/* 4 Thematic Zones Mini Preview */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-3xl">
          <div className="p-2.5 sm:p-3 bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2 text-left">
            <div className="p-1.5 sm:p-2 rounded-xl bg-blue-100 text-blue-600 flex-shrink-0">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-slate-800 line-clamp-1">Khám Phá Văn Bản</p>
              <p className="text-[9px] sm:text-[10px] text-slate-500 line-clamp-1">Truyện, thơ, kí</p>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2 text-left">
            <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-100 text-emerald-600 flex-shrink-0">
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-slate-800 line-clamp-1">Tiếng Việt</p>
              <p className="text-[9px] sm:text-[10px] text-slate-500 line-clamp-1">Từ láy, tu từ, câu</p>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2 text-left">
            <div className="p-1.5 sm:p-2 rounded-xl bg-amber-100 text-amber-600 flex-shrink-0">
              <Feather className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-slate-800 line-clamp-1">Xưởng Viết</p>
              <p className="text-[9px] sm:text-[10px] text-slate-500 line-clamp-1">Trải nghiệm & Dàn ý</p>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2 text-left">
            <div className="p-1.5 sm:p-2 rounded-xl bg-purple-100 text-purple-600 flex-shrink-0">
              <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-slate-800 line-clamp-1">Nói & Nghe</p>
              <p className="text-[9px] sm:text-[10px] text-slate-500 line-clamp-1">Thuyết trình & Nghe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
