import React, { useState, useEffect } from 'react';
import { 
  StudentProfile, 
  TeacherSettings, 
  Question, 
  QuizResult, 
  AnswerRecord, 
  ZoneId, 
  CognitiveLevel 
} from './types';
import { 
  DEFAULT_QUESTIONS, 
  ZONE_CONFIG, 
  COGNITIVE_LEVELS 
} from './data/defaultQuestions';
import { StorageManager, DEFAULT_PROFILE, DEFAULT_TEACHER_SETTINGS } from './utils/storage';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { JourneyMap } from './components/JourneyMap';
import { QuizArena } from './components/QuizArena';
import { ResultReport } from './components/ResultReport';
import { InstructionsModal } from './components/InstructionsModal';
import { TeacherPortal } from './components/TeacherPortal';
import { StudyGuideModal } from './components/StudyGuideModal';
import { SoundFX } from './utils/sound';

type ViewMode = 'start' | 'map' | 'quiz' | 'result';

export default function App() {
  // App Core State
  const [profile, setProfile] = useState<StudentProfile>(() => StorageManager.getProfile());
  const [settings, setSettings] = useState<TeacherSettings>(() => StorageManager.getSettings());
  const [questions, setQuestions] = useState<Question[]>(() => StorageManager.getQuestions());
  const [history, setHistory] = useState<QuizResult[]>(() => StorageManager.getHistory());

  // UI Navigation State
  const [currentView, setCurrentView] = useState<ViewMode>('start');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTeacherPortal, setShowTeacherPortal] = useState(false);
  const [showStudyGuide, setShowStudyGuide] = useState(false);

  // Active Quiz State
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<Question[]>([]);
  const [activeZoneTarget, setActiveZoneTarget] = useState<ZoneId | 'all'>('all');
  const [activeLevelTarget, setActiveLevelTarget] = useState<CognitiveLevel | undefined>();
  const [activeFilterOpts, setActiveFilterOpts] = useState<{ semester?: 1 | 2; lesson?: number } | undefined>();
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now());
  const [latestResult, setLatestResult] = useState<QuizResult | null>(null);

  // Sync to local storage on changes
  useEffect(() => {
    StorageManager.saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    StorageManager.saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    StorageManager.saveQuestions(questions);
  }, [questions]);

  useEffect(() => {
    StorageManager.saveHistory(history);
  }, [history]);

  // Update Student Profile
  const handleUpdateProfile = (name: string, className: string) => {
    setProfile((prev) => ({
      ...prev,
      name,
      className
    }));
  };

  // Launch Quiz Session with Selected Scope
  const handleStartQuiz = (
    zone: ZoneId | 'all', 
    level?: CognitiveLevel,
    filterOpts?: { semester?: 1 | 2; lesson?: number }
  ) => {
    setActiveZoneTarget(zone);
    setActiveLevelTarget(level);
    setActiveFilterOpts(filterOpts);
    setQuizStartTime(Date.now());

    // Filter eligible active questions
    let pool = questions.filter((q) => q.enabled);

    if (zone !== 'all') {
      pool = pool.filter((q) => q.zone === zone);
    }

    if (level) {
      pool = pool.filter((q) => q.level === level);
    }

    if (filterOpts?.semester) {
      pool = pool.filter((q) => q.semester === filterOpts.semester);
    }

    if (filterOpts?.lesson) {
      pool = pool.filter((q) => q.lesson === filterOpts.lesson);
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);

    // Limit to configured question count (e.g. 10 or 15)
    const selected = shuffled.slice(0, Math.min(shuffled.length, settings.defaultQuestionCount || 10));

    if (selected.length === 0) {
      alert('Không tìm thấy câu hỏi khả dụng cho bài học hoặc khu vực này. Thầy/Cô có thể bổ sung thêm trong Không gian Giáo viên!');
      return;
    }

    setActiveQuizQuestions(selected);
    setCurrentView('quiz');
  };

  // Handle Quiz Completion & Evaluation
  const handleFinishQuiz = (answers: AnswerRecord[], totalScore: number) => {
    const durationSeconds = Math.max(1, Math.round((Date.now() - quizStartTime) / 1000));
    const correctAnswers = answers.filter((a) => a.isCorrect);
    const wrongAnswers = answers.filter((a) => !a.isCorrect);
    const correctCount = correctAnswers.length;
    const totalQuestions = answers.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Breakdown by 4 cognitive levels
    const levelBreakdown: QuizResult['levelBreakdown'] = {
      nhan_biet: { correct: 0, total: 0 },
      thong_hieu: { correct: 0, total: 0 },
      van_dung_thap: { correct: 0, total: 0 },
      van_dung_cao: { correct: 0, total: 0 }
    };

    const zoneBreakdown: QuizResult['zoneBreakdown'] = {
      kham_pha_van_ban: { correct: 0, total: 0 },
      tham_hiem_tieng_viet: { correct: 0, total: 0 },
      xuong_viet_sang_tao: { correct: 0, total: 0 },
      san_khau_noi_va_nghe: { correct: 0, total: 0 }
    };

    answers.forEach((rec) => {
      const lvl = rec.question.level;
      if (levelBreakdown[lvl]) {
        levelBreakdown[lvl].total += 1;
        if (rec.isCorrect) levelBreakdown[lvl].correct += 1;
      }

      const zn = rec.question.zone;
      if (zoneBreakdown[zn]) {
        zoneBreakdown[zn].total += 1;
        if (rec.isCorrect) zoneBreakdown[zn].correct += 1;
      }
    });

    // Identify Strengths and Needs Review
    const strengthsSet = new Set<string>();
    const needsReviewSet = new Set<string>();

    correctAnswers.forEach((a) => {
      strengthsSet.add(a.question.topic);
    });

    wrongAnswers.forEach((a) => {
      needsReviewSet.add(a.question.topic);
    });

    const strengths = Array.from(strengthsSet).slice(0, 4);
    const needsReview = Array.from(needsReviewSet).slice(0, 4);

    const newResult: QuizResult = {
      id: 'res_' + Date.now(),
      studentName: profile.name || 'Học sinh',
      className: profile.className || 'Lớp 6',
      totalScore,
      correctCount,
      incorrectCount: totalQuestions - correctCount,
      totalQuestions,
      percentage,
      durationSeconds,
      levelBreakdown,
      zoneBreakdown,
      strengths,
      needsReview,
      wrongAnswers,
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save to history
    setHistory((prev) => [newResult, ...prev]);
    setLatestResult(newResult);

    // Update Profile Progress & Stars
    setProfile((prev) => {
      const updated = { ...prev };
      updated.totalScore += totalScore;

      // Add stars earned (1 star for every 20 points, min 1 if passed)
      const starsEarned = Math.max(1, Math.round(totalScore / 25));

      if (activeZoneTarget !== 'all') {
        updated.stars[activeZoneTarget] = (updated.stars[activeZoneTarget] || 0) + starsEarned;
        updated.completedMissions[activeZoneTarget] = (updated.completedMissions[activeZoneTarget] || 0) + 1;

        // Auto unlock next level if passed with >= 60%
        if (percentage >= 60) {
          const currentUnlocked = updated.unlockedLevels[activeZoneTarget] || 1;
          if (currentUnlocked < 4) {
            updated.unlockedLevels[activeZoneTarget] = (currentUnlocked + 1) as 1 | 2 | 3 | 4;
          }
        }
      }

      // Check badges
      const newBadges = [...updated.badges];
      if (percentage >= 90 && !newBadges.includes('bac_thay_van_6')) {
        newBadges.push('bac_thay_van_6');
      }
      if (answers.length >= 10 && answers.every((a) => a.isCorrect) && !newBadges.includes('chien_binh_kien_cuong')) {
        newBadges.push('chien_binh_kien_cuong');
      }
      if (durationSeconds < 120 && percentage >= 80 && !newBadges.includes('vua_toc_do')) {
        newBadges.push('vua_toc_do');
      }
      updated.badges = newBadges;

      return updated;
    });

    setCurrentView('result');
  };

  // Practice wrong answers only
  const handlePracticeWrongOnly = () => {
    if (!latestResult || latestResult.wrongAnswers.length === 0) return;
    const wrongQs = latestResult.wrongAnswers.map((w) => w.question);
    setActiveQuizQuestions(wrongQs);
    setQuizStartTime(Date.now());
    setCurrentView('quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* App Universal Header */}
      <Header
        title={settings.customTitle || 'ĐẤU TRƯỜNG NGỮ VĂN 6'}
        slogan={settings.customSlogan || 'Học mà chơi – Chơi mà học – Chinh phục tri thức'}
        profile={profile}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenTeacher={() => setShowTeacherPortal(true)}
        onGoHome={() => setCurrentView(profile.name ? 'map' : 'start')}
        currentView={currentView}
      />

      {/* Main Screen Views */}
      <main className="flex-1 flex flex-col">
        {currentView === 'start' && (
          <StartScreen
            title={settings.customTitle || 'ĐẤU TRƯỜNG NGỮ VĂN 6'}
            slogan={settings.customSlogan || 'Học mà chơi – Chơi mà học – Chinh phục tri thức'}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onStart={() => setCurrentView('map')}
            onOpenInstructions={() => setShowInstructions(true)}
            onOpenTeacher={() => setShowTeacherPortal(true)}
            soundEnabled={soundEnabled}
          />
        )}

        {currentView === 'map' && (
          <JourneyMap
            profile={profile}
            settings={settings}
            onSelectZone={(zone, level, filterOpts) => handleStartQuiz(zone, level, filterOpts)}
            onOpenStudyGuide={() => setShowStudyGuide(true)}
            soundEnabled={soundEnabled}
          />
        )}

        {currentView === 'quiz' && (
          <QuizArena
            questions={activeQuizQuestions}
            profile={profile}
            settings={settings}
            soundEnabled={soundEnabled}
            onFinishQuiz={handleFinishQuiz}
            onQuitToMap={() => setCurrentView('map')}
          />
        )}

        {currentView === 'result' && latestResult && (
          <ResultReport
            result={latestResult}
            profile={profile}
            soundEnabled={soundEnabled}
            onPlayAgain={() => handleStartQuiz(activeZoneTarget, activeLevelTarget, activeFilterOpts)}
            onPracticeWrongOnly={handlePracticeWrongOnly}
            onGoHome={() => setCurrentView('map')}
          />
        )}
      </main>

      {/* Modals */}
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />

      <StudyGuideModal
        isOpen={showStudyGuide}
        onClose={() => setShowStudyGuide(false)}
        onSelectLessonForQuiz={(lessonId) => {
          setShowStudyGuide(false);
          handleStartQuiz('all', undefined, { lesson: lessonId });
        }}
        soundEnabled={soundEnabled}
      />

      <TeacherPortal
        isOpen={showTeacherPortal}
        settings={settings}
        questions={questions}
        history={history}
        onClose={() => setShowTeacherPortal(false)}
        onUpdateSettings={setSettings}
        onUpdateQuestions={setQuestions}
        onResetQuestions={() => {
          setQuestions(DEFAULT_QUESTIONS);
          StorageManager.saveQuestions(DEFAULT_QUESTIONS);
        }}
        onDeleteHistoryItem={(id) => {
          setHistory((prev) => prev.filter((h) => h.id !== id));
        }}
        onClearHistory={() => {
          setHistory([]);
          StorageManager.saveHistory([]);
        }}
        soundEnabled={soundEnabled}
      />

      {/* Footer */}
      <footer className="py-3 px-4 border-t border-slate-200/70 bg-white/70 text-center text-[11px] text-slate-500 font-medium">
        Đấu Trường Ngữ Văn 6 • Chương trình GDPT 2018 (Kết nối tri thức với cuộc sống) • Phiên bản tương tác đa giác quan
      </footer>
    </div>
  );
}
