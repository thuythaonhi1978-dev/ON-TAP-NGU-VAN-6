import { Question } from '../types';

export const CURRICULUM_NEW_QUESTIONS: Question[] = [
  // =========================================================================
  // BÀI 1: TÔI VÀ CÁC BẠN (Tập 1 - Thể loại: Truyện đồng thoại)
  // =========================================================================
  {
    id: 'kntt-b1-mc1',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Văn bản "Nếu cậu muốn có một người bạn..." (Saint-Exupéry)',
    semester: 1,
    lesson: 1,
    lessonTitle: 'Bài 1: Tôi và các bạn',
    sourceText: 'Nếu cậu muốn có một người bạn... (Saint-Exupéry)',
    prompt: 'Theo lời chú Cáo chia sẻ với hoàng tử bé, muốn trở thành bạn của nhau thì hai người phải trải qua điều kì diệu gì?',
    options: [
      'Tặng cho nhau thật nhiều món quà đắt giá và quý hiếm',
      'Quá trình "cảm hóa" - dùng sự kiên nhẫn và tình cảm chân thành để gắn kết, biến nhau thành "duy nhất trên đời"',
      'Cùng nhau đi du lịch khám phá khắp các hành tinh xa xôi',
      'Cùng nhau vượt qua một cuộc chiến đấu mạo hiểm chống lại kẻ xấu'
    ],
    correctAnswer: 1,
    explanation: 'Với chú Cáo, "cảm hóa" nghĩa là tạo nên những mối ràng buộc thân thương. Khi cảm hóa nhau, ta cần đến nhau và trở thành người duy nhất, đặc biệt nhất đối với người kia.',
    hints: [
      'Đây là từ ngữ chìa khóa xuất hiện liên tục trong cuộc trò chuyện giữa Cáo và Hoàng tử bé.',
      'Nó đòi hỏi thời gian, sự kiên nhẫn và lòng chân thành.'
    ],
    keyTakeaway: 'Tình bạn đẹp không tự nhiên có sẵn, mà cần được vun đắp và "cảm hóa" bằng thời gian, sự thấu hiểu và lòng trắc ẩn.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b1-pair',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Phân loại từ phức (Từ ghép & Từ láy)',
    semester: 1,
    lesson: 1,
    lessonTitle: 'Bài 1: Tôi và các bạn',
    sourceText: 'Thực hành tiếng Việt: Từ đơn và từ phức',
    prompt: 'Em hãy ghép từng từ ngữ miêu tả Dế Mèn với kiểu cấu tạo từ tương ứng:',
    matchingPairs: [
      { id: 'p1', left: 'phanh phách', right: 'Từ láy tượng thanh mô phỏng âm thanh đôi cánh' },
      { id: 'p2', left: 'dũng mãnh', right: 'Từ ghép chính phụ (mãnh bổ nghĩa cho dũng)' },
      { id: 'p3', left: 'ngoàm ngoạp', right: 'Từ láy tượng hình gợi tả động tác nhai liên tục' },
      { id: 'p4', left: 'bóng mỡ', right: 'Từ ghép đẳng lập miêu tả độ óng ả mỡ màng' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Từ láy có quan hệ ngữ âm lặp lại (phanh phách, ngoàm ngoạp); từ ghép được tạo bởi các tiếng có nghĩa độc lập kết hợp lại (dũng mãnh, bóng mỡ).',
    hints: [
      'Phát âm từ láy có sự lặp lại âm đầu hoặc vần.',
      'Từ ghép cấu tạo từ các tiếng đều mang nghĩa rõ rệt.'
    ],
    keyTakeaway: 'Từ láy giúp gợi hình gợi cảm mãnh liệt, còn từ ghép định danh chính xác tính chất sự vật.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b1-err',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Phát hiện lỗi chính tả từ ngữ miêu tả',
    semester: 1,
    lesson: 1,
    lessonTitle: 'Bài 1: Tôi và các bạn',
    sourceText: 'Bài học đường đời đầu tiên (Tô Hoài)',
    prompt: 'Bấm chọn từ ngữ viết SAI CHÍNH TẢ trong câu văn sau:',
    errorSpotter: {
      instruction: 'Câu văn: "Dế Mèn tự hào có thân hình vạm vỡ, nhưng tính tình lại rất hung hăn và kiêu ngạo."',
      tokens: [
        { id: 't1', text: 'Dế Mèn', isError: false },
        { id: 't2', text: 'tự hào có thân hình', isError: false },
        { id: 't3', text: 'vạm vỡ,', isError: false },
        { id: 't4', text: 'nhưng tính tình', isError: false },
        { id: 't5', text: 'lại rất', isError: false },
        { id: 't6', text: 'hung hăn', isError: true, correctText: 'hung hăng' },
        { id: 't7', text: 'và kiêu ngạo.', isError: false }
      ],
      explanation: 'Viết sai chính tả: "hung hăn" phải viết đúng là "hung hăng" (có âm "g" ở cuối tiếng thứ hai).'
    },
    correctAnswer: 't6',
    explanation: 'Trong tiếng Việt chuẩn chỉ có từ láy "hung hăng" (chỉ tính khí hung tợn, ngổ ngáo, hay gây gổ), không có từ "hung hăn".',
    hints: [
      'Chú ý từ miêu tả tính khí hung dữ của Dế Mèn.',
      'Tiếng thứ hai thiếu âm g ở phần vần.'
    ],
    keyTakeaway: 'Cần phân biệt các âm cuối ng/n trong từ láy tiếng Việt để tránh viết sai chính tả biểu cảm.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // BÀI 2: GÕ CỬA TRÁI TIM (Tập 1 - Thể loại: Thơ có yếu tố tự sự & miêu tả)
  // =========================================================================
  {
    id: 'kntt-b2-mc1',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'o_cua_bi_mat',
    topic: 'Văn bản "Bức tranh của em gái tôi" (Tạ Duy Anh)',
    semester: 1,
    lesson: 2,
    lessonTitle: 'Bài 2: Gõ cửa trái tim',
    sourceText: 'Bức tranh của em gái tôi (Tạ Duy Anh)',
    prompt: 'Khi đứng trước bức tranh đạt giải Nhất "Anh trai tôi" của em gái Kiều Phương, tâm trạng người anh đã trải qua diễn biến như thế nào?',
    options: [
      'Tức giận, ghen ghét và hằn học bỏ về ngay lập tức',
      'Thoạt tiên là ngỡ ngàng, rồi đến hãnh diện, sau đó là xấu hổ vô cùng',
      'Tự phụ, kiêu ngạo vì nghĩ mình vốn dĩ đẹp đẽ hoàn hảo như trong tranh',
      'Lạnh lùng, dửng dưng không hề có chút rung động nào'
    ],
    correctAnswer: 1,
    explanation: 'Người anh ngỡ ngàng vì không ngờ em gái lại vẽ mình đẹp thế; hãnh diện vì thấy mình hoàn hảo trong mắt em; và xấu hổ vì nhận ra tâm hồn em gái trong sáng nhân hậu đối lập với sự đố kị hẹp hòi của mình.',
    hints: [
      'Ba cung bậc cảm xúc liên tiếp được tác giả miêu tả tỉ mỉ.',
      'Bắt đầu từ sự ngạc nhiên đến tự hào rồi tự nhìn lại chính mình.'
    ],
    keyTakeaway: 'Tấm lòng nhân hậu, bao dung của người khác có sức mạnh cảm hóa kì diệu, giúp ta tự soi xét và chiến thắng thói ích kỉ.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b2-pair',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Biện pháp tu từ trong thơ (Điệp ngữ & Ẩn dụ)',
    semester: 1,
    lesson: 2,
    lessonTitle: 'Bài 2: Gõ cửa trái tim',
    sourceText: 'Thực hành tiếng Việt: Biện pháp tu từ',
    prompt: 'Em hãy ghép từng câu thơ với biện pháp tu từ được sử dụng nổi bật nhất:',
    matchingPairs: [
      { id: 'p1', left: 'Mặt trời chưa nhen nhóm / Màu sắc chưa có gì', right: 'Điệp từ ngữ (điệp từ "chưa")' },
      { id: 'p2', left: 'Mẹ mình đang đợi ở nhà... / Con làm sao có thể rời mẹ?', right: 'Điệp cấu trúc cú pháp' },
      { id: 'p3', left: 'Bàn tay mẹ dịu dàng như làn gió mát lành', right: 'Biện pháp So sánh giàu hình ảnh' },
      { id: 'p4', left: 'Nghe tiếng chim hót thấy cả bầu trời trong xanh', right: 'Ẩn dụ chuyển đổi cảm giác (thính giác -> thị giác)' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Điệp từ nhấn mạnh sự trống vắng nguyên thủy; điệp cấu trúc khẳng định tình mẹ thiêng liêng; so sánh làm cụ thể bàn tay mẹ; ẩn dụ chuyển đổi cảm giác liên kết các giác quan.',
    hints: [
      'Điệp ngữ là sự lặp lại từ hoặc cấu trúc câu.',
      'Ẩn dụ chuyển đổi cảm giác dùng giác quan này để cảm nhận giác quan khác.'
    ],
    keyTakeaway: 'Biện pháp tu từ tạo nhịp điệu tha thiết và làm cho ngôn ngữ thơ giàu chất nhạc và chất họa.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b2-err',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Lỗi chính tả từ ngữ Hán Việt về tình cảm gia đình',
    semester: 1,
    lesson: 2,
    lessonTitle: 'Bài 2: Gõ cửa trái tim',
    sourceText: 'Mây và sóng (R. Ta-go)',
    prompt: 'Bấm chọn từ viết SAI DẤU THANH trong câu văn sau:',
    errorSpotter: {
      instruction: 'Câu văn: "Bài thơ Mây và sóng ca ngợi tình mẩu tử thiêng liêng và sự gắn bó tha thiết của đứa con với mẹ."',
      tokens: [
        { id: 't1', text: 'Bài thơ Mây và sóng', isError: false },
        { id: 't2', text: 'ca ngợi', isError: false },
        { id: 't3', text: 'tình mẩu tử', isError: true, correctText: 'tình mẫu tử' },
        { id: 't4', text: 'thiêng liêng', isError: false },
        { id: 't5', text: 'và sự gắn bó tha thiết', isError: false },
        { id: 't6', text: 'của đứa con với mẹ.', isError: false }
      ],
      explanation: 'Dùng sai dấu thanh từ Hán Việt: "mẩu tử" (dấu hỏi) sai chính tả, phải viết đúng là "mẫu tử" (dấu ngã: mẫu = mẹ, tử = con).'
    },
    correctAnswer: 't3',
    explanation: 'Từ Hán Việt chỉ tình cảm mẹ con là "mẫu tử" (chữ "mẫu" mang dấu ngã). "Mẩu" mang dấu hỏi chỉ phần thừa vụn vặt (như mẩu bánh mì, mẩu gỗ).',
    hints: [
      'Từ Hán Việt mang nghĩa là "mẹ".',
      'Quy tắc dấu ngã trong từ Hán Việt: mẫu giáo, mẫu thân, mẫu tử.'
    ],
    keyTakeaway: 'Phân biệt đúng dấu hỏi/ngã trong các từ Hán Việt quen thuộc chỉ quan hệ ruột thịt: mẫu tử, phụ tử, huynh đệ.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // BÀI 3: YÊU THƯƠNG VÀ CHIA SẺ (Tập 1 - Thể loại: Truyện ngắn)
  // =========================================================================
  {
    id: 'kntt-b3-mc1',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Văn bản "Gió lạnh đầu mùa" (Thạch Lam)',
    semester: 1,
    lesson: 3,
    lessonTitle: 'Bài 3: Yêu thương và chia sẻ',
    sourceText: 'Gió lạnh đầu mùa (Thạch Lam)',
    prompt: 'Cách xử sự của mẹ Sơn khi thấy mẹ con cái Hiên mang áo bông sang trả thể hiện vẻ đẹp phẩm chất gì?',
    options: [
      'Sự nghiêm khắc, tra hỏi và phạt con vì tội mang tài sản gia đình cho người ngoài',
      'Sự khinh thường, xua đuổi những người nghèo khổ ra khỏi nhà',
      'Tấm lòng nhân hậu, tinh tế cho mẹ Hiên vay bốn hào may áo mới, vừa chia sẻ vừa giữ gìn thể diện cho người nghèo',
      'Sự tiếc nuối chiếc áo kỉ vật nên vội vàng đòi lại ngay lập tức'
    ],
    correctAnswer: 2,
    explanation: 'Mẹ Sơn không hề mắng mỏ hai con mà tế nhị cho mẹ Hiên vay tiền may áo ấm cho cái Hiên. Hành động ấy vừa nhân ái, vừa ấm áp tình làng nghĩa xóm, không làm tổn thương lòng tự trọng của mẹ con bác thợ may.',
    hints: [
      'Mẹ Sơn mở tráp lấy ra bốn hào đưa cho mẹ Hiên.',
      'Bà nhẹ nhàng nhắc nhở hai chị em Sơn với nụ cười độ lượng.'
    ],
    keyTakeaway: 'Sự sẻ chia cao quý nhất là sự sẻ chia xuất phát từ lòng tôn trọng, giữ gìn danh dự và phẩm giá cho người nhận.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b3-pair',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Cụm danh từ, Cụm động từ và Cụm tính từ',
    semester: 1,
    lesson: 3,
    lessonTitle: 'Bài 3: Yêu thương và chia sẻ',
    sourceText: 'Thực hành tiếng Việt: Cụm từ',
    prompt: 'Em hãy ghép từng cụm từ trích từ tác phẩm với cấu trúc ngữ pháp tương ứng:',
    matchingPairs: [
      { id: 'p1', left: 'một chiếc áo bông cánh đã cũ', right: 'Cụm danh từ đủ 3 phần (phụ trước - trung tâm - phụ sau)' },
      { id: 'p2', left: 'đang co ro đứng nép bên cột quán', right: 'Cụm động từ chỉ tư thế và hành động' },
      { id: 'p3', left: 'rất ấm áp và dễ chịu', right: 'Cụm tính từ có từ chỉ mức độ "rất"' },
      { id: 'p4', left: 'những que diêm nhỏ bé ấy', right: 'Cụm danh từ có từ chỉ định "ấy" ở phụ sau' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Cụm danh từ có danh từ làm trung tâm; cụm động từ có động từ làm trung tâm; cụm tính từ có tính từ làm trung tâm đi kèm các từ chỉ mức độ.',
    hints: [
      'Tìm từ hạt nhân (trung tâm) của cụm từ.',
      'Cụm danh từ trả lời cho cái gì/con gì; cụm động từ trả lời làm gì; cụm tính từ trả lời thế nào.'
    ],
    keyTakeaway: 'Mở rộng thành phần câu bằng các cụm từ giúp câu văn trở nên cụ thể, giàu hình ảnh và sắc thái biểu cảm.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b3-err',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Trật tự các thành phần trong cụm danh từ',
    semester: 1,
    lesson: 3,
    lessonTitle: 'Bài 3: Yêu thương và chia sẻ',
    sourceText: 'Gió lạnh đầu mùa (Thạch Lam)',
    prompt: 'Bấm chọn phần ngữ cảnh bị sắp xếp LỘN XỘN khiến câu văn tối nghĩa:',
    errorSpotter: {
      instruction: 'Câu văn: "Hai chị em Sơn thương hại nhìn cái Hiên em bé nhỏ chiếc áo rách đứng nép vào chân cột quán."',
      tokens: [
        { id: 't1', text: 'Hai chị em Sơn', isError: false },
        { id: 't2', text: 'thương hại nhìn cái Hiên', isError: false },
        { id: 't3', text: 'em bé nhỏ chiếc áo rách', isError: true, correctText: 'đứa bé mặc chiếc áo rách nhỏ' },
        { id: 't4', text: 'đứng nép', isError: false },
        { id: 't5', text: 'vào chân cột quán.', isError: false }
      ],
      explanation: 'Sắp xếp lộn xộn các thành phần phụ ngữ: "em bé nhỏ chiếc áo rách" phải viết đúng là "đứa bé mặc chiếc áo rách tơi tả" để rõ nghĩa chủ thể và trang phục.'
    },
    correctAnswer: 't3',
    explanation: 'Cụm từ bị đảo lộn thứ tự từ miêu tả: "chiếc áo rách" bị đặt chen vào giữa "em bé nhỏ" làm mất đi cấu trúc bổ nghĩa rõ ràng của cụm danh từ.',
    hints: [
      'Cụm từ chỉ đối tượng em bé bị ghép lộn xộn với đồ vật.',
      'Cần một động từ liên kết như "mặc" hoặc tách rõ danh từ trung tâm.'
    ],
    keyTakeaway: 'Cần tuân thủ trật tự phụ trước - trung tâm - phụ sau trong cụm từ tiếng Việt để câu văn trong sáng, dễ hiểu.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // BÀI 4: QUÊ HƯƠNG YÊU DẤU (Tập 1 - Thể loại: Thơ lục bát)
  // =========================================================================
  {
    id: 'kntt-b4-mc1',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Văn bản "Chuyện cổ nước mình" (Lâm Thị Mỹ Dạ)',
    semester: 1,
    lesson: 4,
    lessonTitle: 'Bài 4: Quê hương yêu dấu',
    sourceText: 'Chuyện cổ nước mình (Lâm Thị Mỹ Dạ)',
    prompt: 'Hai câu thơ: "Đẽo cày theo ý người ta / Sẽ thành khúc gỗ chẳng ra việc gì" gợi nhớ đến truyện ngụ ngôn nào và gửi gắm bài học gì?',
    options: [
      'Thầy bói xem voi - khuyên con người không nên nhìn nhận sự việc phiến diện',
      'Đẽo cày giữa đường - khuyên con người cần có lập trường vững vàng, không nên ba phải dao động',
      'Ếch ngồi đáy giếng - khuyên con người nên khiêm tốn mở rộng tầm nhìn',
      'Chân, Tay, Tai, Mắt, Miệng - khuyên con người sống đoàn kết, tương trợ lẫn nhau'
    ],
    correctAnswer: 1,
    explanation: 'Hai câu thơ lấy cảm hứng từ truyện ngụ ngôn "Đẽo cày giữa đường", nhắc nhở bài học thấm thía: sống cần có chính kiến, kiên định với mục tiêu đúng đắn của mình thay vì nghe theo lời bàn tán vu vơ.',
    hints: [
      'Nhân vật bác thợ mộc nghe lời người qua đường mà gọt thanh gỗ thành vô dụng.',
      'Thành ngữ quen thuộc xuất phát từ câu chuyện này là "Đẽo cày giữa đường".'
    ],
    keyTakeaway: 'Chuyện cổ dân gian không chỉ bồi đắp tâm hồn mà còn truyền dạy những bài học nhân sinh sâu sắc cho muôn đời.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b4-pair',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Từ đồng âm và Từ đa nghĩa',
    semester: 1,
    lesson: 4,
    lessonTitle: 'Bài 4: Quê hương yêu dấu',
    sourceText: 'Thực hành tiếng Việt: Từ đồng âm và từ đa nghĩa',
    prompt: 'Em hãy ghép các cặp từ in đậm với hiện tượng ngôn ngữ tương ứng:',
    matchingPairs: [
      { id: 'p1', left: 'đứng ở "chân" núi / bị đau "chân"', right: 'Từ đa nghĩa (nghĩa chuyển ẩn dụ phần dưới cùng)' },
      { id: 'p2', left: 'mua một cân "đường" / đi lạc "đường"', right: 'Từ đồng âm (phát âm giống nhau nhưng nghĩa khác biệt hoàn toàn)' },
      { id: 'p3', left: 'lá cờ "phấp phới" / hoa sen "rực rỡ"', right: 'Từ láy tượng hình giàu giá trị biểu cảm' },
      { id: 'p4', left: 'áo chàm đưa buổi phân li', right: 'Hoán dụ (áo chàm lấy dấu hiệu chỉ đồng bào Việt Bắc)' }
    ],
    correctAnswer: 'matched_all',
    explanation: '"Chân núi" chuyển nghĩa từ "chân người" (có nét tương đồng); "đường ăn" và "con đường" đồng âm ngẫu nhiên; "áo chàm" là hoán dụ lấy trang phục chỉ người mặc.',
    hints: [
      'Từ đa nghĩa có mối liên hệ nghĩa gốc - nghĩa chuyển.',
      'Từ đồng âm không có bất kì liên hệ ngữ nghĩa nào với nhau.'
    ],
    keyTakeaway: 'Phân biệt từ đa nghĩa và từ đồng âm giúp làm giàu vốn từ vựng và diễn đạt chuẩn xác, sắc sảo.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b4-err',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Luật gieo vần trong thơ lục bát',
    semester: 1,
    lesson: 4,
    lessonTitle: 'Bài 4: Quê hương yêu dấu',
    sourceText: 'Tập làm một bài thơ lục bát',
    prompt: 'Bấm chọn cụm từ bị LỖI HIỆP VẦN trong cặp câu lục bát sau:',
    errorSpotter: {
      instruction: 'Cặp thơ lục bát: "Quê hương là chùm khế ngọt / Cho con trèo hái mỗi chiều trên đồi"',
      tokens: [
        { id: 't1', text: 'Quê hương', isError: false },
        { id: 't2', text: 'là chùm', isError: false },
        { id: 't3', text: 'khế ngọt', isError: false },
        { id: 't4', text: 'Cho con', isError: false },
        { id: 't5', text: 'trèo hái', isError: false },
        { id: 't6', text: 'mỗi chiều trên đồi', isError: true, correctText: 'mỗi ngày tới trường' }
      ],
      explanation: 'Lỗi gieo vần lục bát: Tiếng thứ 6 câu lục là "ngọt" (vần -ot, thanh trắc) bị lạc luật và không thể bắt vần với tiếng "đồi" (vần -ôi). Theo luật lục bát, tiếng thứ 6 phải là vần bằng và hiệp vần với tiếng 6 câu bát.'
    },
    correctAnswer: 't6',
    explanation: 'Tiếng thứ 6 của câu lục và tiếng thứ 6 của câu bát bắt buộc phải cùng hiệp một vần bằng (B). Ở đây "ngọt" và "đồi" hoàn toàn lạc vần với nhau.',
    hints: [
      'Quy tắc vần lục bát: Tiếng thứ 6 câu lục vần với tiếng thứ 6 câu bát.',
      'Hai tiếng gieo vần phải cùng khuôn vần và mang thanh bằng.'
    ],
    keyTakeaway: 'Thơ lục bát tuân thủ chặt chẽ luật gieo vần: tiếng 6 lục hiệp vần tiếng 6 bát, tiếng 8 bát hiệp vần tiếng 6 lục câu tiếp theo.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // BÀI 5: NHỮNG NẺO ĐƯỜNG XỨ SỞ (Tập 1 - Thể loại: Kí / Du kí)
  // =========================================================================
  {
    id: 'kntt-b5-mc1',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'vong_quay_may_man',
    topic: 'Văn bản "Cô Tô" (Nguyễn Tuân)',
    semester: 1,
    lesson: 5,
    lessonTitle: 'Bài 5: Những nẻo đường xứ sở',
    sourceText: 'Cô Tô (Nguyễn Tuân)',
    prompt: 'Trong bài kí "Cô Tô", cảnh mặt trời mọc trên biển được nhà văn Nguyễn Tuân miêu tả qua hình ảnh so sánh độc đáo nào?',
    options: [
      'Như một quả cầu lửa đỏ rực thiêu đốt biển khơi bao la',
      'Như chiếc đèn lồng khổng lồ đang chầm chậm trôi lơ lửng trên mây',
      'Tròn trĩnh phúc hậu như lòng đỏ một quả trứng thiên nhiên đầy đặn, đặt trên một mâm bạc khổng lồ đường kính rộng bằng cả cái chân trời màu ngọc trai',
      'Như một chiếc đĩa vàng lấp lánh giữa ngàn con sóng trắng xóa nhấp nhô'
    ],
    correctAnswer: 2,
    explanation: 'Nguyễn Tuân đã sáng tạo một hình ảnh so sánh tuyệt mĩ, kì vĩ: mặt trời tròn trĩnh phúc hậu như lòng đỏ trứng đặt trên mâm bạc ngọc trai của chân trời biển đảo Cô Tô.',
    hints: [
      'Hình ảnh so sánh kết hợp giữa quả trứng và chiếc mâm ngọc trai khổng lồ.',
      'Thể hiện phong cách tài hoa, uyên bác bậc thầy của Nguyễn Tuân.'
    ],
    keyTakeaway: 'Thể loại kí của Nguyễn Tuân luôn quan sát cảnh sắc thiên nhiên ở phương diện thẩm mĩ rực rỡ và ngôn từ tinh tế.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b5-pair',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Mở rộng thành phần vị ngữ trong câu',
    semester: 1,
    lesson: 5,
    lessonTitle: 'Bài 5: Những nẻo đường xứ sở',
    sourceText: 'Thực hành tiếng Việt: Mở rộng vị ngữ bằng cụm từ',
    prompt: 'Em hãy ghép câu văn gốc với hình thức mở rộng thành phần tương ứng:',
    matchingPairs: [
      { id: 'p1', left: 'Mặt trời mọc -> Mặt trời nhú lên dần dần từ chân trời ngọc trai', right: 'Mở rộng vị ngữ bằng Cụm động từ chỉ thời gian và không gian' },
      { id: 'p2', left: 'Sóng vỗ -> Sóng biển rì rào vỗ nhẹ vào bờ cát trắng phau', right: 'Mở rộng vị ngữ bằng Cụm động từ có từ tượng thanh và địa điểm' },
      { id: 'p3', left: 'Nước biển biếc -> Nước biển Cô Tô xanh ngắt một màu lam biếc đậm đà', right: 'Mở rộng vị ngữ bằng Cụm tính từ miêu tả sắc thái màu sắc' },
      { id: 'p4', left: 'Dân chài gánh nước -> Những người dân chài khỏe khoắn đang hối hả gánh nước ngọt', right: 'Mở rộng cả Chủ ngữ và Vị ngữ bằng các cụm từ chi tiết' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Mở rộng câu bằng cách thêm phụ ngữ trước hoặc phụ ngữ sau vào trung tâm danh từ, động từ, tính từ giúp câu văn giàu chi tiết và cảm xúc.',
    hints: [
      'Xem xét thành phần được bổ sung thêm vào vị ngữ.',
      'Cụm động từ thêm cách thức/nơi chốn; cụm tính từ thêm mức độ/sắc thái.'
    ],
    keyTakeaway: 'Mở rộng vị ngữ giúp bài văn miêu tả cảnh sinh hoạt và phong cảnh thiên nhiên trở nên sinh động và lôi cuốn.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b5-err',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Lạm dụng dấu ngoặc kép trong văn cảnh',
    semester: 1,
    lesson: 5,
    lessonTitle: 'Bài 5: Những nẻo đường xứ sở',
    sourceText: 'Thực hành tiếng Việt: Dấu ngoặc kép',
    prompt: 'Bấm chọn từ ngữ bị ĐẶT DẤU NGOẶC KÉP SAI QUY CÁCH trong câu văn sau:',
    errorSpotter: {
      instruction: 'Câu văn: "Sau cơn bão biển, đảo Cô Tô lại hiện lên trong trẻo, \'sáng sủa\' và ngập tràn sức sống thiên nhiên."',
      tokens: [
        { id: 't1', text: 'Sau cơn bão biển,', isError: false },
        { id: 't2', text: 'đảo Cô Tô', isError: false },
        { id: 't3', text: 'lại hiện lên', isError: false },
        { id: 't4', text: 'trong trẻo,', isError: false },
        { id: 't5', text: "'sáng sủa'", isError: true, correctText: 'sáng sủa' },
        { id: 't6', text: 'và ngập tràn sức sống thiên nhiên.', isError: false }
      ],
      explanation: 'Lạm dụng dấu ngoặc kép: Từ "sáng sủa" là tính từ miêu tả thông thường cùng nghĩa với "trong trẻo", không phải từ dùng theo nghĩa mỉa mai, không phải thuật ngữ đặc biệt hay lời dẫn trực tiếp, nên không được đặt trong dấu ngoặc kép.'
    },
    correctAnswer: 't5',
    explanation: 'Dấu ngoặc kép chỉ dùng cho: lời dẫn trực tiếp, tên tác phẩm, hoặc từ ngữ mang hàm ý đặc biệt/mỉa mai. Dùng ngoặc kép cho một tính từ miêu tả tích cực thông thường là sai quy tắc.',
    hints: [
      'Từ này không mang nghĩa mỉa mai hay nghĩa ẩn dụ đặc biệt nào.',
      'Nó chỉ là một tính từ miêu tả bình thường trong câu trần thuật.'
    ],
    keyTakeaway: 'Không tùy tiện đặt dấu ngoặc kép vào từ ngữ thông thường để tránh làm sai lệch ngữ điệu và dụng ý biểu đạt.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // BÀI 6: CHUYỆN KỂ VỀ NHỮNG NGƯỜI ANH HÙNG (Tập 2 - Thể loại: Truyền thuyết)
  // =========================================================================
  {
    id: 'kntt-b6-mc1',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Văn bản "Sơn Tinh, Thủy Tinh" (Truyền thuyết)',
    semester: 2,
    lesson: 6,
    lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng',
    sourceText: 'Sơn Tinh, Thủy Tinh (Truyền thuyết)',
    prompt: 'Hình tượng Sơn Tinh dời từng dãy núi, dựng từng lũy đất ngăn chặn dòng nước lũ dâng cao của Thủy Tinh mang ý nghĩa biểu tượng gì?',
    options: [
      'Phản ánh cuộc tranh giành đất đai và nguồn nước giữa các bộ tộc láng giềng',
      'Phản ánh sức mạnh quật cường, ước mơ chế ngự thiên tai lũ lụt và công cuộc đắp đê ngăn lũ bền bỉ của nhân dân ta thời cổ đại',
      'Giải thích nguồn gốc xuất hiện của các loài động thực vật quý hiếm trên rừng cao',
      'Răn đe phong tục thách cưới lễ vật quá nặng nề trong hôn nhân xưa'
    ],
    correctAnswer: 1,
    explanation: 'Sơn Tinh là biểu tượng của tinh thần quật khởi, sức mạnh phi thường và ý chí kiên cường của nhân dân ta trong công cuộc chế ngự thiên tai lũ lụt vùng đồng bằng châu thổ sông Hồng.',
    hints: [
      'Nước dâng cao bao nhiêu, núi cao lên bấy nhiêu.',
      'Liên quan đến cuộc chiến chống bão lũ hằng năm của ông cha ta.'
    ],
    keyTakeaway: 'Truyền thuyết giải thích nguồn gốc hiện tượng thiên nhiên và ngợi ca ý chí chế ngự thiên nhiên của người Việt cổ.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b6-pair',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Phân loại Trạng ngữ trong câu',
    semester: 2,
    lesson: 6,
    lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng',
    sourceText: 'Thực hành tiếng Việt: Trạng ngữ',
    prompt: 'Em hãy ghép từng trạng ngữ in đậm với ý nghĩa ngữ pháp bổ sung tương ứng:',
    matchingPairs: [
      { id: 'p1', left: 'Năm lên ba tuổi, Gióng bỗng cất tiếng nói.', right: 'Trạng ngữ chỉ thời gian' },
      { id: 'p2', left: 'Bằng chiếc gậy sắt và bụi tre ngà, người anh hùng đánh tan giặc.', right: 'Trạng ngữ chỉ phương tiện' },
      { id: 'p3', left: 'Để bảo vệ bờ cõi giang sơn, nhân dân ta đồng lòng đứng dậy.', right: 'Trạng ngữ chỉ mục đích' },
      { id: 'p4', left: 'Dưới chân núi Sóc, ngựa sắt hí vang rồi bay thẳng về trời.', right: 'Trạng ngữ chỉ nơi chốn' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Trạng ngữ bổ sung các thông tin hoàn cảnh cho câu: thời gian (khi nào?), phương tiện (bằng gì?), mục đích (để làm gì?), nơi chốn (ở đâu?).',
    hints: [
      'Đặt câu hỏi tương ứng để xác định ý nghĩa trạng ngữ.',
      'Dấu hiệu từ "bằng" chỉ phương tiện, từ "để" chỉ mục đích.'
    ],
    keyTakeaway: 'Trạng ngữ giúp liên kết các câu văn và làm cho thông tin về bối cảnh sự việc trở nên sáng rõ, mạch lạc.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b6-err',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Câu thiếu chủ ngữ do lẫn lộn Trạng ngữ với Chủ ngữ',
    semester: 2,
    lesson: 6,
    lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng',
    sourceText: 'Thực hành tiếng Việt: Sửa lỗi câu',
    prompt: 'Bấm chọn từ ngữ làm cho câu văn bị LỖI THIẾU CHỦ NGỮ:',
    errorSpotter: {
      instruction: 'Câu văn: "Qua truyền thuyết Thánh Gióng đã thể hiện tinh thần yêu nước bất khuất của dân tộc ta."',
      tokens: [
        { id: 't1', text: 'Qua truyền thuyết', isError: true, correctText: 'Truyền thuyết' },
        { id: 't2', text: 'Thánh Gióng', isError: false },
        { id: 't3', text: 'đã thể hiện', isError: false },
        { id: 't4', text: 'tinh thần', isError: false },
        { id: 't5', text: 'yêu nước bất khuất', isError: false },
        { id: 't6', text: 'của dân tộc ta.', isError: false }
      ],
      explanation: 'Lỗi câu thiếu chủ ngữ: Giới từ "Qua" đã biến cụm danh từ "truyền thuyết Thánh Gióng" thành trạng ngữ, khiến câu không có chủ ngữ (ai thể hiện?). Cần bỏ từ "Qua" để câu có chủ ngữ rõ ràng: "Truyền thuyết Thánh Gióng đã thể hiện...".'
    },
    correctAnswer: 't1',
    explanation: 'Lỗi nhầm lẫn trạng ngữ với chủ ngữ rất phổ biến khi học sinh mở đầu câu bằng "Qua...", "Bằng...", "Với..." khiến câu biến thành một trạng ngữ kéo dài mà không có chủ ngữ ngữ pháp.',
    hints: [
      'Tìm giới từ đứng đầu câu làm biến đổi thành phần chủ ngữ.',
      'Bỏ từ này đi thì câu sẽ có chủ ngữ đứng trước vị ngữ "đã thể hiện".'
    ],
    keyTakeaway: 'Khi viết câu cần bảo đảm có đủ nòng cốt Chủ ngữ - Vị ngữ; cẩn thận không để giới từ biến chủ ngữ thành trạng ngữ.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // BÀI 7: THẾ GIỚI CỔ TÍCH (Tập 2 - Thể loại: Truyện cổ tích)
  // =========================================================================
  {
    id: 'kntt-b7-mc1',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'o_cua_bi_mat',
    topic: 'Văn bản "Thạch Sanh" (Truyện cổ tích thần kì)',
    semester: 2,
    lesson: 7,
    lessonTitle: 'Bài 7: Thế giới cổ tích',
    sourceText: 'Thạch Sanh (Truyện cổ tích)',
    prompt: 'Trong truyện "Thạch Sanh", chi tiết "Tiếng đàn thần" dưới ngục tối và "Niêu cơm thần kì" đãi quân mười tám nước chư hầu mang ý nghĩa biểu tượng gì?',
    options: [
      'Thể hiện tài năng ca hát và sự giàu sang phú quý của nhân vật dũng sĩ',
      'Tiếng đàn là tiếng nói của công lý bênh vực người lương thiện; Niêu cơm thần là khát vọng hòa bình, nhân đạo không đổ máu của nhân dân ta',
      'Phép màu ma thuật dùng để đe dọa các nước láng giềng phải thần phục',
      'Món quà đổi chác để Thạch Sanh cưới được công chúa và lên ngôi vua'
    ],
    correctAnswer: 1,
    explanation: 'Tiếng đàn thần vạch trần tội ác Lý Thông, đòi lại công lý cho Thạch Sanh; Niêu cơm thần ăn mãi không hết thể hiện lòng nhân đạo, tinh thần chuộng hòa bình, dẹp tan chiến tranh bằng lòng nhân ái.',
    hints: [
      'Tiếng đàn giải oan và vạch mặt kẻ gian xảo.',
      'Niêu cơm thần đánh lui giặc mà không cần dùng đến gươm giáo đổ máu.'
    ],
    keyTakeaway: 'Vật thần kì trong cổ tích luôn kết tinh niềm tin công lý, lòng nhân hậu và ước mơ hòa bình của nhân dân lao động.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b7-pair',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Thành ngữ dân gian gắn liền với truyện cổ tích',
    semester: 2,
    lesson: 7,
    lessonTitle: 'Bài 7: Thế giới cổ tích',
    sourceText: 'Thực hành tiếng Việt: Thành ngữ',
    prompt: 'Em hãy ghép từng thành ngữ với câu chuyện cổ tích bắt nguồn hoặc bài học đạo lí gắn liền:',
    matchingPairs: [
      { id: 'p1', left: 'Ăn khế trả vàng', right: 'Truyện Cây khế (Bài học về lòng biết ơn và sự trả giá của thói tham lam)' },
      { id: 'p2', left: 'Gieo gió gặt bão', right: 'Kết cục bị sét đánh hóa bọ hung của mẹ con Lý Thông (Thạch Sanh)' },
      { id: 'p3', left: 'Ở hiền gặp lành', right: 'Triết lí sống xuyên suốt truyện cổ tích Thạch Sanh và Cây khế' },
      { id: 'p4', left: 'Uống nước nhớ nguồn', right: 'Truyền thống tri ân người đi trước và trân trọng nguồn cội' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Thành ngữ là kho tàng kinh nghiệm dân gian đúc kết triết lí sống nhân ái, công bằng từ các câu chuyện cổ tích và đời sống.',
    hints: [
      'Thành ngữ "Ăn khế trả vàng" gắn với câu hát của chim thần.',
      '"Gieo gió gặt bão" nói về kẻ làm điều ác ắt phải gánh chịu hậu quả bi thảm.'
    ],
    keyTakeaway: 'Vận dụng thành ngữ giúp lời ăn tiếng nói và câu văn trở nên hàm súc, giàu hình ảnh và tính giáo dục sâu sắc.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b7-err',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Sử dụng sai thành ngữ dân gian',
    semester: 2,
    lesson: 7,
    lessonTitle: 'Bài 7: Thế giới cổ tích',
    sourceText: 'Thực hành tiếng Việt: Thành ngữ',
    prompt: 'Bấm chọn cụm từ viết SAI THÀNH NGỮ trong câu văn sau:',
    errorSpotter: {
      instruction: 'Câu văn: "Kẻ độc ác xảo quyệt như Lý Thông sớm muộn cũng sẽ bị trừng phạt, đúng là ác giả ác mộng."',
      tokens: [
        { id: 't1', text: 'Kẻ độc ác xảo quyệt', isError: false },
        { id: 't2', text: 'như Lý Thông', isError: false },
        { id: 't3', text: 'sớm muộn cũng sẽ', isError: false },
        { id: 't4', text: 'bị trừng phạt,', isError: false },
        { id: 't5', text: 'đúng là', isError: false },
        { id: 't6', text: 'ác giả ác mộng.', isError: true, correctText: 'ác giả ác báo' }
      ],
      explanation: 'Dùng sai thành ngữ: Trong tiếng Việt chỉ có thành ngữ "ác giả ác báo" (làm việc ác thì gặp quả báo xấu), không có thành ngữ "ác giả ác mộng".'
    },
    correctAnswer: 't6',
    explanation: '"Ác giả ác báo" là thành ngữ gốc Hán Việt quen thuộc (ác: xấu xa; giả: người làm; báo: đền đáp, quả báo). Dùng nhầm thành "ác mộng" làm sai lệch hoàn toàn ý nghĩa răn dạy của câu.',
    hints: [
      'Tiếng cuối cùng của thành ngữ bị thay thế bằng từ chỉ giấc mơ kinh hãi.',
      'Từ đúng mang ý nghĩa là "quả báo".'
    ],
    keyTakeaway: 'Cần ghi nhớ và sử dụng chính xác các thành ngữ để bảo tồn tính chuẩn xác và giá trị biểu đạt của tiếng Việt.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // BÀI 8: KHÁC BIỆT VÀ GẦN GŨI (Tập 2 - Thể loại: Văn bản nghị luận)
  // =========================================================================
  {
    id: 'kntt-b8-mc1',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Văn bản "Xem người ta kìa!" (Lạc Thanh)',
    semester: 2,
    lesson: 8,
    lessonTitle: 'Bài 8: Khác biệt và gần gũi',
    sourceText: 'Xem người ta kìa! (Lạc Thanh)',
    prompt: 'Theo tác giả Lạc Thanh trong văn bản "Xem người ta kìa!", tại sao mỗi người vừa cần học hỏi người khác nhưng cũng cần gìn giữ nét riêng của chính mình?',
    options: [
      'Vì mỗi cá nhân đều là một mảnh ghép độc đáo làm nên sự phong phú của thế giới; nếu ai cũng giống hệt nhau thì cuộc đời sẽ vô cùng tẻ nhạt',
      'Vì học hỏi người khác sẽ đánh mất đi lòng tự trọng và tôn nghiêm của bản thân',
      'Vì người khác lúc nào cũng hoàn hảo hơn mình về mọi mặt',
      'Vì nét riêng giúp bản thân tự phụ và khinh thường những người xung quanh'
    ],
    correctAnswer: 0,
    explanation: 'Văn bản khẳng định: mẹ muốn con "bằng người" để không thua kém, nhưng người mẹ cũng thấu hiểu mỗi người sinh ra là một cá tính duy nhất. Tôn trọng nét riêng là tôn trọng sự phong phú muôn màu của xã hội.',
    hints: [
      'Thế giới giống như một bức tranh đa sắc màu rực rỡ.',
      'Vừa hòa nhập học hỏi điều tốt, vừa giữ vững cá tính tích cực của mình.'
    ],
    keyTakeaway: 'Hòa nhập nhưng không hòa tan: học hỏi ưu điểm của người khác đồng thời tự tin phát huy giá trị độc đáo của bản thân.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b8-pair',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Yếu tố Hán Việt trong văn bản nghị luận',
    semester: 2,
    lesson: 8,
    lessonTitle: 'Bài 8: Khác biệt và gần gũi',
    sourceText: 'Thực hành tiếng Việt: Yếu tố Hán Việt',
    prompt: 'Em hãy ghép các từ Hán Việt sau với cách giải nghĩa tương ứng:',
    matchingPairs: [
      { id: 'p1', left: 'Độc lập', right: 'Tự mình đứng vững, không dựa dẫm hay phụ thuộc vào người khác' },
      { id: 'p2', left: 'Bản sắc', right: 'Nét đặc trưng, phong cách riêng biệt vốn có tạo nên giá trị đối tượng' },
      { id: 'p3', left: 'Nhân cách', right: 'Toàn bộ phẩm chất đạo đức, tư cách và tâm hồn của con người' },
      { id: 'p4', left: 'Đồng cảm', right: 'Cùng chung một cảm xúc, biết thấu hiểu và sẻ chia với tha nhân' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Hiểu đúng yếu tố Hán Việt (độc = một mình; bản = gốc rễ; nhân = người; cảm = rung động) giúp phân tích và viết văn nghị luận sâu sắc, chuẩn xác.',
    hints: [
      '"Độc lập": độc là một mình, lập là đứng.',
      '"Bản sắc": bản là gốc, sắc là diện mạo vẻ đẹp riêng.'
    ],
    keyTakeaway: 'Hiểu nghĩa các từ Hán Việt là chìa khóa để làm giàu vốn từ ngữ tư duy trừu tượng trong văn nghị luận.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b8-err',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Lạm dụng từ mượn tiếng nước ngoài không phù hợp',
    semester: 2,
    lesson: 8,
    lessonTitle: 'Bài 8: Khác biệt và gần gũi',
    sourceText: 'Thực hành tiếng Việt: Từ mượn',
    prompt: 'Bấm chọn từ ngữ LẠM DỤNG TIẾNG NƯỚC NGOÀI trong bài văn nghị luận sau:',
    errorSpotter: {
      instruction: 'Câu văn: "Trong giờ sinh hoạt lớp, bạn lớp trưởng đã đưa ra một ý kiến rất pro làm cả tập thể đều nể phục."',
      tokens: [
        { id: 't1', text: 'Trong giờ sinh hoạt lớp,', isError: false },
        { id: 't2', text: 'bạn lớp trưởng', isError: false },
        { id: 't3', text: 'đã đưa ra một ý kiến', isError: false },
        { id: 't4', text: 'rất pro', isError: true, correctText: 'rất sắc sảo và chín chắn' },
        { id: 't5', text: 'làm cả tập thể', isError: false },
        { id: 't6', text: 'đều nể phục.', isError: false }
      ],
      explanation: 'Lạm dụng từ tiếng Anh không cần thiết: Từ "pro" (professional - chuyên nghiệp) là khẩu ngữ tiếng Anh, trong bài văn nghị luận hoặc ngữ cảnh lớp học chính thức cần thay bằng từ thuần Việt như "sắc sảo", "thấu đáo" hoặc "thuyết phục".'
    },
    correctAnswer: 't4',
    explanation: 'Từ mượn chỉ nên dùng khi tiếng Việt không có từ tương đương để biểu đạt. Lạm dụng tiếng lóng nước ngoài làm mất đi sự trong sáng và trang trọng của tiếng Việt.',
    hints: [
      'Tìm từ tiếng nước ngoài được dùng như tiếng lóng giới trẻ.',
      'Từ này làm giảm tính chuẩn mực của bài nghị luận.'
    ],
    keyTakeaway: 'Cần giữ gìn sự trong sáng của tiếng Việt, tránh lạm dụng từ mượn ngoại lai khi tiếng Việt đã có từ ngữ biểu đạt tương đương.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // BÀI 9: TRÁI ĐẤT – NGÔI NHÀ CHUNG (Tập 2 - Thể loại: Văn bản thông tin)
  // =========================================================================
  {
    id: 'kntt-b9-mc1',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Văn bản "Trái Đất – cái nôi của sự sống"',
    semester: 2,
    lesson: 9,
    lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung',
    sourceText: 'Trái Đất – cái nôi của sự sống',
    prompt: 'Theo văn bản thông tin "Trái Đất – cái nôi của sự sống", yếu tố tự nhiên kì diệu nào là điều kiện tiên quyết nuôi dưỡng muôn loài trên hành tinh xanh?',
    options: [
      'Những ngọn núi lửa khổng lồ và nguồn khoáng sản vô tận dưới lòng đất sâu',
      'Nguồn nước dồi dào chiếm 3/4 diện tích bề mặt và tầng khí quyển thích hợp che chở cho sự sống',
      'Sự xây dựng các thành phố hiện đại và khai thác tài nguyên của con người',
      'Chu kì quay quanh Mặt Trời với tốc độ nhanh nhất trong Thái Dương hệ'
    ],
    correctAnswer: 1,
    explanation: 'Nước là vị thần hộ mệnh của sự sống; nhờ có nước bao phủ 3/4 bề mặt và bầu khí quyển che chở bức xạ vũ trụ, Trái Đất mới trở thành cái nôi sản sinh và duy trì muôn vàn sinh vật kì diệu.',
    hints: [
      'Bao phủ phần lớn bề mặt Trái Đất tạo nên màu xanh lam đặc trưng nhìn từ vũ trụ.',
      'Chất lỏng trong suốt không màu, không mùi nuôi dưỡng mọi tế bào.'
    ],
    keyTakeaway: 'Nước và khí quyển là nguồn sống vô giá; bảo vệ môi trường nước là bảo vệ sự sống còn của toàn nhân loại.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b9-pair',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Công dụng của Dấu chấm lửng (...)',
    semester: 2,
    lesson: 9,
    lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung',
    sourceText: 'Thực hành tiếng Việt: Dấu chấm lửng',
    prompt: 'Em hãy ghép từng câu ví dụ với công dụng tương ứng của dấu chấm lửng (...):',
    matchingPairs: [
      { id: 'p1', left: 'Rừng nhiệt đới có nhiều loài: hổ, báo, vượn, hươu...', right: 'Báo hiệu bộ phận liệt kê chưa kết thúc' },
      { id: 'p2', left: 'Em... em xin lỗi cô vì hôm nay đã đi học muộn ạ!', right: 'Biểu thị lời nói ngập ngừng, ngắt quãng do bối rối, xúc động' },
      { id: 'p3', left: 'Tiếng còi tàu vang lên: Tu... tu... tu... xa dần!', right: 'Biểu thị âm thanh kéo dài ngân vang' },
      { id: 'p4', left: 'Mọi người đều đồng lòng, chỉ riêng... thì lặng thinh.', right: 'Tạo khoảng lặng bất ngờ, gây sự chú ý hồi hộp' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Dấu chấm lửng (ba chấm) có nhiều công dụng biểu đạt tinh tế: tiếp nối liệt kê, thể hiện lời ngập ngừng, mô phỏng âm thanh ngân dài, hoặc tạo khoảng lặng cảm xúc.',
    hints: [
      'Xem xét ngữ cảnh câu chứa dấu ba chấm.',
      'Dấu chấm lửng sau danh sách liệt kê báo hiệu còn nhiều sự vật chưa kể hết.'
    ],
    keyTakeaway: 'Sử dụng linh hoạt dấu chấm lửng giúp câu văn biểu cảm, sinh động và gợi nhiều liên tưởng sâu xa.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b9-err',
    zone: 'xuong_viet_sang_tao',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Thể thức và tính khách quan của Biên bản cuộc họp',
    semester: 2,
    lesson: 9,
    lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung',
    sourceText: 'Viết biên bản một cuộc họp, cuộc thảo luận',
    prompt: 'Bấm chọn phần nội dung VI PHẠM TÍNH KHÁCH QUAN trong trích đoạn biên bản sau:',
    errorSpotter: {
      instruction: 'Trích đoạn biên bản: "Thời gian kết thúc: 11 giờ. Toàn thể cuộc họp đều vô cùng xúc động và nghẹn ngào vì bài phát biểu của bạn lớp trưởng quá đỗi tuyệt vời."',
      tokens: [
        { id: 't1', text: 'Thời gian kết thúc:', isError: false },
        { id: 't2', text: '11 giờ.', isError: false },
        { id: 't3', text: 'Toàn thể cuộc họp đều vô cùng xúc động', isError: true, correctText: 'Cuộc họp bế mạc vào lúc 11 giờ cùng ngày.' },
        { id: 't4', text: 'và nghẹn ngào vì bài phát biểu', isError: false },
        { id: 't5', text: 'của bạn lớp trưởng quá đỗi tuyệt vời.', isError: false }
      ],
      explanation: 'Vi phạm tính khách quan của văn bản hành chính: Biên bản là văn bản ghi chép sự việc có tính pháp lí, yêu cầu ngôn ngữ chính xác, trung thực, khách quan; tuyệt đối không đưa các từ ngữ biểu cảm chủ quan trữ tình như "vô cùng xúc động", "nghẹn ngào", "quá đỗi tuyệt vời".'
    },
    correctAnswer: 't3',
    explanation: 'Biên bản là văn bản hành chính - công vụ nhằm lưu giữ diễn biến sự việc. Người lập biên bản không được đưa cảm xúc cá nhân hay lời khen/chê chủ quan vào biên bản.',
    hints: [
      'Biên bản hành chính nghiêm cấm đưa cảm xúc sướt mướt chủ quan.',
      'Tìm cụm từ biểu lộ tình cảm cá nhân quá đà.'
    ],
    keyTakeaway: 'Viết biên bản cần tuân thủ nghiêm ngặt tính chân thực, khách quan, súc tích và đúng quy cách hành chính chuẩn mực.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // BÀI 10: CUỐN SÁCH TÔI YÊU (Tập 2 - Kĩ năng: Đọc mở rộng & Tổng kết)
  // =========================================================================
  {
    id: 'kntt-b10-mc1',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Kĩ năng đọc mở rộng & Nhật kí đọc sách',
    semester: 2,
    lesson: 10,
    lessonTitle: 'Bài 10: Cuốn sách tôi yêu',
    sourceText: 'Đọc mở rộng & Nhật kí đọc sách',
    prompt: 'Khi đọc một cuốn sách văn học, việc ghi chép "Nhật kí đọc sách" (Phiếu đọc sách) mang lại lợi ích quan trọng nhất nào?',
    options: [
      'Để sao chép lại nguyên văn toàn bộ tác phẩm nộp cho thầy cô chấm điểm',
      'Giúp ghi lại các chi tiết tâm đắc, suy ngẫm cá nhân và bài học rút ra, từ đó rèn luyện kĩ năng tự học và phát triển vốn văn hóa của bản thân',
      'Để thống kê xem cuốn sách có chính xác bao nhiêu trang và bao nhiêu từ ngữ',
      'Để tóm tắt thật ngắn nhằm không cần phải mở lại cuốn sách đọc lần thứ hai'
    ],
    correctAnswer: 1,
    explanation: 'Nhật kí đọc sách là công cụ tuyệt vời giúp người đọc đối thoại với tác giả, lưu giữ những trích dẫn hay, ghi lại cảm xúc chân thực và biến tri thức trong trang sách thành vốn sống cá nhân của chính mình.',
    hints: [
      'Gắn với năng lực tự học và phát triển văn hóa đọc suốt đời.',
      'Không chỉ ghi chép nội dung mà còn ghi lại cảm nhận sâu sắc của riêng em.'
    ],
    keyTakeaway: 'Nhật kí đọc sách biến quá trình đọc từ thụ động sang chủ động sáng tạo và thấu cảm sâu sắc.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b10-pair',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Tổng kết tác phẩm và thể loại văn học Ngữ văn 6',
    semester: 2,
    lesson: 10,
    lessonTitle: 'Bài 10: Cuốn sách tôi yêu',
    sourceText: 'Tổng kết tri thức thể loại Ngữ văn 6',
    prompt: 'Em hãy ghép từng tác phẩm tiêu biểu với thể loại văn học tương ứng trong chương trình Ngữ văn 6:',
    matchingPairs: [
      { id: 'p1', left: 'Bài học đường đời đầu tiên (Tô Hoài)', right: 'Truyện đồng thoại (Bài 1)' },
      { id: 'p2', left: 'Chuyện cổ tích về loài người (Xuân Quỳnh)', right: 'Thơ có yếu tố tự sự và miêu tả (Bài 2)' },
      { id: 'p3', left: 'Thánh Gióng & Sơn Tinh, Thủy Tinh', right: 'Truyền thuyết dân gian (Bài 6)' },
      { id: 'p4', left: 'Trái Đất – cái nôi của sự sống', right: 'Văn bản thông tin (Bài 9)' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Mỗi thể loại văn học phản ánh hiện thực qua các phương thức biểu đạt đặc thù: truyện đồng thoại nhân hóa loài vật; thơ tự sự giàu cảm xúc; truyền thuyết gắn với yếu tố kì ảo lịch sử; văn bản thông tin cung cấp dữ liệu xác thực.',
    hints: [
      'Xác định phương thức biểu đạt chính của từng tác phẩm.',
      'Nhớ lại các bài học tương ứng trong hai tập sách Ngữ văn 6.'
    ],
    keyTakeaway: 'Nắm vững đặc trưng thể loại là chìa khóa vạn năng để tiếp cận, phân tích và thưởng thức mọi tác phẩm văn học.',
    points: 20,
    enabled: true
  },
  {
    id: 'kntt-b10-err',
    zone: 'san_khau_noi_va_nghe',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Văn hóa giao tiếp và lắng nghe tích cực trong thảo luận về sách',
    semester: 2,
    lesson: 10,
    lessonTitle: 'Bài 10: Cuốn sách tôi yêu',
    sourceText: 'Nói và nghe: Thảo luận về một cuốn sách',
    prompt: 'Bấm chọn hành vi VI PHẠM NGUYÊN TẮC LẮNG NGHE TÍCH CỰC trong buổi thảo luận sau:',
    errorSpotter: {
      instruction: 'Tình huống: "Khi bạn Nam đang hào hứng chia sẻ cảm nhận về cuốn sách Dế Mèn phiêu lưu kí, bạn Hùng lập tức cắt ngang lời bạn để nói to ý kiến riêng của mình."',
      tokens: [
        { id: 't1', text: 'Khi bạn Nam đang hào hứng', isError: false },
        { id: 't2', text: 'chia sẻ cảm nhận về cuốn sách,', isError: false },
        { id: 't3', text: 'bạn Hùng', isError: false },
        { id: 't4', text: 'lập tức cắt ngang lời bạn', isError: true, correctText: 'chăm chú lắng nghe, ghi chép và chờ bạn nói xong mới giơ tay phát biểu' },
        { id: 't5', text: 'để nói to', isError: false },
        { id: 't6', text: 'ý kiến riêng của mình.', isError: false }
      ],
      explanation: 'Hành vi thiếu văn hóa giao tiếp: Cắt ngang lời người khác khi họ đang phát biểu là hành vi bất lịch sự. Trong thảo luận nhóm, cần tôn trọng người nói, chăm chú lắng nghe, ghi chép câu hỏi và chờ đến lượt mới giơ tay trao đổi văn minh.'
    },
    correctAnswer: 't4',
    explanation: 'Lắng nghe tích cực đòi hỏi sự kiên nhẫn và tôn trọng. Cắt ngang lời nói thể hiện sự thiếu tôn trọng bạn và phá vỡ không khí trao đổi học thuật lành mạnh.',
    hints: [
      'Hành động chen ngang lời khi người khác chưa nói xong.',
      'Vi phạm quy tắc văn minh trong giao tiếp học đường.'
    ],
    keyTakeaway: 'Lắng nghe thấu cảm và chờ đến lượt phát biểu là phẩm chất văn hóa cốt lõi của người học sinh thanh lịch và tự tin.',
    points: 30,
    enabled: true
  }
];
