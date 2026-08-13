# 📋 React & PWA 모던 할 일 관리 앱 (my-react-todo)

> **React 18, PWA, Drag & Drop UX, CI/CD 자동화로 구축한 실무형 웹 애플리케이션**  
> 💡 Vanilla JS부터 시작하여 React 모듈화, Context API 기반 상태 관리, 렌더링 최적화, PWA 오프라인 지원, 드래그 앤 드롭 UX, GitHub Actions CI/CD까지 단계적으로 고도화한 포트폴리오 프로젝트입니다.

---

## 🔗 프로젝트 링크 및 배포 정보

- **라이브 데모 (GitHub Pages)**: [https://ssyangneomegeo3-art.github.io/my-react-todo/](https://ssyangneomegeo3-art.github.io/my-react-todo/)
- **GitHub Repository**: [https://github.com/ssyangneomegeo3-art/my-react-todo](https://github.com/ssyangneomegeo3-art/my-react-todo)
- **개발 기간**: 1일 차 ~ 16일 차 (단계적 스펙 확장 및 UX 고도화)

---

## ✨ 핵심 기능 (Key Features)

### 1. 🖐️ Drag & Drop 커스텀 재정렬 (`@hello-pangea/dnd`)
- `@hello-pangea/dnd` 라이브러리를 활용하여 드래그 핸들(`⋮⋮`)을 잡고 터치/마우스로 할 일 순서를 자유롭게 재배치.
- 순서 변경 시 자동으로 **'사용자 지정 (드래그)'** 정렬 모드로 전환되어 `LocalStorage`에 반영.

### 2. 🎉 감성 UX & 시각적 피드백
- **완료 폭죽 효과**: 할 일 체크 시 `canvas-confetti` 애니메이션 실행으로 달성감 제공.
- **스르륵 토스트 알림**: CUD(생성/수정/삭제) 및 데이터 작업 발생 시 `0.2s Slide-in` & `0.5s Fade-out` 키프레임 애니메이션 알림 탑재.

### 3. 🔀 다중 정렬 & 3중 실시간 중첩 필터링
- **다중 정렬 시스템**: 사용자 지정 (드래그) / 최신등록순 / 오래된순 / 가나다순 / 카테고리순 5가지 정렬 옵션 제공.
- **3중 복합 필터링**: `상태(전체/진행 중/완료)` × `카테고리(공부/업무/개인/기타)` × `돋보기 토글 검색어` 조합 필터링 연산.

### 4. 📱 PWA (Progressive Web App) 완전 지원
- `vite-plugin-pwa` 및 Workbox Service Worker를 적용하여 오프라인 환경에서도 앱 작동 가능.
- 커스텀 앱 설치 배너 (`PwaInstallPrompt.jsx`) 및 네트워크 연결 상태 감지 바 탑재.

### 5. 📊 Chart.js 데이터 시각화 & 대시보드 (`StatsPage.jsx`)
- `react-chartjs-2` 기반 진행률 도넛 차트 및 카테고리별 통계 분포 리포트 제공.
- `react-router-dom` (HashRouter) 기반 다중 페이지 분리 (MainPage / StatsPage).

### 6. 💾 JSON 데이터 백업 & 복원 (Export / Import)
- 작성된 할 일 데이터를 JSON 파일로 다운로드 백업하고, 파일 업로드를 통해 즉시 복원 지원.

### 7. ☀️/🌙 전역 스코프 다크 모드
- `html` / `body` 전역 동기화 및 `Pretendard` 웹폰트를 적용하여 반응형 440px 모던 카드 UI 유지.

### 8. 🤖 GitHub Actions CI/CD 자동 배포
- `.github/workflows/deploy.yml`을 구축하여 `main` 브랜치에 Push 시 클라우드 서버에서 자동 빌드 및 GitHub Pages 배포 파이프라인 운용.

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 / 라이브러리 |
| :--- | :--- |
| **Core** | React 18 (Vite), JavaScript (ES6+), JSX |
| **State Management** | Context API (`TodoContext`), Custom Hook (`useTodo`) |
| **Routing** | `react-router-dom` (v6, HashRouter) |
| **Interactive UX** | `@hello-pangea/dnd`, `canvas-confetti` |
| **Data Visualization** | `Chart.js`, `react-chartjs-2` |
| **PWA** | `vite-plugin-pwa`, Workbox Service Worker |
| **Styling** | CSS3 (Pretendard WebFont, Keyframes, Dark Mode Scope) |
| **CI/CD & Hosting** | GitHub Actions, GitHub Pages |

---

## 📂 프로젝트 파일 구조 (Project Structure)

```text
my-react-todo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD 자동 배포 워크플로우
├── index.html                  # PWA 메타 태그, 파비콘, Pretendard 폰트
├── vite.config.js              # VitePWA 플러그인, Workbox 설정, GitHub Pages base path
├── src/
│   ├── context/
│   │   └── TodoContext.jsx     # 전역 상태, LocalStorage, Drag&Drop, 3중 필터/정렬 통합
│   ├── components/
│   │   ├── DarkModeToggle.jsx  # ☀️/🌙 다크 모드 토글 버튼
│   │   ├── Quote.jsx           # 명언 API 호출 및 80px 고정 박스
│   │   ├── TodoInput.jsx       # 입력 폼 및 카테고리 선택 Dropdown
│   │   ├── TodoSearch.jsx      # 🔍 돋보기 토글형 실시간 검색창
│   │   ├── TodoSort.jsx        # 🔀 다중 정렬 선택 Dropdown
│   │   ├── FilterButtons.jsx   # 전체 / 진행 중 / 완료 필터 탭
│   │   ├── CategoryFilter.jsx  # 공부 / 업무 / 개인 / 기타 태그 필터
│   │   ├── TodoList.jsx        # @hello-pangea/dnd 드래그 앤 드롭 할 일 목록
│   │   ├── ClearCompleted.jsx  # 완료 항목 일괄 삭제
│   │   ├── TodoChart.jsx       # Chart.js 기반 도넛 차트
│   │   ├── DataBackup.jsx      # JSON 백업 다운로드 및 복원
│   │   ├── PwaInstallPrompt.jsx# PWA 앱 설치 배너 & 오프라인 바
│   │   ├── Navigation.jsx      # 할 일 목록 / 상세 통계 상단 NavLink
│   │   └── Toast.jsx           # 스르륵 토스트 알림 메시지
│   ├── pages/
│   │   ├── MainPage.jsx        # 할 일 관리 메인 페이지
│   │   └── StatsPage.jsx       # 통계 대시보드 및 백업 페이지
│   ├── App.jsx                 # 최상위 레이아웃, 헤더, 라우팅
│   ├── App.css                 # 440px 중앙 고정 레이아웃 & Pretendard CSS
│   └── main.jsx                # React DOM 렌더링 및 HashRouter 감싸기
└── package.json