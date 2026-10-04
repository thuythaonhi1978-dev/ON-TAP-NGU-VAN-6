import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, Compass, Feather, Mic, Star, Lock, Play, Sparkles, 
  Trophy, Shuffle, Bookmark, Filter, BookCheck, CheckCircle2,
  ChevronRight, ArrowRight, Layers, Flame, BookMarked
} from 'lucide-react';
import { ZoneId, CognitiveLevel, StudentProfile, TeacherSettings } from '../types';
import { ZONE_CONFIG, COGNITIVE_LEVELS, TEXTBOOK_LESSONS } from '../data/defaultQuestions';
import { Mascot } from './Mascot';
import { SoundFX } from '../utils/sound';

interface JourneyMapProps {
  profile: StudentProfile;
  settings: TeacherSettings;
  onSelectZone: (zone: ZoneId | 'all', level?: CognitiveLevel, filterOpts?: { semester?: 1 | 2; lesson?: number }) => void;
  onSelectGameType?: (gameType: string) => void;
  onOpenStudyGuide: () => void;
  soundEnabled: boolean;
}

export const JourneyMap: React.FC<JourneyMapProps> = ({
  profile,
  settings,
  onSelectZone,
  onOpenStudyGuide,
  soundEnabled
}) => {
  // Navigation mode: 'lessons' (Lộ trình 10 bài SGK - Mặc định) or 'zones' (4 Vùng đất kĩ năng)
  const [navMode, setNavMode] = useState<'lessons' | 'zones'>('lessons');
  
  // Selected Lesson state (1 - 10)
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [semesterFilter, setSemesterFilter] = useState<'all' | 1 | 2>('all');

  // Zones state
  const [selectedZone, setSelectedZone] = useState<ZoneId>('kham_pha_van_ban');

  const zoneIcons: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen className="w-5 h-5" />,
    Compass: <Compass className="w-5 h-5" />,
    Feather: <Feather className="w-5 h-5" />,
    Mic: <Mic className="w-5 h-5" />
  };

  const levelsList: CognitiveLevel[] = ['nhan_biet', 'thong_hieu', 'van_dung_thap', 'van_dung_cao'];

  const getLevelIndex = (lvl: CognitiveLevel) => {
    switch (lvl) {
      case 'nhan_biet': return 1;
      case 'thong_hieu': return 2;
      case 'van_dung_thap': return 3;
      case 'van_dung_cao': return 4;
    }
  };

  const isLevelUnlocked = (zone: ZoneId, lvl: CognitiveLevel) => {
    if (settings.unlockAllLevels) return true;
    const currentUnlocked = profile.unlockedLevels[zone] || 1;
    return getLevelIndex(lvl) <= currentUnlocked;
  };

  const activeZoneConfig = ZONE_CONFIG[selectedZone];

  // Filter lessons based on semester
  const filteredLessons = TEXTBOOK_LESSONS.filter((l) => {
    if (semesterFilter === 'all') return true;
    return l.semester === semesterFilter;
  });

  const activeLesson = TEXTBOOK_LESSONS.find((l) => l.id === selectedLessonId) || TEXTBOOK_LESSONS[0];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-6 space-y-4 sm:space-y-7 pb-20 sm:pb-8">
      {/* Top Banner & Mascot */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-4 sm:p-7 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-2.5 sm:space-y-3 text-center md:text-left w-full">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/20 text-blue-100 text-[11px] sm:text-xs font-bold backdrop-blur-xs">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              Đấu Trường Ngữ Văn 6
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 text-[11px] sm:text-xs font-bold">
              <BookCheck className="w-3.5 h-3.5 text-amber-300" />
              Kết Nối Tri Thức (Tập 1 & 2)
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-tight">
            Chào mừng {profile.name || 'Em'}!
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed mx-auto md:mx-0">
            Học đến bài nào – Ôn luyện ngay bài đó! Chinh phục trọn vẹn 10 bài học trong sách giáo khoa với các thử thách tương tác hấp dẫn.
          </p>

          <div className="pt-1.5 flex flex-col sm:flex-row flex-wrap gap-2 justify-center md:justify-start">
            <button
              onClick={() => {
                SoundFX.playClick(soundEnabled);
                onSelectZone('all', undefined, { lesson: activeLesson.id, semester: activeLesson.semester });
              }}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 touch-action-manipulation min-h-[44px]"
            >
              <Play className="w-4 h-4 fill-slate-900 text-slate-900" />
              ÔN NGAY {activeLesson.title.toUpperCase()}
            </button>

            <button
              onClick={() => {
                SoundFX.playClick(soundEnabled);
                onOpenStudyGuide();
              }}
              className="w-full sm:w-auto px-4 py-3 sm:py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-extrabold text-xs sm:text-sm shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 touch-action-manipulation min-h-[44px]"
            >
              <Bookmark className="w-4 h-4 text-amber-300" />
              CẨM NANG 10 BÀI
            </button>

            <button
              onClick={() => {
                SoundFX.playClick(soundEnabled);
                onSelectZone('all');
              }}
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-2xl bg-indigo-950/40 hover:bg-indigo-950/60 border border-white/20 text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 touch-action-manipulation min-h-[40px]"
            >
              <Shuffle className="w-3.5 h-3.5 text-blue-300" />
              Thi Tổng Hợp (Cả Năm)
            </button>
          </div>
        </div>

        <div className="flex-shrink-0">
          <Mascot
            mood="cheering"
            size="lg"
            message={`Em đang ở ${activeLesson.title}! Cùng ôn bài để rinh điểm 10 nào!`}
          />
        </div>
      </div>

      {/* Primary Navigation Tabs: LỘ TRÌNH 10 BÀI SGK vs ĐẤU TRƯỜNG 4 KỸ NĂNG */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-white p-1.5 sm:p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex w-full sm:w-auto p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => {
              SoundFX.playClick(soundEnabled);
              setNavMode('lessons');
            }}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 touch-action-manipulation ${
              navMode === 'lessons'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookMarked className="w-4 h-4 flex-shrink-0" />
            <span className="sm:hidden">10 BÀI SGK</span>
            <span className="hidden sm:inline">LỘ TRÌNH 10 BÀI SGK (BÀI 1 ➔ 10)</span>
          </button>

          <button
            onClick={() => {
              SoundFX.playClick(soundEnabled);
              setNavMode('zones');
            }}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 touch-action-manipulation ${
              navMode === 'zones'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 flex-shrink-0" />
            <span className="sm:hidden">4 KỸ NĂNG</span>
            <span className="hidden sm:inline">4 VÙNG ĐẤT KỸ NĂNG</span>
          </button>
        </div>

        <div className="text-[11px] sm:text-xs text-slate-500 font-medium px-2 text-center sm:text-right">
          {navMode === 'lessons' ? '✨ Cấu trúc chuẩn theo từng bài học trên lớp' : '🎯 Luyện theo nhóm kĩ năng chuyên sâu'}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: LỘ TRÌNH TỪNG BÀI HỌC SGK (BÀI 1 -> BÀI 10)                      */}
      {/* ========================================================================= */}
      {navMode === 'lessons' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Semester Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 p-2.5 sm:p-4 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-1.5 px-1">
              <Filter className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                Tập Sách Giáo Khoa:
              </span>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar rounded-xl bg-white p-1 text-xs font-bold border border-blue-200/80 shadow-xs">
              <button
                onClick={() => {
                  SoundFX.playClick(soundEnabled);
                  setSemesterFilter('all');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap min-h-[36px] touch-action-manipulation ${
                  semesterFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cả năm (Bài 1 - 10)
              </button>
              <button
                onClick={() => {
                  SoundFX.playClick(soundEnabled);
                  setSemesterFilter(1);
                  if (selectedLessonId > 5) setSelectedLessonId(1);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap min-h-[36px] touch-action-manipulation ${
                  semesterFilter === 1
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📘 Tập 1 (Bài 1 - 5)
              </button>
              <button
                onClick={() => {
                  SoundFX.playClick(soundEnabled);
                  setSemesterFilter(2);
                  if (selectedLessonId <= 5) setSelectedLessonId(6);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap min-h-[36px] touch-action-manipulation ${
                  semesterFilter === 2
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📙 Tập 2 (Bài 6 - 10)
              </button>
            </div>
          </div>

          {/* Horizontal / Grid Lesson Carousel Selector */}
          <div>
            <div className="flex items-center justify-between mb-2 sm:mb-3 px-1">
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                Chọn Bài Học Đang Học Trên Lớp:
              </h3>
              <span className="text-[11px] sm:text-xs text-slate-500 hidden sm:inline">Bấm vào bài để mở trạm ôn luyện</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
              {filteredLessons.map((l) => {
                const isSelected = selectedLessonId === l.id;
                const isSem1 = l.semester === 1;

                return (
                  <motion.div
                    key={l.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      SoundFX.playClick(soundEnabled);
                      setSelectedLessonId(l.id);
                    }}
                    className={`p-2.5 sm:p-3.5 rounded-2xl cursor-pointer border-2 transition-all relative flex flex-col justify-between touch-action-manipulation select-none min-h-[96px] sm:min-h-[110px] ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 sm:ring-3 ring-blue-100'
                        : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-md ${
                          isSem1 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          Tập {l.semester}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-black text-blue-600">
                          Bài {l.id}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-1 mb-0.5">
                        {l.title.replace(`Bài ${l.id}: `, '')}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-1">
                        {l.genre}
                      </p>
                    </div>

                    <div className="mt-1.5 sm:mt-2.5 pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px]">
                      <span className="text-slate-400 font-medium">4 trạm</span>
                      <span className={`font-bold flex items-center gap-0.5 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`}>
                        {isSelected ? 'Đang chọn' : 'Xem'} <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ACTIVE LESSON MISSION CONTROL */}
          <motion.div
            key={activeLesson.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-4 sm:p-7 border-2 border-blue-500 shadow-lg space-y-4 sm:space-y-6"
          >
            {/* Mission Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-100">
              <div className="space-y-1.5 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-black ${
                    activeLesson.semester === 1 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    📘 SGK TẬP {activeLesson.semester}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[11px] sm:text-xs font-bold">
                    {activeLesson.genre}
                  </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {activeLesson.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  <span className="font-bold text-slate-700">Chủ đề:</span> {activeLesson.theme}
                </p>
              </div>

              {/* Mega Start Button for this Lesson */}
              <div className="flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => {
                    SoundFX.playClick(soundEnabled);
                    onSelectZone('all', undefined, { semester: activeLesson.semester, lesson: activeLesson.id });
                  }}
                  className="w-full sm:w-auto px-5 sm:px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-xs sm:text-base shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 group min-h-[48px] touch-action-manipulation"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white group-hover:scale-110 transition-transform" />
                  <span>VÀO ĐẤU TRƯỜNG BÀI {activeLesson.id} (10 CÂU)</span>
                </button>
              </div>
            </div>

            {/* Content Breakdown Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3.5 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="space-y-1">
                <div className="font-extrabold text-blue-700 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                  VĂN BẢN ĐỌC HIỂU:
                </div>
                <ul className="text-slate-600 space-y-0.5 list-disc list-inside">
                  {activeLesson.texts.map((t, i) => (
                    <li key={i} className="line-clamp-1">{t}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1">
                <div className="font-extrabold text-emerald-700 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 flex-shrink-0" />
                  KIẾN THỨC TIẾNG VIỆT:
                </div>
                <ul className="text-slate-600 space-y-0.5 list-disc list-inside">
                  {activeLesson.vietnameseKnowledge.map((k, i) => (
                    <li key={i} className="line-clamp-1">{k}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1">
                <div className="font-extrabold text-amber-700 flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 flex-shrink-0" />
                  KỸ NĂNG VIẾT & NÓI:
                </div>
                <p className="text-slate-600 line-clamp-2">
                  <span className="font-semibold">Viết:</span> {activeLesson.writingTopic}
                </p>
                <p className="text-slate-600 line-clamp-1">
                  <span className="font-semibold">Nói & nghe:</span> {activeLesson.speakingTopic}
                </p>
              </div>
            </div>

            {/* Specialized Stations for this Lesson */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500 flex-shrink-0" />
                Hoặc Chọn Trạm Ôn Chuyên Đề Bài {activeLesson.id}:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
                {/* Station 1: Văn bản */}
                <div className="p-3.5 sm:p-4 rounded-2xl border border-blue-200 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-400 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 text-blue-700">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span className="font-extrabold text-xs uppercase">Trạm Đọc Hiểu</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      Ôn tác giả, cốt truyện, nhân vật và ý nghĩa văn bản bài {activeLesson.id}.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      SoundFX.playClick(soundEnabled);
                      onSelectZone('kham_pha_van_ban', undefined, { semester: activeLesson.semester, lesson: activeLesson.id });
                    }}
                    className="mt-3 w-full min-h-[40px] py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all touch-action-manipulation"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Chơi Trạm Văn Bản
                  </button>
                </div>

                {/* Station 2: Tiếng Việt */}
                <div className="p-3.5 sm:p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-400 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 text-emerald-700">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                        <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span className="font-extrabold text-xs uppercase">Trạm Tiếng Việt</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      Ôn từ ngữ, ngữ pháp, biện pháp tu từ và dấu câu bài {activeLesson.id}.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      SoundFX.playClick(soundEnabled);
                      onSelectZone('tham_hiem_tieng_viet', undefined, { semester: activeLesson.semester, lesson: activeLesson.id });
                    }}
                    className="mt-3 w-full min-h-[40px] py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all touch-action-manipulation"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Chơi Trạm Tiếng Việt
                  </button>
                </div>

                {/* Station 3: Viết & Nói nghe */}
                <div className="p-3.5 sm:p-4 rounded-2xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-400 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 text-amber-700">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center flex-shrink-0">
                        <Feather className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span className="font-extrabold text-xs uppercase">Trạm Viết & Nói</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      Ôn quy trình làm văn, lập dàn ý, mở kết bài và kĩ năng thuyết trình.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      SoundFX.playClick(soundEnabled);
                      onSelectZone('xuong_viet_sang_tao', undefined, { semester: activeLesson.semester, lesson: activeLesson.id });
                    }}
                    className="mt-3 w-full min-h-[40px] py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all touch-action-manipulation"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Chơi Trạm Viết & Nói
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Cognitive Levels for this Lesson */}
            <div className="pt-1 sm:pt-2">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Hoặc Chọn Thử Thách Cấp Độ Của Bài {activeLesson.id}:
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {levelsList.map((lvl) => {
                  const lvlInfo = COGNITIVE_LEVELS[lvl];
                  return (
                    <button
                      key={lvl}
                      onClick={() => {
                        SoundFX.playClick(soundEnabled);
                        onSelectZone('all', lvl, { semester: activeLesson.semester, lesson: activeLesson.id });
                      }}
                      className="p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all group touch-action-manipulation active:scale-[0.98] min-h-[56px]"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] sm:text-[11px] font-black px-1.5 sm:px-2 py-0.5 rounded-md ${lvlInfo.color}`}>
                          {lvlInfo.name}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-500">+{lvlInfo.points}đ</span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-blue-600 font-bold group-hover:underline flex items-center gap-1">
                        Bắt đầu <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: ĐẤU TRƯỜNG 4 VÙNG ĐẤT KỸ NĂNG (TRUYỀN THỐNG / TỔNG HỢP)           */}
      {/* ========================================================================= */}
      {navMode === 'zones' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Bốn Vùng Đất Tri Thức
            </h3>
            <span className="text-xs text-slate-500 font-medium">Bấm chọn khu vực để xem cấp độ thử thách</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(ZONE_CONFIG).map((zone) => {
              const isSelected = selectedZone === zone.id;
              const stars = profile.stars[zone.id as ZoneId] || 0;

              return (
                <motion.div
                  key={zone.id}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    SoundFX.playClick(soundEnabled);
                    setSelectedZone(zone.id as ZoneId);
                  }}
                  className={`relative p-5 rounded-3xl cursor-pointer border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-white shadow-xl shadow-blue-500/10 ring-4 ring-blue-100'
                      : 'border-slate-200 bg-white/90 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Header with Icon & Stars */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${zone.color} text-white flex items-center justify-center shadow-md`}>
                        {zoneIcons[zone.icon]}
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-bold text-amber-700">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{stars}</span>
                      </div>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-base mb-1">
                      {zone.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {zone.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${zone.badgeColor}`}>
                      {zone.shortName}
                    </span>
                    <span className="text-blue-600 font-bold flex items-center gap-1">
                      Chọn <Play className="w-3 h-3 fill-blue-600" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Zone Deep Dive */}
          <motion.div
            key={selectedZone}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${activeZoneConfig.badgeColor}`}>
                    {activeZoneConfig.shortName}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">•</span>
                  <span className="text-xs text-slate-500 font-medium">Toàn bộ 10 bài học SGK</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeZoneConfig.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  {activeZoneConfig.description}
                </p>
              </div>

              <button
                onClick={() => {
                  SoundFX.playClick(soundEnabled);
                  onSelectZone(selectedZone);
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                CHƠI TOÀN BỘ CẤP ĐỘ
              </button>
            </div>

            {/* 4 Cognitive Level Selector Cards */}
            <div>
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                Chọn một Cấp Độ Thử Thách Cụ Thể:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {levelsList.map((lvl) => {
                  const lvlInfo = COGNITIVE_LEVELS[lvl];
                  const unlocked = isLevelUnlocked(selectedZone, lvl);

                  return (
                    <div
                      key={lvl}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        unlocked
                          ? 'border-slate-200 bg-slate-50/80 hover:border-blue-400 hover:bg-white hover:shadow-md'
                          : 'border-slate-200 bg-slate-100/70 opacity-60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${lvlInfo.color}`}>
                            {lvlInfo.name}
                          </span>
                          {unlocked ? (
                            <span className="text-xs font-bold text-slate-700">+{lvlInfo.points}đ</span>
                          ) : (
                            <Lock className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-2">
                          {lvlInfo.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/80">
                        {unlocked ? (
                          <button
                            onClick={() => {
                              SoundFX.playClick(soundEnabled);
                              onSelectZone(selectedZone, lvl);
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            Chinh Phục
                          </button>
                        ) : (
                          <div className="text-center py-1.5 text-[11px] font-semibold text-slate-400 flex items-center justify-center gap-1">
                            <Lock className="w-3 h-3" />
                            Hoàn thành cấp trước để mở
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating Bottom Quick Action Bar for Smartphones */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 pb-safe shadow-lg flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase truncate">
            {navMode === 'lessons' ? 'Bài đang chọn:' : 'Khu vực:'}
          </div>
          <div className="text-xs font-black text-slate-900 truncate">
            {navMode === 'lessons' 
              ? `${activeLesson.title}`
              : `${activeZoneConfig.name}`
            }
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => {
              SoundFX.playClick(soundEnabled);
              onOpenStudyGuide();
            }}
            className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-bold flex items-center gap-1 min-h-[40px] touch-action-manipulation"
            title="Mở Cẩm nang 10 bài SGK"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px]">Cẩm nang</span>
          </button>

          <button
            onClick={() => {
              SoundFX.playClick(soundEnabled);
              if (navMode === 'lessons') {
                onSelectZone('all', undefined, { semester: activeLesson.semester, lesson: activeLesson.id });
              } else {
                onSelectZone(selectedZone);
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-blue-500/25 active:scale-95 min-h-[40px] touch-action-manipulation"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Vào thi ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
