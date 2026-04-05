# 프로젝트 개요
이 프로젝트는 사용자가 재미있게 즐길 수 있는 기능들을 모아놓은 웹 애플리케이션입니다. 현재 돌림판 기능과 AI 동물상 테스트 기능을 제공합니다.

## 구현된 기능 및 디자인
- **현대적인 UI/UX**: 블러 효과(backdrop-filter), 부드러운 애니메이션, 그리고 현대적인 색상 팔레트를 사용합니다.
- **돌림판 기능**: Canvas API를 사용하여 부드러운 회전 애니메이션과 결과 산출 로직을 구현했습니다.
- **AI 동물상 테스트**: Google Teachable Machine 모델을 연동하여 웹캠을 통해 사용자가 강아지상인지 고양이상인지 실시간으로 분석합니다.
  - 실시간 웹캠 스트리밍 및 분석
  - 확률에 따른 동적 프로그레스 바 UI
- **다크/화이트 모드**: 사용자 선호에 따라 테마를 변경할 수 있으며, 설정은 브라우저의 `localStorage`에 저장되어 유지됩니다.
- **제휴 문의 폼**: Formspree를 연동하여 사용자가 직접 문의를 보낼 수 있는 폼을 구현했습니다.

## 최근 변경 사항
- **AI 동물상 테스트 추가**: TensorFlow.js 및 Teachable Machine Image 라이브러리를 사용하여 구현했습니다.
- **UI 구조 최적화**: 섹션별로 내용을 분리하여 가독성을 높였습니다.

## 기술 스택
- HTML5 (Canvas)
- CSS3 (Modern Features: CSS Variables, Flexbox, Transitions)
- JavaScript (ES6 Modules, LocalStorage, TensorFlow.js)
