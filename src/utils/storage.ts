import { 
  Question, 
  StudentProfile, 
  QuizResult, 
  TeacherSettings,
  ClassroomStudent,
  AttendanceRecord,
  PointHistoryItem,
  SavedGroupResult
} from '../types';
import { DEFAULT_QUESTIONS } from '../data/defaultQuestions';

const PROFILE_KEY = 'dtnv6_profile';
const QUESTIONS_KEY = 'dtnv6_questions';
const HISTORY_KEY = 'dtnv6_history';
const SETTINGS_KEY = 'dtnv6_settings';

export const CLASSROOM_STUDENTS_KEY = 'dtnv6_classroom_students';
export const CLASSROOM_CLASSES_KEY = 'dtnv6_classroom_classes';
export const CLASSROOM_ATTENDANCE_KEY = 'dtnv6_classroom_attendance';
export const CLASSROOM_POINT_HISTORY_KEY = 'dtnv6_classroom_point_history';
export const CLASSROOM_SAVED_GROUPS_KEY = 'dtnv6_classroom_saved_groups';

export const DEFAULT_CLASSES: string[] = ['6A1', '6A2'];

export const DEFAULT_CLASSROOM_STUDENTS: ClassroomStudent[] = [
  // Lớp 6A1 - Tổ 1
  { id: 'hs_6a1_01', studentCode: 'HS01', name: 'Nguyễn Văn An', gender: 'Nam', className: '6A1', group: 1, meritPoints: 105, notes: 'Lớp trưởng' },
  { id: 'hs_6a1_02', studentCode: 'HS02', name: 'Trần Thị Mai', gender: 'Nữ', className: '6A1', group: 1, meritPoints: 110, notes: 'Tổ trưởng tổ 1' },
  { id: 'hs_6a1_03', studentCode: 'HS03', name: 'Lê Hoàng Nam', gender: 'Nam', className: '6A1', group: 1, meritPoints: 100 },
  { id: 'hs_6a1_04', studentCode: 'HS04', name: 'Phạm Thu Hà', gender: 'Nữ', className: '6A1', group: 1, meritPoints: 95 },
  // Lớp 6A1 - Tổ 2
  { id: 'hs_6a1_05', studentCode: 'HS05', name: 'Vũ Đức Minh', gender: 'Nam', className: '6A1', group: 2, meritPoints: 115, notes: 'Tổ trưởng tổ 2' },
  { id: 'hs_6a1_06', studentCode: 'HS06', name: 'Đỗ Phương Linh', gender: 'Nữ', className: '6A1', group: 2, meritPoints: 105 },
  { id: 'hs_6a1_07', studentCode: 'HS07', name: 'Bùi Gia Huy', gender: 'Nam', className: '6A1', group: 2, meritPoints: 90 },
  { id: 'hs_6a1_08', studentCode: 'HS08', name: 'Ngô Thảo My', gender: 'Nữ', className: '6A1', group: 2, meritPoints: 100 },
  // Lớp 6A1 - Tổ 3
  { id: 'hs_6a1_09', studentCode: 'HS09', name: 'Hoàng Quốc Bảo', gender: 'Nam', className: '6A1', group: 3, meritPoints: 100, notes: 'Tổ trưởng tổ 3' },
  { id: 'hs_6a1_10', studentCode: 'HS10', name: 'Đặng Ngọc Ánh', gender: 'Nữ', className: '6A1', group: 3, meritPoints: 120, notes: 'Lớp phó học tập' },
  { id: 'hs_6a1_11', studentCode: 'HS11', name: 'Dương Thành Đạt', gender: 'Nam', className: '6A1', group: 3, meritPoints: 85 },
  { id: 'hs_6a1_12', studentCode: 'HS12', name: 'Lý Diệu Hương', gender: 'Nữ', className: '6A1', group: 3, meritPoints: 105 },
  // Lớp 6A1 - Tổ 4
  { id: 'hs_6a1_13', studentCode: 'HS13', name: 'Phan Minh Tuấn', gender: 'Nam', className: '6A1', group: 4, meritPoints: 110, notes: 'Tổ trưởng tổ 4' },
  { id: 'hs_6a1_14', studentCode: 'HS14', name: 'Trịnh Khánh Vy', gender: 'Nữ', className: '6A1', group: 4, meritPoints: 100 },
  { id: 'hs_6a1_15', studentCode: 'HS15', name: 'Võ Hữu Trí', gender: 'Nam', className: '6A1', group: 4, meritPoints: 95 },
  { id: 'hs_6a1_16', studentCode: 'HS16', name: 'Hồ Quỳnh Chi', gender: 'Nữ', className: '6A1', group: 4, meritPoints: 105 },

  // Lớp 6A2 - 12 học sinh
  { id: 'hs_6a2_01', studentCode: 'HS01', name: 'Nguyễn Tấn Đạt', gender: 'Nam', className: '6A2', group: 1, meritPoints: 100, notes: 'Lớp trưởng' },
  { id: 'hs_6a2_02', studentCode: 'HS02', name: 'Trần Bảo Ngọc', gender: 'Nữ', className: '6A2', group: 1, meritPoints: 105 },
  { id: 'hs_6a2_03', studentCode: 'HS03', name: 'Lê Tuấn Kiệt', gender: 'Nam', className: '6A2', group: 1, meritPoints: 95 },
  { id: 'hs_6a2_04', studentCode: 'HS04', name: 'Phạm Hồng Nhung', gender: 'Nữ', className: '6A2', group: 2, meritPoints: 110 },
  { id: 'hs_6a2_05', studentCode: 'HS05', name: 'Vũ Minh Khang', gender: 'Nam', className: '6A2', group: 2, meritPoints: 100 },
  { id: 'hs_6a2_06', studentCode: 'HS06', name: 'Đoàn Thanh Hằng', gender: 'Nữ', className: '6A2', group: 2, meritPoints: 105 },
  { id: 'hs_6a2_07', studentCode: 'HS07', name: 'Trần Văn Hùng', gender: 'Nam', className: '6A2', group: 3, meritPoints: 90 },
  { id: 'hs_6a2_08', studentCode: 'HS08', name: 'Nguyễn Thùy Dung', gender: 'Nữ', className: '6A2', group: 3, meritPoints: 115 },
  { id: 'hs_6a2_09', studentCode: 'HS09', name: 'Mai Thế Anh', gender: 'Nam', className: '6A2', group: 3, meritPoints: 100 },
  { id: 'hs_6a2_10', studentCode: 'HS10', name: 'Lê Thùy Tiên', gender: 'Nữ', className: '6A2', group: 4, meritPoints: 105 },
  { id: 'hs_6a2_11', studentCode: 'HS11', name: 'Đỗ Hữu Thắng', gender: 'Nam', className: '6A2', group: 4, meritPoints: 95 },
  { id: 'hs_6a2_12', studentCode: 'HS12', name: 'Bùi Kim Oanh', gender: 'Nữ', className: '6A2', group: 4, meritPoints: 110 }
];

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
  },

  // ==========================================
  // CLASSROOM MANAGEMENT STORAGE METHODS
  // ==========================================

  getClassroomStudents: (): ClassroomStudent[] => {
    try {
      const raw = localStorage.getItem(CLASSROOM_STUDENTS_KEY);
      if (raw === null) {
        // Initialize default seed data only on very first launch
        localStorage.setItem(CLASSROOM_STUDENTS_KEY, JSON.stringify(DEFAULT_CLASSROOM_STUDENTS));
        return DEFAULT_CLASSROOM_STUDENTS;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : DEFAULT_CLASSROOM_STUDENTS;
    } catch (e) {
      console.warn('Failed to load students:', e);
      return DEFAULT_CLASSROOM_STUDENTS;
    }
  },

  saveClassroomStudents: (students: ClassroomStudent[]): boolean => {
    try {
      localStorage.setItem(CLASSROOM_STUDENTS_KEY, JSON.stringify(students));
      return true;
    } catch (e) {
      console.error('Storage saveClassroomStudents failed:', e);
      return false;
    }
  },

  resetClassroomStudentsToDefault: (): ClassroomStudent[] => {
    try {
      localStorage.setItem(CLASSROOM_STUDENTS_KEY, JSON.stringify(DEFAULT_CLASSROOM_STUDENTS));
    } catch (e) {
      console.warn(e);
    }
    return DEFAULT_CLASSROOM_STUDENTS;
  },

  getClasses: (): string[] => {
    try {
      const raw = localStorage.getItem(CLASSROOM_CLASSES_KEY);
      if (raw === null) {
        localStorage.setItem(CLASSROOM_CLASSES_KEY, JSON.stringify(DEFAULT_CLASSES));
        return DEFAULT_CLASSES;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CLASSES;
    } catch {
      return DEFAULT_CLASSES;
    }
  },

  saveClasses: (classes: string[]): boolean => {
    try {
      localStorage.setItem(CLASSROOM_CLASSES_KEY, JSON.stringify(classes));
      return true;
    } catch (e) {
      console.error('Failed to save classes:', e);
      return false;
    }
  },

  getAllAttendance: (): Record<string, AttendanceRecord> => {
    try {
      const raw = localStorage.getItem(CLASSROOM_ATTENDANCE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch {
      return {};
    }
  },

  getAttendanceRecord: (className: string, date: string): AttendanceRecord | null => {
    const all = Storage.getAllAttendance();
    const key = `${className}_${date}`;
    return all[key] || null;
  },

  saveAttendanceRecord: (record: AttendanceRecord): boolean => {
    try {
      const all = Storage.getAllAttendance();
      const key = `${record.className}_${record.date}`;
      all[key] = {
        ...record,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(CLASSROOM_ATTENDANCE_KEY, JSON.stringify(all));
      return true;
    } catch (e) {
      console.error('Failed to save attendance:', e);
      return false;
    }
  },

  getPointHistory: (): PointHistoryItem[] => {
    try {
      const raw = localStorage.getItem(CLASSROOM_POINT_HISTORY_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  savePointHistory: (history: PointHistoryItem[]): boolean => {
    try {
      localStorage.setItem(CLASSROOM_POINT_HISTORY_KEY, JSON.stringify(history.slice(0, 300)));
      return true;
    } catch (e) {
      console.error('Failed to save point history:', e);
      return false;
    }
  },

  addPointHistoryItem: (item: PointHistoryItem): boolean => {
    try {
      const current = Storage.getPointHistory();
      current.unshift(item);
      return Storage.savePointHistory(current);
    } catch {
      return false;
    }
  },

  getSavedGroups: (): Record<string, SavedGroupResult> => {
    try {
      const raw = localStorage.getItem(CLASSROOM_SAVED_GROUPS_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch {
      return {};
    }
  },

  saveGroupResult: (result: SavedGroupResult): boolean => {
    try {
      const all = Storage.getSavedGroups();
      all[result.className] = result;
      localStorage.setItem(CLASSROOM_SAVED_GROUPS_KEY, JSON.stringify(all));
      return true;
    } catch (e) {
      console.error('Failed to save group result:', e);
      return false;
    }
  }
};

export const StorageManager = Storage;
