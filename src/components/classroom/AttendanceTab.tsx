import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Check, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  CheckCheck, 
  FileSpreadsheet, 
  RotateCcw,
  Users,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ClassroomStudent, AttendanceStatus, AttendanceRecord } from '../../types';
import { SoundFX } from '../../utils/sound';
import { exportToCSV } from '../../utils/exportCsv';

interface AttendanceTabProps {
  students: ClassroomStudent[];
  classes: string[];
  currentClass: string;
  onChangeClass: (className: string) => void;
  getAttendanceRecord: (className: string, date: string) => AttendanceRecord | null;
  onSaveAttendanceRecord: (record: AttendanceRecord) => boolean;
  soundEnabled: boolean;
}

export const AttendanceTab: React.FC<AttendanceTabProps> = ({
  students,
  classes,
  currentClass,
  onChangeClass,
  getAttendanceRecord,
  onSaveAttendanceRecord,
  soundEnabled
}) => {
  const todayStr = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>({});
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [selectedGroup, setSelectedGroup] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  // Filter students for current class
  const classStudents = students.filter((s) => s.className === currentClass);

  // Load attendance record whenever currentClass or selectedDate changes
  useEffect(() => {
    const record = getAttendanceRecord(currentClass, selectedDate);
    if (record && record.records) {
      setAttendanceMap(record.records);
      setNotesMap(record.notes || {});
    } else {
      // Default initial state: none or present
      // To be intuitive, if never marked, default to 'present' or unassigned
      const initialMap: Record<string, AttendanceStatus> = {};
      classStudents.forEach((s) => {
        initialMap[s.id] = 'present'; // Default all present on new day
      });
      setAttendanceMap(initialMap);
      setNotesMap({});
    }
  }, [currentClass, selectedDate, students]);

  // Persist helper
  const saveCurrentAttendance = (
    newRecords: Record<string, AttendanceStatus>,
    newNotes?: Record<string, string>
  ) => {
    const record: AttendanceRecord = {
      className: currentClass,
      date: selectedDate,
      records: newRecords,
      notes: newNotes !== undefined ? newNotes : notesMap,
      updatedAt: new Date().toISOString()
    };
    onSaveAttendanceRecord(record);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 1500);
  };

  // Change individual student status
  const handleSetStatus = (studentId: string, status: AttendanceStatus) => {
    SoundFX.playClick(soundEnabled);
    const updated = { ...attendanceMap, [studentId]: status };
    setAttendanceMap(updated);
    saveCurrentAttendance(updated);
  };

  // Change student note
  const handleSetNote = (studentId: string, note: string) => {
    const updated = { ...notesMap, [studentId]: note };
    setNotesMap(updated);
    saveCurrentAttendance(attendanceMap, updated);
  };

  // Mark all present
  const handleMarkAllPresent = () => {
    SoundFX.playFanfare(soundEnabled);
    const updated: Record<string, AttendanceStatus> = {};
    classStudents.forEach((s) => {
      updated[s.id] = 'present';
    });
    setAttendanceMap(updated);
    saveCurrentAttendance(updated);
  };

  // Reset attendance for today
  const handleReset = () => {
    if (window.confirm(`Thầy/Cô có muốn đặt lại điểm danh lớp ${currentClass} ngày ${selectedDate} không?`)) {
      SoundFX.playClick(soundEnabled);
      const updated: Record<string, AttendanceStatus> = {};
      classStudents.forEach((s) => {
        updated[s.id] = 'present';
      });
      setAttendanceMap(updated);
      setNotesMap({});
      saveCurrentAttendance(updated, {});
    }
  };

  // Date step helper (yesterday, tomorrow)
  const shiftDate = (days: number) => {
    SoundFX.playClick(soundEnabled);
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().slice(0, 10));
  };

  // Counters
  const totalCount = classStudents.length;
  let presentCount = 0;
  let excusedCount = 0;
  let unexcusedCount = 0;
  let lateCount = 0;

  classStudents.forEach((s) => {
    const st = attendanceMap[s.id] || 'present';
    if (st === 'present') presentCount++;
    else if (st === 'absent_excused') excusedCount++;
    else if (st === 'absent_unexcused') unexcusedCount++;
    else if (st === 'late') lateCount++;
  });

  const presentPercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  // Filtered view
  const filteredStudents = classStudents.filter((s) => {
    if (selectedGroup !== 'all' && s.group !== selectedGroup) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return s.name.toLowerCase().includes(q) || s.studentCode.toLowerCase().includes(q);
    }
    return true;
  });

  // Export to CSV
  const handleExportCSV = () => {
    SoundFX.playClick(soundEnabled);
    const headers = ['STT', 'Mã HS', 'Họ và tên', 'Lớp', 'Tổ', 'Trạng thái điểm danh', 'Ghi chú', 'Ngày điểm danh'];
    const statusLabels: Record<AttendanceStatus, string> = {
      present: 'Có mặt',
      absent_excused: 'Vắng có phép',
      absent_unexcused: 'Vắng không phép',
      late: 'Đi muộn'
    };

    const rows = classStudents.map((s, idx) => {
      const st = attendanceMap[s.id] || 'present';
      return [
        idx + 1,
        s.studentCode,
        s.name,
        s.className,
        `Tổ ${s.group}`,
        statusLabels[st],
        notesMap[s.id] || '',
        selectedDate
      ];
    });

    exportToCSV(`Diem_danh_Lop_${currentClass}_Ngay_${selectedDate}`, headers, rows);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Date & Class Controls Bar */}
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

          {/* Date Picker & Nav */}
          <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-xl p-1 shadow-xs">
            <button
              onClick={() => shiftDate(-1)}
              className="p-1 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100"
              title="Ngày hôm trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                SoundFX.playClick(soundEnabled);
                setSelectedDate(e.target.value);
              }}
              className="text-xs font-extrabold text-slate-800 bg-transparent px-1 outline-none cursor-pointer"
            />
            <button
              onClick={() => shiftDate(1)}
              className="p-1 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100"
              title="Ngày tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Today Button */}
          {selectedDate !== todayStr && (
            <button
              onClick={() => {
                SoundFX.playClick(soundEnabled);
                setSelectedDate(todayStr);
              }}
              className="px-2.5 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors"
            >
              Hôm nay
            </button>
          )}

          {/* Group Filter */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-600">Tổ:</span>
            <select
              value={selectedGroup}
              onChange={(e) => {
                SoundFX.playClick(soundEnabled);
                setSelectedGroup(e.target.value === 'all' ? 'all' : Number(e.target.value));
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
        </div>

        {/* Quick Batch Actions */}
        <div className="flex items-center gap-2 justify-end flex-wrap">
          <button
            onClick={handleMarkAllPresent}
            className="flex-1 sm:flex-initial px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Tất Cả Có Mặt</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 rounded-xl text-xs font-bold transition-colors"
            title="Đặt lại điểm danh"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 transition-colors"
            title="Xuất bảng điểm danh CSV"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Xuất CSV</span>
          </button>
        </div>
      </div>

      {/* Realtime Attendance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Sĩ số</div>
          <div className="text-xl sm:text-2xl font-black text-slate-800">{totalCount}</div>
        </div>

        <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="text-[11px] font-bold text-emerald-700 uppercase flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>Có mặt</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-700">
            {presentCount} <span className="text-xs font-bold opacity-80">({presentPercentage}%)</span>
          </div>
        </div>

        <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200 shadow-xs">
          <div className="text-[11px] font-bold text-amber-700 uppercase flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Vắng có phép (P)</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-700">{excusedCount}</div>
        </div>

        <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-200 shadow-xs">
          <div className="text-[11px] font-bold text-rose-700 uppercase flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>Vắng không phép (K)</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-rose-700">{unexcusedCount}</div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-purple-50/80 p-3 rounded-2xl border border-purple-200 shadow-xs">
          <div className="text-[11px] font-bold text-purple-700 uppercase flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Đi muộn (M)</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-purple-700">{lateCount}</div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm học sinh để điểm danh nhanh..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:border-blue-500 outline-none shadow-xs"
        />
      </div>

      {/* Attendance List */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 text-sm">
          Chưa có học sinh nào trong lớp {currentClass}. Thầy/Cô hãy thêm học sinh ở tab &ldquo;Quản lý học sinh&rdquo;.
        </div>
      ) : (
        <div className="space-y-2">
          {filteredStudents.map((s, idx) => {
            const currentStatus = attendanceMap[s.id] || 'present';
            return (
              <div
                key={s.id}
                className={`p-3 rounded-2xl border transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 ${
                  currentStatus === 'present'
                    ? 'bg-white border-slate-200 hover:border-emerald-300'
                    : currentStatus === 'absent_excused'
                    ? 'bg-amber-50/60 border-amber-300'
                    : currentStatus === 'absent_unexcused'
                    ? 'bg-rose-50/60 border-rose-300'
                    : 'bg-purple-50/60 border-purple-300'
                }`}
              >
                {/* Student Info */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-6 text-center text-xs font-bold text-slate-400">{idx + 1}</span>
                  <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-200">
                    {s.studentCode}
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-slate-900 truncate">{s.name}</div>
                    <div className="text-[11px] text-slate-500">Tổ {s.group} • {s.gender}</div>
                  </div>
                </div>

                {/* 4 Status Toggle Buttons */}
                <div className="flex items-center gap-1 sm:gap-1.5 justify-end">
                  <button
                    type="button"
                    onClick={() => handleSetStatus(s.id, 'present')}
                    className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1 ${
                      currentStatus === 'present'
                        ? 'bg-emerald-600 text-white shadow-xs scale-102'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Có mặt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSetStatus(s.id, 'absent_excused')}
                    className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1 ${
                      currentStatus === 'absent_excused'
                        ? 'bg-amber-500 text-white shadow-xs scale-102'
                        : 'bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-700'
                    }`}
                    title="Vắng có phép"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Vắng CP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSetStatus(s.id, 'absent_unexcused')}
                    className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1 ${
                      currentStatus === 'absent_unexcused'
                        ? 'bg-rose-600 text-white shadow-xs scale-102'
                        : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700'
                    }`}
                    title="Vắng không phép"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Vắng KP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSetStatus(s.id, 'late')}
                    className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1 ${
                      currentStatus === 'late'
                        ? 'bg-purple-600 text-white shadow-xs scale-102'
                        : 'bg-slate-100 hover:bg-purple-50 text-slate-600 hover:text-purple-700'
                    }`}
                    title="Đi muộn"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Muộn</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Auto-saved notification toast */}
      {saveToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Đã lưu điểm danh tự động!</span>
        </div>
      )}
    </div>
  );
};
