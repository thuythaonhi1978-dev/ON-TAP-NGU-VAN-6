import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Users, 
  CheckCircle2, 
  Award, 
  Volume2, 
  VolumeX, 
  ToggleLeft, 
  ToggleRight,
  Flame,
  X
} from 'lucide-react';
import { ClassroomStudent } from '../../types';
import { SoundFX } from '../../utils/sound';

interface LuckyWheelTabProps {
  students: ClassroomStudent[];
  classes: string[];
  currentClass: string;
  onChangeClass: (className: string) => void;
  soundEnabled: boolean;
}

const COLORS = [
  '#3b82f6', // blue-500
  '#ec4899', // pink-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#8b5cf6', // purple-500
  '#06b6d4', // cyan-500
  '#f97316', // orange-500
  '#14b8a6', // teal-500
  '#6366f1', // indigo-500
  '#e11d48'  // rose-600
];

export const LuckyWheelTab: React.FC<LuckyWheelTabProps> = ({
  students,
  classes,
  currentClass,
  onChangeClass,
  soundEnabled
}) => {
  const [selectedGroup, setSelectedGroup] = useState<number | 'all'>('all');
  const [noRepeatMode, setNoRepeatMode] = useState<boolean>(true);
  const [calledIds, setCalledIds] = useState<string[]>([]);
  
  // Wheel spinning animation state
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [selectedWinner, setSelectedWinner] = useState<ClassroomStudent | null>(null);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState<boolean>(false);
  const [isAllCalledModalOpen, setIsAllCalledModalOpen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Filter students by class & group
  const classStudents = students.filter((s) => s.className === currentClass);
  const groupFiltered = classStudents.filter((s) => {
    if (selectedGroup !== 'all' && s.group !== selectedGroup) return false;
    return true;
  });

  // Students eligible for the wheel
  const eligibleStudents = noRepeatMode
    ? groupFiltered.filter((s) => !calledIds.includes(s.id))
    : groupFiltered;

  // Called students in this session
  const calledStudents = groupFiltered.filter((s) => calledIds.includes(s.id));

  // Reset called IDs when changing class or group
  const handleClassChange = (newClass: string) => {
    if (isSpinning) return;
    SoundFX.playClick(soundEnabled);
    onChangeClass(newClass);
    setCalledIds([]);
    setSelectedWinner(null);
  };

  const handleGroupChange = (grp: number | 'all') => {
    if (isSpinning) return;
    SoundFX.playClick(soundEnabled);
    setSelectedGroup(grp);
    setCalledIds([]);
    setSelectedWinner(null);
  };

  const handleResetCalled = () => {
    if (isSpinning) return;
    SoundFX.playClick(soundEnabled);
    setCalledIds([]);
    setSelectedWinner(null);
    setIsAllCalledModalOpen(false);
  };

  // Draw wheel on canvas
  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, width, height);

    const count = eligibleStudents.length;

    // Edge case: Empty list
    if (count === 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#f1f5f9';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#cbd5e1';
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Đã gọi hết học sinh!', centerX, centerY);
      return;
    }

    // Edge case: 1 student
    if (count === 1) {
      const student = eligibleStudents[0];
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = COLORS[0];
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(student.name, centerX, centerY);
      ctx.restore();
      return;
    }

    const arcSize = (2 * Math.PI) / count;

    for (let i = 0; i < count; i++) {
      const startAngle = angle + i * arcSize;
      const endAngle = startAngle + arcSize;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = count > 16 ? 'bold 10px system-ui' : count > 10 ? 'bold 12px system-ui' : 'bold 14px system-ui';
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 3;

      // Shorten name if needed
      const name = eligibleStudents[i].name;
      ctx.fillText(name, radius - 20, 4);
      ctx.restore();
    }

    // Draw central hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#3b82f6';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#3b82f6';
    ctx.fill();
  };

  // Re-draw on state changes
  useEffect(() => {
    drawWheel(rotationAngle);
  }, [eligibleStudents, rotationAngle]);

  // Spin Wheel function
  const spinWheel = () => {
    // 1. Guard against overlapping spins
    if (isSpinning) return;

    const count = eligibleStudents.length;
    if (count === 0) {
      setIsAllCalledModalOpen(true);
      return;
    }

    SoundFX.playClick(soundEnabled);
    setIsSpinning(true);
    setSelectedWinner(null);

    // Pick a random target index uniformly
    const targetIdx = Math.floor(Math.random() * count);
    const targetStudent = eligibleStudents[targetIdx];

    // Pointer is at Top (3 * PI / 2 radians, or 270 degrees)
    // When pointer points at segment i:
    // angle + i * arcSize <= 3*PI/2 <= angle + (i+1)*arcSize
    // Center of segment i is at angle + (i + 0.5)*arcSize = 3*PI/2
    // angle = 3*PI/2 - (i + 0.5)*arcSize
    const arcSize = (2 * Math.PI) / count;
    const targetSegmentCenter = 1.5 * Math.PI - (targetIdx + 0.5) * arcSize;

    // We spin at least 5 to 7 full rotations (10*PI to 14*PI)
    const extraRotations = 6 * (2 * Math.PI);
    const currentNormalized = rotationAngle % (2 * Math.PI);
    let delta = targetSegmentCenter - currentNormalized;
    while (delta < 0) delta += 2 * Math.PI;

    const totalAngleToSpin = extraRotations + delta;
    const startAngle = rotationAngle;
    const finalAngle = startAngle + totalAngleToSpin;

    const duration = 4000; // 4 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic: 1 - Math.pow(1 - progress, 3)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentA = startAngle + totalAngleToSpin * easeOut;

      setRotationAngle(currentA);
      drawWheel(currentA);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation finished!
        setIsSpinning(false);
        setRotationAngle(finalAngle);
        drawWheel(finalAngle);

        setSelectedWinner(targetStudent);
        setIsWinnerModalOpen(true);
        SoundFX.playFanfare(soundEnabled);

        // If no repeat mode, mark as called
        if (noRepeatMode) {
          setCalledIds((prev) => {
            const next = [...prev, targetStudent.id];
            if (next.length >= groupFiltered.length) {
              setTimeout(() => {
                setIsAllCalledModalOpen(true);
              }, 1200);
            }
            return next;
          });
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  // Cleanup anim frame
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Top Filter and Settings Bar */}
      <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Class Select */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">Lớp:</span>
            <select
              value={currentClass}
              disabled={isSpinning}
              onChange={(e) => handleClassChange(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-black text-sm text-blue-700 shadow-xs outline-none disabled:opacity-50"
            >
              {classes.map((c) => (
                <option key={c} value={c}>
                  Lớp {c}
                </option>
              ))}
            </select>
          </div>

          {/* Group Filter */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-600">Tổ:</span>
            <select
              value={selectedGroup}
              disabled={isSpinning}
              onChange={(e) => handleGroupChange(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-700 outline-none disabled:opacity-50"
            >
              <option value="all">Toàn bộ lớp</option>
              <option value="1">Chỉ Tổ 1</option>
              <option value="2">Chỉ Tổ 2</option>
              <option value="3">Chỉ Tổ 3</option>
              <option value="4">Chỉ Tổ 4</option>
            </select>
          </div>

          {/* No Repeat Mode Switch */}
          <button
            type="button"
            disabled={isSpinning}
            onClick={() => {
              SoundFX.playClick(soundEnabled);
              setNoRepeatMode(!noRepeatMode);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              noRepeatMode
                ? 'bg-purple-100 text-purple-700 border-purple-300'
                : 'bg-white text-slate-600 border-slate-300'
            }`}
            title="Khi bật: học sinh đã quay trúng sẽ không bị gọi lại"
          >
            {noRepeatMode ? <ToggleRight className="w-4 h-4 text-purple-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
            <span>Không gọi lại: {noRepeatMode ? 'BẬT' : 'TẮT'}</span>
          </button>
        </div>

        {/* Reset button */}
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={handleResetCalled}
            disabled={isSpinning || calledIds.length === 0}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors disabled:opacity-40"
            title="Khôi phục lại toàn bộ danh sách"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại danh sách</span>
          </button>
        </div>
      </div>

      {/* Main Wheel Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Wheel Area (2 cols on large screen) */}
        <div className="lg:col-span-2 bg-gradient-to-b from-slate-900 to-indigo-950 p-4 sm:p-8 rounded-3xl shadow-xl border border-indigo-900 flex flex-col items-center justify-center relative overflow-hidden min-h-[380px] sm:min-h-[440px]">
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Pointer Arrow at Top (12 o'clock) */}
          <div className="relative z-10 flex flex-col items-center mb-1">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[28px] border-t-amber-400 drop-shadow-[0_4px_8px_rgba(245,158,11,0.6)]" />
          </div>

          {/* Canvas Wheel */}
          <div className="relative z-0 my-2">
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              className="max-w-full drop-shadow-2xl rounded-full"
            />
          </div>

          {/* Action Spin Button (Anti-spam locked while spinning) */}
          <div className="relative z-10 mt-4 w-full max-w-xs">
            <button
              onClick={spinWheel}
              disabled={isSpinning || eligibleStudents.length === 0}
              className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base tracking-wider shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
                isSpinning
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed scale-98'
                  : eligibleStudents.length === 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-amber-500/25 animate-pulse'
              }`}
            >
              <Sparkles className="w-5 h-5 text-yellow-200" />
              <span>{isSpinning ? 'ĐANG QUAY...' : eligibleStudents.length === 0 ? 'ĐÃ QUAY HẾT' : 'QUAY GỌI TÊN NGAY!'}</span>
            </button>
          </div>

          {/* Status Subtitle */}
          <div className="relative z-10 mt-2 text-xs font-bold text-indigo-200/80 text-center">
            {eligibleStudents.length} học sinh sẵn sàng trong vòng quay
          </div>
        </div>

        {/* Sidebar: Called & Eligible List */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Danh Sách Học Sinh</span>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {calledStudents.length}/{groupFiltered.length} đã gọi
            </span>
          </div>

          {/* Called List */}
          {noRepeatMode && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-extrabold uppercase text-slate-400">
                Đã gọi trong phiên này ({calledStudents.length}):
              </div>

              {calledStudents.length === 0 ? (
                <div className="text-xs text-slate-400 italic py-2">Chưa gọi học sinh nào</div>
              ) : (
                <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                  {calledStudents.map((s, idx) => (
                    <div
                      key={s.id}
                      className="p-2 rounded-xl bg-purple-50/70 border border-purple-200 text-xs font-bold text-purple-900 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-[10px] text-purple-500 font-extrabold">#{idx + 1}</span>
                        <span className="truncate">{s.name}</span>
                      </div>
                      <span className="text-[10px] text-purple-600 bg-purple-100 px-1.5 py-0.2 rounded-md font-mono">
                        Tổ {s.group}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Eligible List */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-extrabold uppercase text-slate-400">
              Còn lại trên vòng quay ({eligibleStudents.length}):
            </div>
            <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
              {eligibleStudents.map((s) => (
                <div
                  key={s.id}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center justify-between"
                >
                  <span className="truncate">{s.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Tổ {s.group}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* MODAL: CHÚC MỪNG HỌC SINH ĐƯỢC CHỌN */}
      {/* ========================================================== */}
      {isWinnerModalOpen && selectedWinner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-amber-300 p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm">
              🎉
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                Chúc Mừng Bạn Đã Được Gọi!
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {selectedWinner.name}
              </h3>
              <p className="text-xs font-bold text-slate-500">
                Mã: {selectedWinner.studentCode} • Tổ {selectedWinner.group} • Lớp {selectedWinner.className}
              </p>
            </div>

            <button
              onClick={() => setIsWinnerModalOpen(false)}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all active:scale-95"
            >
              Tiếp Tục
            </button>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: ĐÃ GỌI HẾT TẤT CẢ HỌC SINH */}
      {/* ========================================================== */}
      {isAllCalledModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              🏆
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">Đã Hoàn Tất Vòng Quay!</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tất cả {groupFiltered.length} học sinh trong danh sách đã được gọi lên bảng ít nhất một lần.
              </p>
            </div>

            <button
              onClick={handleResetCalled}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all active:scale-95"
            >
              Bắt Đầu Lượt Mới (Đặt Lại)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
