import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Settings, 
  Database, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  X, 
  FileSpreadsheet, 
  Volume2, 
  KeyRound, 
  ToggleLeft, 
  ToggleRight,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';
import { Question, TeacherSettings, QuizResult, ZoneId, CognitiveLevel, GameType } from '../types';
import { ZONE_CONFIG, COGNITIVE_LEVELS } from '../data/defaultQuestions';
import { TEXTBOOK_LESSONS } from '../data/lessonsData';
import { SoundFX } from '../utils/sound';

interface TeacherPortalProps {
  isOpen: boolean;
  settings: TeacherSettings;
  questions: Question[];
  history: QuizResult[];
  onClose: () => void;
  onUpdateSettings: (newSettings: TeacherSettings) => void;
  onUpdateQuestions: (newQuestions: Question[]) => void;
  onResetQuestions: () => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  soundEnabled: boolean;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  isOpen,
  settings,
  questions,
  history,
  onClose,
  onUpdateSettings,
  onUpdateQuestions,
  onResetQuestions,
  onDeleteHistoryItem,
  onClearHistory,
  soundEnabled
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'questions' | 'settings' | 'history'>('questions');

  // Filter questions states
  const [filterZone, setFilterZone] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterSemester, setFilterSemester] = useState<string>('all');
  const [filterLesson, setFilterLesson] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Add / Edit question modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Password changing state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  // App branding states
  const [tempTitle, setTempTitle] = useState(settings.customTitle);
  const [tempSlogan, setTempSlogan] = useState(settings.customSlogan);
  const [tempTimer, setTempTimer] = useState(settings.timerDuration);
  const [tempCount, setTempCount] = useState(settings.defaultQuestionCount);
  const [tempUnlockAll, setTempUnlockAll] = useState(settings.unlockAllLevels);

  if (!isOpen) return null;

  // Handle Teacher Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword === settings.passwordHash) {
      setIsAuthenticated(true);
      setAuthError('');
      SoundFX.playCorrect(soundEnabled);
    } else {
      setAuthError('Mật khẩu không chính xác! (Mặc định: 123456)');
      SoundFX.playWrong(soundEnabled);
    }
  };

  // Toggle enable/disable question
  const toggleQuestionStatus = (id: string) => {
    SoundFX.playClick(soundEnabled);
    const updated = questions.map((q) => (q.id === id ? { ...q, enabled: !q.enabled } : q));
    onUpdateQuestions(updated);
  };

  // Delete question
  const handleDeleteQuestion = (id: string) => {
    if (window.confirm('Thầy/Cô có chắc chắn muốn xóa câu hỏi này khỏi ngân hàng không?')) {
      SoundFX.playClick(soundEnabled);
      const updated = questions.filter((q) => q.id !== id);
      onUpdateQuestions(updated);
    }
  };

  // Export questions to JSON
  const handleExportQuestionsJSON = () => {
    SoundFX.playClick(soundEnabled);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `Ngan_hang_cau_hoi_Ngu_Van_6_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  // Export Student History to CSV
  const handleExportStudentCSV = () => {
    SoundFX.playClick(soundEnabled);
    if (history.length === 0) {
      alert('Chưa có kết quả học sinh nào được lưu!');
      return;
    }

    const headers = ['Họ và tên', 'Lớp', 'Điểm', 'Số câu đúng', 'Tổng số câu', 'Tỉ lệ (%)', 'Thời gian (giây)', 'Ngày làm bài'];
    const rows = history.map((h) => [
      `"${h.studentName}"`,
      `"${h.className}"`,
      h.totalScore,
      h.correctCount,
      h.totalQuestions,
      `${h.percentage}%`,
      h.durationSeconds,
      `"${h.date}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encodedUri;
    a.download = `Bang_diem_hoc_sinh_Ngu_Van_6_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  // Import questions from JSON file
  const handleImportQuestions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onUpdateQuestions(parsed);
          alert(`Đã nhập thành công ${parsed.length} câu hỏi vào ngân hàng!`);
          SoundFX.playFanfare(soundEnabled);
        } else {
          alert('Tệp dữ liệu không hợp lệ!');
        }
      } catch {
        alert('Lỗi khi đọc tệp JSON!');
      }
    };
    reader.readAsText(file);
  };

  // Save Settings
  const handleSaveSettings = () => {
    SoundFX.playCorrect(soundEnabled);
    onUpdateSettings({
      ...settings,
      customTitle: tempTitle,
      customSlogan: tempSlogan,
      timerDuration: tempTimer,
      defaultQuestionCount: tempCount,
      unlockAllLevels: tempUnlockAll
    });
    alert('Đã lưu các cài đặt thành công!');
  };

  // Change Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      setPasswordMsg('Mật khẩu mới phải có tối thiểu 4 kí tự!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg('Mật khẩu xác nhận không khớp!');
      return;
    }

    onUpdateSettings({
      ...settings,
      passwordHash: newPassword
    });
    setPasswordMsg('Đổi mật khẩu thành công!');
    setNewPassword('');
    setConfirmPassword('');
    SoundFX.playCorrect(soundEnabled);
  };

  // Filtered Questions List
  const filteredQuestions = questions.filter((q) => {
    if (filterZone !== 'all' && q.zone !== filterZone) return false;
    if (filterLevel !== 'all' && q.level !== filterLevel) return false;
    if (filterSemester !== 'all' && q.semester !== Number(filterSemester)) return false;
    if (filterLesson !== 'all' && q.lesson !== Number(filterLesson)) return false;
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      return (
        q.prompt.toLowerCase().includes(kw) ||
        q.topic.toLowerCase().includes(kw) ||
        (q.lessonTitle && q.lessonTitle.toLowerCase().includes(kw)) ||
        (q.sourceText && q.sourceText.toLowerCase().includes(kw))
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl my-6 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <Shield className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Không Gian Dành Cho Giáo Viên
              </h2>
              <p className="text-xs text-purple-100 font-medium">
                Quản lí ngân hàng câu hỏi, tùy biến đề thi và theo dõi tiến độ học sinh
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Nhập Mật Khẩu Giáo Viên
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
              Khu vực bảo mật dành cho giáo viên biên soạn câu hỏi và thiết lập thông số. Mật khẩu mặc định là <strong>123456</strong>.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3 pt-2">
              <input
                type="password"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 text-center font-bold text-slate-800 outline-none transition-all"
              />
              {authError && <p className="text-xs font-semibold text-rose-600">{authError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-extrabold text-sm shadow-md transition-all"
              >
                Đăng Nhập
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Teacher Workspace */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="px-6 py-2 bg-slate-100/80 border-b border-slate-200 flex flex-wrap gap-2 text-xs font-bold">
              <button
                onClick={() => setActiveTab('questions')}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'questions'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Database className="w-4 h-4" />
                Ngân Hàng Câu Hỏi ({questions.length})
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'history'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4" />
                Kết Quả Học Sinh ({history.length})
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'settings'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                Cài Đặt Đề Thi & Ứng Dụng
              </button>
            </div>

            {/* Tab 1: Questions Management */}
            {activeTab === 'questions' && (
              <div className="p-6 overflow-y-auto space-y-4">
                {/* Actions Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Zone Filter */}
                    <select
                      value={filterZone}
                      onChange={(e) => setFilterZone(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-700"
                    >
                      <option value="all">Tất cả khu vực</option>
                      <option value="kham_pha_van_ban">Khám Phá Văn Bản</option>
                      <option value="tham_hiem_tieng_viet">Tiếng Việt</option>
                      <option value="xuong_viet_sang_tao">Xưởng Viết</option>
                      <option value="san_khau_noi_va_nghe">Nói và Nghe</option>
                    </select>

                    {/* Level Filter */}
                    <select
                      value={filterLevel}
                      onChange={(e) => setFilterLevel(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-700"
                    >
                      <option value="all">Tất cả cấp độ</option>
                      <option value="nhan_biet">Nhận biết</option>
                      <option value="thong_hieu">Thông hiểu</option>
                      <option value="van_dung_thap">Vận dụng thấp</option>
                      <option value="van_dung_cao">Vận dụng cao</option>
                    </select>

                    {/* Semester Filter */}
                    <select
                      value={filterSemester}
                      onChange={(e) => {
                        setFilterSemester(e.target.value);
                        setFilterLesson('all');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-700"
                    >
                      <option value="all">Tất cả tập SGK</option>
                      <option value="1">📘 Tập 1 (Bài 1 - 5)</option>
                      <option value="2">📙 Tập 2 (Bài 6 - 10)</option>
                    </select>

                    {/* Lesson Filter */}
                    <select
                      value={filterLesson}
                      onChange={(e) => setFilterLesson(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-700 max-w-[180px]"
                    >
                      <option value="all">Tất cả bài học</option>
                      {TEXTBOOK_LESSONS.filter((l) => filterSemester === 'all' || l.semester === Number(filterSemester)).map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.title}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Tìm kiếm theo từ khóa..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-700 w-44 sm:w-60"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportQuestionsJSON}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                      title="Xuất file JSON"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Xuất JSON
                    </button>

                    <label className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      Nhập JSON
                      <input type="file" accept=".json" onChange={handleImportQuestions} className="hidden" />
                    </label>

                    <button
                      onClick={() => {
                        if (window.confirm('Khôi phục ngân hàng câu hỏi gốc (64 câu mẫu)?')) {
                          onResetQuestions();
                          SoundFX.playFanfare(soundEnabled);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Mặc định
                    </button>
                  </div>
                </div>

                {/* Questions List */}
                <div className="space-y-3">
                  {filteredQuestions.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs font-medium">
                      Không tìm thấy câu hỏi nào phù hợp với bộ lọc.
                    </div>
                  ) : (
                    filteredQuestions.map((q, idx) => (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border transition-all space-y-2 ${
                          q.enabled ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-50 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-black text-slate-400">#{idx + 1}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${COGNITIVE_LEVELS[q.level].color}`}>
                                {COGNITIVE_LEVELS[q.level].name}
                              </span>
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                {ZONE_CONFIG[q.zone]?.shortName || q.zone}
                              </span>
                              {q.lessonTitle && (
                                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                                  {q.lessonTitle}
                                </span>
                              )}
                              {q.sourceText && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  📖 {q.sourceText}
                                </span>
                              )}
                              <span className="text-[11px] text-slate-500 font-medium">
                                Chủ đề: {q.topic}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-slate-800">
                              {q.prompt}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 flex-shrink-0">
                            {/* Toggle status */}
                            <button
                              onClick={() => toggleQuestionStatus(q.id)}
                              className={`p-1.5 rounded-lg text-xs font-bold ${
                                q.enabled ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-100'
                              }`}
                              title={q.enabled ? 'Đang bật (bấm để tắt)' : 'Đang tắt (bấm để bật)'}
                            >
                              {q.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteQuestion(q.id)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                              title="Xóa câu hỏi này"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs text-slate-500 line-clamp-1">
                          <strong>Giải thích:</strong> {q.explanation}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Student Results History */}
            {activeTab === 'history' && (
              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Nhật Ký Thi Đấu Của Học Sinh
                    </h3>
                    <p className="text-xs text-slate-500">
                      Lưu trữ tự động các lượt làm bài trên thiết bị
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportStudentCSV}
                      disabled={history.length === 0}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      Xuất Bảng Điểm CSV
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm('Thầy/Cô có chắc chắn muốn xóa toàn bộ lịch sử điểm số của học sinh?')) {
                          onClearHistory();
                        }
                      }}
                      disabled={history.length === 0}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 disabled:opacity-40 text-xs font-bold"
                    >
                      Xóa Lịch Sử
                    </button>
                  </div>
                </div>

                {history.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Chưa có lượt thi đấu nào được ghi lại.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                        <tr>
                          <th className="p-3">Học Sinh</th>
                          <th className="p-3">Lớp</th>
                          <th className="p-3">Điểm Số</th>
                          <th className="p-3">Số Câu Đúng</th>
                          <th className="p-3">Tỉ Lệ</th>
                          <th className="p-3">Thời Gian</th>
                          <th className="p-3">Ngày Làm</th>
                          <th className="p-3 text-right">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {history.map((h) => (
                          <tr key={h.id} className="hover:bg-slate-50/80">
                            <td className="p-3 font-bold text-slate-900">{h.studentName}</td>
                            <td className="p-3">{h.className}</td>
                            <td className="p-3 font-extrabold text-blue-600">{h.totalScore}đ</td>
                            <td className="p-3 text-emerald-600 font-bold">{h.correctCount}/{h.totalQuestions}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                h.percentage >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {h.percentage}%
                              </span>
                            </td>
                            <td className="p-3">{Math.floor(h.durationSeconds / 60)}p {h.durationSeconds % 60}s</td>
                            <td className="p-3 text-slate-500">{h.date}</td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => onDeleteHistoryItem(h.id)}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                                title="Xóa kết quả này"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Settings & Branding */}
            {activeTab === 'settings' && (
              <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
                {/* Quiz parameters */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Thông Số Đề Thi Ôn Luyện
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Số câu hỏi mỗi lượt chơi:
                      </label>
                      <select
                        value={tempCount}
                        onChange={(e) => setTempCount(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-bold text-slate-800"
                      >
                        <option value={5}>5 câu</option>
                        <option value={10}>10 câu (Tiêu chuẩn)</option>
                        <option value={15}>15 câu</option>
                        <option value={20}>20 câu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Thời gian mỗi câu hỏi:
                      </label>
                      <select
                        value={tempTimer}
                        onChange={(e) => setTempTimer(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-bold text-slate-800"
                      >
                        <option value={30}>30 giây (Nhanh)</option>
                        <option value={45}>45 giây (Chuẩn)</option>
                        <option value={60}>60 giây (Thong thả)</option>
                        <option value={0}>Không giới hạn thời gian</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Chế độ cấp độ:
                      </label>
                      <div className="pt-2">
                        <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                          <input
                            type="checkbox"
                            checked={tempUnlockAll}
                            onChange={(e) => setTempUnlockAll(e.target.checked)}
                            className="w-4 h-4 text-purple-600 rounded"
                          />
                          Mở khóa toàn bộ 4 cấp độ
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* App Branding */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Tùy Biến Tên Ứng Dụng & Khẩu Hiệu
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Tên ứng dụng:
                      </label>
                      <input
                        type="text"
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-bold text-slate-800 text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Slogan:
                      </label>
                      <input
                        type="text"
                        value={tempSlogan}
                        onChange={(e) => setTempSlogan(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-bold text-slate-800 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Lưu Thay Đổi Cài Đặt
                  </button>
                </div>

                {/* Change Teacher Password */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-purple-600" />
                    Đổi Mật Khẩu Giáo Viên
                  </h4>

                  <form onSubmit={handleChangePassword} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="password"
                      placeholder="Mật khẩu mới..."
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="p-2.5 rounded-xl bg-white border border-slate-300 font-medium text-xs sm:text-sm"
                    />
                    <input
                      type="password"
                      placeholder="Xác nhận mật khẩu mới..."
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="p-2.5 rounded-xl bg-white border border-slate-300 font-medium text-xs sm:text-sm"
                    />
                    <button
                      type="submit"
                      className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-all"
                    >
                      Cập Nhật Mật Khẩu
                    </button>
                  </form>
                  {passwordMsg && <p className="text-xs font-bold text-purple-700">{passwordMsg}</p>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
