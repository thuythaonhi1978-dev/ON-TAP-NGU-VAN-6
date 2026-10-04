import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, BookCheck, Feather, Mic, Compass, Sparkles, Play, ChevronRight, Bookmark } from 'lucide-react';
import { TEXTBOOK_LESSONS } from '../data/lessonsData';
import { LessonInfo } from '../types';
import { SoundFX } from '../utils/sound';

interface StudyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLessonForQuiz: (lessonId: number) => void;
  soundEnabled: boolean;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectLessonForQuiz,
  soundEnabled
}) => {
  const [selectedSemester, setSelectedSemester] = useState<'all' | 1 | 2>('all');
  const [activeLessonId, setActiveLessonId] = useState<number>(1);

  if (!isOpen) return null;

  const filteredLessons = TEXTBOOK_LESSONS.filter((l) => {
    if (selectedSemester === 'all') return true;
    return l.semester === selectedSemester;
  });

  const activeLesson = TEXTBOOK_LESSONS.find((l) => l.id === activeLessonId) || TEXTBOOK_LESSONS[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] max-h-[94dvh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-4 sm:px-6 py-3 sm:py-4 text-white flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs flex-shrink-0">
                <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-2xl font-black truncate">
                  Cẩm Nang Tri Thức Ngữ Văn 6
                </h2>
                <p className="text-[10px] sm:text-xs text-blue-100 font-medium truncate">
                  Trọng tâm kiến thức 10 bài học SGK Kết nối tri thức
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                SoundFX.playClick(soundEnabled);
                onClose();
              }}
              className="min-w-[36px] min-h-[36px] p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all flex items-center justify-center flex-shrink-0 touch-action-manipulation"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Semester Selector Filter Bar */}
          <div className="px-3 sm:px-6 py-2.5 sm:py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider flex-shrink-0">Tập:</span>
              <div className="inline-flex rounded-xl bg-slate-200/80 p-0.5 sm:p-1 text-xs font-bold flex-shrink-0">
                <button
                  onClick={() => {
                    SoundFX.playClick(soundEnabled);
                    setSelectedSemester('all');
                  }}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all text-xs touch-action-manipulation ${
                    selectedSemester === 'all'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả (10 Bài)
                </button>
                <button
                  onClick={() => {
                    SoundFX.playClick(soundEnabled);
                    setSelectedSemester(1);
                    if (activeLesson.semester !== 1) setActiveLessonId(1);
                  }}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all text-xs touch-action-manipulation ${
                    selectedSemester === 1
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📘 Tập 1
                </button>
                <button
                  onClick={() => {
                    SoundFX.playClick(soundEnabled);
                    setSelectedSemester(2);
                    if (activeLesson.semester !== 2) setActiveLessonId(6);
                  }}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all text-xs touch-action-manipulation ${
                    selectedSemester === 2
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📙 Tập 2
                </button>
              </div>
            </div>

            <div className="hidden sm:block text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Đang xem: {activeLesson.title}
            </div>
          </div>

          {/* Mobile Horizontal Lessons Chip Scroller (Visible on mobile only) */}
          <div className="md:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar px-3 py-2 bg-slate-100/70 border-b border-slate-200 flex-shrink-0">
            {filteredLessons.map((les) => {
              const isActive = les.id === activeLessonId;
              return (
                <button
                  key={les.id}
                  onClick={() => {
                    SoundFX.playClick(soundEnabled);
                    setActiveLessonId(les.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all touch-action-manipulation flex items-center gap-1 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-200'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>Bài {les.id}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content Body */}
          <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
            {/* Sidebar Lessons List (Desktop only) */}
            <div className="hidden md:block md:col-span-4 border-r border-slate-200 overflow-y-auto p-3 space-y-1.5 bg-slate-50/50">
              {filteredLessons.map((les) => {
                const isActive = les.id === activeLessonId;
                return (
                  <button
                    key={les.id}
                    onClick={() => {
                      SoundFX.playClick(soundEnabled);
                      setActiveLessonId(les.id);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-2 touch-action-manipulation ${
                      isActive
                        ? 'bg-white border-blue-600 text-blue-900 shadow-md ring-2 ring-blue-100'
                        : 'bg-white/70 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          les.semester === 1 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          Tập {les.semester}
                        </span>
                        <span className="text-xs font-black text-slate-800 line-clamp-1">
                          {les.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 italic">
                        {les.genre}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 mt-1 transition-transform ${isActive ? 'text-blue-600 translate-x-1' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Lesson Detail Area */}
            <div className="md:col-span-8 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6 bg-white">
              {/* Top Banner of Selected Lesson */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-black bg-blue-600 text-white">
                      SGK TẬP {activeLesson.semester}
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      Thể loại: {activeLesson.genre}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
                    {activeLesson.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                    🎯 <strong className="text-slate-800">Chủ đề:</strong> {activeLesson.theme}
                  </p>
                </div>

                <button
                  onClick={() => {
                    SoundFX.playCorrect(soundEnabled);
                    onSelectLessonForQuiz(activeLesson.id);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[42px] touch-action-manipulation"
                >
                  <Play className="w-4 h-4 fill-white" />
                  ÔN TẬP BÀI NÀY
                </button>
              </div>

              {/* 4 Pillars of Knowledge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pillar 1: Reading Texts */}
                <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/30 space-y-2">
                  <div className="flex items-center gap-2 text-blue-700 font-black text-sm">
                    <BookOpen className="w-4 h-4" />
                    <h4>Văn bản Đọc chính & Đọc mở rộng</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activeLesson.texts.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pillar 2: Vietnamese Grammar */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/30 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-black text-sm">
                    <Compass className="w-4 h-4" />
                    <h4>Thực hành Tiếng Việt trọng tâm</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activeLesson.vietnameseKnowledge.map((k, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pillar 3: Writing */}
                <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/30 space-y-2">
                  <div className="flex items-center gap-2 text-amber-700 font-black text-sm">
                    <Feather className="w-4 h-4" />
                    <h4>Xưởng viết sáng tạo</h4>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {activeLesson.writingTopic}
                  </p>
                </div>

                {/* Pillar 4: Speaking & Listening */}
                <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/30 space-y-2">
                  <div className="flex items-center gap-2 text-purple-700 font-black text-sm">
                    <Mic className="w-4 h-4" />
                    <h4>Sân khấu Nói và Nghe</h4>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {activeLesson.speakingTopic}
                  </p>
                </div>
              </div>

              {/* Tips for review */}
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Lời khuyên từ Cú Tri Thức:</strong> Em hãy ôn kĩ các bài đọc hiểu và kiến thức tiếng Việt tương ứng trước khi bước vào đấu trường. Khi thi đấu đúng bài học này, em sẽ nhận thêm điểm thưởng tinh thông!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
