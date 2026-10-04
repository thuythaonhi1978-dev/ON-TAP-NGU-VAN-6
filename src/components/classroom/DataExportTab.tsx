import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Calendar, 
  Users, 
  Award, 
  Layers, 
  History,
  CheckCircle2
} from 'lucide-react';
import { ClassroomStudent, AttendanceRecord, PointHistoryItem, SavedGroupResult, QuizResult } from '../../types';
import { SoundFX } from '../../utils/sound';
import { exportToCSV } from '../../utils/exportCsv';

interface DataExportTabProps {
  students: ClassroomStudent[];
  classes: string[];
  currentClass: string;
  onChangeClass: (className: string) => void;
  getAttendanceRecord: (className: string, date: string) => AttendanceRecord | null;
  pointHistory: PointHistoryItem[];
  savedGroups: Record<string, SavedGroupResult>;
  quizHistory: QuizResult[];
  soundEnabled: boolean;
}

export const DataExportTab: React.FC<DataExportTabProps> = ({
  students,
  classes,
  currentClass,
  onChangeClass,
  getAttendanceRecord,
  pointHistory,
  savedGroups,
  quizHistory,
  soundEnabled
}) => {
  const todayStr = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [exportedNotice, setExportedNotice] = useState<string>('');

  const classStudents = students.filter((s) => s.className === currentClass);
  const attendanceRecord = getAttendanceRecord(currentClass, selectedDate);
  const groupResult = savedGroups[currentClass];

  const showNotice = (msg: string) => {
    setExportedNotice(msg);
    setTimeout(() => setExportedNotice(''), 3000);
  };

  // 1. Export Students List
  const handleExportStudents = () => {
    SoundFX.playFanfare(soundEnabled);
    const headers = ['STT', 'Mã HS', 'Họ và tên', 'Giới tính', 'Lớp', 'Tổ', 'Điểm thi đua', 'Ghi chú'];
    const rows = classStudents.map((s, idx) => [
      idx + 1,
      s.studentCode,
      s.name,
      s.gender,
      s.className,
      `Tổ ${s.group}`,
      s.meritPoints,
      s.notes || ''
    ]);
    exportToCSV(`Danh_sach_hoc_sinh_Lop_${currentClass}_${new Date().toISOString().slice(0, 10)}`, headers, rows);
    showNotice(`Đã xuất danh sách ${rows.length} học sinh Lớp ${currentClass}!`);
  };

  // 2. Export Attendance Sheet
  const handleExportAttendance = () => {
    SoundFX.playFanfare(soundEnabled);
    const headers = ['STT', 'Mã HS', 'Họ và tên', 'Lớp', 'Tổ', 'Trạng thái điểm danh', 'Ghi chú', 'Ngày'];
    const statusMap = {
      present: 'Có mặt',
      absent_excused: 'Vắng có phép',
      absent_unexcused: 'Vắng không phép',
      late: 'Đi muộn'
    };

    const rows = classStudents.map((s, idx) => {
      const st = attendanceRecord?.records?.[s.id] || 'present';
      return [
        idx + 1,
        s.studentCode,
        s.name,
        s.className,
        `Tổ ${s.group}`,
        statusMap[st],
        attendanceRecord?.notes?.[s.id] || '',
        selectedDate
      ];
    });

    exportToCSV(`Bang_diem_danh_Lop_${currentClass}_${selectedDate}`, headers, rows);
    showNotice(`Đã xuất bảng điểm danh Lớp ${currentClass} ngày ${selectedDate}!`);
  };

  // 3. Export Merit Leaderboard
  const handleExportMerit = () => {
    SoundFX.playFanfare(soundEnabled);
    const sorted = [...classStudents].sort((a, b) => b.meritPoints - a.meritPoints);
    const headers = ['Thứ hạng', 'Mã HS', 'Họ và tên', 'Giới tính', 'Lớp', 'Tổ', 'Điểm thi đua'];
    
    let currentRank = 1;
    const rows = sorted.map((s, idx) => {
      if (idx > 0 && s.meritPoints < sorted[idx - 1].meritPoints) {
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

    exportToCSV(`Bang_thi_dua_Lop_${currentClass}_${new Date().toISOString().slice(0, 10)}`, headers, rows);
    showNotice(`Đã xuất bảng thi đua ${rows.length} học sinh Lớp ${currentClass}!`);
  };

  // 4. Export Team Groups Leaderboard
  const handleExportGroupMerit = () => {
    SoundFX.playFanfare(soundEnabled);
    const groups = [1, 2, 3, 4].map((gNum) => {
      const mems = classStudents.filter((s) => s.group === gNum);
      const total = mems.reduce((a, b) => a + b.meritPoints, 0);
      const avg = mems.length > 0 ? Math.round((total / mems.length) * 10) / 10 : 0;
      return { gNum, name: `Tổ ${gNum}`, count: mems.length, total, avg };
    }).sort((a, b) => b.avg - a.avg);

    const headers = ['Hạng', 'Tổ', 'Sĩ số', 'Tổng điểm', 'Điểm trung bình'];
    const rows = groups.map((g, idx) => [
      idx + 1,
      g.name,
      g.count,
      g.total,
      g.avg
    ]);

    exportToCSV(`Thi_dua_theo_To_Lop_${currentClass}_${new Date().toISOString().slice(0, 10)}`, headers, rows);
    showNotice(`Đã xuất bảng xếp hạng 4 tổ Lớp ${currentClass}!`);
  };

  // 5. Export Group Division Result
  const handleExportGroupDivision = () => {
    if (!groupResult) {
      alert(`Lớp ${currentClass} chưa có kết quả chia nhóm nào!`);
      return;
    }
    SoundFX.playFanfare(soundEnabled);
    const headers = ['Nhóm', 'STT trong nhóm', 'Mã HS', 'Họ và tên', 'Giới tính', 'Tổ gốc', 'Lớp'];
    const rows: (string | number)[][] = [];

    groupResult.groups.forEach((g) => {
      g.members.forEach((m, idx) => {
        rows.push([
          g.groupName,
          idx + 1,
          m.studentCode,
          m.name,
          m.gender,
          `Tổ ${m.group}`,
          currentClass
        ]);
      });
    });

    exportToCSV(`Ket_qua_chia_nhom_Lop_${currentClass}_${new Date().toISOString().slice(0, 10)}`, headers, rows);
    showNotice(`Đã xuất kết quả chia nhóm Lớp ${currentClass}!`);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Top Class Selection Bar */}
      <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Đang chọn lớp:</span>
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
                Lớp {c} ({students.filter((s) => s.className === c).length} HS)
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Định dạng xuất: <strong>CSV (UTF-8 BOM)</strong> mở được ngay trên Excel, Sheets, Numbers với tiếng Việt chuẩn 100%.
        </div>
      </div>

      {/* Notice Toast */}
      {exportedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{exportedNotice}</span>
        </div>
      )}

      {/* Grid of 5 Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Card 1: Students List */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-blue-700">
              <Users className="w-5 h-5" />
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900">Danh Sách Học Sinh</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Xuất toàn bộ {classStudents.length} học sinh lớp {currentClass} gồm STT, Mã HS, Họ và tên, Giới tính, Tổ, Điểm thi đua và Ghi chú.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">{classStudents.length} dòng</span>
            <button
              onClick={handleExportStudents}
              disabled={classStudents.length === 0}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-40"
            >
              <Download className="w-4 h-4" />
              <span>Tải File CSV</span>
            </button>
          </div>
        </div>

        {/* Card 2: Attendance Record */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700">
                <Calendar className="w-5 h-5" />
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900">Báo Cáo Điểm Danh</h4>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-xs font-bold border border-slate-300 rounded-lg px-2 py-1 outline-none"
              />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bảng điểm danh ngày {selectedDate} lớp {currentClass} với đầy đủ trạng thái Có mặt, Vắng có phép, Vắng không phép, Đi muộn.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">{classStudents.length} học sinh</span>
            <button
              onClick={handleExportAttendance}
              disabled={classStudents.length === 0}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-40"
            >
              <Download className="w-4 h-4" />
              <span>Tải File CSV</span>
            </button>
          </div>
        </div>

        {/* Card 3: Merit Points Leaderboard */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-600">
              <Award className="w-5 h-5" />
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900">Bảng Xếp Hạng Thi Đua</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Xếp hạng thi đua cá nhân lớp {currentClass} sắp xếp từ cao đến thấp, bao gồm thứ hạng, điểm thi đua và tổ sinh hoạt.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">{classStudents.length} xếp hạng</span>
            <button
              onClick={handleExportMerit}
              disabled={classStudents.length === 0}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-40"
            >
              <Download className="w-4 h-4" />
              <span>Tải File CSV</span>
            </button>
          </div>
        </div>

        {/* Card 4: Group Division Result */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-purple-700">
              <Layers className="w-5 h-5" />
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900">Kết Quả Chia Nhóm</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {groupResult
                ? `Kết quả chia thành ${groupResult.groups.length} nhóm được lưu gần nhất lúc ${groupResult.createdAt}.`
                : `Chưa có kết quả chia nhóm cho lớp ${currentClass}.`}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">
              {groupResult ? `${groupResult.groups.length} nhóm` : '0 nhóm'}
            </span>
            <button
              onClick={handleExportGroupDivision}
              disabled={!groupResult}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-40"
            >
              <Download className="w-4 h-4" />
              <span>Tải File CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
