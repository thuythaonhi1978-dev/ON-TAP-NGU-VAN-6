import { Question, StudentProfile, QuizResult, TeacherSettings } from '../types';
import { DEFAULT_QUESTIONS } from '../data/defaultQuestions';

const PROFILE_KEY = 'dtnv6_profile';
const QUESTIONS_KEY = 'dtnv6_questions';
const HISTORY_KEY = 'dtnv6_history';
const SETTINGS_KEY = 'dtnv6_settings';

export const DEFAULT_PROFILE: StudentProfile = {
  name: '',
  className: '',
  totalScore: 0,
  stars: {
    kham_pha_van_ban: 0,
    tham_hiem_tieng_viet: 0,
    xuong_viet_sang_tao: 0,
    san_khau_noi_va_nghe: 0
  },
  unlockedLevels: {
    kham_pha_van_ban: 1,
    tham_hiem_tieng_viet: 1,
    xuong_viet_sang_tao: 1,
    san_khau_noi_va_nghe: 1
  },
  completedMissions: {
    kham_pha_van_ban: 0,
    tham_hiem_tieng_viet: 0,
    xuong_viet_sang_tao: 0,
    san_khau_noi_va_nghe: 0
  },
  badges: []
};

export const DEFAULT_TEACHER_SETTINGS: TeacherSettings = {
  passwordHash: '123456', // default password
  timerDuration: 45, // 45 seconds per question (0 for infinite)
  defaultQuestionCount: 10,
  unlockAllLevels: false,
  soundEnabled: true,
  customTitle: 'ĐẤU TRƯỜNG NGỮ VĂN 6',
  customSlogan: '“Học mà chơi – Chơi mà học – Chinh phục tri thức”',
  themeColor: 'blue',
  activeLevels: ['nhan_biet', 'thong_hieu', 'van_dung_thap', 'van_dung_cao']
};

export const Storage = {
  getProfile: (): StudentProfile => {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      if (!data) return DEFAULT_PROFILE;
      const parsed = JSON.parse(data);
      return { ...DEFAULT_PROFILE, ...parsed };
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile: (profile: StudentProfile) => {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  },

  getQuestions: (): Question[] => {
    try {
      const data = localStorage.getItem(QUESTIONS_KEY);
      if (!data) return DEFAULT_QUESTIONS;
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_QUESTIONS;
      
      // Merge with latest DEFAULT_QUESTIONS to incorporate new curriculum questions & lesson metadata
      const map = new Map<string, Question>();
      DEFAULT_QUESTIONS.forEach((q) => map.set(q.id, q));
      parsed.forEach((q: Question) => {
        const defaultQ = map.get(q.id);
        if (defaultQ) {
          map.set(q.id, {
            ...defaultQ,
            ...q,
            semester: q.semester ?? defaultQ.semester,
            lesson: q.lesson ?? defaultQ.lesson,
            lessonTitle: q.lessonTitle ?? defaultQ.lessonTitle,
            sourceText: q.sourceText ?? defaultQ.sourceText
          });
        } else {
          map.set(q.id, q);
        }
      });
      return Array.from(map.values());
    } catch {
      return DEFAULT_QUESTIONS;
    }
  },

  saveQuestions: (questions: Question[]) => {
    try {
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  },

  resetQuestionsToDefault: (): Question[] => {
    try {
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(DEFAULT_QUESTIONS));
    } catch (e) {
      console.warn('Reset failed:', e);
    }
    return DEFAULT_QUESTIONS;
  },

  getHistory: (): QuizResult[] => {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  saveQuizResult: (result: QuizResult) => {
    try {
      const history = Storage.getHistory();
      history.unshift(result);
      // Keep up to 100 historical attempts
      if (history.length > 100) history.pop();
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

      // Also update student profile stars & points
      const profile = Storage.getProfile();
      profile.totalScore += result.totalScore;
      
      // Award stars based on score
      const starsEarned = result.percentage >= 90 ? 3 : result.percentage >= 70 ? 2 : result.percentage >= 50 ? 1 : 0;
      Object.keys(result.zoneBreakdown).forEach((zKey) => {
        const zone = zKey as keyof typeof profile.stars;
        if (result.zoneBreakdown[zone]?.total > 0) {
          profile.stars[zone] = Math.max(profile.stars[zone] || 0, (profile.stars[zone] || 0) + starsEarned);
          profile.completedMissions[zone] = (profile.completedMissions[zone] || 0) + 1;
          
          // If student passed with >= 70%, unlock next level in this zone
          if (result.percentage >= 70 && profile.unlockedLevels[zone] < 4) {
            profile.unlockedLevels[zone] = Math.min(4, profile.unlockedLevels[zone] + 1);
          }
        }
      });

      // Award badges
      if (!profile.badges.includes('mam_non')) {
        profile.badges.push('mam_non');
      }
      if (result.percentage >= 90 && !profile.badges.includes('bac_thay_ngu_van')) {
        profile.badges.push('bac_thay_ngu_van');
      }
      if (result.zoneBreakdown.tham_hiem_tieng_viet?.total > 0) {
        const tv = result.zoneBreakdown.tham_hiem_tieng_viet;
        if ((tv.correct / tv.total) >= 0.8 && !profile.badges.includes('tham_hiem_tu_ngu')) {
          profile.badges.push('tham_hiem_tu_ngu');
        }
      }
      if (result.zoneBreakdown.kham_pha_van_ban?.total > 0) {
        const vb = result.zoneBreakdown.kham_pha_van_ban;
        if ((vb.correct / vb.total) >= 0.8 && !profile.badges.includes('cao_thu_doc_hieu')) {
          profile.badges.push('cao_thu_doc_hieu');
        }
      }
      if (result.zoneBreakdown.xuong_viet_sang_tao?.total > 0) {
        const xv = result.zoneBreakdown.xuong_viet_sang_tao;
        if ((xv.correct / xv.total) >= 0.8 && !profile.badges.includes('cay_but_sang_tao')) {
          profile.badges.push('cay_but_sang_tao');
        }
      }

      Storage.saveProfile(profile);
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  },

  clearHistory: () => {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.warn(e);
    }
  },

  deleteResult: (id: string) => {
    try {
      const history = Storage.getHistory().filter((r) => r.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn(e);
    }
  },

  saveHistory: (history: QuizResult[]) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Save history failed:', e);
    }
  },

  getSettings: (): TeacherSettings => {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (!data) return DEFAULT_TEACHER_SETTINGS;
      const parsed = JSON.parse(data);
      return { ...DEFAULT_TEACHER_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_TEACHER_SETTINGS;
    }
  },

  saveSettings: (settings: TeacherSettings) => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }
};

export const StorageManager = Storage;
