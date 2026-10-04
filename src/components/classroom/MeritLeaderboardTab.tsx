import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Minus, 
  Edit3, 
  RotateCcw, 
  FileSpreadsheet, 
  History, 
  Users, 
  Sparkles,
  Check,
  X,
  Clock
} from 'lucide-react';
import { ClassroomStudent, PointHistoryItem } from '../../types';
import { SoundFX } from '../../utils/sound';
import { exportToCSV } from '../../utils/exportCsv';

interface MeritLeaderboardTabProps {
  students: ClassroomStudent[];
  classes: string[];
  currentClass: string;
  onChangeClass: (className: string) => void;
  pointHistory: PointHistoryItem[];
  onUpdateStudentPoints: (
    studentId: string, 
    newPoints: number, 
    change: number, 
    reason: string
  ) => void;
  onUpdateGroupPoints: (groupNumber: number, change: number, reason: string) => void;
  onResetClassPoints: (className: string) => void;
  soundEnabled: boolean;
}

export const MeritLeaderboardTab: React.FC<MeritLeaderboardTabProps> = ({
  students,
  classes,
  currentClass,
  onChangeClass,
  pointHistory,
  onUpdateStudentPoints,
  onUpdateGroupPoints,
  onResetClassPoints,
  soundEnabled
}) => {
  const [viewMode, setViewMode] = useState<'individual' | 'group' | 'history'>('individual');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<number | 'all'>('all');

  // Point action modal
  const [activeStudent, setActiveStudent] = useState<ClassroomStudent | null>(null);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);
  const [pointActionType, setPointActionType] = useState<'add' | 'deduct' | 'edit'>('add');
  const [pointValue, setPointValue] = useState<number>(5);
  const [pointReason, setPointReason] = useState<string>('');

  // Group point modal
  const [activeGroupNum, setActiveGroupNum] = useState<number>(1);
  const [isGroupPointModalOpen, setIsGroupPointModalOpen] = useState(false);
  const [groupPointValue, setGroupPointValue] = useState<number>(5);
  const [groupPointReason, setGroupPointReason] = useState<string>('');

  // Class students
  const classStudents = students.filter((s) => s.className === currentClass);

  // Filter students
  const filteredStudents = classStudents.filter((s) => {
    if (selectedGroupFilter !== 'all' && s.group !== selectedGroupFilter) return false;
    return true;
  });

  // Calculate ranks with proper tie-breaking
  // Sort descending by meritPoints
  const sortedStudents = [...filteredStudents].sort((a, b) => b.meritPoints - a.meritPoints);

  // Group calculations
  const groupsList = [1, 2, 3, 4].map((gNum) => {
    const members = classStudents.filter((s) => s.group === gNum);
    const totalPts = members.reduce((sum, s) => sum + s.meritPoints, 0);
    const avgPts = members.length > 0 ? Math.round((totalPts / members.length) * 10) / 10 : 0;
    return {
      groupNum: gNum,
      name: `Tổ ${gNum}`,
      membersCount: members.length,
      totalPoints: totalPts,
      avgPoints: avgPts
    };
  });

  // Sort groups by average points descending
  const sortedGroups = [...groupsList].sort((a, b) => b.avgPoints - a.avgPoints);

  // History for this class
  const classHistory = pointHistory.filter((h) => h.className === currentClass);

  // Quick preset reasons
  const addReasons = [
    { label: 'Phát biểu xây dựng bài', pts: 2 },
    { label: 'Làm bài tập xuất sắc', pts: 5 },
    { label: 'Đạt điểm 10 kiểm tra', pts: 10 },
    { label: 'Tích cực giúp đỡ bạn', pts: 3 },
    { label: 'Thực hiện tốt nề nếp', pts: 2 }
  ];

  const deductReasons = [
    { label: 'Mất trật tự trong giờ', pts: -2 },
    { label: 'Không chuẩn bị bài tập', pts: -5 },
    { label: 'Nói chuyện riêng', pts: -1 },
    { label: 'Quên sách vở / đồ dùng', pts: -2 },
    { label: 'Đi học muộn', pts: -3 }
  ];

  const openPointModal = (student: ClassroomStudent, action: 'add' | 'deduct' | 'edit') => {
    SoundFX.playClick(soundEnabled);
    setActiveStudent(student);
    setPointActionType(action);
    setPointValue(action === 'add' ? 5 : action === 'deduct' ? -2 : student.meritPoints);
    setPointReason(action === 'add' ? 'Phát biểu xây dựng bài' : action === 'deduct' ? 'Mất trật tự trong giờ' : 'Điều chỉnh điểm thi đua');
    setIsPointModalOpen(true);
  };

  const handleApplyPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStudent) return;

    let newPts = activeStudent.meritPoints;
    let change = 0;

    if (pointActionType === 'add') {
      change = Math.abs(pointValue);
      newPts += change;
      SoundFX.playFanfare(soundEnabled);
    } else if (pointActionType === 'deduct') {
      change = -Math.abs(pointValue);
      newPts = Math.max(0, newPts + change);
      SoundFX.playWrong(soundEnabled);
    } else {
      // Direct edit
      change = pointValue - activeStudent.meritPoints;
      newPts = Math.max(0, pointValue);
      SoundFX.playClick(soundEnabled);
    }

    onUpdateStudentPoints(activeStudent.id, newPts, change, pointReason.trim() || 'Cập nhật điểm thi đua');
    setIsPointModalOpen(false);
    setActiveStudent(null);
  };

  const openGroupPointModal = (groupNum: number) => {
    SoundFX.playClick(soundEnabled);
    setActiveGroupNum(groupNum);
    setGroupPointValue(5);
    setGroupPointReason('Hoạt động tổ xuất sắc');
    setIsGroupPointModalOpen(true);
  };

  const handleApplyGroupPoint = (e: React.FormEvent) => {
    e.preventDefault();
    SoundFX.playFanfare(soundEnabled);
    onUpdateGroupPoints(activeGroupNum, groupPointValue, groupPointReason.trim() || `Cộng điểm Tổ ${activeGroupNum}`);
    setIsGroupPointModalOpen(false);
  };

  const handleResetClass = () => {
    if (window.confirm(`Thầy/Cô có chắc chắn muốn đặt lại điểm thi đua của tất cả học sinh lớp ${currentClass} về 100 điểm không?`)) {
      SoundFX.playClick(soundEnabled);
      onResetClassPoints(currentClass);
    }
  };

  const handleExportCSV = () => {
    SoundFX.playClick(soundEnabled);
    if (viewMode === 'group') {
      const headers = ['Thứ hạng', 'Tổ', 'Sĩ số', 'Tổng điểm', 'Điểm trung bình'];
      const rows = sortedGroups.map((g, idx) => [
        idx + 1,
        g.name,
        g.membersCount,
        g.totalPoints,
        g.avgPoints
      ]);
      exportToCSV(`Xep_hang_To_Lop_${currentClass}_${new Date().toISOString().slice(0, 10)}`, headers, rows);
    } else {
      const headers = ['Thứ hạng', 'Mã HS', 'Họ và tên', 'Giới tính', 'Lớp', 'Tổ', 'Điểm thi đua'];
      let currentRank = 1;
      const rows = sortedStudents.map((s, idx) => {
        if (idx > 0 && s.meritPoints < sortedStudents[idx - 1].meritPoints) {
          currentRank = idx + 1;
        }
        return [
          currentRank,
          s.studentCode,
          s.name,
          s.gender,
          s.className,
          `Tổ ${s.group}`,
          s.meritPoints
        ];
      });
      exportToCSV(`Bang_xep_hang_Lop_${currentClass}_${new Date().toISOString().slice(0, 10)}`, headers, rows);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Top Bar */}
      <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Class Select */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">Lớp:</span>
            <select
              value={currentClass}
              onChange={(e) => {
                SoundFX.playClick(soundEnabled);
                onChangeClass(e.target.value);
              }}
              className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-black text-sm text-blue-700 shadow-xs outline-none"
            >
              {classes.map((c) => (
                <option key={c} value={c}>
                  Lớp {c}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Tab Switcher */}
          <div className="flex items-center bg-white border border-slate-300 rounded-xl p-1 shadow-xs">
            <button
              onClick={() => {
                SoundFX.playClick(soundEnabled);
                setViewMode('individual');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'individual' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cá nhân
            </button>
            <button
              onClick={() => {
                SoundFX.playClick(soundEnabled);
                setViewMode('group');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'group' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Theo Tổ
            </button>
            <button
              onClick={() => {
                SoundFX.playClick(soundEnabled);
                setViewMode('history');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'history' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lịch sử
            </button>
          </div>

          {/* Group Filter (when in individual view) */}
          {viewMode === 'individual' && (
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-600">Tổ:</span>
              <select
                value={selectedGroupFilter}
                onChange={(e) => {
                  SoundFX.playClick(soundEnabled);
                  setSelectedGroupFilter(e.target.value === 'all' ? 'all' : Number(e.target.value));
                }}
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-700 outline-none"
              >
                <option value="all">Tất cả</option>
                <option value="1">Tổ 1</option>
                <option value="2">Tổ 2</option>
                <option value="3">Tổ 3</option>
                <option value="4">Tổ 4</option>
              </select>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={handleResetClass}
            className="p-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 rounded-xl text-xs font-bold transition-colors"
            title="Đặt lại điểm cả lớp về 100"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 transition-colors"
            title="Xuất bảng xếp hạng CSV"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Xuất Bảng Điểm</span>
          </button>
        </div>
      </div>

      {/* ========================================================== */}
      {/* VIEW 1: BẢNG XẾP HẠNG CÁ NHÂN */}
      {/* ========================================================== */}
      {viewMode === 'individual' && (
        <div className="space-y-3">
          {sortedStudents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 text-sm">
              Chưa có học sinh nào trong lớp {currentClass}.
            </div>
          ) : (
            <div className="space-y-2">
              {sortedStudents.map((s, idx) => {
                // Calculate rank with ties
                let rank = 1;
                for (let i = 0; i < idx; i++) {
                  if (sortedStudents[i].meritPoints > s.meritPoints) {
                    rank = i + 2;
                  }
                }
                if (idx > 0 && sortedStudents[idx - 1].meritPoints === s.meritPoints) {
                  // Share rank with predecessor
                  let sameRankIdx = idx - 1;
                  while (sameRankIdx > 0 && sortedStudents[sameRankIdx - 1].meritPoints === s.meritPoints) {
                    sameRankIdx--;
                  }
                  rank = sameRankIdx + 1;
                }

                const isTop1 = rank === 1;
                const isTop2 = rank === 2;
                const isTop3 = rank === 3;

                return (
                  <div
                    key={s.id}
                    className={`p-3 rounded-2xl border transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${
                      isTop1
                        ? 'bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-transparent border-amber-300 shadow-xs'
                        : isTop2
                        ? 'bg-gradient-to-r from-slate-200/50 to-transparent border-slate-300'
                        : isTop3
                        ? 'bg-gradient-to-r from-orange-200/40 to-transparent border-orange-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Rank Badge & Student Details */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 flex-shrink-0 flex items-center justify-center">
                        {isTop1 ? (
                          <span className="text-2xl" title="Hạng 1">🥇</span>
                        ) : isTop2 ? (
                          <span className="text-2xl" title="Hạng 2">🥈</span>
                        ) : isTop3 ? (
                          <span className="text-2xl" title="Hạng 3">🥉</span>
                        ) : (
                          <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-black text-xs flex items-center justify-center">
                            #{rank}
                          </span>
                        )}
                      </div>

                      <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-200">
                        {s.studentCode}
                      </span>

                      <div className="min-w-0">
                        <div className="font-bold text-sm text-slate-900 truncate flex items-center gap-1.5">
                          <span>{s.name}</span>
                          {isTop1 && (
                            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full border border-amber-300">
                              Dẫn đầu
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">Tổ {s.group} • {s.gender}</div>
                      </div>
                    </div>

                    {/* Merit Points & Fast Buttons */}
                    <div className="flex items-center gap-2 justify-end">
                      <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-black text-base min-w-[65px] text-center">
                        {s.meritPoints} <span className="text-xs font-bold text-amber-600">điểm</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openPointModal(s, 'add')}
                          className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all active:scale-95"
                          title="Cộng điểm thưởng"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Thưởng</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openPointModal(s, 'deduct')}
                          className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all active:scale-95"
                          title="Trừ điểm nhắc nhở"
                        >
                          <Minus className="w-3.5 h-3.5" />
                          <span>Trừ</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openPointModal(s, 'edit')}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
                          title="Sửa điểm trực tiếp"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================== */}
      {/* VIEW 2: BẢNG XẾP HẠNG THEO TỔ */}
      {/* ========================================================== */}
      {viewMode === 'group' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {sortedGroups.map((g, idx) => {
              const isLead = idx === 0;
              return (
                <div
                  key={g.groupNum}
                  className={`p-4 rounded-3xl border transition-all space-y-3 ${
                    isLead
                      ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-white border-amber-300 shadow-md'
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-black text-lg flex items-center justify-center shadow-xs">
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-slate-900">{g.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">{g.membersCount} thành viên</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-black text-amber-600">{g.avgPoints}</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Điểm Trung Bình</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs text-slate-600 font-semibold">
                      Tổng điểm tổ: <strong className="text-slate-900">{g.totalPoints}</strong>
                    </div>

                    <button
                      onClick={() => openGroupPointModal(g.groupNum)}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thưởng Cả Tổ</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* VIEW 3: LỊCH SỬ GHI ĐIỂM */}
      {/* ========================================================== */}
      {viewMode === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {classHistory.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Chưa có lịch sử cộng/trừ điểm nào trong lớp này.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
              {classHistory.map((item) => (
                <div key={item.id} className="p-3 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 ${
                        item.change > 0
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {item.change > 0 ? `+${item.change}` : item.change}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 truncate">
                        {item.studentName} <span className="text-slate-400 font-normal">({item.className}, Tổ {item.group})</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{item.reason}</div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 font-medium whitespace-nowrap flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: CỘNG / TRỪ / SỬA ĐIỂM HỌC SINH */}
      {/* ========================================================== */}
      {isPointModalOpen && activeStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div
              className={`px-5 py-4 text-white flex items-center justify-between ${
                pointActionType === 'add'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                  : pointActionType === 'deduct'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600'
              }`}
            >
              <div className="font-black text-base">
                {pointActionType === 'add' ? 'Thưởng Điểm' : pointActionType === 'deduct' ? 'Trừ Điểm' : 'Sửa Điểm'}
                : {activeStudent.name}
              </div>
              <button
                onClick={() => setIsPointModalOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyPoint} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {pointActionType === 'edit' ? 'Điểm thi đua mới' : 'Số điểm'}
                </label>
                <input
                  type="number"
                  required
                  value={pointValue}
                  onChange={(e) => setPointValue(Number(e.target.value))}
                  min={pointActionType === 'edit' ? 0 : 1}
                  max={500}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-black text-base text-center outline-none"
                  autoFocus
                />
              </div>

              {/* Preset buttons */}
              {pointActionType === 'add' && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-500">Lý do thường dùng:</span>
                  <div className="flex flex-wrap gap-1">
                    {addReasons.map((r) => (
                      <button
                        key={r.label}
                        type="button"
                        onClick={() => {
                          setPointValue(r.pts);
                          setPointReason(r.label);
                        }}
                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-[11px] font-semibold border border-emerald-200"
                      >
                        +{r.pts} {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {pointActionType === 'deduct' && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-500">Lý do thường dùng:</span>
                  <div className="flex flex-wrap gap-1">
                    {deductReasons.map((r) => (
                      <button
                        key={r.label}
                        type="button"
                        onClick={() => {
                          setPointValue(Math.abs(r.pts));
                          setPointReason(r.label);
                        }}
                        className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-lg text-[11px] font-semibold border border-rose-200"
                      >
                        {r.pts} {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ghi chú / Lý do</label>
                <input
                  type="text"
                  value={pointReason}
                  onChange={(e) => setPointReason(e.target.value)}
                  placeholder="Nhập lý do..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPointModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95 ${
                    pointActionType === 'add'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : pointActionType === 'deduct'
                      ? 'bg-rose-600 hover:bg-rose-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Xác Nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: CỘNG ĐIỂM CẢ TỔ */}
      {/* ========================================================== */}
      {isGroupPointModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
              <div className="font-black text-base">Thưởng Điểm Cho Cả Tổ {activeGroupNum}</div>
              <button
                onClick={() => setIsGroupPointModalOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyGroupPoint} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Điểm thưởng mỗi thành viên
                </label>
                <input
                  type="number"
                  required
                  value={groupPointValue}
                  onChange={(e) => setGroupPointValue(Number(e.target.value))}
                  min={1}
                  max={50}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-black text-base text-center outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lý do thưởng tổ</label>
                <input
                  type="text"
                  value={groupPointReason}
                  onChange={(e) => setGroupPointReason(e.target.value)}
                  placeholder="Ví dụ: Trực nhật sạch sẽ, Thảo luận nhóm sôi nổi..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsGroupPointModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  Cộng Cho Cả Tổ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
