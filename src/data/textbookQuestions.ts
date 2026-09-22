import { Question } from '../types';

export const TEXTBOOK_QUESTIONS: Question[] = [
  // =========================================================================
  // TẬP 1 - BÀI 1: TÔI VÀ CÁC BẠN
  // =========================================================================
  {
    id: 't1-b1-vb-01',
    semester: 1,
    lesson: 1,
    lessonTitle: 'Bài 1: Tôi và các bạn',
    sourceText: 'Bài học đường đời đầu tiên (Dế Mèn phiêu lưu kí - Tô Hoài)',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Tác giả & tác phẩm truyện đồng thoại',
    prompt: 'Đoạn trích "Bài học đường đời đầu tiên" được trích từ chương nào của tác phẩm "Dế Mèn phiêu lưu kí" của nhà văn Tô Hoài?',
    options: [
      'Chương I: Tôi sống độc lập từ thuở bé - Một sự ngỗ nghịch đáng ân hận suốt đời',
      'Chương II: Sa vào tay hai đứa trẻ ranh - Trở thành đồ chơi nguy hiểm',
      'Chương III: Thoát khỏi tay hai đứa trẻ - Kết bạn với Dế Trũi',
      'Chương IV: Đánh nhau với bọ ngựa - Trở thành thủ lĩnh đầm lầy'
    ],
    correctAnswer: 0,
    explanation: 'Văn bản "Bài học đường đời đầu tiên" được trích từ Chương I của tác phẩm "Dế Mèn phiêu lưu kí" (sáng tác năm 1941) của Tô Hoài.',
    hints: [
      'Đây là chương mở đầu giới thiệu về ngoại hình cường tráng và tính nết của Dế Mèn.',
      'Tên chương gắn liền với sự việc ngỗ nghịch dẫn đến cái chết thương tâm của Dế Choắt.'
    ],
    keyTakeaway: 'Truyện đồng thoại là thể loại truyện viết cho thiếu nhi, nhân vật thường là loài vật hoặc đồ vật được nhân hoá mang đặc điểm con người.',
    points: 10,
    enabled: true
  },
  {
    id: 't1-b1-tv-01',
    semester: 1,
    lesson: 1,
    lessonTitle: 'Bài 1: Tôi và các bạn',
    sourceText: 'Thực hành tiếng Việt - Bài 1',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Từ đơn, từ ghép và từ láy',
    prompt: 'Em hãy ghép từng từ ngữ trích từ văn bản "Bài học đường đời đầu tiên" với loại từ tương ứng:',
    matchingPairs: [
      { id: 'p1', left: 'ăn, dế, cỏ', right: 'Từ đơn' },
      { id: 'p2', left: 'cường tráng, lưỡi liềm', right: 'Từ ghép' },
      { id: 'p3', left: 'phăng phắc, giòn giã', right: 'Từ láy' },
      { id: 'p4', left: 'lêu nghêu, bè bè', right: 'Từ láy mô phỏng hình dáng' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Từ đơn gồm 1 tiếng. Từ phức gồm từ ghép (các tiếng có quan hệ ngữ nghĩa) và từ láy (các tiếng có quan hệ ngữ âm lặp âm đầu/vần).',
    hints: [
      '"cường tráng" ghép từ 2 tiếng có nghĩa tương đồng.',
      '"phăng phắc" lặp lại phụ âm đầu ph-.'
    ],
    keyTakeaway: 'Từ láy tạo tính gợi hình gợi cảm cao cho văn miêu tả; từ ghép giúp định danh sự vật chính xác.',
    points: 20,
    enabled: true
  },
  {
    id: 't1-b1-vb-02',
    semester: 1,
    lesson: 1,
    lessonTitle: 'Bài 1: Tôi và các bạn',
    sourceText: 'Nếu cậu muốn có một người bạn... (Hoàng tử bé - Saint-Exupéry)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Ý nghĩa từ ngữ trong văn bản',
    prompt: 'Trong đoạn trích "Nếu cậu muốn có một người bạn...", con cáo giải thích từ "cảm hoá" có nghĩa là gì?',
    options: [
      'Là thuần phục và huấn luyện con thú hoang',
      'Là làm cho gần gũi hơn',
      'Là cùng nhau đi chu du khắp các hành tinh',
      'Là dạy cho nhau bí mật của thế giới tự nhiên'
    ],
    correctAnswer: 1,
    explanation: 'Con cáo giải thích: "Đó là thứ bị lãng quên lâu lắm rồi. Nó có nghĩa là làm cho gần gũi hơn...". Khi cảm hoá, ta sẽ cần đến nhau và trở thành duy nhất trên đời.',
    hints: [
      'Con cáo nói đó là một khái niệm bị con người lãng quên.',
      'Ý nghĩa hướng tới sự gắn kết, thấu hiểu và gắn bó thân thiết giữa hai cá thể.'
    ],
    keyTakeaway: 'Tình bạn nảy nở từ sự kiên nhẫn, chân thành và gắn bó trách nhiệm với người mình đã cảm hoá.',
    points: 20,
    enabled: true
  },
  {
    id: 't1-b1-vt-01',
    semester: 1,
    lesson: 1,
    lessonTitle: 'Bài 1: Tôi và các bạn',
    sourceText: 'Thực hành Viết - Bài 1',
    zone: 'xuong_viet_sang_tao',
    level: 'van_dung_thap',
    gameType: 'sap_xep_sieu_toc',
    topic: 'Quy trình viết bài văn kể lại một trải nghiệm',
    prompt: 'Hãy sắp xếp các bước trong quy trình làm bài văn kể lại một trải nghiệm của bản thân theo đúng thứ tự SGK hướng dẫn:',
    sequenceItems: [
      { id: 's1', text: 'Trước khi viết (Lựa chọn đề tài, Tìm ý, Lập dàn ý)', correctIndex: 0 },
      { id: 's2', text: 'Viết bài (Bám sát dàn ý, nhất quán ngôi kể thứ nhất)', correctIndex: 1 },
      { id: 's3', text: 'Chỉnh sửa bài viết (Rà soát theo bảng kiểm yêu cầu và sửa lỗi)', correctIndex: 2 }
    ],
    correctAnswer: ['s1', 's2', 's3'],
    explanation: 'Quy trình viết gồm 3 bước tuần tự: 1. Trước khi viết (chọn đề tài, tìm ý, lập dàn ý) -> 2. Viết bài -> 3. Chỉnh sửa bài viết.',
    hints: [
      'Giai đoạn chuẩn bị dàn ý và chọn lọc sự việc luôn phải diễn ra trước nhất.',
      'Đọc lại và đối chiếu bảng tiêu chí là khâu hoàn thiện cuối cùng.'
    ],
    keyTakeaway: 'Tuân thủ quy trình 3 bước giúp bài viết mạch lạc, không sót chi tiết cốt lõi và giàu cảm xúc.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // TẬP 1 - BÀI 2: GÕ CỬA TRÁI TIM
  // =========================================================================
  {
    id: 't1-b2-vb-01',
    semester: 1,
    lesson: 2,
    lessonTitle: 'Bài 2: Gõ cửa trái tim',
    sourceText: 'Chuyện cổ tích về loài người (Xuân Quỳnh)',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Trật tự xuất hiện trong thơ',
    prompt: 'Trong bài thơ "Chuyện cổ tích về loài người" của nhà thơ Xuân Quỳnh, ai là người được sinh ra trước nhất trên Trái Đất trần trụi?',
    options: [
      'Người mẹ hiền từ',
      'Người cha nghiêm khắc',
      'Chỉ toàn là trẻ con',
      'Thầy giáo và trường lớp'
    ],
    correctAnswer: 2,
    explanation: 'Khổ 1 bài thơ mở đầu bằng câu: "Trời sinh ra trước nhất / Chỉ toàn là trẻ con / Trên trái đất trụi trần / Không dáng cây ngọn cỏ". Mọi sự vật và người lớn sinh ra sau để yêu thương, chăm sóc trẻ thơ.',
    hints: [
      'Đối tượng được ưu ái và yêu thương nhất trong toàn bộ bài thơ.',
      'Khổ thơ đầu tiên khẳng định sự ra đời nguyên sơ của đối tượng này.'
    ],
    keyTakeaway: 'Bài thơ thể hiện tình yêu trẻ thơ sâu sắc và khẳng định thế giới sinh ra là để nâng niu, nuôi dưỡng trẻ em.',
    points: 10,
    enabled: true
  },
  {
    id: 't1-b2-tv-01',
    semester: 1,
    lesson: 2,
    lessonTitle: 'Bài 2: Gõ cửa trái tim',
    sourceText: 'Thực hành tiếng Việt - Bài 2',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'o_cua_bi_mat',
    topic: 'Biện pháp tu từ ẩn dụ',
    prompt: 'Trong hai câu thơ: "Mặt trời của bắp thì nằm trên đồi / Mặt trời của mẹ, em nằm trên lưng" (Nguyễn Khoa Điềm), từ "mặt trời" thứ hai được dùng theo biện pháp tu từ nào?',
    options: [
      'So sánh ngang bằng',
      'Ẩn dụ phẩm chất / cảm xúc',
      'Hoán dụ lấy vật chứa đựng',
      'Nhân hoá gọi vật như người'
    ],
    correctAnswer: 1,
    explanation: '"Mặt trời của mẹ" là hình ảnh ẩn dụ ca ngợi đứa con: con chính là nguồn sống ấm áp, niềm tin yêu và tương lai rực rỡ của đời mẹ.',
    hints: [
      'Đây là biện pháp gọi tên sự vật này bằng tên sự vật khác dựa trên nét tương đồng ngầm.',
      'Đứa con bé bỏng mang lại ánh sáng hạnh phúc cho người mẹ như mặt trời đem lại ánh sáng cho thế gian.'
    ],
    keyTakeaway: 'Ẩn dụ là cách gọi sự vật, hiện tượng này bằng tên sự vật hiện tượng khác có nét tương đồng nhằm tăng sức gợi hình, gợi cảm.',
    points: 30,
    enabled: true
  },
  {
    id: 't1-b2-vb-02',
    semester: 1,
    lesson: 2,
    lessonTitle: 'Bài 2: Gõ cửa trái tim',
    sourceText: 'Bức tranh của em gái tôi (Tạ Duy Anh)',
    zone: 'kham_pha_van_ban',
    level: 'van_dung_cao',
    gameType: 'vuot_me_cung',
    topic: 'Diễn biến tâm lý nhân vật',
    prompt: 'Vì sao khi đứng trước bức chân dung đoạt giải Nhất của em gái Kiều Phương vẽ mình, người anh trai lại muốn khóc và cảm thấy xấu hổ?',
    options: [
      'Vì bức tranh vẽ người anh quá xấu xí và kì quặc',
      'Vì người anh nhận ra sự ích kỉ, ghen tị hẹp hòi của mình trước tâm hồn trong sáng, nhân hậu của em gái',
      'Vì người anh lo sợ mọi người trong trường sẽ trêu chọc mình',
      'Vì bố mẹ chỉ khen thưởng em gái mà quên mất thành tích của anh'
    ],
    correctAnswer: 1,
    explanation: 'Người anh ngỡ ngàng, hãnh diện nhưng sau đó là xấu hổ vì nhận ra dưới mắt em gái, mình hoàn hảo và đáng yêu biết bao, đối lập với sự ghen ghét nhỏ nhen bấy lâu của mình.',
    hints: [
      'Đó là sự thức tỉnh của lương tâm và lòng tự trọng.',
      'Bức tranh không chỉ vẽ ngoại hình mà soi tỏ tâm hồn nhân ái của cô em gái.'
    ],
    keyTakeaway: 'Lòng nhân hậu và sự độ lượng có sức mạnh cảm hóa, giúp con người tự vượt lên những đố kị nhỏ nhen để hoàn thiện bản thân.',
    points: 40,
    enabled: true
  },

  // =========================================================================
  // TẬP 1 - BÀI 3: YÊU THƯƠNG VÀ CHIA SẺ
  // =========================================================================
  {
    id: 't1-b3-vb-01',
    semester: 1,
    lesson: 3,
    lessonTitle: 'Bài 3: Yêu thương và chia sẻ',
    sourceText: 'Cô bé bán diêm (H. C. Andersen)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'sap_xep_sieu_toc',
    topic: 'Trình tự ảo ảnh trong Cô bé bán diêm',
    prompt: 'Hãy sắp xếp các mộng tưởng hiện ra trước mắt cô bé bán diêm sau mỗi lần quẹt que diêm theo đúng thứ tự câu chuyện:',
    sequenceItems: [
      { id: 'd1', text: 'Lần 1: Lò sưởi bằng sắt sáng loáng với ngọn lửa ấm áp', correctIndex: 0 },
      { id: 'd2', text: 'Lần 2: Bàn ăn thịnh soạn trải khăn trắng tinh và con ngỗng quay', correctIndex: 1 },
      { id: 'd3', text: 'Lần 3: Cây thông Nô-en lộng lẫy với hàng ngàn ngọn nến sáng rực', correctIndex: 2 },
      { id: 'd4', text: 'Lần 4: Người bà hiền hậu mỉm cười đón em bay lên trời cùng Thượng đế', correctIndex: 3 }
    ],
    correctAnswer: ['d1', 'd2', 'd3', 'd4'],
    explanation: 'Thứ tự 4 ảo ảnh phản ánh nhu cầu cấp thiết từ vật chất đến tinh thần: hơi ấm (lò sưởi) -> ăn no (ngỗng quay) -> niềm vui đón năm mới (cây thông) -> tình thương gia đình (người bà).',
    hints: [
      'Que diêm đầu tiên cô bé quẹt vì quá rét buốt đôi bàn tay.',
      'Ảo ảnh cuối cùng gắn với người yêu thương em nhất trần đời.'
    ],
    keyTakeaway: 'Cốt truyện đan xen giữa thực tế giá lạnh và mộng tưởng ấm áp làm nổi bật bi kịch của đứa trẻ và tấm lòng nhân đạo sâu sắc của nhà văn Andersen.',
    points: 20,
    enabled: true
  },
  {
    id: 't1-b3-tv-01',
    semester: 1,
    lesson: 3,
    lessonTitle: 'Bài 3: Yêu thương và chia sẻ',
    sourceText: 'Thực hành tiếng Việt - Bài 3',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Cụm danh từ, cụm động từ và cụm tính từ',
    prompt: 'Trong câu văn sau đây, hãy tìm từ ngữ bị dùng sai loại cụm từ khiến câu mất tính mạch lạc:',
    errorSpotter: {
      instruction: 'Bấm chọn từ ngữ dùng sai ngữ pháp trong câu dưới đây:',
      tokens: [
        { id: 't1', text: 'Những', isError: false },
        { id: 't2', text: 'chiếc', isError: false },
        { id: 't3', text: 'áo bông', isError: false },
        { id: 't4', text: 'cũ kĩ', isError: false },
        { id: 't5', text: 'đã', isError: false },
        { id: 't6', text: 'mang lại', isError: false },
        { id: 't7', text: 'sự ấm áp', isError: false },
        { id: 't8', text: 'cho', isError: false },
        { id: 't9', text: 'rất đứa bé nghèo', isError: true, correctText: 'những đứa bé rất nghèo' },
        { id: 't10', text: 'ở ven chợ.', isError: false }
      ],
      explanation: 'Không thể kết hợp từ chỉ mức độ "rất" trực tiếp trước danh từ "đứa bé" (sai cấu trúc cụm danh từ). Đúng phải là "những đứa bé rất nghèo" hoặc "rất nhiều đứa bé nghèo".'
    },
    correctAnswer: 't9',
    explanation: 'Cụm danh từ hoàn chỉnh gồm: Phần phụ trước (số lượng) + Danh từ trung tâm + Phần phụ sau (đặc điểm/vị trí). "Rất" chỉ đứng trước tính từ hoặc động từ.',
    hints: [
      'Chú ý từ "rất" là từ chỉ mức độ, không bổ nghĩa trực tiếp cho danh từ trung tâm.',
      'Kiểm tra cụm từ chỉ người ở cuối câu.'
    ],
    keyTakeaway: 'Mở rộng thành phần câu bằng cụm từ giúp câu văn cung cấp nhiều thông tin chi tiết, biểu cảm và chính xác hơn.',
    points: 30,
    enabled: true
  },
  {
    id: 't1-b3-vb-02',
    semester: 1,
    lesson: 3,
    lessonTitle: 'Bài 3: Yêu thương và chia sẻ',
    sourceText: 'Gió lạnh đầu mùa (Thạch Lam)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Tấm lòng nhân ái trong truyện Thạch Lam',
    prompt: 'Chi tiết mẹ của Sơn cho mẹ bé Hiên mượn năm hào để may áo cho con thể hiện phẩm chất gì của nhân vật?',
    options: [
      'Sự khoe khoang của gia đình khá giả ở phố huyện',
      'Tấm lòng nhân hậu, tinh tế, kín đáo và giàu tình thương người nghèo khó',
      'Sự dễ dãi không quản lí tiền bạc chu đáo',
      'Muốn lấy lòng người dân trong xóm chợ'
    ],
    correctAnswer: 1,
    explanation: 'Cách ứng xử của mẹ Sơn vừa giáo dục con cái tính tự lập vừa thể hiện tình nhân ái tế nhị, cho mượn tiền để giữ thể diện và giúp người mẹ nghèo có áo ấm cho con.',
    hints: [
      'Bà không mắng mỏ hai đứa con mà hiểu và trân trọng việc làm thiện tâm của chúng.',
      'Hành động giúp đỡ rất tinh tế, không làm tổn thương lòng tự trọng của bác Hiên.'
    ],
    keyTakeaway: 'Truyện Thạch Lam nhẹ nhàng nhưng thấm đẫm tình mẫu tử, lòng vị tha và tình làng nghĩa xóm ấm áp trong những ngày đông.',
    points: 20,
    enabled: true
  },

  // =========================================================================
  // TẬP 1 - BÀI 4: QUÊ HƯƠNG YÊU DẤU
  // =========================================================================
  {
    id: 't1-b4-vb-01',
    semester: 1,
    lesson: 4,
    lessonTitle: 'Bài 4: Quê hương yêu dấu',
    sourceText: 'Chùm ca dao về quê hương đất nước',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Địa danh lịch sử trong ca dao',
    prompt: 'Bài ca dao "Gió đưa cành trúc la đà / Tiếng chuông Trấn Vũ, canh gà Thọ Xương..." gợi nhắc đến cảnh đẹp thanh bình của vùng đất nào?',
    options: [
      'Vùng núi xứ Lạng rực rỡ cờ hoa',
      'Kinh thành Thăng Long xưa (Hà Nội ngày nay)',
      'Cố đô Huế bên dòng sông Hương thơ mộng',
      'Vùng đồng bằng Nam Bộ mênh mông sông nước'
    ],
    correctAnswer: 1,
    explanation: 'Các địa danh đền Trấn Vũ, Thọ Xương, làng Yên Thái, Tây Hồ đều là thắng cảnh văn hóa nổi tiếng của kinh thành Thăng Long - Hà Nội.',
    hints: [
      'Địa danh có Hồ Tây, đền Quán Thánh thờ Huyền Thiên Trấn Vũ.',
      'Thủ đô ngàn năm văn hiến của đất nước Việt Nam.'
    ],
    keyTakeaway: 'Ca dao lục bát truyền thống là tiếng nói tâm hồn trong trẻo, gắn liền với tình yêu thiên nhiên, lịch sử và thắng cảnh quê hương.',
    points: 10,
    enabled: true
  },
  {
    id: 't1-b4-tv-01',
    semester: 1,
    lesson: 4,
    lessonTitle: 'Bài 4: Quê hương yêu dấu',
    sourceText: 'Thực hành tiếng Việt - Bài 4',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Từ đồng âm và từ đa nghĩa',
    prompt: 'Em hãy phân loại đúng các trường hợp sử dụng từ sau đây vào nhóm "Từ đồng âm" hoặc "Từ đa nghĩa":',
    matchingPairs: [
      { id: 'h1', left: 'Ăn cơm / Tàu ăn than', right: 'Từ đa nghĩa (hoạt động thu nạp)' },
      { id: 'h2', left: 'Đá bóng / Hòn đá tảng', right: 'Từ đồng âm (hoạt động vs danh từ)' },
      { id: 'h3', left: 'Lá cây / Lá cờ, lá phổi', right: 'Từ đa nghĩa (hình dáng mỏng dẹt)' },
      { id: 'h4', left: 'Đường đi / Cân đường ngọt', right: 'Từ đồng âm (lối đi vs gia vị)' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Từ đa nghĩa có chung mối liên hệ ngữ nghĩa gốc (tương đồng hình dáng, chức năng). Từ đồng âm chỉ giống nhau về mặt âm thanh chứ hoàn toàn khác nghĩa.',
    hints: [
      'Nếu tìm thấy nét nghĩa chung thì đó là từ đa nghĩa.',
      'Nếu hai nghĩa hoàn toàn xa lạ không dính dáng gì nhau thì là từ đồng âm.'
    ],
    keyTakeaway: 'Phân biệt chính xác từ đồng âm và từ đa nghĩa giúp tránh hiểu sai văn cảnh và diễn đạt tiếng Việt chuẩn mực.',
    points: 20,
    enabled: true
  },
  {
    id: 't1-b4-tv-02',
    semester: 1,
    lesson: 4,
    lessonTitle: 'Bài 4: Quê hương yêu dấu',
    sourceText: 'Thực hành tiếng Việt - Bài 4 (SGK tr.99)',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'ai_nhanh_hon',
    topic: 'Biện pháp tu từ hoán dụ',
    prompt: 'Trong câu thơ: "Áo chàm đưa buổi phân li / Cầm tay nhau biết nói gì hôm nay" (Tố Hữu), hình ảnh "áo chàm" sử dụng biện pháp tu từ gì và chỉ đối tượng nào?',
    options: [
      'Hoán dụ - lấy trang phục để chỉ người dân Việt Bắc mộc mạc, thủy chung',
      'Ẩn dụ - ví người dân như chiếc áo chàm màu lam',
      'So sánh - so chiếc áo với người chiến sĩ giải phóng',
      'Nhân hóa - làm cho chiếc áo biết nói lời phân li'
    ],
    correctAnswer: 0,
    explanation: 'Hoán dụ lấy dấu hiệu của sự vật (trang phục áo chàm truyền thống) để gọi người dân đồng bào vùng chiến khu Việt Bắc gắn bó keo sơn.',
    hints: [
      'Áo chàm là trang phục quen thuộc đặc trưng của đồng bào miền núi phía Bắc.',
      'Đây là quan hệ tương cận (gần gũi giữa trang phục và người mặc).'
    ],
    keyTakeaway: 'Hoán dụ gọi tên sự vật, hiện tượng này bằng tên sự vật hiện tượng khác dựa trên quan hệ tương cận (gần gũi).',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // TẬP 1 - BÀI 5: NHỮNG NẺO ĐƯỜNG XỨ SỞ
  // =========================================================================
  {
    id: 't1-b5-vb-01',
    semester: 1,
    lesson: 5,
    lessonTitle: 'Bài 5: Những nẻo đường xứ sở',
    sourceText: 'Cô Tô (Nguyễn Tuân)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Hình ảnh so sánh trác tuyệt trong kí Nguyễn Tuân',
    prompt: 'Trong đoạn văn miêu tả cảnh mặt trời mọc trên đảo Cô Tô, nhà văn Nguyễn Tuân đã ví mặt trời với hình ảnh độc đáo nào?',
    options: [
      'Như chiếc đĩa bạc khổng lồ lơ lửng giữa từng không',
      'Tròn trĩnh phúc hậu như lòng đỏ một quả trứng thiên nhiên đầy đặn',
      'Như ngọn đuốc rực lửa xua tan màn sương mù biển cả',
      'Như quả cầu lửa lặn sâu vào lòng đại dương bao la'
    ],
    correctAnswer: 1,
    explanation: 'Nguyễn Tuân viết: "Mặt trời nhú lên dần dần... Tròn trĩnh phúc hậu như lòng đỏ một quả trứng thiên nhiên đầy đặn. Quả trứng hồng hào thăm thẳm và đường bệ đặt lên một mâm bạc...".',
    hints: [
      'Hình ảnh gợi sự tròn trịa, tươi hồng, trù phú và thiêng liêng của tạo hoá.',
      'Được so sánh kèm với "mâm bạc" là đường chân trời ngọc trai.'
    ],
    keyTakeaway: 'Kí của Nguyễn Tuân nổi bật với tài quan sát tinh tường, vốn từ ngữ giàu có và năng lực so sánh liên tưởng đầy chất hội hoạ.',
    points: 20,
    enabled: true
  },
  {
    id: 't1-b5-tv-01',
    semester: 1,
    lesson: 5,
    lessonTitle: 'Bài 5: Những nẻo đường xứ sở',
    sourceText: 'Thực hành tiếng Việt - Bài 5 (SGK tr.118)',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'ghep_doi',
    topic: 'Công dụng của dấu ngoặc kép',
    prompt: 'Em hãy ghép từng ví dụ chứa dấu ngoặc kép với công dụng ngữ pháp tương ứng trong SGK:',
    matchingPairs: [
      { id: 'k1', left: 'Cảm giác như cuộc "ngược dòng" tìm về thuở sơ khai', right: 'Đánh dấu từ ngữ hiểu theo nghĩa đặc biệt' },
      { id: 'k2', left: 'Đến nơi được gọi là "sảnh chờ" rộng rãi của hang', right: 'Đánh dấu từ ngữ mượn hình ảnh sinh hoạt con người' },
      { id: 'k3', left: 'Bác dặn: "Trẻ em như búp trên cành"', right: 'Đánh dấu lời dẫn trực tiếp' },
      { id: 'k4', left: 'Tác phẩm "Dế Mèn phiêu lưu kí"', right: 'Đánh dấu tên tác phẩm văn học' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Dấu ngoặc kép có nhiều công dụng: dẫn trực tiếp, đánh dấu tên tác phẩm, hoặc đánh dấu từ ngữ được dùng với nghĩa hàm ẩn / nghĩa đặc biệt.',
    hints: [
      '"Ngược dòng" ở đây là dòng thời gian về quá khứ chứ không phải dòng nước.',
      '"Sảnh chờ" là từ vốn dùng cho khách sạn, nhà ga, nay dùng cho hang đá thiên nhiên.'
    ],
    keyTakeaway: 'Dấu ngoặc kép giúp người viết nhấn mạnh hàm ý tu từ và phân biệt lời dẫn trực tiếp với ngữ cảnh bài viết.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // TẬP 2 - BÀI 6: CHUYỆN KỂ VỀ NHỮNG NGƯỜI ANH HÙNG
  // =========================================================================
  {
    id: 't2-b6-vb-01',
    semester: 2,
    lesson: 6,
    lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng',
    sourceText: 'Thánh Gióng (Truyền thuyết - SGK Tập 2 tr.6-9)',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Chi tiết kì ảo trong truyền thuyết',
    prompt: 'Sau khi đánh tan giặc Ân đến chân núi Ninh Sóc, tráng sĩ Gióng đã làm gì trước khi bay về trời?',
    options: [
      'Vào triều đình nhận phong thưởng của Hùng Vương',
      'Một mình cưỡi ngựa lên đỉnh núi, cởi giáp sắt bỏ lại, rồi cả người lẫn ngựa từ từ bay lên trời',
      'Đến làng Cháy giúp nhân dân dập lửa cứu làng mạc',
      'Về quê thăm mẹ già ở làng Phù Đổng rồi mới xuất gia'
    ],
    correctAnswer: 1,
    explanation: 'SGK tr.8 ghi rõ: "Tráng sĩ đuổi đến núi Ninh Sóc. Nhưng đến đấy, không biết vì sao, Người một mình cưỡi ngựa lên đỉnh núi, cởi giáp sắt bỏ lại, rồi cả người lẫn ngựa từ từ bay lên trời, biến mất."',
    hints: [
      'Người anh hùng cứu nước xong không màng danh lợi, bổng lộc trần gian.',
      'Chi tiết giáp sắt bỏ lại thể hiện sự thanh thản, thiêng liêng bất tử hoá.'
    ],
    keyTakeaway: 'Truyền thuyết kết thúc bằng sự bất tử hoá người anh hùng trong lòng nhân dân và non sông đất nước.',
    points: 10,
    enabled: true
  },
  {
    id: 't2-b6-vb-02',
    semester: 2,
    lesson: 6,
    lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng',
    sourceText: 'Sơn Tinh, Thuỷ Tinh (Truyền thuyết - SGK Tập 2 tr.10-13)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Sính lễ kén rể của Hùng Vương',
    prompt: 'Em hãy ghép từng lễ vật thách cưới của vua Hùng thứ 18 với số lượng tương ứng trong truyền thuyết Sơn Tinh, Thuỷ Tinh:',
    matchingPairs: [
      { id: 'sl1', left: 'Cơm nếp', right: 'Một trăm ván' },
      { id: 'sl2', left: 'Bánh chưng', right: 'Một trăm nệp' },
      { id: 'sl3', left: 'Voi, Gà, Ngựa kì lạ', right: 'Chín ngà, chín cựa, chín hồng mao' },
      { id: 'sl4', left: 'Quy định các con thú', right: 'Mỗi thứ một đôi' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Vua Hùng phán: "Một trăm ván cơm nếp, một trăm nệp bánh chưng và voi chín ngà, gà chín cựa, ngựa chín hồng mao, mỗi thứ một đôi" (SGK Tập 2 tr.11).',
    hints: [
      'Ván đi liền với cơm nếp, nệp đi liền với bánh chưng.',
      'Con số 9 tượng trưng cho sự kì hiếm và linh thiêng của lễ vật miền núi non.'
    ],
    keyTakeaway: 'Sính lễ ưu tiên sản vật trên cạn cho thấy vua Hùng và nhân dân đã nghiêng về người anh hùng đắp đê ngăn lũ Sơn Tinh.',
    points: 20,
    enabled: true
  },
  {
    id: 't2-b6-tv-01',
    semester: 2,
    lesson: 6,
    lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng',
    sourceText: 'Thực hành tiếng Việt - Bài 6 (SGK Tập 2 tr.13)',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'ai_nhanh_hon',
    topic: 'Công dụng của dấu chấm phẩy',
    prompt: 'Dấu chấm phẩy trong câu văn sau có tác dụng gì: "Én bố mẹ tấp nập đi, về, mài mốt mớm mồi cho con; én anh chị rập rờn bay đôi; én ra ràng chập chới vỗ cánh bên rìa hốc đá."?',
    options: [
      'Đánh dấu ranh giới giữa các bộ phận trong một chuỗi liệt kê phức tạp',
      'Đánh dấu lời đối thoại trực tiếp của bầy chim én',
      'Dùng để kết thúc một câu trần thuật đơn giản',
      'Dùng để biểu thị sự châm biếm, hoài nghi'
    ],
    correctAnswer: 0,
    explanation: 'SGK Tập 2 tr.13 đóng khung ghi nhớ: "Dấu chấm phẩy thường được dùng để đánh dấu ranh giới giữa các bộ phận trong một chuỗi liệt kê phức tạp (trong các vế câu đã có dấu phẩy nhỏ).".',
    hints: [
      'Mỗi vế câu liệt kê bên trong đã có sẵn nhiều dấu phẩy.',
      'Cần một dấu ngắt mạnh hơn dấu phẩy để phân ranh các vế lớn.'
    ],
    keyTakeaway: 'Dấu chấm phẩy giữ trật tự cấu trúc câu mạch lạc khi liệt kê nhiều phân đoạn phức tạp hoặc có vế câu dài.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // TẬP 2 - BÀI 7: THẾ GIỚI CỔ TÍCH
  // =========================================================================
  {
    id: 't2-b7-vb-01',
    semester: 2,
    lesson: 7,
    lessonTitle: 'Bài 7: Thế giới cổ tích',
    sourceText: 'Thạch Sanh (Truyện cổ tích - SGK Tập 2 tr.26-30)',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Vật báu kì ảo trong Thạch Sanh',
    prompt: 'Hai vật báu kì diệu nào đã giúp Thạch Sanh giải oan cho bản thân và hóa giải cuộc chiến tranh xâm lược của quân sĩ 18 nước chư hầu?',
    options: [
      'Chiếc rìu sắt của cha để lại và bộ cung tên vàng',
      'Cây đàn thần của vua Thủy Tề và niêu cơm thần tí xíu ăn mãi không hết',
      'Hòn đá lửa thần và con dao nhọn',
      'Túi ba gang và chiếc gương thần'
    ],
    correctAnswer: 1,
    explanation: 'Tiếng đàn thần gảy lên vạch trần tội ác Lý Thông và làm bủn rủn tay chân quân 18 nước chư hầu. Niêu cơm thần ăn mãi không hết thể hiện tấm lòng nhân đạo, yêu chuộng hòa bình của dân tộc.',
    hints: [
      'Một vật phát ra âm thanh thức tỉnh công chúa và quân giặc.',
      'Một vật nấu thức ăn khoản đãi hàng vạn tù binh mà chẳng vơi cạn.'
    ],
    keyTakeaway: 'Cây đàn và niêu cơm thần là biểu tượng rực rỡ cho ước mơ công lí, chính nghĩa và khát vọng hòa bình của nhân dân lao động.',
    points: 10,
    enabled: true
  },
  {
    id: 't2-b7-vb-02',
    semester: 2,
    lesson: 7,
    lessonTitle: 'Bài 7: Thế giới cổ tích',
    sourceText: 'Cây khế (Truyện cổ tích - SGK Tập 2 tr.32-35)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Đặc trưng nhân vật cổ tích',
    prompt: 'Bài học triết lí nhân sinh sâu sắc nhất mà truyện cổ tích "Cây khế" gửi gắm qua kết cục bi đát của người anh tham lam là gì?',
    options: [
      'Không nên trồng cây ăn quả ở ngoài sân vườn',
      'Ở hiền gặp lành, tham lam thì ắt gặp tai họa diệt vong',
      'Phải biết may túi nhiều ngăn khi đi ra biển xa',
      'Nên từ chối chia sẻ tài sản thừa kế cho em trai'
    ],
    correctAnswer: 1,
    explanation: 'Truyện cổ tích Cây khế thể hiện niềm tin đạo lí dân gian: Người em thật thà, chăm chỉ nhận được đền đáp xứng đáng; người anh tham lam bội bạc phải trả giá bằng cả mạng sống.',
    hints: [
      'Đây là chân lí đạo đức truyền thống quen thuộc trong kho tàng cổ tích Việt Nam.',
      'Sự trừng phạt thích đáng dành cho thói tham lam vô độ.'
    ],
    keyTakeaway: 'Truyện cổ tích phản ánh ước mơ công lí xã hội: kẻ ác, kẻ tham lam bị trừng phạt, người lương thiện được hưởng hạnh phúc.',
    points: 20,
    enabled: true
  },
  {
    id: 't2-b7-tv-01',
    semester: 2,
    lesson: 7,
    lessonTitle: 'Bài 7: Thế giới cổ tích',
    sourceText: 'Thực hành tiếng Việt - Bài 7 (SGK Tập 2 tr.30-31)',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'ghep_doi',
    topic: 'Yếu tố Hán Việt "gia"',
    prompt: 'Dựa vào phụ lục SGK Tập 2, em hãy ghép từng từ Hán Việt có yếu tố "gia" với nghĩa giải thích chính xác:',
    matchingPairs: [
      { id: 'g1', left: 'Gia sản', right: 'Tài sản, của cải riêng của một gia đình' },
      { id: 'g2', left: 'Gia truyền', right: 'Bí quyết truyền lại từ đời này sang đời khác trong dòng họ' },
      { id: 'g3', left: 'Gia súc', right: 'Thú vật nuôi dưỡng trong nhà để làm kinh tế' },
      { id: 'g4', left: 'Gia tiên', right: 'Tổ tiên, các thế hệ đi trước trong gia tộc' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Yếu tố Hán Việt "gia" ở đây có nghĩa là nhà, gia đình. Khi kết hợp tạo thành các từ chỉ quan hệ, tài sản gắn liền gia đình.',
    hints: [
      '"Sản" là tài sản; "tiên" là trước (tổ tiên).',
      '"Súc" là loài động vật bốn chân nuôi trong nhà.'
    ],
    keyTakeaway: 'Hiểu đúng nghĩa các yếu tố gốc Hán giúp học sinh làm giàu vốn từ ngữ và suy đoán nghĩa chuẩn xác khi đọc hiểu văn bản.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // TẬP 2 - BÀI 8: KHÁC BIỆT VÀ GẦN GŨI
  // =========================================================================
  {
    id: 't2-b8-vb-01',
    semester: 2,
    lesson: 8,
    lessonTitle: 'Bài 8: Khác biệt và gần gũi',
    sourceText: 'Hai loại khác biệt (Giong-mi Mun - SGK Tập 2 tr.58-61)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Phân biệt luận điểm nghị luận',
    prompt: 'Trong văn bản "Hai loại khác biệt", tác giả Giong-mi Mun đã phân chia sự khác biệt thành hai loại nào?',
    options: [
      'Khác biệt về ngoại hình và khác biệt về trí tuệ',
      'Khác biệt vô nghĩa (bề ngoài quái đản) và khác biệt có ý nghĩa (bản lĩnh, nghiêm túc)',
      'Khác biệt của học sinh giỏi và khác biệt của học sinh cá biệt',
      'Khác biệt giàu nghèo và khác biệt vùng miền'
    ],
    correctAnswer: 1,
    explanation: 'Tác giả phân định rõ: Đa số chọn sự khác biệt vô nghĩa (mặc đồ kì dị, làm trò quái đản để gây chú ý nông nổi). Chỉ có bạn J tạo nên sự khác biệt có ý nghĩa bằng sự mẫu mực, lễ độ và chân thành.',
    hints: [
      'Một loại xuất phát từ sự nông nổi bên ngoài; một loại xuất phát từ năng lực và phẩm cách bên trong.',
      'Hành động đứng lên phát biểu từ tốn và lễ phép của bạn J là minh chứng tiêu biểu.'
    ],
    keyTakeaway: 'Văn nghị luận dùng lí lẽ và dẫn chứng thực tế để thuyết phục người đọc phân biệt giá trị chân chính của sự khác biệt.',
    points: 20,
    enabled: true
  },
  {
    id: 't2-b8-tv-01',
    semester: 2,
    lesson: 8,
    lessonTitle: 'Bài 8: Khác biệt và gần gũi',
    sourceText: 'Thực hành tiếng Việt - Bài 8 (SGK Tập 2 tr.56-57)',
    zone: 'tham_hiem_tieng_viet',
    level: 'nhan_biet',
    gameType: 'ghep_doi',
    topic: 'Chức năng của các loại trạng ngữ',
    prompt: 'Hãy ghép từng câu văn chứa trạng ngữ với chức năng ngữ pháp tương ứng trong SGK:',
    matchingPairs: [
      { id: 'tn1', left: 'Hồi nhỏ, chúng tôi học cùng một lớp.', right: 'Trạng ngữ chỉ thời gian' },
      { id: 'tn2', left: 'Trong vườn trường, những khóm hoa đua nở.', right: 'Trạng ngữ chỉ nơi chốn' },
      { id: 'tn3', left: 'Để giao tiếp tốt bằng ngoại ngữ, em cần luyện tập.', right: 'Trạng ngữ chỉ mục đích' },
      { id: 'tn4', left: 'Vì những bất đồng nhỏ, nhiều bạn tranh cãi.', right: 'Trạng ngữ chỉ nguyên nhân' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Trạng ngữ là thành phần phụ bổ sung thông tin thời gian, không gian, nguyên nhân, mục đích, phương tiện và liên kết câu trong đoạn văn.',
    hints: [
      '"Để..." báo hiệu trạng ngữ chỉ mục đích.',
      '"Vì..." báo hiệu trạng ngữ chỉ nguyên nhân.'
    ],
    keyTakeaway: 'Trạng ngữ giúp câu văn chặt chẽ, xác thực về bối cảnh và tạo liên kết chuyển ý tự nhiên giữa các câu.',
    points: 10,
    enabled: true
  },
  {
    id: 't2-b8-vt-01',
    semester: 2,
    lesson: 8,
    lessonTitle: 'Bài 8: Khác biệt và gần gũi',
    sourceText: 'Thực hành Viết - Bài 8 (SGK Tập 2 tr.66-70)',
    zone: 'xuong_viet_sang_tao',
    level: 'van_dung_thap',
    gameType: 'sap_xep_sieu_toc',
    topic: 'Bố cục bài văn nghị luận về một vấn đề đời sống',
    prompt: 'Hãy sắp xếp các phần của dàn ý bài văn nghị luận trình bày ý kiến về một hiện tượng đời sống theo đúng chuẩn SGK:',
    sequenceItems: [
      { id: 'nl1', text: 'Mở bài: Nêu hiện tượng (vấn đề) cần bàn luận và bày tỏ quan điểm của người viết', correctIndex: 0 },
      { id: 'nl2', text: 'Thân bài: Nêu các lí lẽ và bằng chứng cụ thể, phân tích nguyên nhân - tác hại/lợi ích', correctIndex: 1 },
      { id: 'nl3', text: 'Kết bài: Khẳng định lại ý kiến, rút ra bài học nhận thức và hành động thiết thực', correctIndex: 2 }
    ],
    correctAnswer: ['nl1', 'nl2', 'nl3'],
    explanation: 'Dàn ý bài văn nghị luận gồm: Mở bài (giới thiệu vấn đề) -> Thân bài (hệ thống luận điểm, lí lẽ và dẫn chứng) -> Kết bài (khẳng định thông điệp và hành động).',
    hints: [
      'Bắt đầu bằng việc xác định rõ đề tài và thái độ đồng tình hay phản đối.',
      'Khép lại bằng bài học cho bản thân và cộng đồng.'
    ],
    keyTakeaway: 'Bài nghị luận thuyết phục khi lí lẽ sắc bén, bằng chứng người thật việc thật và thái độ khách quan, xây dựng.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // TẬP 2 - BÀI 9: TRÁI ĐẤT – NGÔI NHÀ CHUNG
  // =========================================================================
  {
    id: 't2-b9-vb-01',
    semester: 2,
    lesson: 9,
    lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung',
    sourceText: 'Trái Đất – cái nôi của sự sống (Hồ Thanh Trang - SGK Tập 2 tr.78-82)',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Văn bản thông tin khoa học',
    prompt: 'Trong văn bản "Trái Đất – cái nôi của sự sống", yếu tố nào được tác giả gọi là "vị thần hộ mệnh" của sự sống trên hành tinh chúng ta?',
    options: [
      'Bầu khí quyển nhiều tầng',
      'Nước, đặc biệt là nước ở thể lỏng',
      'Ánh sáng mặt trời chiếu rọi',
      'Các cánh rừng nguyên sinh rậm rạp'
    ],
    correctAnswer: 1,
    explanation: 'SGK Tập 2 tr.78 khẳng định: "Nhờ có nước, đặc biệt là nước ở thể lỏng, Trái Đất thực sự trở thành cái nôi của sự sống trong hệ Mặt Trời... Nước chính là vị thần hộ mệnh của sự sống".',
    hints: [
      'Yếu tố này bao phủ gần 3/4 bề mặt Trái Đất.',
      'Nếu thiếu nó, Trái Đất chỉ là hành tinh khô chết trơ trụi.'
    ],
    keyTakeaway: 'Văn bản thông tin cung cấp tri thức khoa học chính xác, sử dụng đề mục rõ ràng và số liệu khách quan.',
    points: 10,
    enabled: true
  },
  {
    id: 't2-b9-tv-01',
    semester: 2,
    lesson: 9,
    lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung',
    sourceText: 'Thực hành tiếng Việt - Bài 9 (SGK Tập 2 tr.86-87)',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Từ mượn tiếng Hán và từ mượn tiếng Anh / Pháp',
    prompt: 'Hãy phân loại đúng nguồn gốc các từ mượn xuất hiện trong bài "Trái Đất - ngôi nhà chung":',
    matchingPairs: [
      { id: 'tm1', left: 'Ô-xi, a-xít, bi-ôm (biome)', right: 'Từ mượn gốc tiếng Âu (Pháp, Anh)' },
      { id: 'tm2', left: 'Hải phận, địa vực, ô nhiễm', right: 'Từ mượn gốc tiếng Hán' },
      { id: 'tm3', left: 'Vi-đê-ô, in-tơ-nét, sờ-mát-phôn', right: 'Từ mượn công nghệ gốc tiếng Anh' },
      { id: 'tm4', left: 'Xà phòng, com-lê, cà phê', right: 'Từ mượn gốc Pháp đã Việt hoá cao' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Tiếng Việt có hệ thống từ mượn phong phú: từ mượn Hán chiếm tỉ lệ lớn; từ mượn Âu (Pháp, Anh) được du nhập bổ sung thuật ngữ khoa học và đời sống hiện đại.',
    hints: [
      'Các từ có gạch nối giữa các âm tiết thường là phiên âm gốc Âu.',
      'Các từ mang sắc thái trang trọng như "địa vực, hải phận" là gốc Hán.'
    ],
    keyTakeaway: 'Sử dụng từ mượn đúng mực làm giàu vốn từ tiếng Việt, tránh lạm dụng gây khó hiểu và mất đi sự trong sáng của tiếng Việt.',
    points: 20,
    enabled: true
  },
  {
    id: 't2-b9-vt-01',
    semester: 2,
    lesson: 9,
    lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung',
    sourceText: 'Thực hành Viết - Bài 9 (SGK Tập 2 tr.88-91)',
    zone: 'xuong_viet_sang_tao',
    level: 'van_dung_thap',
    gameType: 'ai_nhanh_hon',
    topic: 'Thể thức viết biên bản cuộc họp',
    prompt: 'Nội dung nào bắt buộc phải có ở phần kết thúc của một biên bản cuộc họp, cuộc thảo luận theo quy định SGK?',
    options: [
      'Cảm nghĩ của người ghi biên bản về diễn biến cuộc họp',
      'Thời gian bế mạc, chữ kí và họ tên của Chủ tọa cùng Thư kí cuộc họp',
      'Lời chúc mừng của ban giám hiệu nhà trường',
      'Bảng số liệu chi tiết về chi phí tổ chức'
    ],
    correctAnswer: 1,
    explanation: 'SGK Tập 2 tr.88 quy định: Cuối biên bản ghi thời gian kết thúc cuộc họp; người chủ trì và thư kí (cùng người làm chứng nếu cần) bắt buộc phải kí và ghi rõ họ tên để đảm bảo tính pháp lí.',
    hints: [
      'Biên bản là văn bản nhật dụng có giá trị làm chứng cứ sau này.',
      'Cần có sự xác thực bằng văn tự của hai người điều hành chính.'
    ],
    keyTakeaway: 'Biên bản ghi chép trung thực, khách quan diễn biến cuộc họp nhằm làm căn cứ pháp lí đáng tin cậy.',
    points: 30,
    enabled: true
  },

  // =========================================================================
  // TẬP 2 - BÀI 10: CUỐN SÁCH TÔI YÊU
  // =========================================================================
  {
    id: 't2-b10-vb-01',
    semester: 2,
    lesson: 10,
    lessonTitle: 'Bài 10: Cuốn sách tôi yêu',
    sourceText: 'Nhà thơ Lò Ngân Sủn – người con của núi (Minh Khoa - SGK Tập 2 tr.100-103)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Văn bản nghị luận văn học',
    prompt: 'Vì sao nhà thơ Lò Ngân Sủn được tác giả Minh Khoa trân trọng gọi là "người con của núi"?',
    options: [
      'Vì ông sinh ra và cả đời chỉ quanh quẩn trên đỉnh núi cao mà không đi đâu xa',
      'Vì thơ ông thấm đượm linh hồn, hơi thở, vóc dáng và vẻ đẹp hoang sơ, mãnh liệt của núi rừng quê hương Bản Xèo - Lào Cai',
      'Vì ông chỉ làm thơ viết về các loài cây mọc trên vách đá cheo leo',
      'Vì ông là người đầu tiên chinh phục đỉnh Fansipan'
    ],
    correctAnswer: 1,
    explanation: 'SGK Tập 2 tr.100 nêu rõ: "Đọc thơ Lò Ngân Sủn ta như được khám phá những đỉnh núi xa thơ mộng và mãnh liệt. Núi không chỉ là hình ảnh thường được nói đến trong thơ ông mà còn hiện lên như là một phần hồn thơ Lò Ngân Sủn".',
    hints: [
      'Hình ảnh núi rừng không chỉ là cảnh vật mà hoà quyện vào cốt cách thi sĩ.',
      'Các bài thơ như "Chiều biên giới", "Đi trên chín khúc Bản Xèo" là minh chứng.'
    ],
    keyTakeaway: 'Nghị luận văn học dùng lí lẽ sắc sảo và trích dẫn thơ xác đáng để làm sáng tỏ hồn cốt tư tưởng của tác giả, tác phẩm.',
    points: 20,
    enabled: true
  },
  {
    id: 't2-b10-tv-01',
    semester: 2,
    lesson: 10,
    lessonTitle: 'Bài 10: Cuốn sách tôi yêu',
    sourceText: 'Phụ lục 3: Bảng tra cứu yếu tố Hán Việt (SGK Tập 2 tr.113-120)',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_cao',
    gameType: 'o_cua_bi_mat',
    topic: 'Yếu tố Hán Việt phong phú trong SGK',
    prompt: 'Trong các cặp từ Hán Việt sau, cặp từ nào có yếu tố in nghiêng cùng mang nghĩa là "nước" (sông nước, chất lỏng)?',
    options: [
      'Thuỷ triều - Thuỷ thủ',
      'Đồng bào - Đồng hồ',
      'Quốc gia - Quốc lộ (quốc nghĩa là gia đình)',
      'Thần thánh - Tinh thần (thần nghĩa là thân thể)'
    ],
    correctAnswer: 0,
    explanation: 'Yếu tố "Thuỷ" trong "Thuỷ triều, thuỷ thủ, thuỷ phi cơ, thuỷ phủ" đều có nghĩa gốc Hán là nước hoặc liên quan đến sông biển (SGK Tập 2 tr.119).',
    hints: [
      'Sơn Tinh là thần Núi, Thuỷ Tinh là thần...',
      'Yếu tố này xuất hiện trong từ Thuỷ tinh, Thuỷ chiến, Thuỷ lộ.'
    ],
    keyTakeaway: 'Nắm vững 70 yếu tố Hán Việt trong phụ lục SGK giúp học sinh đọc hiểu văn bản nâng cao và làm giàu tiếng Việt một cách sâu sắc.',
    points: 40,
    enabled: true
  },
  {
    id: 't2-b10-sn-01',
    semester: 2,
    lesson: 10,
    lessonTitle: 'Bài 10: Cuốn sách tôi yêu',
    sourceText: 'Nói và nghe: Ngày hội với sách (SGK Tập 2 tr.106-107)',
    zone: 'san_khau_noi_va_nghe',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Kĩ năng thuyết trình giới thiệu cuốn sách',
    prompt: 'Khi tham gia "Ngày hội với sách" để giới thiệu một cuốn sách yêu thích, người nói cần chú ý điều gì để cuốn hút người nghe nhất?',
    options: [
      'Đọc thuộc lòng nguyên văn toàn bộ từng trang của cuốn sách',
      'Tóm tắt ngắn gọn chủ đề, chia sẻ cảm xúc tâm đắc nhất và kết hợp tranh ảnh / pô-xtơ minh họa',
      'Chỉ kể lại giá tiền và nhà xuất bản in cuốn sách đó',
      'Nói thật to liên tục và không cho người nghe đặt câu hỏi'
    ],
    correctAnswer: 1,
    explanation: 'SGK Tập 2 tr.106-107 hướng dẫn: Tóm lược vấn đề cốt lõi, sử dụng phương tiện trực quan (pô-xtơ, bìa sách tự thiết kế), thể hiện cảm xúc chân thành và lắng nghe phản hồi của người nghe.',
    hints: [
      'Thuyết trình cần có điểm nhấn cảm xúc và công cụ trực quan hỗ trợ.',
      'Mục đích là truyền cảm hứng và niềm đam mê đọc cho mọi người.'
    ],
    keyTakeaway: 'Kĩ năng nói và nghe đòi hỏi sự kết hợp hài hoà giữa ngôn ngữ nói, ánh mắt, cử chỉ và tinh thần tương tác cởi mở.',
    points: 20,
    enabled: true
  },

  // =========================================================================
  // BỔ SUNG CÂU HỎI TRỌNG TÂM CÁC BÀI ĐỂ ĐẠT 10 CÂU/BÀI
  // =========================================================================
  // BÀI 2: GÕ CỬA TRÁI TIM
  {
    id: 't1-b2-vb-03',
    semester: 1,
    lesson: 2,
    lessonTitle: 'Bài 2: Gõ cửa trái tim',
    sourceText: 'Bức tranh của em gái tôi (Tạ Duy Anh)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Tâm lý nhân vật và bài học nhân sinh',
    prompt: 'Trong truyện ngắn "Bức tranh của em gái tôi", vì sao khi đứng trước bức tranh đạt giải Nhất vẽ chính mình, người anh lại thấy "thoạt tiên là sự ngỡ ngàng, rồi đến hãnh diện, sau đó là xấu hổ"?',
    options: [
      'Ngỡ ngàng vì thấy mình quá đẹp, hãnh diện vì được giải, xấu hổ vì người xem chê bai',
      'Ngỡ ngàng vì em gái vẽ mình quá hoàn hảo; hãnh diện vì tình cảm em dành cho mình; xấu hổ vì nhận ra sự ích kỉ, ghen tị hẹp hòi của bản thân',
      'Xấu hổ vì bức tranh bị vẽ sai màu sắc và không giống người anh ngoài đời',
      'Hãnh diện vì bức tranh bán được nhiều tiền và được mọi người vỗ tay chúc mừng'
    ],
    correctAnswer: 1,
    explanation: 'Người anh xấu hổ vì nhận ra dưới mắt cô em gái nhân hậu, mình tuyệt vời đến thế, trong khi trước đó bản thân luôn đố kị, xa lánh em.',
    hints: [
      'Nhớ lại câu nói cuối truyện của người anh với mẹ về "tâm hồn và lòng nhân hậu của em con".',
      'Tình cảm trong sáng của em gái đã khiến người anh tự soi lại chính mình.'
    ],
    keyTakeaway: 'Tình cảm trong sáng, nhân hậu có sức mạnh cảm hóa và giúp con người vượt qua sự ghen ghét, ích kỉ.',
    points: 20,
    enabled: true
  },
  {
    id: 't1-b2-vb-04',
    semester: 1,
    lesson: 2,
    lessonTitle: 'Bài 2: Gõ cửa trái tim',
    sourceText: 'Chuyện cổ tích về loài người (Xuân Quỳnh)',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Đặc trưng thơ giàu yếu tố tự sự',
    prompt: 'Theo bài thơ "Chuyện cổ tích về loài người" của Xuân Quỳnh, ai là người sinh ra đầu tiên trên Trái Đất?',
    options: [
      'Người lớn sinh ra trước để khai phá mặt đất',
      'Trẻ con sinh ra trước hết, khi Trái Đất còn trần trụi, chưa có cây cỏ',
      'Mặt trời và chim muông sinh ra trước',
      'Thầy giáo và trường lớp sinh ra trước tiên'
    ],
    correctAnswer: 1,
    explanation: 'Khổ thơ đầu khẳng định: "Trời sinh ra trước nhất / Chỉ toàn là trẻ con / Trên Trái Đất trần trụi / Không dáng cây ngọn cỏ". Mọi sự vật sinh ra sau đều để yêu thương, chăm sóc trẻ em.',
    hints: [
      'Bài thơ thể hiện tình thương bao la của nhà thơ Xuân Quỳnh dành cho thế hệ măng non.',
      'Khổ thơ đầu tiên của bài thơ nói về sự xuất hiện đầu tiên này.'
    ],
    keyTakeaway: 'Thông điệp nhân văn: Thế giới được tạo dựng và hoàn thiện là để nâng niu, nuôi dưỡng trẻ thơ.',
    points: 10,
    enabled: true
  },
  {
    id: 't1-b2-tv-03',
    semester: 1,
    lesson: 2,
    lessonTitle: 'Bài 2: Gõ cửa trái tim',
    sourceText: 'Thực hành tiếng Việt - Bài 2',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'o_cua_bi_mat',
    topic: 'Biện pháp tu từ điệp ngữ và ẩn dụ',
    prompt: 'Trong bài thơ Mây và sóng, cụm từ "Con hỏi: ..." và "Mẹ mình đang đợi ở nhà..." được lặp lại có tác dụng tạo nhịp điệu và nhấn mạnh tình cảm thiêng liêng. Phép tu từ đó là gì?',
    options: [
      'Biện pháp tu từ Điệp ngữ (Điệp từ, điệp cấu trúc)',
      'Biện pháp tu từ Hoán dụ',
      'Biện pháp tu từ Nói quá',
      'Biện pháp tu từ Chơi chữ'
    ],
    correctAnswer: 0,
    explanation: 'Điệp từ ngữ (điệp ngữ) là biện pháp lặp lại một từ, cụm từ nhiều lần nhằm nhấn mạnh ý, tạo cảm xúc và tăng tính nhạc cho câu thơ.',
    hints: [
      'Biện pháp lặp lại từ ngữ nhiều lần để nhấn mạnh.',
      'Thường đi kèm với việc tạo nhịp điệu tha thiết cho lời thơ.'
    ],
    keyTakeaway: 'Điệp ngữ làm nổi bật sự gắn bó không thể tách rời giữa đứa con và người mẹ hiền.',
    points: 20,
    enabled: true
  },

  // BÀI 3: YÊU THƯƠNG VÀ CHIA SẺ
  {
    id: 't1-b3-vb-03',
    semester: 1,
    lesson: 3,
    lessonTitle: 'Bài 3: Yêu thương và chia sẻ',
    sourceText: 'Cô bé bán diêm (H. C. An-đéc-xen)',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Ý nghĩa các hình ảnh mộng tưởng',
    prompt: 'Trong truyện "Cô bé bán diêm", lần quẹt que diêm thứ tư đã đưa em bé đến với mộng tưởng kỳ diệu nào?',
    options: [
      'Một lò sưởi bằng sắt sáng rực ấm áp',
      'Bàn ăn thịnh soạn với ngỗng quay cắm dao dĩa nhảy múa',
      'Cây thông Nô-en lung linh với hàng ngàn ngọn nến sáng',
      'Hình ảnh người bà hiền từ hiện về mỉm cười với em'
    ],
    correctAnswer: 3,
    explanation: 'Lần quẹt thứ 4 em nhìn thấy bà nội hiền hậu hiện về. Vì sợ diêm tắt bà sẽ biến mất nên em đã quẹt hết tất cả những que diêm còn lại trong bao.',
    hints: [
      'Đây là người thân duy nhất từng yêu thương em sâu sắc nhưng đã qua đời.',
      'Em quẹt hết tất cả que diêm để giữ hình ảnh này ở lại.'
    ],
    keyTakeaway: 'Khát khao được yêu thương, che chở là ước nguyện thiêng liêng nhất của trẻ thơ bất hạnh.',
    points: 10,
    enabled: true
  },
  {
    id: 't1-b3-tv-03',
    semester: 1,
    lesson: 3,
    lessonTitle: 'Bài 3: Yêu thương và chia sẻ',
    sourceText: 'Thực hành tiếng Việt - Bài 3',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'ai_nhanh_hon',
    topic: 'Cụm danh từ và mở rộng thành phần câu',
    prompt: 'Trong câu: "Mẹ Sơn mở cái hòm gỗ đan bằng nan nứa lấy ra một chiếc áo bông cánh đã cũ nhưng còn lành", thành phần được in nghiêng "một chiếc áo bông cánh đã cũ nhưng còn lành" là loại cụm từ nào?',
    options: [
      'Cụm danh từ (có danh từ trung tâm là "chiếc áo")',
      'Cụm động từ (có động từ trung tâm là "mở")',
      'Cụm tính từ (có tính từ trung tâm là "lành")',
      'Cụm chủ vị độc lập'
    ],
    correctAnswer: 0,
    explanation: 'Đây là một cụm danh từ đầy đủ 3 phần: phần phụ trước ("một"), phần trung tâm ("chiếc áo"), phần phụ sau miêu tả ("bông cánh đã cũ nhưng còn lành").',
    hints: [
      'Từ cốt lõi chỉ đồ vật được nói tới là "áo / chiếc áo".',
      'Cụm từ này bắt đầu bằng từ chỉ số lượng "một".'
    ],
    keyTakeaway: 'Mở rộng thành phần câu bằng cụm từ giúp câu văn trở nên cụ thể, giàu chi tiết và hình ảnh miêu tả.',
    points: 20,
    enabled: true
  },

  // BÀI 4: QUÊ HƯƠNG YÊU DẤU
  {
    id: 't1-b4-vb-03',
    semester: 1,
    lesson: 4,
    lessonTitle: 'Bài 4: Quê hương yêu dấu',
    sourceText: 'Cây tre Việt Nam (Thép Mới)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Biểu tượng văn hóa dân tộc',
    prompt: 'Tác giả Thép Mới khẳng định cây tre là biểu tượng cho phẩm chất cao quý nào của người nông dân và dân tộc Việt Nam?',
    options: [
      'Cần cù, bất khuất, ngay thẳng, thuỷ chung và giàu lòng vị tha',
      'Yếu đuối, cam chịu trước mọi gian nan thử thách',
      'Xa hoa, kiêu kì và thích cuộc sống vương giả',
      'Chỉ có giá trị làm đồ dùng trong sản xuất nông nghiệp'
    ],
    correctAnswer: 0,
    explanation: 'Cây tre mộc mạc, nhũn nhặn, măng mọc thẳng, dẻo dai kiên cường chống giặc ngoại xâm - là hiện thân của tâm hồn và cốt cách con người Việt Nam.',
    hints: [
      'Nhớ câu kết văn bản: "Cây tre Việt Nam! Cây tre tươi nhũn nhặn, ngay thẳng, thuỷ chung, can đảm...".',
      'Tre gắn bó với nhân dân trong cả lao động sản xuất lẫn chiến đấu giữ nước.'
    ],
    keyTakeaway: 'Văn bản tuỳ bút của Thép Mới là khúc ca hào hùng ngợi ca cây tre và tâm hồn dân tộc.',
    points: 20,
    enabled: true
  },
  {
    id: 't1-b4-tv-03',
    semester: 1,
    lesson: 4,
    lessonTitle: 'Bài 4: Quê hương yêu dấu',
    sourceText: 'Thực hành tiếng Việt - Bài 4',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_cao',
    gameType: 'o_cua_bi_mat',
    topic: 'Từ đồng âm và từ đa nghĩa',
    prompt: 'Từ "chân" trong câu nào dưới đây mang NGHĨA CHUYỂN của từ đa nghĩa?',
    options: [
      'Em bé bị ngã đau ở bàn chân',
      'Dưới chân núi Ba Vì, mây trắng lững lờ trôi',
      'Cầu thủ sút bóng bằng chân trái rất điệu nghệ',
      'Bé tập đi từng bước chân chập chững'
    ],
    correctAnswer: 1,
    explanation: '"Chân núi" là nghĩa chuyển dựa trên cơ chế ẩn dụ: phần dưới cùng tiếp giáp với mặt đất, tương tự vị trí của chân người/động vật.',
    hints: [
      'Nghĩa gốc của "chân" là bộ phận nâng đỡ cơ thể người và động vật.',
      'Tìm vị trí phần dưới cùng của một ngọn núi.'
    ],
    keyTakeaway: 'Hiện tượng chuyển nghĩa của từ đa nghĩa giúp ngôn ngữ biểu đạt sinh động và phong phú hơn.',
    points: 40,
    enabled: true
  },

  // BÀI 5: NHỮNG NẺO ĐƯỜNG XỨ SỞ
  {
    id: 't1-b5-vb-03',
    semester: 1,
    lesson: 5,
    lessonTitle: 'Bài 5: Những nẻo đường xứ sở',
    sourceText: 'Cô Tô (Nguyễn Tuân)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Nghệ thuật miêu tả cảnh bình minh trên biển',
    prompt: 'Trong tác phẩm "Cô Tô", Nguyễn Tuân đã so sánh mặt trời mọc trên biển Đông với hình ảnh độc đáo nào?',
    options: [
      'Một mâm đồng đỏ ối lơ lửng giữa trời',
      'Lòng đỏ một quả trứng thiên nhiên đầy đặn, đặt trên một mâm bạc đường kính mâm rộng bằng cả một cái chân trời',
      'Một chiếc đèn lồng khổng lồ đang từ từ nhô lên từ sóng biếc',
      'Một hòn ngọc bích lấp lánh phản chiếu ánh ban mai'
    ],
    correctAnswer: 1,
    explanation: 'Nguyễn Tuân sử dụng hình ảnh so sánh tài hoa: "Mặt trời nhú lên dần dần... tròn trĩnh phúc hậu như lòng đỏ một quả trứng thiên nhiên đầy đặn... đĩa bạc... đường kính mâm rộng bằng cả một cái chân trời màu ngọc trai".',
    hints: [
      'Hình ảnh so sánh kết hợp giữa quả trứng và chiếc mâm ngọc trai khổng lồ.',
      'Gợi liên tưởng đến bữa tiệc thịnh soạn của thiên nhiên tạo vật.'
    ],
    keyTakeaway: 'Nguyễn Tuân là bậc thầy về ngôn từ, luôn quan sát và miêu tả cảnh vật ở góc độ thẩm mĩ kì vĩ, tuyệt mĩ.',
    points: 20,
    enabled: true
  },
  {
    id: 't1-b5-tv-02',
    semester: 1,
    lesson: 5,
    lessonTitle: 'Bài 5: Những nẻo đường xứ sở',
    sourceText: 'Thực hành tiếng Việt - Bài 5',
    zone: 'tham_hiem_tieng_viet',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Công dụng của dấu ngoặc kép',
    prompt: 'Trong văn bản kí du lịch, dấu ngoặc kép (" ") KHÔNG có công dụng nào sau đây?',
    options: [
      'Đánh dấu từ ngữ được trích dẫn trực tiếp',
      'Đánh dấu từ ngữ được hiểu theo nghĩa đặc biệt hoặc mang hàm ý mỉa mai',
      'Đánh dấu tên của tác phẩm, tài liệu được trích dẫn',
      'Đánh dấu kết thúc một câu trần thuật'
    ],
    correctAnswer: 3,
    explanation: 'Dấu kết thúc câu trần thuật là dấu chấm (.) chứ không phải dấu ngoặc kép.',
    hints: [
      'Dấu ngoặc kép luôn đi theo cặp gồm mở ngoặc và đóng ngoặc.',
      'Dấu kết thúc câu trần thuật thông thường là dấu chấm.'
    ],
    keyTakeaway: 'Nắm chắc công dụng dấu ngoặc kép giúp diễn đạt chính xác ngữ nghĩa và sắc thái văn phong.',
    points: 10,
    enabled: true
  },

  // BÀI 6: CHUYỆN KỂ VỀ NHỮNG NGƯỜI ANH HÙNG
  {
    id: 't2-b6-vb-03',
    semester: 2,
    lesson: 6,
    lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng',
    sourceText: 'Thánh Gióng (Truyền thuyết)',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Chi tiết kì ảo trong truyền thuyết',
    prompt: 'Chi tiết nào sau đây thể hiện rõ nhất sức mạnh phi thường và tinh thần đoàn kết toàn dân nuôi dưỡng người anh hùng làng Gióng?',
    options: [
      'Gióng ăn mãi không no, áo vừa may xong đã chật, cả làng gom góp gạo nuôi chú bé',
      'Gióng biết nói câu đầu tiên xin một con dao nhỏ để gọt củ khoai',
      'Gióng từ chối nhận giáp sắt của nhà vua ban cho',
      'Gióng đòi đi bộ ra trận một mình'
    ],
    correctAnswer: 0,
    explanation: 'Chi tiết cả dân làng gom gạo nuôi Gióng chứng minh người anh hùng sinh ra từ nhân dân, lớn lên bằng hạt gạo của toàn thể cộng đồng để gánh vác sứ mệnh cứu nước.',
    hints: [
      'Gióng là biểu tượng của tinh thần toàn dân đánh giặc.',
      'Sức mạnh của người anh hùng được nuôi dưỡng từ sự đồng lòng của bà con dân làng.'
    ],
    keyTakeaway: 'Hình tượng Thánh Gióng kết tinh sức mạnh quật khởi, đoàn kết và ước mơ chiến thắng giặc ngoại xâm của dân tộc ta.',
    points: 10,
    enabled: true
  },
  {
    id: 't2-b6-tv-02',
    semester: 2,
    lesson: 6,
    lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng',
    sourceText: 'Thực hành tiếng Việt - Bài 6',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'giai_cuu_nhan_vat',
    topic: 'Trạng ngữ và công dụng của trạng ngữ',
    prompt: 'Xác định loại trạng ngữ in nghiêng trong câu: "Để chuẩn bị đánh giặc, nhà vua truyền lệnh cho thợ rèn ngày đêm đúc ngựa sắt và áo giáp sắt."',
    options: [
      'Trạng ngữ chỉ nơi chốn',
      'Trạng ngữ chỉ thời gian',
      'Trạng ngữ chỉ mục đích',
      'Trạng ngữ chỉ phương tiện'
    ],
    correctAnswer: 2,
    explanation: '"Để chuẩn bị đánh giặc" bắt đầu bằng quan hệ từ "để", trả lời cho câu hỏi "Nhằm mục đích gì?", nên là trạng ngữ chỉ mục đích.',
    hints: [
      'Dấu hiệu: Bắt đầu bằng từ "để", "nhằm".',
      'Nêu lên mục tiêu hướng tới của hành động được nói ở vế sau.'
    ],
    keyTakeaway: 'Trạng ngữ bổ sung thông tin về thời gian, địa điểm, mục đích, nguyên nhân... giúp câu văn mạch lạc, chặt chẽ.',
    points: 20,
    enabled: true
  },

  // BÀI 7: THẾ GIỚI CỔ TÍCH
  {
    id: 't2-b7-vb-03',
    semester: 2,
    lesson: 7,
    lessonTitle: 'Bài 7: Thế giới cổ tích',
    sourceText: 'Cây khế (Truyện cổ tích thần kì)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Ước mơ công lý trong truyện cổ tích',
    prompt: 'Trong truyện cổ tích "Cây khế", kết cục của người anh trai tham lam rớt xuống biển phản ánh quy luật đạo đức nào của nhân dân ta?',
    options: [
      'Ác giả ác báo, gieo gió gặt bão, kẻ tham lam ích kỉ sẽ chuốc lấy tai họa',
      'Số phận may rủi trong cuộc sống buôn bán',
      'Chim thần không biết giữ lời hứa khi bay qua biển',
      'Túi chín gang quá nhẹ nên không bay được'
    ],
    correctAnswer: 0,
    explanation: 'Truyện thể hiện niềm tin vào đạo lý "ở hiền gặp lành, ác giả ác báo": người em lương thiện được chim thần trả ơn vàng bạc, người anh tham may túi chín gang vơ vét vàng để rồi rơi xuống biển sâu.',
    hints: [
      'Đây là triết lý bất diệt trong mọi truyện cổ tích thần kì.',
      'Người ở hiền thì gặp lành, kẻ ác và tham lam thì bị trừng phạt.'
    ],
    keyTakeaway: 'Truyện cổ tích là tiếng nói công lý của nhân dân lao động, răn dạy con người sống trung thực, không tham lam.',
    points: 20,
    enabled: true
  },
  {
    id: 't2-b7-tv-02',
    semester: 2,
    lesson: 7,
    lessonTitle: 'Bài 7: Thế giới cổ tích',
    sourceText: 'Thực hành tiếng Việt - Bài 7',
    zone: 'tham_hiem_tieng_viet',
    level: 'nhan_biet',
    gameType: 'o_cua_bi_mat',
    topic: 'Thành ngữ dân gian bắt nguồn từ truyện cổ tích',
    prompt: 'Thành ngữ nào dưới đây bắt nguồn từ câu chuyện cổ tích quen thuộc cùng tên, khuyên nhủ con người biết ơn người đã giúp đỡ mình và không được tham lam?',
    options: [
      'Ăn khế trả vàng',
      'Nước chảy đá mòn',
      'Uống nước nhớ nguồn',
      'Có công mài sắt có ngày nên kim'
    ],
    correctAnswer: 0,
    explanation: 'Thành ngữ "Ăn khế trả vàng" đúc kết từ câu hát của chim thần trong truyện Cây khế: "Ăn một quả, trả cục vàng, may túi ba gang, mang đi mà đựng".',
    hints: [
      'Tên một loại quả chua có múi khía hình ngôi sao.',
      'Chim thần dặn may túi ba gang để đựng vật này.'
    ],
    keyTakeaway: 'Thành ngữ là kho tàng kinh nghiệm dân gian ngắn gọn, hàm súc và giàu hình ảnh biểu cảm.',
    points: 10,
    enabled: true
  },

  // BÀI 8: KHÁC BIỆT VÀ GẦN GŨI
  {
    id: 't2-b8-vb-03',
    semester: 2,
    lesson: 8,
    lessonTitle: 'Bài 8: Khác biệt và gần gũi',
    sourceText: 'Hai loại khác biệt (Gia-nơ P. Brô-sơ)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Nghị luận xã hội về sự khẳng định cá tính',
    prompt: 'Theo tác giả Gia-nơ P. Brô-sơ trong văn bản "Hai loại khác biệt", sự khác biệt có ý nghĩa thực sự được tạo nên từ điều gì?',
    options: [
      'Ăn mặc kì quặc, nhuộm tóc sặc sỡ và cố tình làm trái quy định tập thể',
      'Bộc lộ năng lực thực chất, suy nghĩ độc lập, lòng nhân hậu và mang lại giá trị tốt đẹp cho người khác',
      'Nói thật to trong lớp để gây chú ý của bạn bè',
      'Luôn luôn bắt chước theo những người nổi tiếng trên mạng xã hội'
    ],
    correctAnswer: 1,
    explanation: 'Tác giả phân biệt 2 loại: khác biệt vô nghĩa (chỉ là bề ngoài lập dị) và khác biệt có ý nghĩa (bắt nguồn từ nội lực, trí tuệ và sự cống hiến chân chính).',
    hints: [
      'Sự khác biệt đích thực phải bắt nguồn từ bên trong nhân cách, trí tuệ.',
      'Khác biệt mang lại lợi ích và giá trị tích cực cho cộng đồng.'
    ],
    keyTakeaway: 'Khác biệt không phải là khác người một cách kì quặc, mà là tự tin phát huy thế mạnh riêng để đóng góp cho cuộc đời.',
    points: 20,
    enabled: true
  },
  {
    id: 't2-b8-tv-02',
    semester: 2,
    lesson: 8,
    lessonTitle: 'Bài 8: Khác biệt và gần gũi',
    sourceText: 'Thực hành tiếng Việt - Bài 8',
    zone: 'tham_hiem_tieng_viet',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Đặc điểm văn bản nghị luận',
    prompt: 'Ba yếu tố cốt lõi không thể thiếu để tạo nên sức thuyết phục của một văn bản nghị luận là gì?',
    options: [
      'Ý kiến, Lí lẽ và Bằng chứng (dẫn chứng)',
      'Cốt truyện, Nhân vật và Chi tiết kì ảo',
      'Vần, Nhịp và Thanh điệu của câu thơ',
      'Mở bài, Thân bài và Kết bài tả cảnh thiên nhiên'
    ],
    correctAnswer: 0,
    explanation: 'Văn bản nghị luận bày tỏ ý kiến về một vấn đề đời sống/văn học, sử dụng hệ thống lí lẽ xác đáng và bằng chứng thực tế thuyết phục để chứng minh.',
    hints: [
      'Nghị luận dùng trí tuệ và lập luận để thuyết phục người đọc.',
      'Bao gồm: quan điểm, nguyên nhân giải thích tại sao và ví dụ thực tế.'
    ],
    keyTakeaway: 'Ý kiến là quan điểm; Lí lẽ là lời giải thích tại sao; Bằng chứng là số liệu/ví dụ thực tế chứng minh.',
    points: 10,
    enabled: true
  },

  // BÀI 9: TRÁI ĐẤT – NGÔI NHÀ CHUNG
  {
    id: 't2-b9-vb-03',
    semester: 2,
    lesson: 9,
    lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung',
    sourceText: 'Trái Đất – cái nôi của sự sống (Xuân Huỳnh)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Văn bản thông tin về môi trường Trái Đất',
    prompt: 'Trong văn bản "Trái Đất – cái nôi của sự sống", yếu tố nào được tác giả khẳng định là "vị thần hộ mệnh" quyết định sự sinh tồn của muôn loài trên hành tinh xanh?',
    options: [
      'Kim loại quý và dầu mỏ sâu trong lòng đất',
      'Nước - bao phủ tới 3/4 bề mặt Trái Đất',
      'Những ngọn núi cao phủ đầy băng tuyết',
      'Các loài động vật ăn cỏ'
    ],
    correctAnswer: 1,
    explanation: 'Văn bản nêu rõ nước là vị thần hộ mệnh của sự sống; nhờ có nước mà Trái Đất là nơi duy nhất trong hệ Mặt Trời có sự sống phong phú diệu kì.',
    hints: [
      'Bao phủ khoảng 3/4 diện tích bề mặt hành tinh, nuôi dưỡng mọi tế bào sống.',
      'Chất lỏng trong suốt không màu không mùi cần thiết cho mọi sinh vật.'
    ],
    keyTakeaway: 'Bảo vệ nguồn nước và thiên nhiên là nhiệm vụ sống còn để gìn giữ hành tinh của chúng ta.',
    points: 20,
    enabled: true
  },
  {
    id: 't2-b9-tv-02',
    semester: 2,
    lesson: 9,
    lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung',
    sourceText: 'Thực hành tiếng Việt - Bài 9',
    zone: 'tham_hiem_tieng_viet',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Công dụng của dấu chấm lửng',
    prompt: 'Trong câu: "Môi trường sống của các loài bao gồm: rừng nhiệt đới, thảo nguyên, đầm lầy, đại dương...", dấu chấm lửng (...) có công dụng gì?',
    options: [
      'Biểu thị lời nói ngập ngừng, đứt quãng vì xúc động',
      'Tỏ ý còn nhiều sự vật, hiện tượng tương tự chưa liệt kê hết',
      'Làm giãn nhịp điệu câu văn để chuẩn bị cho từ ngữ hài hước',
      'Báo hiệu lời nói của một nhân vật chuẩn bị cất lên'
    ],
    correctAnswer: 1,
    explanation: 'Dấu chấm lửng ở cuối phép liệt kê biểu thị rằng còn nhiều sự vật, môi trường khác nữa chưa được kể hết.',
    hints: [
      'Theo sau chuỗi liệt kê các danh từ chỉ môi trường sống.',
      'Báo hiệu rằng danh sách vẫn còn có thể tiếp tục kéo dài.'
    ],
    keyTakeaway: 'Dấu chấm lửng (ba chấm) là dấu câu linh hoạt dùng trong liệt kê, diễn tả ngữ điệu hoặc tạo khoảng lặng cảm xúc.',
    points: 10,
    enabled: true
  },

  // BÀI 10: CUỐN SÁCH TÔI YÊU
  {
    id: 't2-b10-vb-02',
    semester: 2,
    lesson: 10,
    lessonTitle: 'Bài 10: Cuốn sách tôi yêu',
    sourceText: 'Đọc mở rộng theo thể loại (SGK Tập 2 tr.100-105)',
    zone: 'kham_pha_van_ban',
    level: 'van_dung_thap',
    gameType: 'ai_nhanh_hon',
    topic: 'Phương pháp đọc sách hiệu quả',
    prompt: 'Khi đọc một cuốn sách truyện dài hoặc tác phẩm văn học lớn, học sinh nên áp dụng phương pháp nào để hiểu sâu và ghi nhớ lâu nhất?',
    options: [
      'Đọc lướt thật nhanh chỉ xem trang đầu và trang cuối rồi gấp lại',
      'Lập Nhật kí đọc sách (ghi tóm tắt, trích dẫn câu văn hay, nhân vật tâm đắc) và vẽ sơ đồ tư duy',
      'Học thuộc lòng từng chữ của tất cả các chương trong cuốn sách',
      'Chỉ xem tranh minh họa không cần đọc chữ'
    ],
    correctAnswer: 1,
    explanation: 'SGK Bài 10 hướng dẫn phương pháp "Nhật kí đọc sách", ghi lại cảm nhận, lập thẻ thông tin tác phẩm và chia sẻ cùng bạn bè.',
    hints: [
      'Đây là kĩ năng tự học quan trọng trong chương trình GDPT 2018.',
      'Ghi chép lại các chi tiết tâm đắc và cảm xúc khi đọc sách.'
    ],
    keyTakeaway: 'Nhật kí đọc sách giúp biến tri thức trong trang sách thành vốn văn hóa cá nhân của chính mình.',
    points: 20,
    enabled: true
  },
  {
    id: 't2-b7-vb-04',
    semester: 2,
    lesson: 7,
    lessonTitle: 'Bài 7: Thế giới cổ tích',
    sourceText: 'Vua chích choè (Truyện cổ Grim - SGK Tập 2 tr.38-42)',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Bài học giáo dục nhân cách trong truyện cổ Grim',
    prompt: 'Trong truyện cổ tích "Vua chích choè", chàng vua trẻ đã đóng giả làm người hát rong nghèo khổ để làm gì?',
    options: [
      'Để trả thù và trừng phạt nàng công chúa kiêu ngạo đến suốt đời',
      'Để rèn luyện, cảm hoá và giúp nàng công chúa kiêu căng nhận ra giá trị của lao động và lòng khiêm tốn',
      'Vì vương quốc của chàng đã bị kẻ thù cướp mất ngai vàng',
      'Để tìm kiếm kho báu bị chôn giấu trong khu chợ'
    ],
    correctAnswer: 1,
    explanation: 'Vua chích choè dùng sự kiên nhẫn và tình yêu thương để dạy cho nàng công chúa bài học về thói kiêu căng coi thường người khác, giúp nàng trở thành người khiêm nhường, biết trân trọng người lao động.',
    hints: [
      'Chàng thử thách nàng bằng những công việc lao động vất vả như đan sọt, dệt vải, bán nồi niêu.',
      'Mục đích là giúp nàng nhận ra sai lầm của thói kiêu căng để trở nên tốt đẹp hơn.'
    ],
    keyTakeaway: 'Uốn nắn tính kiêu ngạo và thói xấu cần sự kiên trì, tình yêu thương và sự trải nghiệm gian khổ.',
    points: 20,
    enabled: true
  },
  {
    id: 't2-b10-vt-01',
    semester: 2,
    lesson: 10,
    lessonTitle: 'Bài 10: Cuốn sách tôi yêu',
    sourceText: 'Viết: Viết bài văn trình bày ý kiến về một hiện tượng trong đời sống (SGK Tập 2 tr.104)',
    zone: 'xuong_viet_sang_tao',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Quy trình viết bài nghị luận văn học / xã hội',
    prompt: 'Trước khi viết bài văn giới thiệu về cuốn sách yêu thích hoặc nêu ý kiến về văn hóa đọc sách, bước đầu tiên em cần thực hiện là gì?',
    options: [
      'Cầm bút viết ngay phần Thân bài càng dài càng tốt',
      'Xác định mục đích viết, đối tượng người đọc và tìm ý, lập dàn ý cho bài viết',
      'Chỉ cần sao chép y nguyên lời giới thiệu ở bìa sau của cuốn sách',
      'Vẽ tranh minh họa thật đẹp rồi nộp bài'
    ],
    correctAnswer: 1,
    explanation: 'Quy trình viết 4 bước theo SGK: 1. Trước khi viết (xác định đề tài, mục đích, thu thập tư liệu, lập dàn ý) -> 2. Viết bài -> 3. Chỉnh sửa và hoàn thiện.',
    hints: [
      'Lập dàn ý giúp bài viết không bị lạc đề hay lặp ý.',
      'Bước này thực hiện trước khi đặt bút viết bài hoàn chỉnh.'
    ],
    keyTakeaway: 'Lập dàn ý là chìa khóa để bài viết nghị luận có bố cục chặt chẽ, luận điểm rõ ràng và lập luận sắc bén.',
    points: 20,
    enabled: true
  }
];
