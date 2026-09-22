import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  Lightbulb, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Zap, 
  Flame, 
  Gift, 
  Compass, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  ShieldCheck,
  Disc
} from 'lucide-react';
import { Question, AnswerRecord, StudentProfile, TeacherSettings } from '../types';
import { COGNITIVE_LEVELS, ZONE_CONFIG } from '../data/defaultQuestions';
import { Mascot, MascotMood } from './Mascot';
import { SoundFX } from '../utils/sound';

interface QuizArenaProps {
  questions: Question[];
  profile: StudentProfile;
  settings: TeacherSettings;
  soundEnabled: boolean;
  onFinishQuiz: (answers: AnswerRecord[], totalScore: number) => void;
  onQuitToMap: () => void;
}

export const QuizArena: React.FC<QuizArenaProps> = ({
  questions,
  profile,
  settings,
  soundEnabled,
  onFinishQuiz,
  onQuitToMap
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [answersList, setAnswersList] = useState<AnswerRecord[]>([]);

  // Current question states
  const [timeLeft, setTimeLeft] = useState(settings.timerDuration || 45);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hasRetried, setHasRetried] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Mascot mood and speech
  const [mascotMood, setMascotMood] = useState<MascotMood>('thinking');
  const [mascotText, setMascotText] = useState('Đọc kĩ đề bài và chọn câu trả lời chính xác nhất nhé!');

  // Interactive Game Mode Specific States
  // 1. Multiple Choice / Quick Answer
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // 2. Matching Pairs (Ghép đôi)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [shuffledRights, setShuffledRights] = useState<{ id: string; text: string }[]>([]);

  // 3. Secret Doors (Ô cửa bí mật)
  const [doorBonus, setDoorBonus] = useState<{ label: string; multiplier: number } | null>(null);
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);

  // 4. Sequencing (Sắp xếp siêu tốc)
  const [currentSequence, setCurrentSequence] = useState<{ id: string; text: string; correctIndex: number }[]>([]);

  // 5. Error Hunter (Thợ săn lỗi sai)
  const [selectedErrorToken, setSelectedErrorToken] = useState<string | null>(null);

  // 6. Lucky Wheel (Vòng quay may mắn)
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelPrize, setWheelPrize] = useState<string | null>(null);

  // 7. Character Rescue progress
  const [rescueProgress, setRescueProgress] = useState(1);

  // Timer Ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTimeRef = useRef<number>(Date.now());

  const currentQ = questions[currentIndex];

  // Initialize or reset state for new question
  useEffect(() => {
    if (!currentQ) return;

    setTimeLeft(settings.timerDuration > 0 ? settings.timerDuration : 0);
    setHintsUsed(0);
    setHasRetried(false);
    setIsAnswered(false);
    setIsCorrectAnswer(false);
    setEarnedPoints(0);
    setSelectedOption(null);
    setSelectedLeft(null);
    setMatchedPairs({});
    setSelectedDoor(null);
    setDoorBonus(null);
    setSelectedErrorToken(null);
    setWheelPrize(null);
    questionStartTimeRef.current = Date.now();

    // Default mascot state
    setMascotMood('thinking');
    setMascotText('Em hãy suy nghĩ thật kĩ và chọn đáp án chính xác nhé!');

    // Initialize Matching Pairs (shuffle right column)
    if (currentQ.gameType === 'ghep_doi' && currentQ.matchingPairs) {
      const rights = currentQ.matchingPairs.map((p) => ({ id: p.id, text: p.right }));
      setShuffledRights([...rights].sort(() => Math.random() - 0.5));
    }

    // Initialize Sequencing (shuffle items)
    if (currentQ.gameType === 'sap_xep_sieu_toc' && currentQ.sequenceItems) {
      const shuffled = [...currentQ.sequenceItems].sort(() => Math.random() - 0.5);
      setCurrentSequence(shuffled);
    }
  }, [currentIndex, currentQ, settings.timerDuration]);

  // Countdown timer effect
  useEffect(() => {
    if (settings.timerDuration <= 0 || isAnswered) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        if (prev <= 6) {
          SoundFX.playTick(soundEnabled);
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAnswered, settings.timerDuration]);

  const handleTimeOut = () => {
    if (isAnswered) return;
    SoundFX.playWrong(soundEnabled);
    setIsAnswered(true);
    setIsCorrectAnswer(false);
    setMascotMood('encouraging');
    setMascotText('Đã hết thời gian rồi! Em đừng lo, hãy xem lời giải để ghi nhớ nhé.');
    recordAnswer(false, -1, 0);
  };

  // Record answer to quiz history
  const recordAnswer = (isCorrect: boolean, chosenAnswer: any, pts: number) => {
    const timeSpent = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));
    const newRecord: AnswerRecord = {
      questionId: currentQ.id,
      question: currentQ,
      userAnswer: chosenAnswer,
      isCorrect,
      hintsUsed,
      timeSpent,
      scoreEarned: pts,
      retried: hasRetried
    };

    setAnswersList((prev) => [...prev, newRecord]);

    if (isCorrect) {
      const nextStreak = currentStreak + 1;
      setCurrentStreak(nextStreak);
      if (nextStreak > highestStreak) setHighestStreak(nextStreak);
      setUserScore((prev) => prev + pts);
      setRescueProgress((prev) => Math.min(5, prev + 1));
    } else {
      setCurrentStreak(0);
    }
  };

  // Evaluate Answer Core Logic
  const submitAnswer = (isCorrect: boolean, answerValue: any) => {
    if (isAnswered) return;

    if (isCorrect) {
      // Correct!
      SoundFX.playCorrect(soundEnabled);
      setIsAnswered(true);
      setIsCorrectAnswer(true);

      // Point calculation: Base points - (hintsUsed * 3) + Streak Bonus
      let pts = currentQ.points - hintsUsed * 3;
      if (doorBonus) pts = Math.round(pts * doorBonus.multiplier);

      // Streak bonus: every 3 streak gives +15 points!
      if ((currentStreak + 1) % 3 === 0) {
        pts += 15;
      }

      // Speed bonus if answered in first 10 seconds
      const elapsed = (Date.now() - questionStartTimeRef.current) / 1000;
      if (settings.timerDuration > 0 && elapsed <= 10) {
        pts += 5;
      }

      pts = Math.max(5, pts);
      setEarnedPoints(pts);

      setMascotMood('happy');
      setMascotText(
        (currentStreak + 1) >= 3
          ? `Xuất sắc! Chuỗi ${currentStreak + 1} câu đúng liên tiếp! Thưởng +15 điểm!`
          : `Chính xác tuyệt đối! Em được cộng +${pts} điểm!`
      );

      // Confetti celebration
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}

      recordAnswer(true, answerValue, pts);
    } else {
      // Wrong answer
      SoundFX.playWrong(soundEnabled);

      if (!hasRetried) {
        // First wrong attempt -> Allow retry once!
        setHasRetried(true);
        setMascotMood('encouraging');
        setMascotText('Chưa chính xác, em hãy thử lại một lần nữa nhé! Cố lên nào!');
      } else {
        // Second wrong attempt -> Finalize question
        setIsAnswered(true);
        setIsCorrectAnswer(false);
        setEarnedPoints(0);
        setMascotMood('encouraging');
        setMascotText('Rất tiếc chưa đúng rồi! Hãy đọc kĩ giải thích và kiến thức ghi nhớ bên dưới nhé.');
        recordAnswer(false, answerValue, 0);
      }
    }
  };

  // Hint trigger
  const handleUseHint = () => {
    if (hintsUsed < 2) {
      SoundFX.playClick(soundEnabled);
      const nextHintCount = hintsUsed + 1;
      setHintsUsed(nextHintCount);
      setMascotMood('thinking');
      setMascotText(`Gợi ý ${nextHintCount}: ${currentQ.hints[nextHintCount - 1]}`);
    }
  };

  // Navigation: Next Question or Complete
  const handleNext = () => {
    SoundFX.playClick(soundEnabled);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all questions
      SoundFX.playFanfare(soundEnabled);
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 }
        });
      } catch {}
      onFinishQuiz(answersList, userScore);
    }
  };

  // Spin Lucky Wheel
  const spinWheel = () => {
    if (isSpinning || isAnswered) return;
    setIsSpinning(true);
    SoundFX.playWheelSpin(soundEnabled);

    const extraDegree = 1440 + Math.floor(Math.random() * 360);
    const newRot = wheelRotation + extraDegree;
    setWheelRotation(newRot);

    setTimeout(() => {
      setIsSpinning(false);
      const prizes = ['Nhân đôi điểm (x2)', 'Gợi ý miễn phí', 'Tăng tốc +10đ', 'Ngôi sao may mắn'];
      const won = prizes[Math.floor(Math.random() * prizes.length)];
      setWheelPrize(won);
      setMascotMood('happy');
      setMascotText(`Vòng quay may mắn: Em nhận được phần thưởng "${won}"! Hãy trả lời câu hỏi nhé!`);
    }, 2500);
  };

  // Render game modes
  const renderGameInteraction = () => {
    switch (currentQ.gameType) {
      case 'ghep_doi':
        // Mode 2: Matching Pairs
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 font-semibold italic">
              * Hướng dẫn: Bấm chọn một mục bên trái, sau đó bấm chọn mục tương ứng bên phải để ghép đôi.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Khái niệm / Tác phẩm</p>
                {currentQ.matchingPairs?.map((pair) => {
                  const isPaired = !!matchedPairs[pair.id];
                  const isSelected = selectedLeft === pair.id;

                  return (
                    <button
                      key={pair.id}
                      disabled={isAnswered || isPaired}
                      onClick={() => {
                        SoundFX.playClick(soundEnabled);
                        setSelectedLeft(pair.id);
                      }}
                      className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-bold border-2 transition-all flex items-center justify-between ${
                        isPaired
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-200'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <span>{pair.left}</span>
                      {isPaired && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Nội dung / Đặc trưng</p>
                {shuffledRights.map((item) => {
                  const matchedLeftKey = Object.keys(matchedPairs).find((k) => matchedPairs[k] === item.id);
                  const isPaired = !!matchedLeftKey;

                  return (
                    <button
                      key={item.id}
                      disabled={isAnswered || isPaired}
                      onClick={() => {
                        if (!selectedLeft) return;
                        SoundFX.playClick(soundEnabled);
                        const updated = { ...matchedPairs, [selectedLeft]: item.id };
                        setMatchedPairs(updated);
                        setSelectedLeft(null);

                        // Check if all pairs are matched
                        if (currentQ.matchingPairs && Object.keys(updated).length === currentQ.matchingPairs.length) {
                          const allCorrect = currentQ.matchingPairs.every((p) => updated[p.id] === p.id);
                          submitAnswer(allCorrect, updated);
                        }
                      }}
                      className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold border-2 transition-all flex items-center justify-between ${
                        isPaired
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : selectedLeft
                          ? 'border-dashed border-blue-400 bg-blue-50/50 hover:bg-blue-100/70 text-slate-800'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <span>{item.text}</span>
                      {isPaired && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset pairs button if stuck */}
            {!isAnswered && Object.keys(matchedPairs).length > 0 && (
              <button
                onClick={() => {
                  SoundFX.playClick(soundEnabled);
                  setMatchedPairs({});
                  setSelectedLeft(null);
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 pt-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Ghép lại từ đầu
              </button>
            )}
          </div>
        );

      case 'o_cua_bi_mat':
        // Mode 3: Secret Doors
        return (
          <div className="space-y-4">
            {!doorBonus && !isAnswered && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-center space-y-3">
                <p className="text-xs sm:text-sm font-bold text-purple-900">
                  🎁 Hãy chọn 1 trong 3 Ô Cửa Bí Mật để nhận phần thưởng điểm số đặc biệt cho câu hỏi này!
                </p>
                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        SoundFX.playFanfare(soundEnabled);
                        const bonuses = [
                          { label: 'Gấp đôi điểm x2!', multiplier: 2 },
                          { label: 'Gợi ý miễn phí!', multiplier: 1 },
                          { label: 'Ngôi sao may mắn +10đ!', multiplier: 1.5 }
                        ];
                        const bonus = bonuses[num - 1];
                        setSelectedDoor(num);
                        setDoorBonus(bonus);
                        setMascotMood('happy');
                        setMascotText(`Chúc mừng! Em đã mở được ô cửa bí mật: ${bonus.label}`);
                      }}
                      className="py-6 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 text-white font-black text-lg shadow-md transition-all flex flex-col items-center gap-1.5"
                    >
                      <Gift className="w-6 h-6 text-amber-300" />
                      <span>Cửa {num}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Standard Options for Secret Door question once door chosen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options?.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = currentQ.correctAnswer === idx;

                let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800';
                if (isAnswered) {
                  if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                  else if (isSelected) btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                  else btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => {
                      setSelectedOption(idx);
                      submitAnswer(idx === currentQ.correctAnswer, idx);
                    }}
                    className={`p-4 rounded-2xl text-left border-2 transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'sap_xep_sieu_toc':
        // Mode 4: Sequencing
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 font-semibold italic">
              * Dùng nút mũi tên lên / xuống để di chuyển các bước vào đúng trình tự:
            </p>
            <div className="space-y-2">
              {currentSequence.map((item, idx) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all ${
                    isAnswered
                      ? item.correctIndex === idx
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-rose-400 bg-rose-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{item.text}</span>
                  </div>

                  {!isAnswered && (
                    <div className="flex items-center gap-1">
                      <button
                        disabled={idx === 0}
                        onClick={() => {
                          SoundFX.playClick(soundEnabled);
                          const next = [...currentSequence];
                          const temp = next[idx - 1];
                          next[idx - 1] = next[idx];
                          next[idx] = temp;
                          setCurrentSequence(next);
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30"
                      >
                        <ArrowUp className="w-4 h-4 text-slate-700" />
                      </button>
                      <button
                        disabled={idx === currentSequence.length - 1}
                        onClick={() => {
                          SoundFX.playClick(soundEnabled);
                          const next = [...currentSequence];
                          const temp = next[idx + 1];
                          next[idx + 1] = next[idx];
                          next[idx] = temp;
                          setCurrentSequence(next);
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30"
                      >
                        <ArrowDown className="w-4 h-4 text-slate-700" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!isAnswered && (
              <button
                onClick={() => {
                  const isOrdered = currentSequence.every((item, i) => item.correctIndex === i);
                  submitAnswer(isOrdered, currentSequence);
                }}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                XÁC NHẬN THỨ TỰ SẮP XẾP
              </button>
            )}
          </div>
        );

      case 'tho_san_loi_sai':
        // Mode 5: Error Hunter
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 font-semibold italic">
              * Bấm chọn trực tiếp vào từ ngữ mà em phát hiện là DÙNG SAI:
            </p>
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-wrap gap-2 items-center text-sm sm:text-base leading-loose">
              {currentQ.errorSpotter?.tokens.map((token) => {
                const isSelected = selectedErrorToken === token.id;
                let tokenStyle = 'bg-white border-slate-300 text-slate-800 hover:border-amber-400 hover:bg-amber-100/50';

                if (isAnswered) {
                  if (token.isError) tokenStyle = 'bg-emerald-500 border-emerald-600 text-white font-bold ring-2 ring-emerald-300';
                  else if (isSelected) tokenStyle = 'bg-rose-500 border-rose-600 text-white font-bold';
                  else tokenStyle = 'bg-slate-100 border-slate-200 text-slate-400';
                } else if (isSelected) {
                  tokenStyle = 'bg-blue-600 border-blue-700 text-white font-bold';
                }

                return (
                  <button
                    key={token.id}
                    disabled={isAnswered}
                    onClick={() => {
                      SoundFX.playClick(soundEnabled);
                      setSelectedErrorToken(token.id);
                      submitAnswer(token.isError, token.text);
                    }}
                    className={`px-3 py-1.5 rounded-xl border-2 font-medium cursor-pointer transition-all ${tokenStyle}`}
                  >
                    {token.text}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'vong_quay_may_man':
        // Mode 6: Lucky Wheel
        return (
          <div className="space-y-5">
            {!wheelPrize && !isAnswered && (
              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
                <div
                  className="w-40 h-40 rounded-full border-8 border-amber-400 bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-xl transition-transform duration-[2500ms] ease-out text-white"
                  style={{ transform: `rotate(${wheelRotation}deg)` }}
                >
                  <Disc className="w-16 h-16 opacity-80" />
                </div>

                <button
                  disabled={isSpinning}
                  onClick={spinWheel}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
                >
                  <Disc className="w-4 h-4" />
                  {isSpinning ? 'Đang quay...' : 'QUAY BÁNH XE MAY MẮN'}
                </button>
              </div>
            )}

            {/* Multiple Choice Options for Wheel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options?.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = currentQ.correctAnswer === idx;

                let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800';
                if (isAnswered) {
                  if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                  else if (isSelected) btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                  else btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => {
                      setSelectedOption(idx);
                      submitAnswer(idx === currentQ.correctAnswer, idx);
                    }}
                    className={`p-4 rounded-2xl text-left border-2 transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'giai_cuu_nhan_vat':
        // Mode 7: Character Rescue Stepping Stones
        return (
          <div className="space-y-4">
            {/* Visual Stepping Stone Rescue Track */}
            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-blue-600" />
                Hành trình giải cứu:
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
                      step <= rescueProgress
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {step === 5 ? '🏆' : step}
                  </div>
                ))}
              </div>
            </div>

            {/* Standard Choice Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options?.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = currentQ.correctAnswer === idx;

                let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800';
                if (isAnswered) {
                  if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                  else if (isSelected) btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                  else btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => {
                      setSelectedOption(idx);
                      submitAnswer(idx === currentQ.correctAnswer, idx);
                    }}
                    className={`p-4 rounded-2xl text-left border-2 transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'ai_nhanh_hon':
      case 'vuot_me_cung':
      default:
        // Mode 1 & 8: Speed quiz / Multiple choice / Maze station
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options?.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = currentQ.correctAnswer === idx;

              let btnStyle = 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40 text-slate-800 shadow-xs';
              if (isAnswered) {
                if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                else if (isSelected) btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                else btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => {
                    setSelectedOption(idx);
                    submitAnswer(idx === currentQ.correctAnswer, idx);
                  }}
                  className={`p-4 rounded-2xl text-left border-2 transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 flex-shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>
        );
    }
  };

  const levelInfo = COGNITIVE_LEVELS[currentQ.level];
  const zoneInfo = ZONE_CONFIG[currentQ.zone];

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Top Header Bar: Progress, Streak, Points, Timer, Quit */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-3">
        {/* Progress & Question Count */}
        <div className="space-y-1 min-w-[120px]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
            <span>Câu {currentIndex + 1}/{questions.length}</span>
            <span className="text-slate-400">•</span>
            <span className="text-blue-600">{zoneInfo.shortName}</span>
          </div>
          <div className="w-32 sm:w-44 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <Flame className={`w-4 h-4 ${currentStreak >= 3 ? 'text-rose-500 fill-rose-500 animate-pulse' : 'text-amber-500'}`} />
          <span>Chuỗi: {currentStreak}</span>
        </div>

        {/* Score Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-extrabold">
          <Trophy className="w-4 h-4 text-purple-600" />
          <span>{userScore} đ</span>
        </div>

        {/* Countdown Timer */}
        {settings.timerDuration > 0 && (
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-black transition-colors ${
              timeLeft <= 10
                ? 'bg-rose-50 border-rose-300 text-rose-600 animate-bounce'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{timeLeft}s</span>
          </div>
        )}

        {/* Quit Button */}
        <button
          onClick={() => {
            if (window.confirm('Em có chắc chắn muốn tạm dừng lượt thi và quay lại bản đồ không?')) {
              onQuitToMap();
            }
          }}
          className="text-xs font-bold text-slate-400 hover:text-slate-700 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          Rời khỏi
        </button>
      </div>

      {/* Main Question Card */}
      <motion.div
        key={currentQ.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6"
      >
        {/* Meta badges: Zone, Topic, Level, Points */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${levelInfo.color}`}>
              {levelInfo.name} (+{currentQ.points}đ)
            </span>
            {currentQ.lessonTitle && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {currentQ.lessonTitle}
              </span>
            )}
            {currentQ.sourceText && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                📖 {currentQ.sourceText}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {currentQ.topic}
            </span>
          </div>

          {/* Hint Button */}
          {!isAnswered && (
            <button
              onClick={handleUseHint}
              disabled={hintsUsed >= 2}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                hintsUsed >= 2
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Gợi ý ({2 - hintsUsed} còn lại, -3đ)</span>
            </button>
          )}
        </div>

        {/* Question Context Fragment if exists */}
        {currentQ.context && (
          <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-blue-500 text-slate-700 text-xs sm:text-sm italic font-medium leading-relaxed">
            {currentQ.context}
          </div>
        )}

        {/* Question Prompt */}
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
          {currentQ.prompt}
        </h3>

        {/* Interactive Mode Content */}
        {renderGameInteraction()}

        {/* Post-Answer Feedback & Pedagogical Explanations */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`p-5 rounded-2xl border-2 space-y-3 ${
                isCorrectAnswer
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50/70 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-black text-sm sm:text-base">
                  {isCorrectAnswer ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Chính Xác! Tuyệt Vời! (+{earnedPoints} điểm)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>Chưa Đúng! Hãy Cùng Xem Lời Giải</span>
                    </>
                  )}
                </div>
              </div>

              {/* Detailed Explanation */}
              <div className="text-xs sm:text-sm font-medium leading-relaxed">
                <strong>Giải thích chi tiết: </strong>
                {currentQ.explanation}
              </div>

              {/* Core Takeaway ("Kiến thức ghi nhớ") */}
              <div className="p-3 bg-white/80 rounded-xl border border-slate-200/80 text-xs font-bold text-slate-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-blue-700">Kiến thức ghi nhớ: </span>
                  {currentQ.keyTakeaway}
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>{currentIndex + 1 < questions.length ? 'Câu Tiếp Theo' : 'Xem Kết Quả Chung Cuộc'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mascot Companion Feedback */}
      <div className="pt-2">
        <Mascot mood={mascotMood} message={mascotText} size="md" />
      </div>
    </div>
  );
};
