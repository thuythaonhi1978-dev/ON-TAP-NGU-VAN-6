import React from 'react';
import { X, Award, HelpCircle, Zap, ShieldAlert, Star, Compass, BookOpen, Feather, Mic } from 'lucide-react';
import { COGNITIVE_LEVELS, BADGES } from '../data/defaultQuestions';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <HelpCircle className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Hướng Dẫn Tham Gia Đấu Trường
              </h2>
              <p className="text-xs text-blue-100 font-medium">
                Cẩm nang chinh phục tri thức Ngữ văn 6
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
          {/* Section 1: 4 Khu vực hành trình */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">1</span>
              Bốn Khu Vực Bản Đồ Học Tập
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div className="flex items-center gap-2 font-bold text-blue-900 mb-1">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  1. Khám Phá Văn Bản
                </div>
                <p className="text-xs text-blue-800">
                  Truyện đồng thoại, thơ, kí, truyền thuyết, văn bản thông tin & nghị luận.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  2. Nhà Thám Hiểm Tiếng Việt
                </div>
                <p className="text-xs text-emerald-800">
                  Từ đơn/phức, từ láy/ghép, tu từ so sánh, nhân hóa, ẩn dụ, hoán dụ, cụm từ & dấu câu.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
                  <Feather className="w-4 h-4 text-amber-600" />
                  3. Xưởng Viết Sáng Tạo
                </div>
                <p className="text-xs text-amber-800">
                  Viết bài văn kể trải nghiệm, tả cảnh sinh hoạt, đoạn văn cảm xúc & lập dàn ý.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200">
                <div className="flex items-center gap-2 font-bold text-purple-900 mb-1">
                  <Mic className="w-4 h-4 text-purple-600" />
                  4. Sân Khấu Nói Và Nghe
                </div>
                <p className="text-xs text-purple-800">
                  Chuẩn bị bài thuyết trình, phi ngôn ngữ, thảo luận nhóm và lắng nghe tích cực.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: 4 Cấp độ câu hỏi */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">2</span>
              Bốn Cấp Độ Thử Thách & Điểm Số
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.values(COGNITIVE_LEVELS).map((lvl) => (
                <div key={lvl.id} className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col items-center text-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${lvl.color} mb-1.5`}>
                    {lvl.name}
                  </span>
                  <span className="text-lg font-black text-slate-900">+{lvl.points} đ</span>
                  <p className="text-[11px] text-slate-500 mt-1 leading-tight">{lvl.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: 8 Dạng trò chơi */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">3</span>
              Tám Dạng Trò Chơi Tương Tác
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                <strong>1. Ai nhanh hơn?</strong> Trắc nghiệm 4 phương án kèm đồng hồ đếm ngược kịch tính.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                <strong>2. Ghép đôi tri thức:</strong> Kéo thả hoặc bấm chọn cặp khái niệm, biện pháp tu từ, nhân vật.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                <strong>3. Ô cửa bí mật:</strong> Khám phá hộp quà bất ngờ, nhân đôi điểm số hoặc nhận gợi ý.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                <strong>4. Sắp xếp siêu tốc:</strong> Sắp xếp sự việc, các bước viết bài hoặc bố cục câu văn.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                <strong>5. Thợ săn lỗi sai:</strong> Bấm trực tiếp vào từ ngữ dùng sai chính tả, ngữ nghĩa hoặc dấu câu.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                <strong>6. Vòng quay may mắn:</strong> Quay bánh xe chọn câu hỏi ngẫu nhiên và nhận thưởng tốc độ.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                <strong>7. Giải cứu nhân vật:</strong> Mỗi câu đúng giúp linh vật vượt qua chướng ngại vật về đích.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                <strong>8. Vượt mê cung văn học:</strong> Vượt qua các trạm thử thách đa dạng từ cơ bản đến nâng cao.
              </div>
            </div>
          </div>

          {/* Section 4: Chấm điểm & Gợi ý */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <h4 className="font-bold text-amber-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              Quy Chế Chấm Điểm & Hỗ Trợ
            </h4>
            <ul className="text-xs text-amber-950 space-y-1.5 list-disc pl-4">
              <li><strong>Điểm thưởng chuỗi:</strong> Trả lời đúng liên tiếp 3 câu nhận thêm <strong>+15 điểm thưởng chuỗi</strong>.</li>
              <li><strong>Nút Gợi ý:</strong> Mỗi câu có 2 mức gợi ý mở rộng tư duy. Mỗi lần mở gợi ý sẽ trừ 3 điểm của câu đó.</li>
              <li><strong>Cơ hội làm lại:</strong> Khi trả lời sai, em được thử lại 1 lần để tự sửa sai trước khi xem đáp án và giải thích!</li>
              <li><strong>Ghi nhớ cốt lõi:</strong> Sau mỗi câu trả lời đều có phần tóm tắt kiến thức trọng tâm giúp em nhớ lâu.</li>
            </ul>
          </div>

          {/* Section 5: Hệ thống huy hiệu */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Hệ Thống Huy Hiệu Danh Dự
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {BADGES.map((b) => (
                <div key={b.id} className="p-2.5 rounded-2xl bg-purple-50/50 border border-purple-200 text-center flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mb-1">
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                  </div>
                  <strong className="text-xs text-purple-900">{b.title}</strong>
                  <span className="text-[10px] text-slate-500 mt-0.5">{b.criteria}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 transition-all text-sm"
          >
            Đã Hiểu, Sẵn Sàng Khám Phá!
          </button>
        </div>
      </div>
    </div>
  );
};
