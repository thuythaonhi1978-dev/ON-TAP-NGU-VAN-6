import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shuffle, 
  Copy, 
  Check, 
  FileSpreadsheet, 
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ClassroomStudent, SavedGroupResult, SavedGroupMember } from '../../types';
import { SoundFX } from '../../utils/sound';
import { exportToCSV } from '../../utils/exportCsv';

interface GroupDividerTabProps {
  students: ClassroomStudent[];
  classes: string[];
  currentClass: string;
  onChangeClass: (className: string) => void;
  savedGroups: Record<string, SavedGroupResult>;
  onSaveGroupResult: (result: SavedGroupResult) => boolean;
  soundEnabled: boolean;
}

const GROUP_COLORS = [
  'from-blue-600 to-indigo-600',
  'from-emerald-600 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-purple-600 to-pink-600',
  'from-rose-600 to-red-600',
  'from-cyan-600 to-blue-600',
  'from-teal-600 to-emerald-600',
  'from-indigo-600 to-purple-600'
];

export const GroupDividerTab: React.FC<GroupDividerTabProps> = ({
  students,
  classes,
  currentClass,
  onChangeClass,
  savedGroups,
  onSaveGroupResult,
  soundEnabled
}) => {
  const [divideMode, setDivideMode] = useState<'by_group_count' | 'by_member_count'>('by_group_count');
  const [groupCountParam, setGroupCountParam] = useState<number>(4);
  const [memberCountParam, setMemberCountParam] = useState<number>(4);
  const [currentResult, setCurrentResult] = useState<SavedGroupResult | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // Class students
  const classStudents = students.filter((s) => s.className === currentClass);

  // Load saved group for current class if exists
  useEffect(() => {
    if (savedGroups[currentClass]) {
      setCurrentResult(savedGroups[currentClass]);
      setDivideMode(savedGroups[currentClass].mode);
      if (savedGroups[currentClass].mode === 'by_group_count') {
        setGroupCountParam(savedGroups[currentClass].paramValue);
      } else {
        setMemberCountParam(savedGroups[currentClass].paramValue);
      }
    } else {
      setCurrentResult(null);
    }
  }, [currentClass, savedGroups]);

  // Execute fair group division algorithm
  const handleDivideGroups = () => {
    if (classStudents.length === 0) {
      alert(`Lớp ${currentClass} chưa có học sinh nào để chia nhóm!`);
      return;
    }

    SoundFX.playFanfare(soundEnabled);

    // 1. Fair Fisher-Yates shuffle
    const shuffled = [...classStudents];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 2. Determine number of groups
    let numGroups = 1;
    if (divideMode === 'by_group_count') {
      const g = Math.max(1, groupCountParam || 2);
      numGroups = Math.min(g, shuffled.length);
    } else {
      const m = Math.max(1, memberCountParam || 2);
      numGroups = Math.max(1, Math.ceil(shuffled.length / m));
      numGroups = Math.min(numGroups, shuffled.length);
    }

    // 3. Initialize groups
    const groups: SavedGroupResult['groups'] = Array.from({ length: numGroups }, (_, i) => ({
      groupIndex: i + 1,
      groupName: `Nhóm ${i + 1}`,
      members: []
    }));

    // 4. Round-robin distribution guarantees:
    // - Every student appears exactly once
    // - No duplicate student
    // - Difference between largest and smallest group is <= 1
    shuffled.forEach((s, idx) => {
      const targetGroup = idx % numGroups;
      groups[targetGroup].members.push({
        id: s.id,
        studentCode: s.studentCode,
        name: s.name,
        gender: s.gender,
        group: s.group
      });
    });

    const newResult: SavedGroupResult = {
      id: 'grp_' + Date.now(),
      className: currentClass,
      createdAt: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      mode: divideMode,
      paramValue: divideMode === 'by_group_count' ? groupCountParam : memberCountParam,
      groups
    };

    setCurrentResult(newResult);
    onSaveGroupResult(newResult);
  };

  // Copy groups to clipboard
  const handleCopyText = () => {
    if (!currentResult) return;
    SoundFX.playClick(soundEnabled);

    let text = `DANH SÁCH CHIA NHÓM - LỚP ${currentClass} (${currentResult.createdAt})\n`;
    text += `Tổng số: ${classStudents.length} học sinh • ${currentResult.groups.length} nhóm\n\n`;

    currentResult.groups.forEach((g) => {
      text += `📌 ${g.groupName} (${g.members.length} bạn):\n`;
      g.members.forEach((m, idx) => {
        text += `  ${idx + 1}. ${m.name} (${m.studentCode} - Tổ ${m.group})\n`;
      });
      text += `\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    });
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (!currentResult) return;
    SoundFX.playClick(soundEnabled);

    const headers = ['Nhóm', 'STT trong nhóm', 'Mã HS', 'Họ và tên', 'Giới tính', 'Tổ gốc', 'Lớp'];
    const rows: (string | number)[][] = [];

    currentResult.groups.forEach((g) => {
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

    exportToCSV(`Chia_nhom_Lop_${currentClass}_${new Date().toISOString().slice(0, 10)}`, headers, rows);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Top Configuration Controls */}
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
                  Lớp {c} ({students.filter((s) => s.className === c).length} HS)
                </option>
              ))}
            </select>
          </div>

          {/* Division Mode Switcher */}
          <div className="flex items-center bg-white border border-slate-300 rounded-xl p-1 shadow-xs">
            <button
              onClick={() => {
                SoundFX.playClick(soundEnabled);
                setDivideMode('by_group_count');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                divideMode === 'by_group_count'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Theo số nhóm
            </button>
            <button
              onClick={() => {
                SoundFX.playClick(soundEnabled);
                setDivideMode('by_member_count');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                divideMode === 'by_member_count'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Theo số bạn / nhóm
            </button>
          </div>

          {/* Parameter Input */}
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-slate-300 shadow-xs">
            <span className="text-xs font-bold text-slate-600">
              {divideMode === 'by_group_count' ? 'Số lượng nhóm:' : 'Mỗi nhóm:'}
            </span>
            <input
              type="number"
              min={2}
              max={Math.max(2, classStudents.length)}
              value={divideMode === 'by_group_count' ? groupCountParam : memberCountParam}
              onChange={(e) => {
                const val = Math.max(1, Number(e.target.value));
                if (divideMode === 'by_group_count') setGroupCountParam(val);
                else setMemberCountParam(val);
              }}
              className="w-14 px-1.5 py-0.5 text-center font-black text-sm text-indigo-700 outline-none border-b-2 border-indigo-400"
            />
            <span className="text-xs font-bold text-slate-500">
              {divideMode === 'by_group_count' ? 'nhóm' : 'bạn'}
            </span>
          </div>
        </div>

        {/* Action Button: Start Dividing */}
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={handleDivideGroups}
            disabled={classStudents.length === 0}
            className="flex-1 sm:flex-initial px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <Shuffle className="w-4 h-4" />
            <span>{currentResult ? 'Xáo Trộn & Chia Lại' : 'Chia Nhóm Ngay'}</span>
          </button>
        </div>
      </div>

      {/* Main Results View */}
      {!currentResult ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center space-y-3">
          <Layers className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-700">Chưa có kết quả chia nhóm</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Thầy/Cô hãy chọn chế độ và bấm &ldquo;Chia Nhóm Ngay&rdquo;. Hệ thống sẽ phân bổ học sinh công bằng, chênh lệch giữa các nhóm không quá 1 bạn.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Result Metadata Strip */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-bold text-slate-600 px-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200">
                {currentResult.groups.length} nhóm
              </span>
              <span>Tổng: {classStudents.length} học sinh</span>
              <span className="text-slate-400">• Đã lưu lúc {currentResult.createdAt}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                title="Sao chép danh sách vào clipboard"
              >
                {copiedToast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedToast ? 'Đã sao chép!' : 'Sao chép'}</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                title="Xuất bảng nhóm ra file CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Xuất CSV</span>
              </button>
            </div>
          </div>

          {/* Group Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {currentResult.groups.map((group, gIdx) => {
              const gradient = GROUP_COLORS[gIdx % GROUP_COLORS.length];
              return (
                <div
                  key={group.groupIndex}
                  className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col"
                >
                  {/* Card Header */}
                  <div className={`px-4 py-3 bg-gradient-to-r ${gradient} text-white flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/20 text-white font-black text-xs flex items-center justify-center">
                        {group.groupIndex}
                      </span>
                      <h4 className="font-extrabold text-sm sm:text-base">{group.groupName}</h4>
                    </div>
                    <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                      {group.members.length} thành viên
                    </span>
                  </div>

                  {/* Card Members List */}
                  <div className="p-3 flex-1 divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {group.members.map((m, idx) => (
                      <div
                        key={m.id}
                        className="py-2 flex items-center justify-between text-xs hover:bg-slate-50 rounded-lg px-1 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-5 text-center text-slate-400 font-bold">{idx + 1}</span>
                          <span className="font-mono text-[11px] font-black text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                            {m.studentCode}
                          </span>
                          <span className="font-bold text-slate-800 truncate">{m.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">Tổ {m.group}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
