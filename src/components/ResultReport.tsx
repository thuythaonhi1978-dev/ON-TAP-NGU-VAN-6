import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  RotateCcw, 
  Home, 
  Printer, 
  Download, 
  Star, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { QuizResult, StudentProfile } from '../types';
import { COGNITIVE_LEVELS, BADGES } from '../data/defaultQuestions';
import { Mascot } from './Mascot';
import { SoundFX } from '../utils/sound';

interface ResultReportProps {
  result: QuizResult;
  profile: StudentProfile;
  soundEnabled: boolean;
  onPlayAgain: () => void;
  onPracticeWrongOnly: () => void;
  onGoHome: () => void;
}

export const ResultReport: React.FC<ResultReportProps> = ({
  result,
  profile,
  soundEnabled,
  onPlayAgain,
  onPracticeWrongOnly,
  onGoHome
}) => {
  const getGradeEvaluation = (percentage: number) => {
    if (percentage >= 90) {
      return {
        label: 'Xuất Sắc!',
        desc: 'Em có năng lực đọc hiểu và kiến thức tiếng Việt vô cùng vững vàng! Thật đáng tự hào!',
        color: 'from-amber-400 to-orange-500 text-slate-900',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      };
    }
    if (percentage >= 75) {
      return {
        label: 'Hoàn Thành Tốt!',
        desc: 'Em đã nắm chắc kiến thức cốt lõi và hoàn thành bài thi rất ấn tượng!',
        color: 'from-blue-600 to-indigo-600 text-white',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      };
    }
    if (percentage >= 50) {
      return {
        label: 'Đã Có Tiến Bộ!',
        desc: 'Em đã nỗ lực rất nhiều. Hãy rèn luyện thêm một chút ở các câu vận dụng nhé!',
        color: 'from-emerald-500 to-teal-600 text-white',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      };
    }
    return {
      label: 'Cần Luyện Tập Thêm',
      desc: 'Đừng nản lòng nhé! Em hãy bấm "Luyện lại câu sai" để ôn lại kiến thức và bứt phá nào!',
      color: 'from-purple-600 to-pink-600 text-white',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
    };
  };

  const evalInfo = getGradeEvaluation(result.percentage);

  // Print function
  const handlePrint = () => {
    SoundFX.playClick(soundEnabled);
    window.print();
  };

  // Download certificate text report
  const handleDownloadReport = () => {
    SoundFX.playClick(soundEnabled);
    const content = `
========================================
    ĐẤU TRƯỜNG NGỮ VĂN 6 - KẾT QUẢ THI ĐẤU
========================================
Họ và tên: ${result.studentName}
Lớp: ${result.className}
Ngày thi: ${result.date}
Tổng điểm đạt được: ${result.totalScore} điểm
Số câu trả lời đúng: ${result.correctCount}/${result.totalQuestions} (${result.percentage}%)
Thời gian làm bài: ${Math.floor(result.durationSeconds / 60)} phút ${result.durationSeconds % 60} giây
Xếp loại: ${evalInfo.label}

KẾT QUẢ THEO MỨC ĐỘ NHẬN THỨC:
- Nhận biết: ${result.levelBreakdown.nhan_biet.correct}/${result.levelBreakdown.nhan_biet.total}
- Thông hiểu: ${result.levelBreakdown.thong_hieu.correct}/${result.levelBreakdown.thong_hieu.total}
- Vận dụng thấp: ${result.levelBreakdown.van_dung_thap.correct}/${result.levelBreakdown.van_dung_thap.total}
- Vận dụng cao: ${result.levelBreakdown.van_dung_cao.correct}/${result.levelBreakdown.van_dung_cao.total}

NỘI DUNG LÀM TỐT:
${result.strengths.map((s) => `+ ${s}`).join('\n') || '+ Chưa ghi nhận'}

NỘI DUNG CẦN ÔN LẠI:
${result.needsReview.map((n) => `- ${n}`).join('\n') || '- Không có, em làm rất tốt!'}

Đấu Trường Ngữ Văn 6 - Học mà chơi, chơi mà học!
========================================
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ket_qua_Ngu_Van_6_${result.studentName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner & Celebration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-r ${evalInfo.color} shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6`}
      >
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            Báo Cáo Thành Tích Đấu Trường
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {evalInfo.label}
          </h2>
          <p className="text-xs sm:text-sm font-medium opacity-90 max-w-md">
            {evalInfo.desc}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold">
            <span className="px-3 py-1 bg-white/20 rounded-xl">Học sinh: {result.studentName}</span>
            <span className="px-3 py-1 bg-white/20 rounded-xl">Lớp: {result.className}</span>
          </div>
        </div>

        <div className="flex-shrink-0 z-10">
          <Mascot
            mood={result.percentage >= 75 ? 'cheering' : 'encouraging'}
            size="lg"
            message={`Em đạt ${result.correctCount}/${result.totalQuestions} câu đúng và ${result.totalScore} điểm!`}
          />
        </div>
      </motion.div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng Điểm</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{result.totalScore}đ</span>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Câu Đúng</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">{result.correctCount}/{result.totalQuestions}</span>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tỉ Lệ Đạt</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">{result.percentage}%</span>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thời Gian</span>
          <span className="text-xl sm:text-2xl font-black text-purple-900 mt-1">
            {Math.floor(result.durationSeconds / 60)}p {result.durationSeconds % 60}s
          </span>
        </div>
      </div>

      {/* 4 Cognitive Levels Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          Kết Quả Phân Hóa Theo Bốn Mức Độ Nhận Thức
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(result.levelBreakdown).map(([lvlKey, stats]) => {
            const lvl = lvlKey as keyof typeof COGNITIVE_LEVELS;
            const lvlConfig = COGNITIVE_LEVELS[lvl];
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

            return (
              <div key={lvl} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${lvlConfig.color}`}>
                    {lvlConfig.name}
                  </span>
                  <span className="text-xs font-extrabold text-slate-800">
                    {stats.correct}/{stats.total}
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 text-right font-semibold">{pct}% chính xác</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Needs Review Analysis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-2">
          <h4 className="font-bold text-emerald-900 flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Nội dung em làm rất tốt
          </h4>
          {result.strengths.length > 0 ? (
            <ul className="text-xs text-emerald-950 space-y-1.5 list-disc pl-4 font-medium">
              {result.strengths.map((str, i) => (
                <li key={i}>{str}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">Hãy tiếp tục rèn luyện để khẳng định điểm mạnh nhé!</p>
          )}
        </div>

        {/* Needs Review */}
        <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-2">
          <h4 className="font-bold text-amber-900 flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Nội dung em cần ôn lại
          </h4>
          {result.needsReview.length > 0 ? (
            <ul className="text-xs text-amber-950 space-y-1.5 list-disc pl-4 font-medium">
              {result.needsReview.map((rev, i) => (
                <li key={i}>{rev}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-emerald-800 font-bold">Xuất sắc! Em không có chủ đề nào bị hổng kiến thức!</p>
          )}
        </div>
      </div>

      {/* Review Wrong Answers Section */}
      {result.wrongAnswers.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-500" />
              Chi Tiết Các Câu Trả Lời Sai ({result.wrongAnswers.length} câu)
            </h3>
            <button
              onClick={() => {
                SoundFX.playClick(soundEnabled);
                onPracticeWrongOnly();
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Luyện Lại Ngay Các Câu Này
            </button>
          </div>

          <div className="space-y-4">
            {result.wrongAnswers.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm">
                <div className="font-bold text-slate-900">
                  Câu {idx + 1}: {item.question.prompt}
                </div>
                <div className="text-xs text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <strong>Đáp án đúng & Giải thích: </strong>
                  {item.question.explanation}
                </div>
                <div className="text-[11px] text-blue-700 font-bold">
                  Ghi nhớ: {item.question.keyTakeaway}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions Toolbar */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => {
            SoundFX.playClick(soundEnabled);
            onPlayAgain();
          }}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          CHƠI LẠI LƯỢT MỚI
        </button>

        {result.wrongAnswers.length > 0 && (
          <button
            onClick={() => {
              SoundFX.playClick(soundEnabled);
              onPracticeWrongOnly();
            }}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            LUYỆN LẠI CÂU SAI
          </button>
        )}

        <button
          onClick={() => {
            SoundFX.playClick(soundEnabled);
            onGoHome();
          }}
          className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm transition-all flex items-center gap-2"
        >
          <Home className="w-4 h-4 text-slate-500" />
          VỀ TRANG CHỦ
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all flex items-center gap-1.5"
          title="In phiếu kết quả"
        >
          <Printer className="w-4 h-4" />
          In Kết Quả
        </button>

        <button
          onClick={handleDownloadReport}
          className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all flex items-center gap-1.5"
          title="Tải báo cáo về máy"
        >
          <Download className="w-4 h-4" />
          Tải Báo Cáo
        </button>
      </div>
    </div>
  );
};
