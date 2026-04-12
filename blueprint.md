# 프로젝트 개요
이 프로젝트는 사용자가 재미있게 즐길 수 있는 기능들을 모아놓은 웹 애플리케이션입니다. 현재 **달빛 일기장**, **돌림판**, 그리고 **AI 동물상 테스트** 기능을 제공합니다.

## 구현된 기능 및 디자인
- **현대적인 UI/UX**: 블러 효과(backdrop-filter), 부드러운 애니메이션, 그리고 현대적인 색상 팔레트를 사용합니다.
- **달빛 일기장 (`index.html`)**:
  - 감성적인 밤하늘 디자인과 애니메이션 달 요소.
  - 인터랙티브 달력 시스템으로 일별 기록 관리.
  - 달 모양(🌕🌖🌗🌘🌑)을 이용한 감정 상태 기록.
  - 로컬 스토리지를 이용한 데이터 영구 저장.
  - 테마 토글 (블랙/화이트 모드).
- **돌림판 기능 (`index1.html`)**:
  - Canvas API를 사용하여 부드러운 회전 애니메이션과 결과 산출 로직을 구현했습니다.
- **AI 동물상 테스트 (`index1.html`)**:
  - Google Teachable Machine 모델을 연동하여 사진 업로드를 통해 사용자가 강아지상인지 고양이상인지 분석합니다.
  - 확률에 따른 동적 프로그레스 바 UI 및 상세 결과 메시지.
- **제휴 문의 (`contact.html`)**:
  - 별도의 페이지로 분리된 제휴 문의 창입니다. Formspree를 연동하여 사용자가 직접 문의를 보낼 수 있습니다.
- **댓글 기능 (Disqus)**: 사용자 간의 소통을 위해 `index.html`과 `index1.html` 하단에 Disqus 댓글 시스템을 통합했습니다.

## 최근 변경 사항
- **제휴 문의 페이지 분리**: 기존 `index.html`에 포함되어 있던 제휴 문의 섹션을 별도의 `contact.html` 페이지로 분리하여 접근성을 높였습니다.
- **Disqus 댓글 기능 추가**: 모든 주요 페이지(`index.html`, `index1.html`) 하단에 실시간 댓글 창을 구현했습니다.
- **Google AdSense 통합**: 사이트 수익화를 위해 Google AdSense 광고 스크립트를 추가했습니다.
- **달빛 일기장 추가**: 감성적인 일기 쓰기 및 감정 추적 기능을 구현했습니다.
- **AI 동물상 테스트 추가**: TensorFlow.js 및 Teachable Machine Image 라이브러리를 사용하여 구현했습니다.

## 기술 스택
- HTML5 (Canvas)
- CSS3 (Modern Features: CSS Variables, Flexbox, Transitions, Backdrop-filter)
- JavaScript (ES6 Modules, LocalStorage, TensorFlow.js)
- Third-party: Google AdSense, Teachable Machine, Formspree, Disqus

## 향후 계획
- Google AdSense 광고 단위(Ad Units) 배치 최적화.
- 일기 데이터 백업 및 복구 기능 추가.
- 더 다양한 AI 테스트 모델 추가.

---

## 실행 계획: Google AdSense 추가
1. **HTML 헤더 수정**: `index.html` 및 `index1.html`의 `<head>` 섹션에 제공된 Google AdSense 자동 광고 스크립트를 삽입합니다.
2. **검증**: 스크립트가 올바르게 로드되는지 확인하고 콘솔 에러 여부를 점검합니다.
