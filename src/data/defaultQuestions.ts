import { Question } from '../types';
import { TEXTBOOK_LESSONS } from './lessonsData';
import { TEXTBOOK_QUESTIONS } from './textbookQuestions';
import { CURRICULUM_NEW_QUESTIONS } from './curriculumNewQuestions';

export { TEXTBOOK_LESSONS, CURRICULUM_NEW_QUESTIONS };

const RAW_DEFAULT_QUESTIONS: Question[] = [
  // ==========================================
  // KHU VỰC 1: KHÁM PHÁ VĂN BẢN (16 CÂU)
  // ==========================================
  {
    id: 'vb-01',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Truyện đồng thoại',
    prompt: 'Văn bản "Bài học đường đời đầu tiên" được trích từ tác phẩm nổi tiếng nào của nhà văn Tô Hoài?',
    options: [
      'Đất rừng phương Nam',
      'Dế Mèn phiêu lưu kí',
      'Vừa nhắm mắt vừa mở cửa sổ',
      'Tuổi thơ dữ dội'
    ],
    correctAnswer: 1, // Dế Mèn phiêu lưu kí
    explanation: '"Bài học đường đời đầu tiên" trích từ chương I của tác phẩm kinh điển "Dế Mèn phiêu lưu kí" (sáng tác năm 1941) của nhà văn Tô Hoài.',
    hints: [
      'Tác phẩm kể về chuyến chu du mạo hiểm của một chú dế.',
      'Tên nhân vật chính là một loài côn trùng có càng và tiếng kêu rỉ rả.'
    ],
    keyTakeaway: 'Truyện đồng thoại là thể loại truyện viết cho thiếu nhi, nhân vật thường là loài vật hoặc đồ vật được nhân hóa sinh động.',
    points: 10,
    enabled: true
  },
  {
    id: 'vb-02',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ghep_doi',
    topic: 'Đặc trưng thể loại văn học',
    prompt: 'Em hãy ghép từng thể loại văn học với đặc trưng tiêu biểu nhất của thể loại đó:',
    matchingPairs: [
      { id: 'm1', left: 'Truyện đồng thoại', right: 'Nhân vật loài vật mang đặc tính người' },
      { id: 'm2', left: 'Thơ có yếu tố tự sự', right: 'Giàu nhạc tính, cảm xúc gắn liền sự việc' },
      { id: 'm3', left: 'Văn bản thông tin', right: 'Cung cấp dữ liệu, sự thật khách quan' },
      { id: 'm4', left: 'Văn bản nghị luận', right: 'Bày tỏ ý kiến bằng lí lẽ và dẫn chứng' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Mỗi thể loại văn học lớp 6 có đặc trưng riêng về phương thức biểu đạt, đối tượng phản ánh và cấu trúc nghệ thuật.',
    hints: [
      'Truyện đồng thoại gắn với nhân vật loài vật được nhân hóa.',
      'Nghị luận thuyết phục người đọc bằng hệ thống luận điểm và dẫn chứng xác thực.'
    ],
    keyTakeaway: 'Nắm vững đặc trưng thể loại là chìa khóa then chốt để đọc hiểu văn bản đúng hướng.',
    points: 10,
    enabled: true
  },
  {
    id: 'vb-03',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Ngôi kể và tác dụng',
    context: '“Tôi sống độc lập từ thuở bé. Ấy là tục lệ lâu đời trong họ dế chúng tôi...”',
    prompt: 'Đoạn văn trên sử dụng ngôi kể thứ mấy và mang lại tác dụng nghệ thuật gì?',
    options: [
      'Ngôi thứ ba - tạo sự khách quan toàn tri của người dẫn chuyện giấu mình.',
      'Ngôi thứ nhất - giúp nhân vật bộc lộ trực tiếp tâm trạng, suy nghĩ một cách chân thực, gần gũi.',
      'Ngôi thứ hai - nhằm lôi cuốn trực tiếp người đọc tham gia câu chuyện.',
      'Ngôi thứ nhất - nhưng người kể chuyện là tác giả Tô Hoài đóng vai người quan sát.'
    ],
    correctAnswer: 1,
    explanation: 'Ngôi thứ nhất xưng "tôi" (Dế Mèn) giúp câu chuyện trở nên sống động, người đọc như được nghe chính nhân vật bộc bạch về bản thân.',
    hints: [
      'Chú ý đại từ nhân xưng xưng "tôi" trong đoạn trích.',
      'Ngôi thứ nhất giúp tăng tính chân thực và tính trải nghiệm cá nhân.'
    ],
    keyTakeaway: 'Ngôi kể thứ nhất xưng "tôi" tạo cảm giác thân mật, tự nhiên và bộc lộ nội tâm nhân vật sâu sắc.',
    points: 20,
    enabled: true
  },
  {
    id: 'vb-04',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'o_cua_bi_mat',
    topic: 'Văn bản "Cô bé bán diêm"',
    prompt: 'Trong truyện "Cô bé bán diêm" (Andersen), mộng tưởng nào xuất hiện khi em quẹt que diêm thứ hai?',
    options: [
      'Lò sưởi bằng sắt sáng rực, ấm áp.',
      'Bàn ăn thịnh soạn với con ngỗng quay thơm phức.',
      'Cây thông Noel lộng lẫy ngập tràn nến sáng.',
      'Người bà hiền hậu mỉm cười đón em đi.'
    ],
    correctAnswer: 1, // Con ngỗng quay
    explanation: 'Lần quẹt diêm thứ nhất em thấy lò sưởi ấm; lần quẹt thứ hai em thấy bàn ăn với đĩa ngỗng quay phản ánh nỗi khát khao được ăn no khi đang đói lả.',
    hints: [
      'Em bé đang vừa rét vừa đói cồn cào giữa đêm giao thừa.',
      'Hình ảnh này gắn liền với món ăn truyền thống đêm giáng sinh phương Tây.'
    ],
    keyTakeaway: 'Những giấc mơ của cô bé bán diêm phản chiếu các nhu cầu căn bản và nỗi thiếu thốn xót xa của tuổi thơ bất hạnh.',
    points: 20,
    enabled: true
  },
  {
    id: 'vb-05',
    zone: 'kham_pha_van_ban',
    level: 'van_dung_thap',
    gameType: 'sap_xep_sieu_toc',
    topic: 'Trình tự diễn biến câu chuyện',
    prompt: 'Hãy sắp xếp các sự việc sau theo đúng trình tự diễn biến trong đoạn trích "Bài học đường đời đầu tiên":',
    sequenceItems: [
      { id: 's1', text: 'Dế Mèn tự hào về vẻ đẹp cường tráng và tính kiêu ngạo của mình.', correctIndex: 0 },
      { id: 's2', text: 'Dế Mèn sang nhà Dế Choắt chê bai, từ chối giúp bạn đào ngách.', correctIndex: 1 },
      { id: 's3', text: 'Dế Mèn trêu chị Cốc rồi chui tọt vào hang lẩn trốn.', correctIndex: 2 },
      { id: 's4', text: 'Chị Cốc mổ oan Dế Choắt khiến Choắt kiệt sức qua đời.', correctIndex: 3 },
      { id: 's5', text: 'Dế Mèn hối hận, chôn cất bạn và rút ra bài học đường đời.', correctIndex: 4 }
    ],
    correctAnswer: 'ordered',
    explanation: 'Trình tự sự việc phát triển từ tính kiêu ngạo -> hành động dại dột trêu chị Cốc -> hậu quả bi thảm -> sự ân hận sâu sắc.',
    hints: [
      'Sự việc mở đầu bằng màn giới thiệu ngoại hình oai vệ của Dế Mèn.',
      'Kết thúc là nấm mồ Dế Choắt và nỗi ân hận muộn màng của Dế Mèn.'
    ],
    keyTakeaway: 'Cốt truyện tự sự thường vận động theo chuỗi nhân quả: nguyên nhân -> hành động -> hậu quả -> nhận thức.',
    points: 30,
    enabled: true
  },
  {
    id: 'vb-06',
    zone: 'kham_pha_van_ban',
    level: 'van_dung_thap',
    gameType: 'giai_cuu_nhan_vat',
    topic: 'Văn bản "Gió lạnh đầu mùa"',
    prompt: 'Hành động hai chị em Sơn và Lan đem chiếc áo bông cũ cho cái Hiên trong "Gió lạnh đầu mùa" (Thạch Lam) thể hiện phẩm chất gì?',
    options: [
      'Sự hoang phí, chưa biết quý trọng tài sản gia đình.',
      'Tấm lòng nhân hậu, biết sẻ chia và yêu thương những người bạn nghèo khó.',
      'Mong muốn được mẹ và mọi người trong xóm khen ngợi.',
      'Tâm lí tò mò trẻ con muốn mang đồ cho người khác thử.'
    ],
    correctAnswer: 1,
    explanation: 'Hành động vô tư đem áo ấm cho bạn của chị em Sơn xuất phát từ lòng trắc ẩn tự nhiên, sự đồng cảm và tình thương chân thành giữa trẻ thơ.',
    hints: [
      'Hai đứa trẻ nhìn thấy bạn Hiên đứng co ro bên cột quán gió rét căm căm.',
      'Tình cảm này mang tính nhân văn sâu sắc trong trang văn Thạch Lam.'
    ],
    keyTakeaway: 'Văn học khơi gợi lòng trắc ẩn, dạy chúng ta biết quan tâm và chia sẻ hơi ấm tình người với hoàn cảnh khó khăn.',
    points: 30,
    enabled: true
  },
  {
    id: 'vb-07',
    zone: 'kham_pha_van_ban',
    level: 'van_dung_cao',
    gameType: 'vuot_me_cung',
    topic: 'Thông điệp nhân sinh từ tác phẩm',
    prompt: 'Từ cái chết xót xa của Dế Choắt, bài học lớn nhất mà mỗi học sinh lớp 6 cần rút ra cho bản thân trong giao tiếp hàng ngày là gì?',
    options: [
      'Không nên kết bạn với những người yếu đuối, ốm yếu.',
      'Phải luôn bảo vệ bản thân trước nguy hiểm bằng mọi giá.',
      'Thói kiêu căng, ngạo mạn và những trò đùa vô ý thức có thể gây ra hậu quả khôn lường cho người khác.',
      'Chỉ giúp đỡ bạn bè khi mình có đầy đủ điều kiện vật chất.'
    ],
    correctAnswer: 2,
    explanation: 'Lời trăng trối của Dế Choắt nhắc nhở ta: ở đời mà có thói hung hăng bậy bạ, có óc mà không biết suy nghĩ thì sớm muộn cũng mang vạ vào mình và làm hại người vô tội.',
    hints: [
      'Trò đùa nông nổi của Dế Mèn đã cướp đi sinh mạng của Dế Choắt.',
      'Liên hệ với trách nhiệm về lời nói và hành vi của mỗi người.'
    ],
    keyTakeaway: 'Sống khiêm tốn, biết đặt mình vào hoàn cảnh của người khác và suy nghĩ chín chắn trước khi hành động.',
    points: 40,
    enabled: true
  },
  {
    id: 'vb-08',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Thơ ca - "Chuyện cổ tích về loài người"',
    prompt: 'Trong bài thơ "Chuyện cổ tích về loài người" của nhà thơ Xuân Quỳnh, ai là đối tượng sinh ra đầu tiên trên Trái Đất?',
    options: [
      'Bố mẹ',
      'Thầy giáo',
      'Trẻ con',
      'Bà nội'
    ],
    correctAnswer: 2, // Trẻ con
    explanation: 'Bài thơ mở đầu: "Trời sinh ra trước nhất / Chỉ toàn là trẻ con / Không một ngọn cỏ cây / Mặt trời chưa nhen nhóm...". Xuân Quỳnh khẳng định trẻ em sinh ra trước nhất và vạn vật sinh ra để nuôi dưỡng, yêu thương trẻ.',
    hints: [
      'Hình ảnh những đôi mắt trong veo, đôi bàn chân trần chập chững.',
      'Tất cả thiên nhiên và con người xuất hiện sau để chở che cho đối tượng này.'
    ],
    keyTakeaway: 'Bài thơ ngợi ca tình yêu thương bao la và khẳng định trẻ thơ là trung tâm của thế giới, cần được chăm sóc nâng niu.',
    points: 10,
    enabled: true
  },
  {
    id: 'vb-09',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Văn bản "Mây và sóng" (R. Ta-go)',
    prompt: 'Vì sao em bé trong bài thơ "Mây và sóng" (Ta-go) từ chối những cuộc vui hấp dẫn của người trên mây và trong sóng?',
    options: [
      'Vì em bé sợ nguy hiểm khi bay lên trời cao hay lặn xuống biển sâu.',
      'Vì em yêu mẹ sâu sắc, không muốn xa mẹ dù chỉ trong chốc lát.',
      'Vì người trên mây và trong sóng không chỉ cho em cách quay về nhà.',
      'Vì em bé mải chơi các trò chơi khác ở trên mặt đất.'
    ],
    correctAnswer: 1,
    explanation: 'Dù lời mời gọi rất kì diệu và mê hoặc, nhưng câu hỏi "Làm sao tôi có thể rời mẹ mà đến được?" thể hiện tình mẫu tử thiêng liêng, gắn bó tha thiết hơn bất kì trò vui nào.',
    hints: [
      'Em bé luôn nghĩ đến mẹ đang đợi mình ở nhà vào mỗi buổi chiều.',
      'Tình cảm gia đình là bến đỗ bình yên nhất.'
    ],
    keyTakeaway: 'Tình mẫu tử thiêng liêng giúp con người vượt qua mọi cám dỗ và tìm thấy niềm vui trong vòng tay gia đình.',
    points: 20,
    enabled: true
  },
  {
    id: 'vb-10',
    zone: 'kham_pha_van_ban',
    level: 'van_dung_thap',
    gameType: 'vong_quay_may_man',
    topic: 'Văn bản thông tin',
    prompt: 'Mục đích chính của văn bản thông tin (ví dụ: bài giới thiệu danh lam thắng cảnh, hang động như "Hang Én") là gì?',
    options: [
      'Kể một câu chuyện tưởng tượng hấp dẫn li kì.',
      'Cung cấp thông tin xác thực, hữu ích về đặc điểm, nguồn gốc và giá trị của đối tượng.',
      'Bộc lộ cảm xúc chủ quan, bay bổng của tác giả.',
      'Thuyết phục người đọc thay đổi quan điểm chính trị xã hội.'
    ],
    correctAnswer: 1,
    explanation: 'Văn bản thông tin hướng đến việc cung cấp kiến thức, dữ liệu khách quan, chính xác để người đọc hiểu rõ về một hiện tượng, địa danh hoặc quy trình.',
    hints: [
      'Chữ "thông tin" nói lên mục đích cốt lõi của thể loại.',
      'Nội dung dựa trên sự thật khảo sát thực tế.'
    ],
    keyTakeaway: 'Đọc văn bản thông tin cần chú ý các số liệu, hình ảnh minh họa, đề mục và tính xác thực của dữ liệu.',
    points: 30,
    enabled: true
  },
  {
    id: 'vb-11',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Truyện truyền thuyết',
    prompt: 'Hình tượng người anh hùng Thánh Gióng cưỡi ngựa sắt, nhổ tre đánh đuổi giặc Ân biểu tượng cho điều gì?',
    options: [
      'Ý chí cầu tài lộc và mong muốn làm tướng quân của người xưa.',
      'Sức mạnh quật khởi, tinh thần yêu nước và đoàn kết chống ngoại xâm của dân tộc ta.',
      'Phép thuật thần kì của các vị tiên trên trời giáng trần.',
      'Sự phát triển của nghề luyện kim đồ sắt thời cổ đại.'
    ],
    correctAnswer: 1,
    explanation: 'Thánh Gióng là biểu tượng bất tử cho lòng yêu nước nồng nàn, tinh thần quật cường và sức mạnh toàn dân trong công cuộc bảo vệ Tổ quốc.',
    hints: [
      'Gióng lớn nhanh như thổi khi nghe tiếng loa chiêu mộ người tài đánh giặc.',
      'Cả dân làng cùng góp gạo nuôi Gióng.'
    ],
    keyTakeaway: 'Truyền thuyết phản ánh lịch sử qua lăng kính tưởng tượng kì ảo và niềm tự hào dân tộc sâu sắc.',
    points: 10,
    enabled: true
  },
  {
    id: 'vb-12',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Nhân vật văn học và chi tiết tiêu biểu',
    prompt: 'Nối nhân vật văn học với hành động hoặc chi tiết đặc trưng tương ứng:',
    matchingPairs: [
      { id: 'p1', left: 'Dế Choắt', right: 'Khuyên bạn bớt tính hung hăng trước khi mất' },
      { id: 'p2', left: 'Cô bé bán diêm', right: 'Mỉm cười thanh thản bên những que diêm tàn' },
      { id: 'p3', left: 'Người em (Cây khế)', right: 'Chỉ may túi ba gang đựng vừa đủ vàng' },
      { id: 'p4', left: 'Thạch Sanh', right: 'Dùng tiếng đàn cảm hóa quân sĩ mười tám nước' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Mỗi chi tiết nghệ thuật tiêu biểu gắn liền với tính cách và số phận của nhân vật trong tác phẩm.',
    hints: [
      'Thạch Sanh dùng tiếng đàn công lí xua tan chiến tranh.',
      'Dế Choắt để lại bài học đắt giá cho Dế Mèn.'
    ],
    keyTakeaway: 'Chi tiết nghệ thuật đặc sắc là giọt sương phản chiếu cả tâm hồn và tư tưởng tác phẩm.',
    points: 20,
    enabled: true
  },
  {
    id: 'vb-13',
    zone: 'kham_pha_van_ban',
    level: 'van_dung_thap',
    gameType: 'o_cua_bi_mat',
    topic: 'Văn bản "Lao xao mùa hè" (Duy Khán)',
    prompt: 'Trong kí "Lao xao mùa hè", bức tranh thiên nhiên làng quê vào mùa hè được tác giả cảm nhận qua những giác quan nào?',
    options: [
      'Chỉ qua thị giác (nhìn thấy màu sắc của các loài chim, cây trái).',
      'Đa giác quan: thị giác (sắc màu), thính giác (tiếng chim ríu rít), khứu giác (mùi hương hoa trái).',
      'Chỉ qua thính giác nghe tiếng chim cuốc, chim bìm bịp kêu.',
      'Chỉ qua vị giác khi thưởng thức quả chín đầu mùa.'
    ],
    correctAnswer: 1,
    explanation: 'Bức tranh làng quê hiện lên sống động nhờ sự phối hợp tài tình của nhiều giác quan: nhìn sắc hoa, nghe tiếng chim hót, ngửi hương sen thơm mát...',
    hints: [
      'Một tác phẩm kí hay thường khơi dậy mọi rung cảm của các giác quan.',
      'Hãy chú ý đến âm thanh lao xao và màu hoa đỏ rực.'
    ],
    keyTakeaway: 'Quan sát tinh tế bằng nhiều giác quan giúp bài viết tự sự hoặc miêu tả thêm phần lung linh, chân thực.',
    points: 30,
    enabled: true
  },
  {
    id: 'vb-14',
    zone: 'kham_pha_van_ban',
    level: 'van_dung_cao',
    gameType: 'vuot_me_cung',
    topic: 'Liên hệ văn bản với bảo vệ môi trường',
    prompt: 'Từ văn bản "Nếu cậu muốn có một người bạn..." (Hoàng tử bé) và các văn bản về thiên nhiên, chi tiết "cảm hóa" nhắc nhở ta điều gì trong mối quan hệ với tự nhiên?',
    options: [
      'Con người có quyền khai thác kiệt quệ tự nhiên để phục vụ nhu cầu sống.',
      'Thiên nhiên cần phải thuần phục hoàn toàn theo ý muốn của con người.',
      'Chúng ta cần kiên nhẫn thấu hiểu, gắn bó và chịu trách nhiệm với những gì mình yêu thương và bảo vệ.',
      'Chỉ cần quan tâm đến động vật nuôi trong nhà, không cần quan tâm đến động vật hoang dã.'
    ],
    correctAnswer: 2,
    explanation: '"Cảm hóa" nghĩa là tạo nên những mối liên hệ gần gũi. Khi ta gắn bó với ai hay với thiên nhiên, ta phải có trách nhiệm trân trọng, chăm sóc và chở che.',
    hints: [
      'Chú Cáo nói: "Cậu có trách nhiệm vĩnh viễn với những gì cậu đã cảm hóa".',
      'Liên hệ đến thái độ sống hòa hợp với môi trường.'
    ],
    keyTakeaway: 'Sống có trách nhiệm và biết yêu thương vạn vật xung quanh là phẩm chất cao đẹp của con người văn minh.',
    points: 40,
    enabled: true
  },
  {
    id: 'vb-15',
    zone: 'kham_pha_van_ban',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Kí - Người kể chuyện trong hồi kí',
    prompt: 'Người kể chuyện trong thể loại du kí hoặc hồi kí thường xuất hiện dưới danh xưng nào?',
    options: [
      'Dưới danh xưng người thứ ba vô danh',
      'Xưng "tôi" - chính là tác giả ghi lại những điều mình từng trải qua hoặc chứng kiến',
      'Xưng "chúng ta" đại diện cho toàn thể nhân loại',
      'Không bao giờ xuất hiện trực tiếp'
    ],
    correctAnswer: 1,
    explanation: 'Trong hồi kí hay du kí, tác giả thường xưng "tôi" để ghi chép lại một cách chân thực những sự việc có thật mà bản thân từng trải nghiệm.',
    hints: [
      'Hồi kí là nhớ lại và ghi chép chuyện của chính mình.',
      'Người kể chuyện có sự trùng khớp với tác giả ngoài đời.'
    ],
    keyTakeaway: 'Tính chân thực, người thật việc thật là đặc trưng cốt lõi của thể loại kí.',
    points: 10,
    enabled: true
  },
  {
    id: 'vb-16',
    zone: 'kham_pha_van_ban',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Văn bản nghị luận xã hội',
    prompt: 'Yếu tố cốt lõi nào tạo nên sức thuyết phục mạnh mẽ của một văn bản nghị luận?',
    options: [
      'Có nhiều hình ảnh hoang đường kì ảo và phép nhân hóa.',
      'Hệ thống ý kiến rõ ràng, lí lẽ sắc bén và dẫn chứng thực tế xác thực.',
      'Càng nhiều từ ngữ cảm thán bi lụy càng tốt.',
      'Số lượng trang viết thật dài và nhiều câu đối thoại.'
    ],
    correctAnswer: 1,
    explanation: 'Văn bản nghị luận thuyết phục người đọc chủ yếu bằng lí lẽ chặt chẽ và dẫn chứng phong phú, chính xác, tiêu biểu từ đời sống.',
    hints: [
      'Mục đích của nghị luận là bày tỏ quan điểm và thuyết phục người khác.',
      'Dẫn chứng thực tế là bằng chứng thép không thể chối cãi.'
    ],
    keyTakeaway: 'Nghị luận = Ý kiến + Lí lẽ chặt chẽ + Dẫn chứng tiêu biểu thuyết phục.',
    points: 20,
    enabled: true
  },

  // ==========================================
  // KHU VỰC 2: NHÀ THÁM HIỂM TIẾNG VIỆT (16 CÂU)
  // ==========================================
  {
    id: 'tv-01',
    zone: 'tham_hiem_tieng_viet',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Từ đơn và từ phức',
    prompt: 'Trong các từ sau, nhóm từ nào gồm toàn TỪ LÁY?',
    options: [
      'Sách vở, bút mực, bàn ghế, quần áo',
      'Long lanh, róc rách, thoang thoảng, rập rình',
      'Nhà cửa, xe cộ, cây cối, chim chóc',
      'Đất nước, tươi tốt, mùa màng, ăn uống'
    ],
    correctAnswer: 1, // Long lanh, róc rách...
    explanation: '"Long lanh, róc rách, thoang thoảng, rập rình" là các từ láy có sự hòa phối về âm thanh hoặc vần giữa các tiếng.',
    hints: [
      'Từ láy là từ phức có quan hệ láy âm hoặc láy vần giữa các tiếng.',
      'Hãy chú ý đến âm điệu lặp lại gợi hình, gợi cảm.'
    ],
    keyTakeaway: 'Từ láy mô tả sinh động âm thanh, dáng vẻ, tâm trạng; còn từ ghép tạo nghĩa bằng cách ghép các tiếng có quan hệ ngữ nghĩa.',
    points: 10,
    enabled: true
  },
  {
    id: 'tv-02',
    zone: 'tham_hiem_tieng_viet',
    level: 'nhan_biet',
    gameType: 'ghep_doi',
    topic: 'Biện pháp tu từ',
    prompt: 'Ghép mỗi câu văn/thơ với biện pháp tu từ được sử dụng nổi bật nhất:',
    matchingPairs: [
      { id: 'bp1', left: 'Mặt trời đội biển nhô màu mới', right: 'Nhân hóa' },
      { id: 'bp2', left: 'Trẻ em như búp trên cành', right: 'So sánh' },
      { id: 'bp3', left: 'Áo chàm đưa buổi phân li', right: 'Hoán dụ' },
      { id: 'bp4', left: 'Người Cha mái tóc bạc (Bác Hồ)', right: 'Ẩn dụ' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Bốn biện pháp tu từ quen thuộc: Nhân hóa gán hành động người cho vật; So sánh đối chiếu hai đối tượng tương đồng; Hoán dụ gọi tên qua dấu hiệu đi kèm; Ẩn dụ so sánh ngầm.',
    hints: [
      '“Như búp trên cành” có từ so sánh “như”.',
      '“Mặt trời đội biển” gán hành động “đội” của con người.'
    ],
    keyTakeaway: 'Biện pháp tu từ làm tăng sức gợi cảm, gợi hình và biểu cảm nghệ thuật của lời văn.',
    points: 10,
    enabled: true
  },
  {
    id: 'tv-03',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Từ đồng âm và từ đa nghĩa',
    context: 'Xét hai câu: (1) “Bà em bắc nồi xôi lên bếp.” và (2) “Con đường làng ngoằn ngoèo đi về phía bắc.”',
    prompt: 'Từ “bắc” trong hai câu trên có mối quan hệ ngữ nghĩa gì với nhau?',
    options: [
      'Là từ đa nghĩa, cùng chung một nét nghĩa gốc về hướng đi.',
      'Là từ đồng âm, phát âm giống nhau nhưng nghĩa hoàn toàn khác nhau.',
      'Là từ đồng nghĩa, có thể thay thế cho nhau trong mọi văn cảnh.',
      'Là từ trái nghĩa trong hệ thống từ vựng tiếng Việt.'
    ],
    correctAnswer: 1, // Từ đồng âm
    explanation: '"Bắc" ở câu (1) là động từ đặt nồi lên bếp; "bắc" ở câu (2) là danh từ chỉ phương hướng. Chúng chỉ tình cờ trùng âm chứ không liên quan nét nghĩa -> Từ đồng âm.',
    hints: [
      'Hai từ này có nét nghĩa nào chung không?',
      'Một từ là hành động nấu nướng, một từ là phương hướng địa lí.'
    ],
    keyTakeaway: 'Từ đồng âm: âm giống - nghĩa khác biệt hoàn toàn; Từ đa nghĩa: một từ có nhiều nghĩa liên hệ mật thiết với nghĩa gốc.',
    points: 20,
    enabled: true
  },
  {
    id: 'tv-04',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'o_cua_bi_mat',
    topic: 'Cụm danh từ',
    context: '“Tất cả những bông hoa hồng nhung rực rỡ ấy...”',
    prompt: 'Trong cụm danh từ trên, từ nào đóng vai trò là "DANH TỪ TRUNG TÂM"?',
    options: [
      'Tất cả',
      'Những',
      'Bông hoa (hoa)',
      'Rực rỡ'
    ],
    correctAnswer: 2, // Bông hoa (hoa)
    explanation: 'Cấu tạo cụm danh từ: Phần phụ trước ("Tất cả những") + Trung tâm ("bông hoa hồng nhung") + Phần phụ sau ("rực rỡ ấy"). Danh từ trung tâm là "bông hoa" (hoặc "hoa").',
    hints: [
      'Danh từ trung tâm là đối tượng chính mà các từ khác bổ nghĩa xung quanh.',
      '"Tất cả", "những" chỉ là phụ ngữ chỉ số lượng đứng trước.'
    ],
    keyTakeaway: 'Mô hình cụm danh từ gồm 3 phần: Phụ trước (số lượng) - Trung tâm (sự vật) - Phụ sau (đặc điểm, vị trí).',
    points: 20,
    enabled: true
  },
  {
    id: 'tv-05',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Phát hiện lỗi dùng từ',
    prompt: 'Em hãy tìm từ ngữ dùng SAI trong câu sau bằng cách bấm chọn từ đó:',
    errorSpotter: {
      instruction: 'Câu: "Bạn Nam rất bàng quang trước những khó khăn của tập thể lớp."',
      tokens: [
        { id: 't1', text: 'Bạn Nam', isError: false },
        { id: 't2', text: 'rất', isError: false },
        { id: 't3', text: 'bàng quang', isError: true, correctText: 'bàng quan' },
        { id: 't4', text: 'trước', isError: false },
        { id: 't5', text: 'những khó khăn', isError: false },
        { id: 't6', text: 'của tập thể lớp.', isError: false }
      ],
      explanation: 'Dùng sai từ "bàng quang" (bộ phận cơ thể chứa nước tiểu) thay vì từ đúng là "bàng quan" (thờ ơ, đứng ngoài cuộc coi như không liên quan đến mình).'
    },
    correctAnswer: 't3',
    explanation: 'Dùng sai chính tả và ngữ nghĩa: "bàng quan" mới có nghĩa là thờ ơ vô cảm, còn "bàng quang" là cơ quan bọng đái.',
    hints: [
      'Từ này thường bị nhầm lẫn do phát âm thêm âm g ở cuối tiếng thứ hai.',
      'Nghĩa cần thể hiện là thái độ thờ ơ, dửng dưng.'
    ],
    keyTakeaway: 'Cần phân biệt các từ gần âm: "bàng quan" (thờ ơ) khác với "bàng quang" (bọng đái).',
    points: 30,
    enabled: true
  },
  {
    id: 'tv-06',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'giai_cuu_nhan_vat',
    topic: 'Thành ngữ trong giao tiếp',
    prompt: 'Thành ngữ nào sau đây thể hiện tinh thần tương thân tương ái, giúp đỡ nhau trong hoạn nạn?',
    options: [
      'Nước chảy đá mòn',
      'Lá lành đùm lá rách',
      'Đứng núi này trông núi nọ',
      'Vụng chèo khéo chống'
    ],
    correctAnswer: 1, // Lá lành đùm lá rách
    explanation: '"Lá lành đùm lá rách" là bài học đạo đức truyền thống khuyên con người biết cưu mang, sẻ chia với những hoàn cảnh khó khăn hơn mình.',
    hints: [
      'Hình ảnh chiếc lá nguyên vẹn che chở cho chiếc lá bị rách nát.',
      'Rất quen thuộc trong các phong trào quyên góp ủng hộ đồng bào.'
    ],
    keyTakeaway: 'Thành ngữ đúc kết kinh nghiệm sống và triết lí đạo đức nhân văn sâu sắc của ông cha ta.',
    points: 30,
    enabled: true
  },
  {
    id: 'tv-07',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_cao',
    gameType: 'vuot_me_cung',
    topic: 'Hiệu quả nghệ thuật của tu từ ẩn dụ',
    context: '“Ngày ngày mặt trời đi qua trên lăng / Thấy một mặt trời trong lăng rất đỏ.” (Viễn Phương)',
    prompt: 'Hình ảnh “mặt trời trong lăng rất đỏ” sử dụng biện pháp tu từ gì và có ý nghĩa biểu đạt sâu sắc như thế nào?',
    options: [
      'Hoán dụ - biểu thị trái tim nhiệt huyết cách mạng của người dân miền Nam.',
      'Ẩn dụ - so sánh Bác Hồ với mặt trời, ca ngợi công lao vĩ đại và sự bất tử của Người soi sáng non sông.',
      'So sánh trực tiếp - miêu tả vẻ rực rỡ của cảnh bình minh trên quảng trường Ba Đình.',
      'Nhân hóa - biến mặt trời thiên nhiên thành người bạn tâm tình cùng lăng Bác.'
    ],
    correctAnswer: 1, // Ẩn dụ
    explanation: 'Bác Hồ được ngầm ví như "mặt trời" (ẩn dụ dựa trên nét tương đồng về sự vĩ đại, đem lại ánh sáng tự do hạnh phúc cho dân tộc).',
    hints: [
      'Hai đối tượng: mặt trời thiên nhiên và Bác Hồ nằm trong lăng.',
      'Đây là sự so sánh ngầm không dùng từ "như".'
    ],
    keyTakeaway: 'Ẩn dụ là phép so sánh ngầm tạo nên nhiều tầng ý nghĩa hàm súc, trang trọng và giàu cảm xúc thiêng liêng.',
    points: 40,
    enabled: true
  },
  {
    id: 'tv-08',
    zone: 'tham_hiem_tieng_viet',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Dấu câu',
    prompt: 'Dấu ngoặc kép trong câu: “Người ta thường gọi cậu ấy là \'cây sáng kiến\' của tổ 1.” được dùng để làm gì?',
    options: [
      'Đánh dấu lời dẫn trực tiếp của một nhân vật cụ thể.',
      'Đánh dấu từ ngữ được dùng với ý nghĩa đặc biệt (ẩn dụ khen ngợi sự sáng tạo).',
      'Đánh dấu tên tác phẩm văn học nghệ thuật nổi tiếng.',
      'Đánh dấu phần giải thích bổ sung cho câu.'
    ],
    correctAnswer: 1, // Nghĩa đặc biệt
    explanation: 'Dấu ngoặc kép trong trường hợp này dùng để đánh dấu từ ngữ mang ý nghĩa đặc biệt, ví von một người có nhiều ý tưởng độc đáo.',
    hints: [
      'Cậu ấy không phải là một "cái cây" theo nghĩa sinh học.',
      'Cụm từ này được dùng với nghĩa chuyển sáng tạo.'
    ],
    keyTakeaway: 'Dấu ngoặc kép có 3 công dụng chính: dẫn lời trực tiếp, đánh dấu từ ngữ có hàm ý/nghĩa đặc biệt, và trích dẫn tên tác phẩm.',
    points: 10,
    enabled: true
  },
  {
    id: 'tv-09',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Cụm động từ và cụm tính từ',
    prompt: 'Trong câu: “Đàn chim sẻ đang ríu rít chuyền cành rất nhanh nhẹn”, cụm từ nào là CỤM TÍNH TỪ?',
    options: [
      'Đàn chim sẻ',
      'Đang ríu rít chuyền cành',
      'Rất nhanh nhẹn',
      'Chuyền cành rất nhanh nhẹn'
    ],
    correctAnswer: 2, // Rất nhanh nhẹn
    explanation: '"Rất nhanh nhẹn" có từ trung tâm là tính từ "nhanh nhẹn", kết hợp với phụ từ chỉ mức độ "rất" ở phía trước.',
    hints: [
      'Tính từ là từ chỉ đặc điểm, tính chất.',
      'Cụm tính từ có phụ từ mức độ như: rất, quá, lắm...'
    ],
    keyTakeaway: 'Cụm tính từ giúp làm rõ mức độ, phạm vi của đặc điểm hoặc tính chất được nhắc tới.',
    points: 20,
    enabled: true
  },
  {
    id: 'tv-10',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Sửa lỗi câu thiếu thành phần',
    prompt: 'Hãy tìm vị trí lỗi trong câu: "Qua bài thơ \'Chuyện cổ tích về loài người\' của Xuân Quỳnh cho ta thấy tình yêu thương trẻ em."',
    errorSpotter: {
      instruction: 'Câu trên mắc lỗi thiếu chủ ngữ do nhầm trạng ngữ với chủ ngữ.',
      tokens: [
        { id: 'er1', text: 'Qua bài thơ', isError: true, correctText: 'Bài thơ' },
        { id: 'er2', text: '\'Chuyện cổ tích về loài người\'', isError: false },
        { id: 'er3', text: 'của Xuân Quỳnh', isError: false },
        { id: 'er4', text: 'cho ta thấy', isError: false },
        { id: 'er5', text: 'tình yêu thương trẻ em.', isError: false }
      ],
      explanation: 'Câu mắc lỗi thiếu chủ ngữ vì có giới từ "Qua" biến cụm danh từ thành trạng ngữ. Cách sửa: bỏ từ "Qua" hoặc thêm chủ ngữ sau dấu phẩy.'
    },
    correctAnswer: 'er1',
    explanation: 'Giới từ "Qua" đã biến danh từ trung tâm thành trạng ngữ khiến câu không có chủ ngữ. Bỏ "Qua" câu sẽ trở thành: "Bài thơ... cho ta thấy..."',
    hints: [
      'Từ đứng đầu câu biến cả vế đầu thành trạng ngữ chỉ phương thức.',
      'Bỏ từ này đi thì "Bài thơ..." sẽ đóng vai trò làm chủ ngữ hoàn chỉnh.'
    ],
    keyTakeaway: 'Tránh dùng các từ như "Qua...", "Bằng...", "Với..." nếu không bổ sung chủ ngữ phía sau.',
    points: 30,
    enabled: true
  },
  {
    id: 'tv-11',
    zone: 'tham_hiem_tieng_viet',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Từ mượn',
    prompt: 'Từ nào sau đây là từ mượn gốc Hán (từ Hán Việt)?',
    options: [
      'Mưa gió',
      'Giang sơn',
      'Nhà cửa',
      'Ruộng đồng'
    ],
    correctAnswer: 1, // Giang sơn
    explanation: '"Giang sơn" (giang: sông, sơn: núi) là từ Hán Việt có sắc thái trang trọng, chỉ đất nước hoặc non sông.',
    hints: [
      'Từ này dùng nhiều trong văn cảnh trang trọng, thi ca cổ điển.',
      'Các từ còn lại là từ thuần Việt gần gũi với đời sống.'
    ],
    keyTakeaway: 'Từ Hán Việt làm phong phú vốn từ và mang lại sắc thái tao nhã, trang trọng cho diễn đạt.',
    points: 10,
    enabled: true
  },
  {
    id: 'tv-12',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Nghĩa của thành ngữ',
    prompt: 'Hãy ghép mỗi thành ngữ với bài học ý nghĩa tương ứng:',
    matchingPairs: [
      { id: 'tn1', left: 'Uống nước nhớ nguồn', right: 'Lòng biết ơn tổ tiên, người đi trước' },
      { id: 'tn2', left: 'Có công mài sắt, có ngày nên kim', right: 'Lòng kiên trì, bền bỉ vượt khó' },
      { id: 'tn3', left: 'Một cây làm chẳng nên non', right: 'Sức mạnh của tinh thần đoàn kết' },
      { id: 'tn4', left: 'Học thầy không tày học bạn', right: 'Tinh thần chủ động học hỏi lẫn nhau' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Thành ngữ tiếng Việt là kho tàng kinh nghiệm sống quý báu được đúc kết qua nhiều thế hệ.',
    hints: [
      '“Nhớ nguồn” gắn với sự tri ân nguồn cội.',
      '“Mài sắt nên kim” khuyên nhủ sự kiên nhẫn.'
    ],
    keyTakeaway: 'Vận dụng thành ngữ đúng lúc giúp lời nói cô đọng, giàu hình ảnh và giàu giá trị biểu cảm.',
    points: 20,
    enabled: true
  },
  {
    id: 'tv-13',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_thap',
    gameType: 'o_cua_bi_mat',
    topic: 'Lựa chọn từ ngữ thích hợp',
    prompt: 'Chọn từ ngữ điền vào chỗ trống sao cho câu văn giàu sức biểu cảm nhất: “Những giọt sương mai... trên đầu ngọn cỏ non.”',
    options: [
      'nằm im lìm',
      'long lanh đọng lại',
      'rơi lộp bộp',
      'chảy ào ào'
    ],
    correctAnswer: 1, // long lanh đọng lại
    explanation: '"Long lanh" gợi tả ánh sáng trong trẻo, lấp lánh của giọt sương dưới nắng sớm, rất phù hợp với ngọn cỏ non.',
    hints: [
      'Sương mai buổi sớm phản chiếu ánh ban mai.',
      'Từ láy tượng hình miêu tả sự trong trẻo, lấp lánh.'
    ],
    keyTakeaway: 'Lựa chọn từ ngữ tinh tế giúp câu văn có hồn và đánh thức trí tưởng tượng của bạn đọc.',
    points: 30,
    enabled: true
  },
  {
    id: 'tv-14',
    zone: 'tham_hiem_tieng_viet',
    level: 'van_dung_cao',
    gameType: 'vuot_me_cung',
    topic: 'Phân tích hiệu quả tu từ hoán dụ',
    context: '“Bàn tay ta làm nên tất cả / Có sức người sỏi đá cũng thành cơm.” (Hoàng Trung Thông)',
    prompt: 'Hình ảnh “Bàn tay” trong câu thơ trên được dùng theo phép hoán dụ nào và mang hàm nghĩa gì?',
    options: [
      'Lấy dấu hiệu của sự vật để chỉ sự vật (chỉ vẻ đẹp hình thể người phụ nữ).',
      'Lấy một bộ phận để chỉ toàn thể (bàn tay đại diện cho sức lao động cần cù, sáng tạo của con người).',
      'Lấy vật chứa đựng để chỉ vật bị chứa đựng trong lao động sản xuất.',
      'Lấy cái cụ thể để gọi tên một khái niệm trừu tượng về sự giàu sang.'
    ],
    correctAnswer: 1, // Lấy bộ phận chỉ toàn thể
    explanation: '"Bàn tay" là bộ phận cơ thể con người trực tiếp lao động, được hoán dụ để biểu trưng cho sức lao động, ý chí và nghị lực chinh phục thiên nhiên của con người.',
    hints: [
      'Bàn tay là một bộ phận trên cơ thể con người.',
      'Đại diện cho sức mạnh lao động chân chính.'
    ],
    keyTakeaway: 'Hoán dụ lấy bộ phận chỉ toàn thể làm nổi bật hành động hoặc phẩm chất cốt lõi của chủ thể.',
    points: 40,
    enabled: true
  },
  {
    id: 'tv-15',
    zone: 'tham_hiem_tieng_viet',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Từ ghép chính phụ và đẳng lập',
    prompt: 'Cặp từ ghép nào sau đây là TỪ GHÉP CHÍNH PHỤ?',
    options: [
      'Nhà cửa, quần áo',
      'Xe đạp, hoa hồng',
      'Bàn ghế, sách vở',
      'Ăn uống, đi đứng'
    ],
    correctAnswer: 1, // Xe đạp, hoa hồng
    explanation: '"Xe đạp" (xe là tiếng chính, đạp là tiếng phụ phân loại); "Hoa hồng" (hoa là tiếng chính, hồng là tiếng phụ chỉ loại hoa). Còn các cặp kia là từ ghép đẳng lập có hai tiếng bình đẳng.',
    hints: [
      'Từ ghép chính phụ có một tiếng chính rộng nghĩa và một tiếng phụ hẹp nghĩa bổ sung.',
      '"Xe máy", "xe đạp", "xe buýt" đều cùng loại từ này.'
    ],
    keyTakeaway: 'Từ ghép chính phụ có tính chất phân loại; từ ghép đẳng lập có tính chất tổng hợp khái quát.',
    points: 10,
    enabled: true
  },
  {
    id: 'tv-16',
    zone: 'tham_hiem_tieng_viet',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Biện pháp tu từ nhân hóa',
    prompt: 'Trong câu: “Bác gà trống đập cánh phành phạch cất tiếng gáy vang gọi mặt trời thức giấc”, tác giả đã dùng những cách nhân hóa nào?',
    options: [
      'Chỉ dùng từ vốn gọi người để gọi vật ("Bác gà trống").',
      'Kết hợp cả hai cách: dùng từ gọi người ("Bác") và từ chỉ hành động, tâm trạng người ("gọi thức giấc").',
      'Trò chuyện tâm sự trực tiếp với con vật như với bạn bè.',
      'Chỉ dùng từ ngữ so sánh ngầm với con người.'
    ],
    correctAnswer: 1,
    explanation: 'Câu văn phối hợp linh hoạt: gọi vật bằng từ xưng hô của người ("Bác") và gán cho vật hành động gọi bạn như người ("gọi mặt trời thức giấc").',
    hints: [
      'Hãy để ý từ xưng hô "Bác" và hành động "gọi... thức giấc".',
      'Đây là sự phối hợp của nhiều kiểu nhân hóa.'
    ],
    keyTakeaway: 'Nhân hóa có 3 cách: gọi vật như gọi người, tả hành động/tính chất của vật như người, và trò chuyện với vật như với người.',
    points: 20,
    enabled: true
  },

  // ==========================================
  // KHU VỰC 3: XƯỞNG VIẾT SÁNG TẠO (16 CÂU)
  // ==========================================
  {
    id: 'xv-01',
    zone: 'xuong_viet_sang_tao',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Cấu trúc bài văn kể lại một trải nghiệm',
    prompt: 'Bố cục bài văn kể lại một trải nghiệm đáng nhớ của bản thân gồm mấy phần chính?',
    options: [
      'Hai phần: Giới thiệu câu chuyện và Kể kết thúc câu chuyện.',
      'Ba phần: Mở bài (giới thiệu trải nghiệm), Thân bài (kể diễn biến sự việc), Kết bài (nêu cảm xúc, bài học).',
      'Bốn phần: Đặt vấn đề, Giải quyết vấn đề, Mở rộng vấn đề, Kết thúc.',
      'Một đoạn văn liên tục không chia phần để đảm bảo cảm xúc.'
    ],
    correctAnswer: 1,
    explanation: 'Bố cục chuẩn mực gồm 3 phần: Mở bài (dẫn dắt, giới thiệu trải nghiệm), Thân bài (trình tự diễn biến), Kết bài (ý nghĩa và bài học rút ra).',
    hints: [
      'Quy tắc vàng của bài văn tự sự THCS luôn gồm 3 phần.',
      'Có mở đầu, diễn biến thân bài và kết thúc cảm nghĩ.'
    ],
    keyTakeaway: 'Bố cục 3 phần rõ ràng, mạch lạc là yêu cầu tiên quyết của mọi bài tập làm văn.',
    points: 10,
    enabled: true
  },
  {
    id: 'xv-02',
    zone: 'xuong_viet_sang_tao',
    level: 'nhan_biet',
    gameType: 'ghep_doi',
    topic: 'Nhiệm vụ của các phần trong bài viết',
    prompt: 'Hãy ghép từng phần của bài văn với nhiệm vụ tương ứng:',
    matchingPairs: [
      { id: 'x1', left: 'Mở bài', right: 'Giới thiệu trải nghiệm và ấn tượng ban đầu' },
      { id: 'x2', left: 'Thân bài', right: 'Kể lại chi tiết diễn biến sự việc theo trình tự' },
      { id: 'x3', left: 'Kết bài', right: 'Khẳng định ý nghĩa trải nghiệm và bài học cho bản thân' },
      { id: 'x4', left: 'Dàn ý chi tiết', right: 'Bản thiết kế khung xương các ý trước khi viết' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Mỗi phần trong bài văn đảm nhiệm một chức năng riêng biệt, cùng liên kết chặt chẽ để làm nổi bật chủ đề.',
    hints: [
      'Mở bài luôn chào đón và giới thiệu.',
      'Thân bài là trọng tâm diễn giải chi tiết.'
    ],
    keyTakeaway: 'Viết văn giống như xây nhà: dàn ý là bản vẽ, mỗi phần là một tầng cấu trúc vững chãi.',
    points: 10,
    enabled: true
  },
  {
    id: 'xv-03',
    zone: 'xuong_viet_sang_tao',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Ngôi kể trong bài văn kể lại trải nghiệm',
    prompt: 'Khi viết bài văn kể lại một trải nghiệm của chính bản thân mình, em PHẢI dùng ngôi kể nào?',
    options: [
      'Ngôi thứ ba (gọi tên mình là bạn ấy, nhân vật ấy).',
      'Ngôi thứ nhất (xưng "tôi" hoặc "em") để đảm bảo tính chân thực và bộc lộ trực tiếp cảm xúc.',
      'Linh hoạt đổi liên tục giữa ngôi thứ nhất và ngôi thứ ba trong từng đoạn.',
      'Ngôi thứ hai xưng "bạn" như đang tâm sự với người khác.'
    ],
    correctAnswer: 1, // Ngôi thứ nhất
    explanation: 'Kể lại trải nghiệm của bản thân bắt buộc phải dùng ngôi thứ nhất xưng "tôi" hoặc "em" để người đọc cảm nhận được tính chân thực, xúc động của sự việc.',
    hints: [
      'Đây là câu chuyện do chính em trực tiếp trải qua.',
      'Không được đổi ngôi kể lộn xộn trong một bài văn.'
    ],
    keyTakeaway: 'Nhất quán ngôi kể thứ nhất ("tôi/em") là yếu tố quyết định tính chân thực của văn kể chuyện trải nghiệm.',
    points: 20,
    enabled: true
  },
  {
    id: 'xv-04',
    zone: 'xuong_viet_sang_tao',
    level: 'thong_hieu',
    gameType: 'o_cua_bi_mat',
    topic: 'Đoạn văn ghi lại cảm xúc về bài thơ',
    prompt: 'Khi viết đoạn văn ghi lại cảm xúc về một bài thơ (thơ lục bát hoặc thơ tự do), câu mở đầu đoạn (câu chủ đề) cần nêu được điều gì?',
    options: [
      'Tóm tắt tiểu sử dài dòng của tác giả từ nhỏ đến lớn.',
      'Giới thiệu tên bài thơ, tên tác giả và ấn tượng, cảm xúc chung nhất về bài thơ.',
      'Liệt kê tất cả các từ láy và biện pháp nghệ thuật trong bài thơ.',
      'Chép lại toàn bộ bài thơ rồi mới bắt đầu viết.'
    ],
    correctAnswer: 1,
    explanation: 'Câu mở đoạn phải nêu được tên bài thơ, tác giả và khái quát ấn tượng hoặc cảm xúc bao trùm mà tác phẩm đem lại cho người đọc.',
    hints: [
      'Mở đoạn cần ngắn gọn, trực diện, không lan man.',
      'Cần có 3 yếu tố: Tên bài thơ + Tên tác giả + Cảm xúc chung.'
    ],
    keyTakeaway: 'Mở đoạn = Tên tác phẩm + Tên tác giả + Cảm xúc/ấn tượng chủ đạo.',
    points: 20,
    enabled: true
  },
  {
    id: 'xv-05',
    zone: 'xuong_viet_sang_tao',
    level: 'van_dung_thap',
    gameType: 'sap_xep_sieu_toc',
    topic: 'Quy trình các bước viết bài văn',
    prompt: 'Hãy sắp xếp 4 bước chuẩn mực của quy trình viết bài văn theo đúng thứ tự khoa học:',
    sequenceItems: [
      { id: 'step1', text: '1. Chuẩn bị (xác định đề tài, mục đích, người đọc)', correctIndex: 0 },
      { id: 'step2', text: '2. Tìm ý và Lập dàn ý chi tiết', correctIndex: 1 },
      { id: 'step3', text: '3. Viết bài hoàn chỉnh dựa trên dàn ý', correctIndex: 2 },
      { id: 'step4', text: '4. Xem lại, chỉnh sửa và rút kinh nghiệm', correctIndex: 3 }
    ],
    correctAnswer: 'ordered',
    explanation: 'Quy trình viết chuyên nghiệp: Chuẩn bị -> Tìm ý, lập dàn ý -> Viết bài -> Soát lỗi, chỉnh sửa.',
    hints: [
      'Bước đầu tiên luôn là xác định yêu cầu đề bài.',
      'Bước cuối cùng không bao giờ được bỏ qua là đọc lại và sửa lỗi.'
    ],
    keyTakeaway: 'Thực hiện đầy đủ 4 bước giúp bài văn không bị lạc đề, đủ ý và diễn đạt trong sáng.',
    points: 30,
    enabled: true
  },
  {
    id: 'xv-06',
    zone: 'xuong_viet_sang_tao',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Liên kết câu trong đoạn văn',
    prompt: 'Tìm từ ngữ bị lặp hoặc dùng sai làm mất tính liên kết trong câu: "Hôm nay trời nắng đẹp. Vì vậy em lại bị ốm nằm ở nhà."',
    errorSpotter: {
      instruction: 'Quan hệ từ nối giữa hai câu bị dùng sai logic ngữ nghĩa.',
      tokens: [
        { id: 'lk1', text: 'Hôm nay', isError: false },
        { id: 'lk2', text: 'trời nắng đẹp.', isError: false },
        { id: 'lk3', text: 'Vì vậy', isError: true, correctText: 'Thế nhưng / Tuy nhiên' },
        { id: 'lk4', text: 'em lại bị ốm', isError: false },
        { id: 'lk5', text: 'nằm ở nhà.', isError: false }
      ],
      explanation: 'Dùng sai quan hệ từ "Vì vậy" (chỉ nguyên nhân - kết quả thuận). Ở đây là sự tương phản giữa cảnh đẹp và việc bị ốm nên phải dùng "Thế nhưng", "Tuy nhiên" hoặc "Nhưng".'
    },
    correctAnswer: 'lk3',
    explanation: 'Trời nắng đẹp tương phản với việc ốm phải nằm nhà, do đó dùng "Vì vậy" là sai logic liên kết câu. Phải sửa thành "Thế nhưng" hoặc "Tuy nhiên".',
    hints: [
      'Quan sát mối quan hệ giữa "trời nắng đẹp" và "em bị ốm".',
      'Đây là quan hệ tương phản, không phải quan hệ nguyên nhân - kết quả.'
    ],
    keyTakeaway: 'Chọn từ liên kết câu phù hợp giúp đoạn văn mạch lạc, chặt chẽ về tư duy logic.',
    points: 30,
    enabled: true
  },
  {
    id: 'xv-07',
    zone: 'xuong_viet_sang_tao',
    level: 'van_dung_cao',
    gameType: 'vuot_me_cung',
    topic: 'Kĩ năng kết hợp yếu tố miêu tả và biểu cảm',
    prompt: 'Để bài văn kể lại một trải nghiệm không bị khô khan như một bản liệt kê sự việc, em nên làm gì?',
    options: [
      'Chỉ kể sự việc thật nhanh để đạt số lượng trang nhiều.',
      'Khéo léo kết hợp miêu tả khung cảnh, hành động chi tiết và bộc lộ cảm xúc, suy nghĩ nội tâm của nhân vật.',
      'Thêm vào thật nhiều nhân vật tưởng tượng từ truyện tranh.',
      'Sử dụng toàn bộ dấu câu cảm thán sau mỗi câu văn.'
    ],
    correctAnswer: 1,
    explanation: 'Sự kết hợp nhuần nhuyễn giữa tự sự (kể sự việc), miêu tả (khắc họa không gian, hình ảnh) và biểu cảm (rung động tâm hồn) làm bài văn sống động và lay động lòng người.',
    hints: [
      'Một câu chuyện hay cần có hình ảnh và cảm xúc.',
      'Miêu tả giúp người đọc "nhìn thấy", biểu cảm giúp người đọc "cảm thấy".'
    ],
    keyTakeaway: 'Tự sự kết hợp miêu tả và biểu cảm là bí quyết tạo nên một bài văn xuất sắc, truyền cảm hứng.',
    points: 40,
    enabled: true
  },
  {
    id: 'xv-08',
    zone: 'xuong_viet_sang_tao',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Kể lại một truyện cổ tích',
    prompt: 'Khi đóng vai nhân vật để kể lại một truyện cổ tích (ví dụ đóng vai Thạch Sanh), em cần lưu ý điều gì?',
    options: [
      'Tự ý thay đổi hoàn toàn kết thúc truyện thành một câu chuyện hiện đại.',
      'Nhập vai xưng "tôi", tôn trọng cốt truyện gốc nhưng bổ sung suy nghĩ, cảm xúc của nhân vật khi nhập vai.',
      'Không được phép bộc lộ bất kì cảm xúc cá nhân nào.',
      'Kể bằng ngôi thứ ba và chê bai các nhân vật khác.'
    ],
    correctAnswer: 1,
    explanation: 'Kể chuyện sáng tạo bằng cách đóng vai đòi hỏi xưng "tôi", giữ cốt lõi truyện gốc nhưng làm phong phú thêm tâm trạng, suy nghĩ từ góc nhìn của nhân vật.',
    hints: [
      'Em đang hóa thân thành chính nhân vật đó.',
      'Cốt truyện dân gian cần được tôn trọng cốt lõi.'
    ],
    keyTakeaway: 'Đóng vai nhân vật giúp phát huy trí tưởng tượng và sự thấu cảm sâu sắc với văn bản văn học.',
    points: 10,
    enabled: true
  },
  {
    id: 'xv-09',
    zone: 'xuong_viet_sang_tao',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Tìm ý và lập dàn ý',
    prompt: 'Hoạt động "Tìm ý" cho bài văn kể lại trải nghiệm thực chất là việc trả lời những câu hỏi nào?',
    options: [
      'Chuyện xảy ra ở đâu? Khi nào? Có những ai? Diễn biến ra sao và để lại bài học gì?',
      'Bài văn này sẽ được bao nhiêu điểm? Ai sẽ chấm bài?',
      'Có nên chép lại bài văn mẫu trên mạng hay không?',
      'Cần dùng bao nhiêu từ Hán Việt trong một trang giấy?'
    ],
    correctAnswer: 0,
    explanation: 'Tìm ý là quá trình trả lời các câu hỏi: Ai? Ở đâu? Khi nào? Sự việc gì? Diễn biến thế nào? Cảm xúc và bài học là gì?',
    hints: [
      'Hãy nhớ đến các câu hỏi 5W1H quen thuộc trong giao tiếp.',
      'Xác định rõ không gian, thời gian, nhân vật và sự việc.'
    ],
    keyTakeaway: 'Đặt câu hỏi và tự trả lời là phương pháp tìm ý tự nhiên và hiệu quả nhất.',
    points: 20,
    enabled: true
  },
  {
    id: 'xv-10',
    zone: 'xuong_viet_sang_tao',
    level: 'van_dung_thap',
    gameType: 'vong_quay_may_man',
    topic: 'Viết bài văn tả cảnh sinh hoạt',
    prompt: 'Khi viết bài văn tả cảnh sinh hoạt (ví dụ: Cảnh sum họp gia đình ngày Tết, Cảnh chợ hoa xuân), trình tự miêu tả nào là hợp lí nhất?',
    options: [
      'Chỉ tả cố định một người duy nhất từ đầu đến cuối buổi sinh hoạt.',
      'Miêu tả bao quát không khí chung -> miêu tả cụ thể từng hoạt động của con người theo thời gian/không gian.',
      'Liệt kê danh sách các đồ vật có trong nhà mà không nhắc đến con người.',
      'Kể chuyện cổ tích về ngày Tết mà không tả khung cảnh thực tế.'
    ],
    correctAnswer: 1,
    explanation: 'Văn tả cảnh sinh hoạt cần đi từ bao quát đến cụ thể, lấy hoạt động của con người làm linh hồn của bức tranh cảnh sắc.',
    hints: [
      'Cảnh sinh hoạt có con người là trung tâm.',
      'Đi từ bức tranh toàn cảnh đến những nét vẽ cận cảnh sinh động.'
    ],
    keyTakeaway: 'Trong bài văn tả cảnh sinh hoạt, hoạt động của con người chính là điểm nhấn tạo nên linh hồn của bức tranh.',
    points: 30,
    enabled: true
  },
  {
    id: 'xv-11',
    zone: 'xuong_viet_sang_tao',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Tóm tắt văn bản bằng sơ đồ',
    prompt: 'Mục đích chính của việc tóm tắt văn bản bằng sơ đồ tư duy là gì?',
    options: [
      'Để vẽ tranh giải trí trong giờ học văn.',
      'Giúp hệ thống hóa các nhân vật, sự việc chính và mối liên hệ giữa các phần một cách trực quan, ngắn gọn, dễ nhớ.',
      'Để thay thế hoàn toàn việc đọc tác phẩm gốc.',
      'Để bài làm văn dài hơn bình thường.'
    ],
    correctAnswer: 1,
    explanation: 'Sơ đồ tư duy trực quan hóa thông tin, giúp học sinh nắm bắt mạch truyện, mối quan hệ nhân quả và ghi nhớ kiến thức sâu sắc.',
    hints: [
      'Sơ đồ dùng từ khóa, nhánh cây và hình khối.',
      'Giúp não bộ ghi nhớ bằng hình ảnh trực quan.'
    ],
    keyTakeaway: 'Tóm tắt bằng sơ đồ là công cụ học tập thông minh rèn luyện tư duy tổng hợp logic.',
    points: 10,
    enabled: true
  },
  {
    id: 'xv-12',
    zone: 'xuong_viet_sang_tao',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Cách mở bài hấp dẫn',
    prompt: 'Ghép mỗi kiểu mở bài sau với đoạn mở đầu tương ứng:',
    matchingPairs: [
      { id: 'mb1', left: 'Mở bài trực tiếp', right: 'Tuổi thơ tôi gắn liền với chuyến đi về quê thăm nội mùa hè năm lớp năm...' },
      { id: 'mb2', left: 'Mở bài gián tiếp', right: 'Ai cũng có một quê hương để nhớ, và với tôi, mảnh đất ấy luôn ấm áp tình yêu thương...' },
      { id: 'mb3', left: 'Mở bài bằng âm thanh', right: 'Tùng! Tùng! Tùng! Tiếng trống trường giòn giã vang lên mở đầu cho một kỉ niệm...' },
      { id: 'mb4', left: 'Mở bài bằng câu hỏi', right: 'Đã bao giờ bạn tự hỏi, điều gì quý giá nhất trong tình bạn tuổi học trò?...' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Có nhiều cách mở bài sáng tạo: trực tiếp, gián tiếp, bằng âm thanh, hình ảnh gợi cảm hoặc câu hỏi gợi mở suy ngẫm.',
    hints: [
      'Mở bài trực tiếp đi thẳng vào sự việc.',
      'Mở bài gián tiếp dẫn dắt từ một hình ảnh, triết lí chung.'
    ],
    keyTakeaway: 'Một mở bài sáng tạo giống như cánh cửa đẹp mời gọi người đọc háo hức bước vào thế giới bài văn.',
    points: 20,
    enabled: true
  },
  {
    id: 'xv-13',
    zone: 'xuong_viet_sang_tao',
    level: 'van_dung_thap',
    gameType: 'o_cua_bi_mat',
    topic: 'Viết bài văn trình bày ý kiến về một hiện tượng đời sống',
    prompt: 'Khi viết bài văn bàn luận về hiện tượng: "Ý thức giữ gìn vệ sinh trường lớp của học sinh", dẫn chứng nào sau đây mang tính thuyết phục nhất?',
    options: [
      'Một câu chuyện thần thoại Hy Lạp về việc giữ gìn cung điện trên đỉnh Olympus.',
      'Số liệu và hình ảnh cụ thể về việc các bạn học sinh chủ động phân loại rác, quét dọn sân trường sau giờ ra chơi tại chính ngôi trường của em.',
      'Kể một câu chuyện tiếu lâm dân gian về người lười biếng.',
      'Ý kiến cá nhân mà không đưa ra bất kì ví dụ thực tế nào.'
    ],
    correctAnswer: 1,
    explanation: 'Dẫn chứng thực tế, gần gũi, người thật việc thật trong môi trường học đường luôn có sức nặng thuyết phục cao nhất đối với hiện tượng đời sống học sinh.',
    hints: [
      'Hiện tượng đời sống đòi hỏi dẫn chứng từ cuộc sống quanh ta.',
      'Sự việc cụ thể tại trường lớp mang tính thời sự và chân thực.'
    ],
    keyTakeaway: 'Dẫn chứng trong văn nghị luận phải chân thực, tiêu biểu và có tính cập nhật cao.',
    points: 30,
    enabled: true
  },
  {
    id: 'xv-14',
    zone: 'xuong_viet_sang_tao',
    level: 'van_dung_cao',
    gameType: 'giai_cuu_nhan_vat',
    topic: 'Bài học rút ra từ trải nghiệm',
    prompt: 'Sau khi kể lại một lần trót nói dối bố mẹ, phần Kết bài nên viết như thế nào để thể hiện sự trưởng thành trong nhận thức?',
    options: [
      'Tự hào vì mình đã khéo léo che giấu được lỗi lầm mà không ai phát hiện.',
      'Chân thành nhận lỗi, thấm thía giá trị của lòng trung thực và tự hứa sẽ luôn dũng cảm nhận khuyết điểm.',
      'Đổ lỗi cho hoàn cảnh hoặc bạn bè rủ rê ép buộc mình.',
      'Kết thúc lấp lửng và bảo mọi người đừng bao giờ nhớ lại chuyện đó nữa.'
    ],
    correctAnswer: 1,
    explanation: 'Giá trị cốt lõi của bài văn trải nghiệm là sự phản tỉnh và bài học trưởng thành. Chân thành nhận lỗi và hướng tới sự trung thực là kết bài ý nghĩa nhất.',
    hints: [
      'Trải nghiệm sai lầm chỉ có ý nghĩa khi ta biết sửa chữa.',
      'Lòng trung thực là phẩm chất đáng quý nhất.'
    ],
    keyTakeaway: 'Bài học sâu sắc ở phần kết bài chính là thước đo giá trị nhân văn của bài văn kể chuyện trải nghiệm.',
    points: 40,
    enabled: true
  },
  {
    id: 'xv-15',
    zone: 'xuong_viet_sang_tao',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Liên kết đoạn văn',
    prompt: 'Từ ngữ nào sau đây thường được dùng ở đầu đoạn thân bài thứ hai để liên kết chuyển ý với đoạn trước đó?',
    options: [
      'Bên cạnh đó, Ngoài ra, Không những thế...',
      'Tôi sinh ra vào một ngày mùa hạ...',
      'Kính thưa quý thầy cô giáo...',
      'Chào tạm biệt các bạn!'
    ],
    correctAnswer: 0,
    explanation: 'Các từ ngữ chuyển tiếp như "Bên cạnh đó", "Ngoài ra", "Không những thế", "Mặt khác" giúp kết nối các đoạn văn liền mạch, ăn khớp.',
    hints: [
      'Từ ngữ liên kết có chức năng bắc cầu giữa hai ý.',
      'Tạo nên sự chuyển tiếp mượt mà cho bài viết.'
    ],
    keyTakeaway: 'Sử dụng từ ngữ chuyển ý giúp các đoạn văn gắn kết chặt chẽ thành một chỉnh thể thống nhất.',
    points: 10,
    enabled: true
  },
  {
    id: 'xv-16',
    zone: 'xuong_viet_sang_tao',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Tập làm thơ lục bát',
    prompt: 'Trong một cặp câu thơ lục bát, tiếng thứ 6 của câu lục (6 chữ) phải hiệp vần với tiếng thứ mấy của câu bát (8 chữ)?',
    options: [
      'Tiếng thứ 2 của câu bát.',
      'Tiếng thứ 4 của câu bát.',
      'Tiếng thứ 6 của câu bát.',
      'Tiếng thứ 8 của câu bát.'
    ],
    correctAnswer: 2, // Tiếng thứ 6 của câu bát
    explanation: 'Quy luật gieo vần thơ lục bát: Tiếng thứ 6 của câu lục hiệp vần với tiếng thứ 6 của câu bát; tiếng thứ 8 câu bát lại hiệp vần với tiếng thứ 6 câu lục tiếp theo.',
    hints: [
      'Ví dụ: "Hôm qua tát nước đầu ĐÌNH / Bỏ quên chiếc áo trên CÀNH hoa sen" (Đình vần với Cành).',
      'Đều là tiếng thứ sáu của cả hai câu.'
    ],
    keyTakeaway: 'Quy tắc vần lục bát: 6 lục vần với 6 bát (vần bằng); 8 bát lại vần với 6 lục câu kế tiếp.',
    points: 20,
    enabled: true
  },

  // ==========================================
  // KHU VỰC 4: SÂN KHẤU NÓI VÀ NGHE (16 CÂU)
  // ==========================================
  {
    id: 'nn-01',
    zone: 'san_khau_noi_va_nghe',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Các bước chuẩn bị bài nói',
    prompt: 'Bước đầu tiên và quan trọng nhất khi chuẩn bị cho một bài nói trước lớp là gì?',
    options: [
      'Đứng ngay lên bục giảng và nói tự do không cần ghi chép gì.',
      'Xác định rõ đề tài, mục đích nói, đối tượng người nghe và không gian, thời gian nói.',
      'Học thuộc lòng từng chữ từ một bài văn mẫu trên mạng.',
      'Chuẩn bị trang phục thật cầu kì và lộng lẫy.'
    ],
    correctAnswer: 1,
    explanation: 'Để bài nói thành công, việc xác định rõ: Nói về cái gì? Nói cho ai nghe? Nói nhằm mục đích gì? và Nói trong bao lâu? là bước định hướng cốt tử.',
    hints: [
      'Người nói cần thấu hiểu khán giả của mình.',
      'Mục đích nói quyết định nội dung và giọng điệu trình bày.'
    ],
    keyTakeaway: 'Chuẩn bị kĩ lưỡng là 50% thành công của một bài thuyết trình trước công chúng.',
    points: 10,
    enabled: true
  },
  {
    id: 'nn-02',
    zone: 'san_khau_noi_va_nghe',
    level: 'nhan_biet',
    gameType: 'ghep_doi',
    topic: 'Yếu tố phi ngôn ngữ trong giao tiếp',
    prompt: 'Ghép từng yếu tố phi ngôn ngữ với tác dụng tích cực tương ứng khi thuyết trình:',
    matchingPairs: [
      { id: 'nn_p1', left: 'Ánh mắt (Eye contact)', right: 'Tương tác, kết nối và tôn trọng người nghe' },
      { id: 'nn_p2', left: 'Cử chỉ, điệu bộ', right: 'Minh họa, nhấn mạnh nội dung và tạo sự tự nhiên' },
      { id: 'nn_p3', left: 'Nét mặt, nụ cười', right: 'Truyền cảm xúc thân thiện, tạo bầu không khí cởi mở' },
      { id: 'nn_p4', left: 'Ngữ điệu, âm lượng', right: 'Tránh đơn điệu, làm nổi bật thông điệp quan trọng' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Phương tiện phi ngôn ngữ (ánh mắt, nụ cười, cử chỉ, giọng điệu) chiếm hơn một nửa hiệu quả truyền tải thông điệp khi nói.',
    hints: [
      'Ánh mắt giúp giữ sự chú ý của bạn bè dưới lớp.',
      'Giọng điệu trầm bổng tránh cảm giác buồn ngủ.'
    ],
    keyTakeaway: 'Kết hợp hài hòa giữa ngôn ngữ lời nói và phi ngôn ngữ tạo nên sức lôi cuốn diệu kì khi thuyết trình.',
    points: 10,
    enabled: true
  },
  {
    id: 'nn-03',
    zone: 'san_khau_noi_va_nghe',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Thái độ của người nghe văn minh',
    prompt: 'Khi bạn mình đang trình bày ý kiến trước lớp, thái độ lắng nghe nào thể hiện sự tôn trọng và văn minh?',
    options: [
      'Làm việc riêng, nói chuyện thì thầm với bạn bên cạnh.',
      'Tập trung lắng nghe, ghi chép vắn tắt các ý chính và chờ bạn nói xong mới giơ tay phản hồi.',
      'Ngắt lời bạn liên tục mỗi khi phát hiện một chi tiết mình không đồng ý.',
      'Gục đầu xuống bàn ngủ vì thấy bài nói không liên quan đến mình.'
    ],
    correctAnswer: 1,
    explanation: 'Lắng nghe tích cực đòi hỏi sự kiên nhẫn, tôn trọng người nói, ghi chép lại các điểm cốt lõi và phản hồi đúng lúc, lịch sự.',
    hints: [
      'Tôn trọng bạn cũng chính là tôn trọng bản thân.',
      'Ghi chép giúp em nắm vững ý để trao đổi hiệu quả.'
    ],
    keyTakeaway: 'Biết lắng nghe chân thành là kĩ năng sống vô cùng quý giá của con người hiện đại.',
    points: 20,
    enabled: true
  },
  {
    id: 'nn-04',
    zone: 'san_khau_noi_va_nghe',
    level: 'thong_hieu',
    gameType: 'o_cua_bi_mat',
    topic: 'Cách mở đầu bài nói ấn tượng',
    prompt: 'Cách mở đầu nào dưới đây giúp người nói ngay lập tức thu hút sự chú ý của cả lớp?',
    options: [
      '“Chào các bạn, hôm nay tôi sẽ đọc bài văn này cho các bạn nghe...”',
      'Kể một mẩu chuyện ngắn hài hước, chiếu một bức ảnh bí ẩn hoặc đặt một câu hỏi tương tác với cả lớp.',
      'Đứng im lặng nhìn lên trần nhà suốt hai phút.',
      'Phàn nàn về việc mình chưa kịp chuẩn bị gì cả.'
    ],
    correctAnswer: 1,
    explanation: 'Một câu hỏi mở, một tình huống kích thích trí tò mò hoặc một hình ảnh sinh động sẽ khuấy động không khí lớp học ngay từ giây đầu tiên.',
    hints: [
      'Hãy tạo sự bất ngờ và lôi kéo khán giả cùng tham gia.',
      'Tránh lối mở đầu rập khuôn, nhàm chán.'
    ],
    keyTakeaway: 'Phút đầu tiên của bài thuyết trình là "thời điểm vàng" để chiếm trọn cảm tình của người nghe.',
    points: 20,
    enabled: true
  },
  {
    id: 'nn-05',
    zone: 'san_khau_noi_va_nghe',
    level: 'van_dung_thap',
    gameType: 'sap_xep_sieu_toc',
    topic: 'Các bước thảo luận nhóm hiệu quả',
    prompt: 'Hãy sắp xếp các bước của một buổi thảo luận nhóm theo đúng trình tự khoa học:',
    sequenceItems: [
      { id: 'tl1', text: '1. Nhóm trưởng nêu vấn đề và mục tiêu cần giải quyết', correctIndex: 0 },
      { id: 'tl2', text: '2. Các thành viên suy nghĩ độc lập và ghi nhanh ý kiến cá nhân', correctIndex: 1 },
      { id: 'tl3', text: '3. Từng thành viên lần lượt trình bày ý kiến, cả nhóm lắng nghe', correctIndex: 2 },
      { id: 'tl4', text: '4. Thảo luận, tranh biện hòa nhã và thống nhất ý kiến chung', correctIndex: 3 },
      { id: 'tl5', text: '5. Thư kí ghi chép và đại diện nhóm báo cáo kết quả', correctIndex: 4 }
    ],
    correctAnswer: 'ordered',
    explanation: 'Quy trình làm việc nhóm chuẩn: Nêu vấn đề -> Chuẩn bị ý kiến cá nhân -> Trình bày luân phiên -> Phản biện thống nhất -> Báo cáo tổng kết.',
    hints: [
      'Bắt đầu bằng việc xác định rõ đề tài cần bàn bạc.',
      'Kết thúc bằng việc tổng hợp kết luận của toàn nhóm.'
    ],
    keyTakeaway: 'Làm việc nhóm thành công nhờ sự phân công rõ ràng, tôn trọng cá nhân và đồng thuận tập thể.',
    points: 30,
    enabled: true
  },
  {
    id: 'nn-06',
    zone: 'san_khau_noi_va_nghe',
    level: 'van_dung_thap',
    gameType: 'tho_san_loi_sai',
    topic: 'Lỗi ứng xử khi phản biện ý kiến',
    prompt: 'Tìm câu nói CÓ LỖI ỨNG XỬ, thiếu tinh thần xây dựng trong buổi tranh biện dưới đây:',
    errorSpotter: {
      instruction: 'Một trong các câu dưới đây mang giọng điệu chỉ trích cá nhân thay vì tranh biện về nội dung.',
      tokens: [
        { id: 'cx1', text: '“Tôi hoàn toàn tôn trọng góc nhìn của bạn.”', isError: false },
        { id: 'cx2', text: '“Tuy nhiên tôi có một cách giải thích khác như sau...”', isError: false },
        { id: 'cx3', text: '“Ý kiến của cậu thật là ngớ ngẩn và buồn cười!”', isError: true, correctText: '“Tôi thấy quan điểm này chưa thực sự thuyết phục vì...”' },
        { id: 'cx4', text: '“Chúng mình có thể cùng xem xét thêm dẫn chứng này.”', isError: false }
      ],
      explanation: 'Câu nói chỉ trích cá nhân, xúc phạm bạn ("ngớ ngẩn và buồn cười") là vi phạm quy tắc ứng xử văn minh trong tranh luận. Cần dùng lời lẽ khách quan, xây dựng.'
    },
    correctAnswer: 'cx3',
    explanation: 'Trong thảo luận, chúng ta tranh luận về ý kiến chứ không công kích hay chê bai cá nhân người nói.',
    hints: [
      'Tìm câu có từ ngữ xúc phạm, hạ thấp bạn mình.',
      'Tranh biện văn minh là tập trung vào lí lẽ, không công kích con người.'
    ],
    keyTakeaway: 'Quy tắc vàng trong tranh biện: "Tấn công vào luận điểm, không tấn công vào con người".',
    points: 30,
    enabled: true
  },
  {
    id: 'nn-07',
    zone: 'san_khau_noi_va_nghe',
    level: 'van_dung_cao',
    gameType: 'vuot_me_cung',
    topic: 'Ứng biến trước sự cố khi thuyết trình',
    prompt: 'Nếu trong lúc đang nói trước lớp, em đột nhiên quên mất một ý quan trọng, cách xử lí nào là thông minh và bản lĩnh nhất?',
    options: [
      'Khóc òa lên và chạy ngay về chỗ ngồi.',
      'Bình tĩnh dừng lại một nhịp, mỉm cười nhẹ nhàng nhìn vào dàn ý ghi chú, tóm lược nhanh ý vừa nói rồi tự tin chuyển tiếp sang ý tiếp theo.',
      'Đứng im lặng tuyệt đối cho đến khi thầy cô nhắc.',
      'Đổ lỗi cho bạn bên cạnh làm mình mất tập trung.'
    ],
    correctAnswer: 1,
    explanation: 'Giữ bình tĩnh, hít một hơi sâu, nhìn nhanh vào dàn ý tóm tắt (flashcard) và tiếp tục bài nói là phản xạ tuyệt vời của một người thuyết trình bản lĩnh.',
    hints: [
      'Ai cũng có lúc quên ý khi đứng trước đám đông.',
      'Sự bình tĩnh và nụ cười tự tin sẽ giúp em lấy lại phong độ.'
    ],
    keyTakeaway: 'Bản lĩnh không phải là không bao giờ mắc lỗi, mà là sự tự tin ứng biến linh hoạt khi gặp tình huống bất ngờ.',
    points: 40,
    enabled: true
  },
  {
    id: 'nn-08',
    zone: 'san_khau_noi_va_nghe',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Công cụ hỗ trợ bài nói',
    prompt: 'Khi thuyết trình, việc chuẩn bị một tấm thẻ ghi chú nhỏ (flashcard) chứa các từ khóa chính mang lại lợi ích gì?',
    options: [
      'Để che mặt lại cho đỡ ngại ngùng.',
      'Giúp người nói theo dõi được mạch bài nói, không bị bỏ sót ý mà vẫn giữ được sự tự nhiên khi giao lưu với người nghe.',
      'Để đọc nguyên văn từ đầu đến cuối như trả bài.',
      'Để làm đạo cụ diễn trò ảo thuật.'
    ],
    correctAnswer: 1,
    explanation: 'Thẻ ghi chú từ khóa là "phao cứu sinh" chuyên nghiệp giúp người nói ghi nhớ các mốc ý chính mà không bị phụ thuộc vào việc đọc chép.',
    hints: [
      'Flashcard chỉ ghi từ khóa ngắn gọn, không ghi cả bài văn dài.',
      'Giúp mắt luôn hướng về phía khán giả.'
    ],
    keyTakeaway: 'Nói dựa trên từ khóa cốt lõi giúp bài nói tự nhiên, sinh động hơn rất nhiều so với việc đọc thuộc lòng.',
    points: 10,
    enabled: true
  },
  {
    id: 'nn-09',
    zone: 'san_khau_noi_va_nghe',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Phần kết thúc bài nói',
    prompt: 'Một phần kết thúc bài nói đầy đủ và lịch sự cần bao gồm những nội dung nào?',
    options: [
      'Chỉ cần nói "Xong rồi!" và đi nhanh về chỗ.',
      'Tóm lược ngắn gọn thông điệp chính, gửi lời cảm ơn người nghe đã chú ý theo dõi và mời mọi người đóng góp ý kiến.',
      'Đọc lại toàn bộ nội dung thân bài một lần nữa từ đầu.',
      'Hỏi thầy cô ngay xem mình được bao nhiêu điểm.'
    ],
    correctAnswer: 1,
    explanation: 'Kết thúc bài nói chuẩn mực: Tóm tắt thông điệp đọng lại + Cảm ơn sự chú ý của thầy cô và các bạn + Mời chia sẻ, thảo luận thêm.',
    hints: [
      'Lời cảm ơn thể hiện nét đẹp văn hóa giao tiếp.',
      'Khẳng định lại thông điệp mà em muốn người nghe nhớ mãi.'
    ],
    keyTakeaway: 'Kết thúc bài nói lắng đọng và chân thành sẽ để lại dư ba sâu đậm trong lòng khán giả.',
    points: 20,
    enabled: true
  },
  {
    id: 'nn-10',
    zone: 'san_khau_noi_va_nghe',
    level: 'van_dung_thap',
    gameType: 'vong_quay_may_man',
    topic: 'Điều chỉnh tốc độ và âm lượng khi nói',
    prompt: 'Khi kể lại một khoảnh khắc xúc động rơi nước mắt hoặc một bí mật bất ngờ trong trải nghiệm, em nên điều chỉnh giọng nói như thế nào?',
    options: [
      'Hét thật to hết sức có thể vào micro.',
      'Nói thật nhanh như bắn súng liên thanh để qua mau đoạn đó.',
      'Hạ nhẹ âm lượng, giọng ấm áp, nói chậm rãi, nhấn nhá từng từ để truyền tải trọn vẹn cảm xúc lắng đọng.',
      'Cười lớn tiếng để xua tan bầu không khí xúc động.'
    ],
    correctAnswer: 2,
    explanation: 'Biết điều tiết nhịp độ (chậm lại) và âm lượng (nhỏ nhẹ, tha thiết) tại các điểm cao trào cảm xúc giúp câu chuyện lay động trái tim người nghe.',
    hints: [
      'Khoảnh khắc xúc động cần sự sâu lắng, lắng đọng.',
      'Giọng nói thì thầm, ấm áp sẽ tạo nên sự đồng cảm diệu kì.'
    ],
    keyTakeaway: 'Âm thanh của giọng nói là nhạc cụ kì diệu nhất - hãy biết nhấn nhá để đánh thức cảm xúc người nghe.',
    points: 30,
    enabled: true
  },
  {
    id: 'nn-11',
    zone: 'san_khau_noi_va_nghe',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Phân biệt nói và đọc',
    prompt: 'Điểm khác biệt cốt lõi nhất giữa "NÓI" và "ĐỌC" một bài viết là gì?',
    options: [
      'Nói thì phải dùng micro, còn đọc thì không bao giờ dùng.',
      'Nói là giao tiếp tương tác trực tiếp bằng ánh mắt, giọng điệu tự nhiên và cử chỉ; còn đọc là phụ thuộc hoàn toàn vào văn bản viết sẵn.',
      'Đọc bài luôn luôn hay hơn và được nhiều điểm hơn nói.',
      'Nói và đọc hoàn toàn giống nhau, không có gì khác biệt.'
    ],
    correctAnswer: 1,
    explanation: 'Nói là hoạt động giao tiếp hai chiều sinh động, có sự kết nối tâm hồn giữa người nói và người nghe qua ánh mắt, nụ cười và ngôn ngữ cơ thể.',
    hints: [
      'Đọc khiến mắt em dán chặt vào trang giấy.',
      'Nói giúp em tự do giao lưu, kết nối với khán giả.'
    ],
    keyTakeaway: 'Đừng biến bài thuyết trình thành một tiết đọc bài; hãy trò chuyện, sẻ chia chân thành từ trái tim.',
    points: 10,
    enabled: true
  },
  {
    id: 'nn-12',
    zone: 'san_khau_noi_va_nghe',
    level: 'thong_hieu',
    gameType: 'ghep_doi',
    topic: 'Lời nói trong các tình huống giao tiếp',
    prompt: 'Ghép tình huống giao tiếp với lời nói mở đầu phù hợp và văn minh nhất:',
    matchingPairs: [
      { id: 'nn_s1', left: 'Khi muốn xin phép ngắt lời để hỏi', right: 'Xin lỗi bạn, mình có thể xin phép hỏi rõ hơn về chi tiết này được không?' },
      { id: 'nn_s2', left: 'Khi đồng tình với bạn nhưng bổ sung thêm', right: 'Mình rất nhất trí với ý kiến của bạn, và mình muốn bổ sung thêm một góc nhìn...' },
      { id: 'nn_s3', left: 'Khi có quan điểm trái ngược với nhóm', right: 'Cảm ơn các bạn đã chia sẻ, tuy nhiên theo cách hiểu của mình thì...' },
      { id: 'nn_s4', left: 'Khi cảm ơn lời góp ý của thầy cô', right: 'Em xin cảm ơn những nhận xét quý báu của cô, em sẽ tiếp thu để sửa đổi...' }
    ],
    correctAnswer: 'matched_all',
    explanation: 'Sử dụng các mẫu câu giao tiếp lịch thiệp, tôn trọng người khác giúp các cuộc trao đổi học thuật diễn ra cởi mở và hiệu quả.',
    hints: [
      'Luôn mở đầu bằng lời xin lỗi khi muốn ngắt lời.',
      'Bày tỏ sự đồng thuận trước khi đưa ra ý kiến bổ sung.'
    ],
    keyTakeaway: 'Lời nói nhã nhặn, tôn trọng đối phương là chìa khóa mở ra mọi sự thấu hiểu trong giao tiếp.',
    points: 20,
    enabled: true
  },
  {
    id: 'nn-13',
    zone: 'san_khau_noi_va_nghe',
    level: 'van_dung_thap',
    gameType: 'o_cua_bi_mat',
    topic: 'Tóm tắt ý của người khác khi nghe',
    prompt: 'Kĩ năng nào quan trọng nhất giúp em tóm tắt chính xác ý kiến của bạn mình sau khi bạn trình bày xong?',
    options: [
      'Ghi chép từng từ từng chữ như máy ghi âm.',
      'Ghi nhanh các từ khóa (keywords), luận điểm chính và các dẫn chứng then chốt vào sổ tay theo sơ đồ cột hoặc nhánh.',
      'Chỉ nhớ trong đầu mà không cần ghi chép gì.',
      'Hỏi lại bạn toàn bộ bài nói một lần nữa.'
    ],
    correctAnswer: 1,
    explanation: 'Ghi chép từ khóa và liên kết sơ đồ giúp người nghe nắm bắt cấu trúc tư duy của người nói mà không bị quá tải thông tin.',
    hints: [
      'Não bộ không thể ghi chép kịp mọi từ.',
      'Hãy chú ý đến các từ ngữ then chốt mang ý nghĩa cốt lõi.'
    ],
    keyTakeaway: 'Lắng nghe chủ động kết hợp ghi chép từ khóa là năng lực học tập đỉnh cao của học sinh giỏi.',
    points: 30,
    enabled: true
  },
  {
    id: 'nn-14',
    zone: 'san_khau_noi_va_nghe',
    level: 'van_dung_cao',
    gameType: 'giai_cuu_nhan_vat',
    topic: 'Thuyết phục người nghe ủng hộ quan điểm',
    prompt: 'Khi trình bày ý kiến đề xuất lớp mình tổ chức một chuyến đi dã ngoại học tập tại viện bảo tàng, lập luận nào có sức thuyết phục nhất?',
    options: [
      'Vì em thích đi chơi cho đỡ phải học bài trên lớp.',
      'Vì tất cả các trường khác đều đã đi rồi nên lớp mình không thể thua kém.',
      'Chuyến đi giúp củng cố kiến thức lịch sử thực tế, rèn luyện kĩ năng làm việc nhóm và chi phí rất phù hợp với học sinh.',
      'Nếu lớp không đi thì em sẽ giận và không tham gia hoạt động nào nữa.'
    ],
    correctAnswer: 2,
    explanation: 'Thuyết phục dựa trên lợi ích thiết thực (học tập trải nghiệm, gắn kết tập thể) và tính khả thi (chi phí hợp lí) là lập luận vững chắc nhất.',
    hints: [
      'Đề xuất tập thể phải hướng đến lợi ích chung của toàn lớp.',
      'Kết hợp giữa giá trị giáo dục và tính khả thi thực tế.'
    ],
    keyTakeaway: 'Muốn thuyết phục người khác, hãy chỉ ra lợi ích chung và giải pháp khả thi, thực tế.',
    points: 40,
    enabled: true
  },
  {
    id: 'nn-15',
    zone: 'san_khau_noi_va_nghe',
    level: 'nhan_biet',
    gameType: 'ai_nhanh_hon',
    topic: 'Thời gian trình bày bài nói',
    prompt: 'Vì sao trong các buổi thuyết trình luôn có quy định khống chế thời gian tối đa (ví dụ từ 3 đến 5 phút)?',
    options: [
      'Để làm khó và gây áp lực cho học sinh.',
      'Để rèn luyện khả năng chọn lọc ý kiến cô đọng, trọng tâm và đảm bảo công bằng cho tất cả các bạn trong lớp.',
      'Vì thầy cô không có đủ kiên nhẫn để nghe học sinh nói.',
      'Để dành thời gian cho học sinh chơi trò chơi điện tử.'
    ],
    correctAnswer: 1,
    explanation: 'Kiểm soát thời gian rèn luyện kĩ năng diễn đạt súc tích, biết lược bỏ chi tiết rườm rà và tôn trọng thời gian của tập thể.',
    hints: [
      'Nói dài, nói dai dễ thành nói dại.',
      'Tập trung vào điều quan trọng nhất trong khoảng thời gian cho phép.'
    ],
    keyTakeaway: 'Nói đúng trọng tâm trong thời gian quy định là biểu hiện của tư duy logic và sự chuyên nghiệp.',
    points: 10,
    enabled: true
  },
  {
    id: 'nn-16',
    zone: 'san_khau_noi_va_nghe',
    level: 'thong_hieu',
    gameType: 'ai_nhanh_hon',
    topic: 'Khen ngợi và góp ý cho bạn',
    prompt: 'Nguyên tắc "Bánh mì kẹp" (Sandwich feedback) trong việc góp ý cho bài nói của bạn nghĩa là gì?',
    options: [
      'Vừa ăn bánh mì vừa nghe bạn nói để đỡ đói.',
      'Khen ngợi điểm tốt trước -> Góp ý chân thành điều cần cải thiện -> Khích lệ, động viên và khẳng định tiềm năng của bạn.',
      'Chỉ chê bai thật gay gắt từ đầu đến cuối để bạn tiến bộ nhanh.',
      'Khen ngợi giả dối mọi thứ dù bạn nói chưa tốt.'
    ],
    correctAnswer: 1,
    explanation: 'Nguyên tắc Sandwich: Lớp bánh mì 1 (Khen ngợi điểm sáng) + Nhân bánh (Góp ý điều cần hoàn thiện) + Lớp bánh mì 2 (Động viên, tin tưởng). Cách này giúp người nhận cảm thấy được tôn trọng và háo hức sửa đổi.',
    hints: [
      'Hình ảnh hai lát bánh mì êm ái kẹp lấy phần nhân ở giữa.',
      'Khởi đầu bằng lời khen và kết thúc bằng niềm tin tưởng.'
    ],
    keyTakeaway: 'Nghệ thuật góp ý tinh tế giúp người khác nhận ra thiếu sót mà vẫn giữ trọn sự tự tin và niềm vui học tập.',
    points: 20,
    enabled: true
  }
];

const METADATA_MAP: Record<string, { semester: 1 | 2; lesson: number; lessonTitle: string; sourceText: string }> = {
  // Văn bản
  'vb-01': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Bài học đường đời đầu tiên (Tô Hoài)' },
  'vb-02': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Tri thức Ngữ văn' },
  'vb-03': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Bài học đường đời đầu tiên (Tô Hoài)' },
  'vb-04': { semester: 1, lesson: 3, lessonTitle: 'Bài 3: Yêu thương và chia sẻ', sourceText: 'Cô bé bán diêm (H. C. An-đéc-xen)' },
  'vb-05': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Bài học đường đời đầu tiên (Tô Hoài)' },
  'vb-06': { semester: 1, lesson: 3, lessonTitle: 'Bài 3: Yêu thương và chia sẻ', sourceText: 'Gió lạnh đầu mùa (Thạch Lam)' },
  'vb-07': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Bài học đường đời đầu tiên (Tô Hoài)' },
  'vb-08': { semester: 1, lesson: 2, lessonTitle: 'Bài 2: Gõ cửa trái tim', sourceText: 'Chuyện cổ tích về loài người (Xuân Quỳnh)' },
  'vb-09': { semester: 1, lesson: 2, lessonTitle: 'Bài 2: Gõ cửa trái tim', sourceText: 'Mây và sóng (R. Ta-go)' },
  'vb-10': { semester: 1, lesson: 5, lessonTitle: 'Bài 5: Những nẻo đường xứ sở', sourceText: 'Hang Én (Hà My)' },
  'vb-11': { semester: 2, lesson: 6, lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng', sourceText: 'Thánh Gióng (Truyền thuyết)' },
  'vb-12': { semester: 2, lesson: 7, lessonTitle: 'Bài 7: Thế giới cổ tích', sourceText: 'Cây khế & Thạch Sanh' },
  'vb-13': { semester: 1, lesson: 5, lessonTitle: 'Bài 5: Những nẻo đường xứ sở', sourceText: 'Lao xao mùa hè (Duy Khán)' },
  'vb-14': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Nếu cậu muốn có một người bạn... (Saint-Exupéry)' },
  'vb-15': { semester: 1, lesson: 5, lessonTitle: 'Bài 5: Những nẻo đường xứ sở', sourceText: 'Tri thức Ngữ văn: Thể loại Kí' },
  'vb-16': { semester: 2, lesson: 8, lessonTitle: 'Bài 8: Khác biệt và gần gũi', sourceText: 'Tri thức Ngữ văn: Văn bản nghị luận' },

  // Tiếng Việt
  'tv-01': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Từ đơn và từ phức' },
  'tv-02': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Biện pháp tu từ' },
  'tv-03': { semester: 1, lesson: 4, lessonTitle: 'Bài 4: Quê hương yêu dấu', sourceText: 'Từ đồng âm và từ đa nghĩa' },
  'tv-04': { semester: 1, lesson: 2, lessonTitle: 'Bài 2: Gõ cửa trái tim', sourceText: 'Biện pháp tu từ ẩn dụ' },
  'tv-05': { semester: 1, lesson: 3, lessonTitle: 'Bài 3: Yêu thương và chia sẻ', sourceText: 'Cụm danh từ' },
  'tv-06': { semester: 1, lesson: 3, lessonTitle: 'Bài 3: Yêu thương và chia sẻ', sourceText: 'Cụm động từ và cụm tính từ' },
  'tv-07': { semester: 1, lesson: 4, lessonTitle: 'Bài 4: Quê hương yêu dấu', sourceText: 'Biện pháp tu từ hoán dụ' },
  'tv-08': { semester: 1, lesson: 4, lessonTitle: 'Bài 4: Quê hương yêu dấu', sourceText: 'Thể thơ lục bát' },
  'tv-09': { semester: 1, lesson: 5, lessonTitle: 'Bài 5: Những nẻo đường xứ sở', sourceText: 'Công dụng của dấu ngoặc kép' },
  'tv-10': { semester: 2, lesson: 6, lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng', sourceText: 'Công dụng của dấu chấm phẩy' },
  'tv-11': { semester: 2, lesson: 7, lessonTitle: 'Bài 7: Thế giới cổ tích', sourceText: 'Yếu tố Hán Việt "gia"' },
  'tv-12': { semester: 2, lesson: 8, lessonTitle: 'Bài 8: Khác biệt và gần gũi', sourceText: 'Trạng ngữ và chức năng' },
  'tv-13': { semester: 2, lesson: 8, lessonTitle: 'Bài 8: Khác biệt và gần gũi', sourceText: 'Lựa chọn từ ngữ và cấu trúc câu' },
  'tv-14': { semester: 2, lesson: 9, lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung', sourceText: 'Từ mượn tiếng Hán và tiếng Âu' },
  'tv-15': { semester: 2, lesson: 9, lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung', sourceText: 'Văn bản đa phương thức' },
  'tv-16': { semester: 2, lesson: 10, lessonTitle: 'Bài 10: Cuốn sách tôi yêu', sourceText: 'Tra cứu yếu tố Hán Việt' },

  // Xưởng viết sáng tạo
  'xv-01': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Viết bài văn kể lại một trải nghiệm' },
  'xv-02': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Nhiệm vụ các phần bài văn' },
  'xv-03': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Ngôi kể trong văn trải nghiệm' },
  'xv-04': { semester: 1, lesson: 2, lessonTitle: 'Bài 2: Gõ cửa trái tim', sourceText: 'Đoạn văn ghi lại cảm xúc về bài thơ' },
  'xv-05': { semester: 1, lesson: 3, lessonTitle: 'Bài 3: Yêu thương và chia sẻ', sourceText: 'Viết bài văn kể lại trải nghiệm bản thân' },
  'xv-06': { semester: 1, lesson: 4, lessonTitle: 'Bài 4: Quê hương yêu dấu', sourceText: 'Tập làm một bài thơ lục bát' },
  'xv-07': { semester: 1, lesson: 4, lessonTitle: 'Bài 4: Quê hương yêu dấu', sourceText: 'Đoạn văn cảm xúc về thơ lục bát' },
  'xv-08': { semester: 1, lesson: 5, lessonTitle: 'Bài 5: Những nẻo đường xứ sở', sourceText: 'Viết bài văn tả cảnh sinh hoạt' },
  'xv-09': { semester: 2, lesson: 6, lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng', sourceText: 'Viết bài văn thuyết minh thuật lại sự kiện' },
  'xv-10': { semester: 2, lesson: 7, lessonTitle: 'Bài 7: Thế giới cổ tích', sourceText: 'Đóng vai nhân vật kể lại truyện cổ tích' },
  'xv-11': { semester: 2, lesson: 8, lessonTitle: 'Bài 8: Khác biệt và gần gũi', sourceText: 'Viết bài văn trình bày ý kiến về hiện tượng đời sống' },
  'xv-12': { semester: 2, lesson: 9, lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung', sourceText: 'Viết biên bản cuộc họp, cuộc thảo luận' },
  'xv-13': { semester: 2, lesson: 9, lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung', sourceText: 'Tóm tắt bằng sơ đồ nội dung văn bản đơn giản' },
  'xv-14': { semester: 2, lesson: 10, lessonTitle: 'Bài 10: Cuốn sách tôi yêu', sourceText: 'Viết bài văn trình bày ý kiến gợi ra từ cuốn sách' },
  'xv-15': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Quy trình chỉnh sửa bài viết' },
  'xv-16': { semester: 2, lesson: 10, lessonTitle: 'Bài 10: Cuốn sách tôi yêu', sourceText: 'Sáng tạo sản phẩm nghệ thuật' },

  // Sân khấu nói và nghe
  'nn-01': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Kể lại một trải nghiệm của em' },
  'nn-02': { semester: 1, lesson: 2, lessonTitle: 'Bài 2: Gõ cửa trái tim', sourceText: 'Trình bày ý kiến về vấn đề gia đình' },
  'nn-03': { semester: 1, lesson: 3, lessonTitle: 'Bài 3: Yêu thương và chia sẻ', sourceText: 'Kể về trải nghiệm sẻ chia' },
  'nn-04': { semester: 1, lesson: 4, lessonTitle: 'Bài 4: Quê hương yêu dấu', sourceText: 'Trình bày suy nghĩ về tình cảm quê hương' },
  'nn-05': { semester: 1, lesson: 5, lessonTitle: 'Bài 5: Những nẻo đường xứ sở', sourceText: 'Chia sẻ trải nghiệm về nơi em sống hoặc từng đến' },
  'nn-06': { semester: 2, lesson: 6, lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng', sourceText: 'Kể lại một truyền thuyết' },
  'nn-07': { semester: 2, lesson: 7, lessonTitle: 'Bài 7: Thế giới cổ tích', sourceText: 'Kể lại truyện cổ tích bằng lời một nhân vật' },
  'nn-08': { semester: 2, lesson: 8, lessonTitle: 'Bài 8: Khác biệt và gần gũi', sourceText: 'Trình bày ý kiến về một hiện tượng đời sống' },
  'nn-09': { semester: 2, lesson: 9, lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung', sourceText: 'Thảo luận giải pháp khắc phục ô nhiễm môi trường' },
  'nn-10': { semester: 2, lesson: 10, lessonTitle: 'Bài 10: Cuốn sách tôi yêu', sourceText: 'Ngày hội với sách: Giới thiệu sản phẩm minh hoạ' },
  'nn-11': { semester: 1, lesson: 1, lessonTitle: 'Bài 1: Tôi và các bạn', sourceText: 'Kĩ năng sử dụng ngôn ngữ cơ thể khi nói' },
  'nn-12': { semester: 1, lesson: 3, lessonTitle: 'Bài 3: Yêu thương và chia sẻ', sourceText: 'Thái độ của người nghe tích cực' },
  'nn-13': { semester: 2, lesson: 8, lessonTitle: 'Bài 8: Khác biệt và gần gũi', sourceText: 'Tương tác phản biện và bảo vệ ý kiến' },
  'nn-14': { semester: 2, lesson: 6, lessonTitle: 'Bài 6: Chuyện kể về những người anh hùng', sourceText: 'Điều chỉnh giọng điệu và tốc độ nói' },
  'nn-15': { semester: 2, lesson: 9, lessonTitle: 'Bài 9: Trái Đất – ngôi nhà chung', sourceText: 'Quy trình thảo luận nhóm thống nhất giải pháp' },
  'nn-16': { semester: 2, lesson: 10, lessonTitle: 'Bài 10: Cuốn sách tôi yêu', sourceText: 'Trao đổi sau khi nói: Lắng nghe và giải thích' }
};

const enrichedRaw = RAW_DEFAULT_QUESTIONS.map((q) => {
  const meta = METADATA_MAP[q.id];
  if (meta) {
    return {
      ...q,
      semester: meta.semester,
      lesson: meta.lesson,
      lessonTitle: meta.lessonTitle,
      sourceText: meta.sourceText
    };
  }
  return q;
});

// Gộp các câu hỏi chuẩn SGK mới vào để ngân hàng câu hỏi đầy đủ trọn vẹn
const existingIds = new Set(enrichedRaw.map((q) => q.id));
const additionalQuestions = TEXTBOOK_QUESTIONS.filter((q) => !existingIds.has(q.id));
const combinedPre = [...enrichedRaw, ...additionalQuestions];
const existingCombinedIds = new Set(combinedPre.map((q) => q.id));
const curriculumQuestions = CURRICULUM_NEW_QUESTIONS.filter((q) => !existingCombinedIds.has(q.id));

export const DEFAULT_QUESTIONS: Question[] = [...combinedPre, ...curriculumQuestions];

export const ZONE_CONFIG = {
  kham_pha_van_ban: {
    id: 'kham_pha_van_ban',
    name: 'Khám Phá Văn Bản',
    shortName: 'Đọc Hiểu',
    icon: 'BookOpen',
    color: 'from-blue-500 to-indigo-600',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Phiêu lưu qua thế giới truyện đồng thoại, thơ ca, truyền thuyết và kí ức văn học diệu kì.',
    topics: ['Truyện đồng thoại', 'Thơ lục bát & tự do', 'Truyền thuyết & Cổ tích', 'Kí & Văn bản thông tin']
  },
  tham_hiem_tieng_viet: {
    id: 'tham_hiem_tieng_viet',
    name: 'Nhà Thám Hiểm Tiếng Việt',
    shortName: 'Tiếng Việt',
    icon: 'Compass',
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Khám phá sự giàu đẹp của từ ngữ, các biện pháp tu từ, cấu tạo ngữ pháp và thành ngữ Việt Nam.',
    topics: ['Từ đơn, từ phức, từ láy', 'Biện pháp tu từ', 'Cụm danh, động, tính từ', 'Dấu câu & Sửa lỗi câu']
  },
  xuong_viet_sang_tao: {
    id: 'xuong_viet_sang_tao',
    name: 'Xưởng Viết Sáng Tạo',
    shortName: 'Tập Làm Văn',
    icon: 'Feather',
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Rèn luyện kĩ năng viết bài văn tự sự, miêu tả, ghi lại cảm xúc và lập dàn ý chuẩn mực.',
    topics: ['Kể lại trải nghiệm', 'Đoạn văn cảm xúc', 'Tả cảnh sinh hoạt', 'Quy trình viết & Sắp xếp ý']
  },
  san_khau_noi_va_nghe: {
    id: 'san_khau_noi_va_nghe',
    name: 'Sân Khấu Nói Và Nghe',
    shortName: 'Nói & Nghe',
    icon: 'Mic',
    color: 'from-purple-500 to-pink-600',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Tự tin thuyết trình, thảo luận nhóm, lắng nghe thấu cảm và ứng biến giao tiếp văn minh.',
    topics: ['Chuẩn bị bài nói', 'Yếu tố phi ngôn ngữ', 'Thảo luận nhóm', 'Phản biện & Lắng nghe tích cực']
  }
};

export const COGNITIVE_LEVELS = {
  nhan_biet: {
    id: 'nhan_biet',
    name: 'Nhận Biết',
    points: 10,
    color: 'bg-emerald-500 text-white',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotColor: 'bg-emerald-500',
    description: 'Nhận diện khái niệm, tác giả, tác phẩm, chi tiết và từ ngữ cơ bản.'
  },
  thong_hieu: {
    id: 'thong_hieu',
    name: 'Thông Hiểu',
    points: 20,
    color: 'bg-blue-500 text-white',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    dotColor: 'bg-blue-500',
    description: 'Giải thích ý nghĩa, nguyên nhân, mối quan hệ và tác dụng nghệ thuật.'
  },
  van_dung_thap: {
    id: 'van_dung_thap',
    name: 'Vận Dụng Thấp',
    points: 30,
    color: 'bg-amber-500 text-white',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500',
    description: 'Áp dụng vào ngữ liệu mới, phát hiện lỗi sai và hoàn thiện câu văn.'
  },
  van_dung_cao: {
    id: 'van_dung_cao',
    name: 'Vận Dụng Cao',
    points: 40,
    color: 'bg-purple-600 text-white',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    dotColor: 'bg-purple-600',
    description: 'Đánh giá, liên hệ bài học cuộc sống, sáng tạo và giải quyết tình huống.'
  }
};

export const BADGES = [
  {
    id: 'mam_non',
    title: 'Mầm Non Văn Học',
    description: 'Hoàn thành lượt thi đấu đầu tiên với sự kiên trì và niềm say mê khám phá.',
    icon: 'Sprout',
    criteria: 'Hoàn thành 1 lượt chơi bất kì'
  },
  {
    id: 'tham_hiem_tu_ngu',
    title: 'Nhà Thám Hiểm Từ Ngữ',
    description: 'Làm đúng xuất sắc các câu hỏi về tiếng Việt, từ láy, từ ghép và thành ngữ.',
    icon: 'Sparkles',
    criteria: 'Đạt trên 80% điểm khu vực Tiếng Việt'
  },
  {
    id: 'cao_thu_doc_hieu',
    title: 'Cao Thủ Đọc Hiểu',
    description: 'Thấu hiểu sâu sắc tác phẩm, cốt truyện, nhân vật và thông điệp tác giả.',
    icon: 'BookMarked',
    criteria: 'Đạt trên 80% điểm khu vực Khám Phá Văn Bản'
  },
  {
    id: 'cay_but_sang_tao',
    title: 'Cây Bút Sáng Tạo',
    description: 'Nắm vững quy trình viết, sắp xếp dàn ý và bố cục đoạn văn mạch lạc.',
    icon: 'PenTool',
    criteria: 'Đạt trên 80% điểm khu vực Xưởng Viết'
  },
  {
    id: 'bac_thay_ngu_van',
    title: 'Bậc Thầy Ngữ Văn 6',
    description: 'Chinh phục đấu trường với tỉ lệ hoàn thành xuất sắc từ 90% trở lên.',
    icon: 'Crown',
    criteria: 'Đạt từ 90% tổng điểm trong một lượt chơi'
  }
];
