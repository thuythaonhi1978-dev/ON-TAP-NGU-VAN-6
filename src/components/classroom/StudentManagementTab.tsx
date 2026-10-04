import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  UserPlus, 
  AlertCircle,
  CheckCircle2,
  X,
  Upload
} from 'lucide-react';
import { ClassroomStudent } from '../../types';
import { SoundFX } from '../../utils/sound';
import { exportToCSV } from '../../utils/exportCsv';

interface StudentManagementTabProps {
  students: ClassroomStudent[];
  classes: string[];
  currentClass: string;
  onChangeClass: (className: string) => void;
  onAddClass: (className: string) => void;
  onAddStudent: (student: Omit<ClassroomStudent, 'id'>) => boolean;
  onUpdateStudent: (student: ClassroomStudent) => boolean;
  onDeleteStudent: (id: string) => void;
  onBatchAddStudents: (names: string[], className: string) => number;
  soundEnabled: boolean;
}

export const StudentManagementTab: React.FC<StudentManagementTabProps> = ({
  students,
  classes,
  currentClass,
  onChangeClass,
  onAddClass,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onBatchAddStudents,
  soundEnabled
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<number | 'all'>('all');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formGender, setFormGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [formGroup, setFormGroup] = useState<number>(1);
  const [formPoints, setFormPoints] = useState<number>(100);
  const [formNotes, setFormNotes] = useState('');
  const [formError, setFormError] = useState('');
  
  // Selected student for edit or delete
  const [currentEditingStudent, setCurrentEditingStudent] = useState<ClassroomStudent | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<ClassroomStudent | null>(null);

  // Batch import text
  const [batchText, setBatchText] = useState('');
  const [batchNotice, setBatchNotice] = useState('');

  // New class name
  const [newClassName, setNewClassName] = useState('');
  const [classError, setClassError] = useState('');

  // Filter students for current class
  const classStudents = students.filter((s) => s.className === currentClass);

  const filteredStudents = classStudents.filter((s) => {
    if (selectedGroup !== 'all' && s.group !== selectedGroup) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return s.name.toLowerCase().includes(q) || s.studentCode.toLowerCase().includes(q);
    }
    return true;
  });

  // Metrics
  const totalCount = classStudents.length;
  const maleCount = classStudents.filter((s) => s.gender === 'Nam').length;
  const femaleCount = classStudents.filter((s) => s.gender === 'Nữ').length;
  const avgPoints = totalCount > 0 
    ? Math.round(classStudents.reduce((acc, s) => acc + s.meritPoints, 0) / totalCount) 
    : 100;

  // Auto-generate next Student Code for the current class
  const getNextStudentCode = () => {
    const existingNums = classStudents
      .map((s) => {
        const match = s.studentCode.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      })
      .filter((n) => n > 0);
    const maxNum = existingNums.length > 0 ? Math.max(...existingNums) : 0;
    return `HS${String(maxNum + 1).padStart(2, '0')}`;
  };

  const openAddModal = () => {
    SoundFX.playClick(soundEnabled);
    setFormName('');
    setFormCode(getNextStudentCode());
    setFormGender('Nam');
    setFormGroup(1);
    setFormPoints(100);
    setFormNotes('');
    setFormError('');
    setIsAddModalOpen(true);
  };

  const handleSaveNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError('Họ và tên không được để trống!');
      SoundFX.playWrong(soundEnabled);
      return;
    }
    if (!formCode.trim()) {
      setFormError('Mã học sinh không được để trống!');
      SoundFX.playWrong(soundEnabled);
      return;
    }

    const success = onAddStudent({
      studentCode: formCode.trim().toUpperCase(),
      name: formName.trim(),
      gender: formGender,
      className: currentClass,
      group: formGroup,
      meritPoints: formPoints || 100,
      notes: formNotes.trim()
    });

    if (success) {
      SoundFX.playCorrect(soundEnabled);
      setIsAddModalOpen(false);
    } else {
      setFormError(`Mã học sinh "${formCode.trim().toUpperCase()}" đã tồn tại trong lớp này!`);
      SoundFX.playWrong(soundEnabled);
    }
  };

  const openEditModal = (s: ClassroomStudent) => {
    SoundFX.playClick(soundEnabled);
    setCurrentEditingStudent(s);
    setFormName(s.name);
    setFormCode(s.studentCode);
    setFormGender(s.gender);
    setFormGroup(s.group);
    setFormPoints(s.meritPoints);
    setFormNotes(s.notes || '');
    setFormError('');
    setIsEditModalOpen(true);
  };

  const handleSaveEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEditingStudent) return;
    if (!formName.trim()) {
      setFormError('Họ và tên không được để trống!');
      SoundFX.playWrong(soundEnabled);
      return;
    }
    if (!formCode.trim()) {
      setFormError('Mã học sinh không được để trống!');
      SoundFX.playWrong(soundEnabled);
      return;
    }

    const success = onUpdateStudent({
      ...currentEditingStudent,
      studentCode: formCode.trim().toUpperCase(),
      name: formName.trim(),
      gender: formGender,
      group: formGroup,
      meritPoints: formPoints,
      notes: formNotes.trim()
    });

    if (success) {
      SoundFX.playCorrect(soundEnabled);
      setIsEditModalOpen(false);
      setCurrentEditingStudent(null);
    } else {
      setFormError(`Mã học sinh "${formCode.trim().toUpperCase()}" đã trùng với học sinh khác!`);
      SoundFX.playWrong(soundEnabled);
    }
  };

  const confirmDelete = (s: ClassroomStudent) => {
    SoundFX.playClick(soundEnabled);
    setStudentToDelete(s);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = () => {
    if (!studentToDelete) return;
    onDeleteStudent(studentToDelete.id);
    SoundFX.playClick(soundEnabled);
    setIsDeleteModalOpen(false);
    setStudentToDelete(null);
  };

  const handleBatchImport = () => {
    if (!batchText.trim()) {
      setBatchNotice('Vui lòng dán danh sách tên học sinh (mỗi bạn 1 dòng)!');
      SoundFX.playWrong(soundEnabled);
      return;
    }
    const lines = batchText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      setBatchNotice('Không tìm thấy tên học sinh hợp lệ nào!');
      return;
    }

    const count = onBatchAddStudents(lines, currentClass);
    SoundFX.playFanfare(soundEnabled);
    setBatchNotice(`Đã thêm thành công ${count} học sinh vào lớp ${currentClass}!`);
    setBatchText('');
    setTimeout(() => {
      setIsBatchModalOpen(false);
      setBatchNotice('');
    }, 1200);
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newClassName.trim().toUpperCase();
    if (!cleanName) {
      setClassError('Tên lớp không được để trống!');
      return;
    }
    if (classes.includes(cleanName)) {
      setClassError('Lớp này đã tồn tại!');
      return;
    }
    onAddClass(cleanName);
    onChangeClass(cleanName);
    setNewClassName('');
    setClassError('');
    setIsAddClassModalOpen(false);
    SoundFX.playCorrect(soundEnabled);
  };

  const handleExportCSV = () => {
    SoundFX.playClick(soundEnabled);
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
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Top Filter and Actions Bar */}
      <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Class Selector & Stats */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">Lớp:</span>
            <select
              value={currentClass}
              onChange={(e) => {
                SoundFX.playClick(soundEnabled);
                onChangeClass(e.target.value);
              }}
              className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-black text-sm text-blue-700 shadow-xs focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {classes.map((c) => (
                <option key={c} value={c}>
                  Lớp {c} ({students.filter((s) => s.className === c).length} HS)
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                SoundFX.playClick(soundEnabled);
                setIsAddClassModalOpen(true);
              }}
              className="p-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl text-xs font-bold transition-colors"
              title="Thêm lớp mới"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Group Filter */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-600">Tổ:</span>
            <select
              value={selectedGroup}
              onChange={(e) => {
                SoundFX.playClick(soundEnabled);
                setSelectedGroup(e.target.value === 'all' ? 'all' : Number(e.target.value));
              }}
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-700 shadow-xs outline-none"
            >
              <option value="all">Tất cả các tổ</option>
              <option value="1">Tổ 1</option>
              <option value="2">Tổ 2</option>
              <option value="3">Tổ 3</option>
              <option value="4">Tổ 4</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
          <button
            onClick={openAddModal}
            className="flex-1 sm:flex-initial px-3 sm:px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Học Sinh</span>
          </button>

          <button
            onClick={() => {
              SoundFX.playClick(soundEnabled);
              setIsBatchModalOpen(true);
            }}
            className="px-2.5 sm:px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1 transition-all"
            title="Dán nhanh danh sách học sinh"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Nhập nhanh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-2.5 sm:px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1 transition-all"
            title="Xuất Excel/CSV danh sách học sinh (chuẩn UTF-8 có dấu)"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Xuất CSV</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Sĩ số lớp</div>
            <div className="text-xl sm:text-2xl font-black text-blue-600">{totalCount}</div>
          </div>
          <Users className="w-6 h-6 text-blue-400 opacity-60" />
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Nam / Nữ</div>
            <div className="text-lg sm:text-xl font-black text-slate-800">
              <span className="text-cyan-600">{maleCount}</span> / <span className="text-pink-600">{femaleCount}</span>
            </div>
          </div>
          <div className="text-xs font-black text-slate-400">👦👧</div>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Điểm thi đua TB</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600">{avgPoints}</div>
          </div>
          <div className="text-base font-black text-amber-500">⭐</div>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Đang hiển thị</div>
            <div className="text-xl sm:text-2xl font-black text-purple-600">{filteredStudents.length}</div>
          </div>
          <Filter className="w-5 h-5 text-purple-400 opacity-60" />
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm học sinh theo họ tên hoặc mã HS..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Students List Table (Desktop & Tablet) & Card View (Mobile) */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center space-y-3">
          <Users className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-700">Chưa có học sinh nào phù hợp</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {classStudents.length === 0 
              ? `Lớp ${currentClass} chưa có học sinh nào. Thầy/Cô hãy bấm "Thêm Học Sinh" hoặc "Nhập nhanh" để bắt đầu.`
              : 'Không tìm thấy học sinh nào khớp với bộ lọc hoặc từ khóa tìm kiếm.'}
          </p>
          {classStudents.length === 0 && (
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
            >
              + Thêm học sinh đầu tiên
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Table for Tablet and Desktop */}
          <div className="hidden sm:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-3 w-12 text-center">STT</th>
                    <th className="py-3 px-3 w-20">Mã HS</th>
                    <th className="py-3 px-4">Họ và tên</th>
                    <th className="py-3 px-3 w-20 text-center">Giới tính</th>
                    <th className="py-3 px-3 w-20 text-center">Tổ</th>
                    <th className="py-3 px-3 w-24 text-center">Điểm thi đua</th>
                    <th className="py-3 px-4">Ghi chú</th>
                    <th className="py-3 px-3 w-24 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {filteredStudents.map((s, idx) => (
                    <tr key={s.id} className="hover:bg-blue-50/40 transition-colors group">
                      <td className="py-2.5 px-3 text-center text-slate-400 font-bold">{idx + 1}</td>
                      <td className="py-2.5 px-3">
                        <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-200">
                          {s.studentCode}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{s.name}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            s.gender === 'Nam'
                              ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                              : 'bg-pink-50 text-pink-700 border border-pink-200'
                          }`}
                        >
                          {s.gender}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-700">Tổ {s.group}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                          {s.meritPoints}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-xs text-slate-500 truncate max-w-xs">{s.notes || '—'}</td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditModal(s)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Sửa thông tin"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => confirmDelete(s)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Xóa học sinh"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards for Mobile View */}
          <div className="sm:hidden space-y-2.5">
            {filteredStudents.map((s, idx) => (
              <div
                key={s.id}
                className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] font-black text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-200">
                      {s.studentCode}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                        s.gender === 'Nam' ? 'bg-cyan-50 text-cyan-700' : 'bg-pink-50 text-pink-700'
                      }`}
                    >
                      {s.gender}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Tổ {s.group}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 truncate">{s.name}</h4>
                  {s.notes && <p className="text-[11px] text-slate-500 truncate mt-0.5">{s.notes}</p>}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-black text-amber-600 text-xs bg-amber-50 px-2 py-1 rounded-xl border border-amber-200">
                    {s.meritPoints}đ
                  </span>
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => openEditModal(s)}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl"
                      title="Sửa"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => confirmDelete(s)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ========================================================== */}
      {/* MODAL: THÊM HỌC SINH MỚI */}
      {/* ========================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-base">
                <UserPlus className="w-5 h-5 text-amber-300" />
                <span>Thêm Học Sinh Vào Lớp {currentClass}</span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewStudent} className="p-5 space-y-3.5">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên học sinh <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mã học sinh <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="HS01"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-mono font-bold text-sm uppercase focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Giới tính</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as 'Nam' | 'Nữ')}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-sm outline-none"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tổ sinh hoạt</label>
                  <select
                    value={formGroup}
                    onChange={(e) => setFormGroup(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-sm outline-none"
                  >
                    <option value={1}>Tổ 1</option>
                    <option value={2}>Tổ 2</option>
                    <option value={3}>Tổ 3</option>
                    <option value={4}>Tổ 4</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Điểm thi đua ban đầu</label>
                  <input
                    type="number"
                    value={formPoints}
                    onChange={(e) => setFormPoints(Number(e.target.value))}
                    min={0}
                    max={500}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-black text-sm text-amber-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ghi chú (chức vụ, sở thích...)</label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Ví dụ: Lớp trưởng, Giọng đọc tốt..."
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  Lưu Học Sinh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: SỬA HỌC SINH */}
      {/* ========================================================== */}
      {isEditModalOpen && currentEditingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-base">
                <Edit3 className="w-5 h-5 text-amber-300" />
                <span>Sửa Thông Tin Học Sinh</span>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditStudent} className="p-5 space-y-3.5">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên học sinh <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold text-sm focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mã học sinh <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-mono font-bold text-sm uppercase outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Giới tính</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as 'Nam' | 'Nữ')}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-sm outline-none"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tổ</label>
                  <select
                    value={formGroup}
                    onChange={(e) => setFormGroup(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-sm outline-none"
                  >
                    <option value={1}>Tổ 1</option>
                    <option value={2}>Tổ 2</option>
                    <option value={3}>Tổ 3</option>
                    <option value={4}>Tổ 4</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Điểm thi đua</label>
                  <input
                    type="number"
                    value={formPoints}
                    onChange={(e) => setFormPoints(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-black text-sm text-amber-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ghi chú</label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  Cập Nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: XÁC NHẬN XÓA HỌC SINH */}
      {/* ========================================================== */}
      {isDeleteModalOpen && studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">Xác Nhận Xóa Học Sinh?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bạn có chắc chắn muốn xóa học sinh <strong>{studentToDelete.name}</strong> ({studentToDelete.studentCode}) khỏi lớp {currentClass}?
              </p>
              <p className="text-[11px] text-rose-600 font-semibold mt-1">
                Thao tác này sẽ xóa học sinh khỏi danh sách lớp.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  SoundFX.playClick(soundEnabled);
                  setIsDeleteModalOpen(false);
                  setStudentToDelete(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                Hủy Bỏ (Giữ lại)
              </button>
              <button
                type="button"
                onClick={executeDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
              >
                Xóa Học Sinh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: NHẬP NHANH DANH SÁCH HỌC SINH */}
      {/* ========================================================== */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-base">
                <Upload className="w-5 h-5 text-amber-300" />
                <span>Nhập Nhanh Danh Sách Lớp {currentClass}</span>
              </div>
              <button
                onClick={() => setIsBatchModalOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3.5">
              <p className="text-xs text-slate-600">
                Dán danh sách họ và tên học sinh vào ô bên dưới, <strong>mỗi học sinh một dòng</strong>. Hệ thống sẽ tự động tạo mã HS (HS01, HS02...) và tự động phân bổ đều vào các tổ 1, 2, 3, 4!
              </p>

              {batchNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{batchNotice}</span>
                </div>
              )}

              <textarea
                value={batchText}
                onChange={(e) => setBatchText(e.target.value)}
                rows={8}
                placeholder={`Ví dụ:\nNguyễn Văn An\nTrần Thị Bình\nLê Hoàng Nam\nPhạm Thu Cúc`}
                className="w-full p-3 border border-slate-300 rounded-xl font-medium text-xs text-slate-800 focus:border-indigo-500 outline-none leading-relaxed"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500">
                  {batchText.split('\n').filter((l) => l.trim()).length} dòng đã nhập
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsBatchModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleBatchImport}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Nhập Vào Lớp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: THÊM LỚP MỚI */}
      {/* ========================================================== */}
      {isAddClassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-xs bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 space-y-3.5">
            <h3 className="text-base font-extrabold text-slate-900">Tạo Lớp Học Mới</h3>
            <p className="text-xs text-slate-500">Nhập tên lớp học mới (ví dụ: 6A3, 6B2...)</p>

            {classError && <p className="text-xs font-bold text-rose-600">{classError}</p>}

            <form onSubmit={handleAddClass} className="space-y-3">
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="6A3"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-black text-sm uppercase text-center focus:border-blue-500 outline-none"
                autoFocus
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddClassModalOpen(false)}
                  className="flex-1 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-sm"
                >
                  Tạo Lớp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
