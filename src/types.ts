export type ZoneId = 
  | 'kham_pha_van_ban' 
  | 'tham_hiem_tieng_viet' 
  | 'xuong_viet_sang_tao' 
  | 'san_khau_noi_va_nghe';

export type CognitiveLevel = 
  | 'nhan_biet' 
  | 'thong_hieu' 
  | 'van_dung_thap' 
  | 'van_dung_cao';

export type GameType = 
  | 'ai_nhanh_hon' 
  | 'ghep_doi' 
  | 'o_cua_bi_mat' 
  | 'sap_xep_sieu_toc' 
  | 'tho_san_loi_sai' 
  | 'vong_quay_may_man' 
  | 'giai_cuu_nhan_vat' 
  | 'vuot_me_cung';

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface SequenceItem {
  id: string;
  text: string;
  correctIndex: number;
}

export interface ErrorSpotterData {
  tokens: {
    id: string;
    text: string;
    isError: boolean;
    correctText?: string;
  }[];
  instruction: string;
  explanation?: string;
}

export interface Question {
  id: string;
  zone: ZoneId;
  level: CognitiveLevel;
  gameType: GameType;
  topic: string;
  semester?: 1 | 2; // Tập 1 hoặc Tập 2
  lesson?: number; // Bài 1 -> 10
  lessonTitle?: string; // Tên bài học SGK
  sourceText?: string; // Tác phẩm / văn bản nguồn trong SGK
  prompt: string;
  context?: string; // Text fragment, excerpt or scenario
  options?: string[]; // 4 choices for multiple choice / quick question
  correctAnswer: any; // index or value or matches
  matchingPairs?: MatchingPair[];
  sequenceItems?: SequenceItem[];
  errorSpotter?: ErrorSpotterData;
  explanation: string;
  hints: [string, string];
  keyTakeaway: string; // "Kiến thức ghi nhớ"
  points: number; // 10, 20, 30, 40
  enabled: boolean;
}

export interface LessonInfo {
  id: number;
  semester: 1 | 2;
  title: string;
  theme: string;
  genre: string;
  texts: string[];
  vietnameseKnowledge: string[];
  writingTopic: string;
  speakingTopic: string;
}

export interface StudentProfile {
  name: string;
  className: string;
  totalScore: number;
  stars: Record<ZoneId, number>;
  unlockedLevels: Record<ZoneId, number>; // 1, 2, 3, 4
  completedMissions: Record<ZoneId, number>;
  badges: string[];
}

export interface AnswerRecord {
  questionId: string;
  question: Question;
  userAnswer: any;
  isCorrect: boolean;
  hintsUsed: number;
  timeSpent: number;
  scoreEarned: number;
  retried?: boolean;
}

export interface QuizResult {
  id: string;
  studentName: string;
  className: string;
  date: string;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  totalScore: number;
  percentage: number;
  durationSeconds: number;
  levelBreakdown: Record<CognitiveLevel, { total: number; correct: number }>;
  zoneBreakdown: Record<ZoneId, { total: number; correct: number }>;
  strengths: string[];
  needsReview: string[];
  wrongAnswers: AnswerRecord[];
  badgeEarned?: string;
}

export interface TeacherSettings {
  passwordHash: string; // default is '123456'
  timerDuration: number; // in seconds (0 = no limit)
  defaultQuestionCount: number;
  unlockAllLevels: boolean;
  soundEnabled: boolean;
  customTitle: string;
  customSlogan: string;
  themeColor: 'blue' | 'purple' | 'amber' | 'emerald';
  activeLevels: CognitiveLevel[];
}

export interface BadgeInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: string;
}

// ==========================================
// CLASSROOM MANAGEMENT TYPES (Quản lý lớp học)
// ==========================================

export type AttendanceStatus = 'present' | 'absent_excused' | 'absent_unexcused' | 'late';

export interface ClassroomStudent {
  id: string;
  studentCode: string; // e.g. "HS01"
  name: string;
  gender: 'Nam' | 'Nữ';
  className: string; // e.g. "6A1", "6A2"
  group: number; // Tổ 1, 2, 3, 4
  meritPoints: number; // Điểm thi đua cá nhân (mặc định 100)
  phone?: string;
  notes?: string;
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  className: string;
  records: Record<string, AttendanceStatus>; // studentId -> status
  notes?: Record<string, string>;
  updatedAt: string;
}

export interface PointHistoryItem {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  group: number;
  change: number; // +5, -2, etc.
  reason: string;
  timestamp: string;
}

export interface SavedGroupMember {
  id: string;
  studentCode: string;
  name: string;
  gender: 'Nam' | 'Nữ';
  group: number;
}

export interface SavedGroupResult {
  id: string;
  className: string;
  createdAt: string;
  mode: 'by_group_count' | 'by_member_count';
  paramValue: number;
  groups: {
    groupIndex: number;
    groupName: string;
    members: SavedGroupMember[];
  }[];
}
