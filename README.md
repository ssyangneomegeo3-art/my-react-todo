# 📱 My React Todo (PWA) — 포트폴리오 README

> **Vanilla JS부터 시작하여 React, Context API, 성능 최적화(useMemo, useCallback, React.memo), 그리고 PWA(Progressive Web App) 오프라인 지원까지 14일간 완성한 모던 할 일 관리 웹/앱 프로젝트입니다.**

[![Deploy](https://img.shields.io/badge/GitHub%20Pages-Deployed-success?style=for-the-badge&logo=github)](https://ssyangneomegeo3-art.github.io/my-react-todo/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)

---

## 🔗 배포 및 대표 정보

* **Live Demo**: [https://ssyangneomegeo3-art.github.io/my-react-todo/](https://ssyangneomegeo3-art.github.io/my-react-todo/)
* **Developer GitHub**: [ssyangneomegeo3-art](https://github.com/ssyangneomegeo3-art)
* **Repository**: [my-react-todo](https://github.com/ssyangneomegeo3-art/my-react-todo)

---

## 🌟 프로젝트 핵심 특징 (Key Highlights)

1. **📱 PWA (Progressive Web App) 오프라인 & 앱 설치 지원**
   - Service Worker (`vite-plugin-pwa` + Workbox) 기반 정적 리소스 캐싱으로 비행기 모드/지하철 등 인터넷 연결이 끊긴 환경에서도 100% 정상 구동
   - Custom Install Banner (`PwaInstallPrompt.jsx`)를 통해 PC 및 모바일 홈 화면에 독립형 앱(Standalone)으로 직접 설치 가능
   - 온라인/오프라인 실시간 감지 안테나 및 Toast 피드백 제공

2. **🏷️ 카테고리 태그 및 3중 실시간 중첩 필터링 (Compound Filtering)**
   - `공부`, `업무`, `개인`, `기타` 4가지 카테고리 지정 및 전용 색상 배지 시각화
   - `진행 상태(전체/진행 중/완료)` × `카테고리(공부/업무/...)` × `검색어(실시간 돋보기)` 3가지 조건의 복합 실시간 필터링 제공 (`useMemo` 최적화)

3. **💾 안전한 클라이언트 JSON 백업 & 복원 (Export / Import)**
   - Browser Blob API를 활용하여 전체 데이터를 `todo_backup_YYYY-MM-DD.json` 파일로 내보내기
   - FileReader API 기반으로 JSON 백업 파일을 업로드하여 브라우저/기기 간 데이터 즉시 복원
   - 하위 호환성 검증을 통해 구버전 로컬 데이터 수용 및 데이터 손실 차단

4. **⚡ 성능 최적화 및 Clean Architecture**
   - **Prop Drilling 해소**: Context API (`TodoContext.jsx`) 및 Custom Hook (`useTodo`) 구조로 전역 상태 관리
   - **불필요한 리렌더링 차단**: 핵심 컴포넌트에 `React.memo` 적용, 핸들러 함수에 `useCallback`, 연산 배열에 `useMemo` 완벽 적용

5. **🎨 UI/UX 디테일 & 반응형 모던 디자인**
   - 440px 고정 가로폭 카드 컨테이너 기반 중앙 레이아웃 & 80px 고정 규격 명언 상자
   - CSS Keyframes 기반 `0.2s Slide-In` & `0.5s Smooth Fade-Out` 부드러운 스르륵 토스트 알림
   - `☀️/🌙` 다크 모드 동기화 (HTML/Body 클래스 연동 및 LocalStorage 테마 기억)
   - Chart.js 기반 동적 도넛 차트 및 통계 카드 리포트 페이지 (`StatsPage.jsx`)

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 사용 기술 / 라이브러리 |
| :--- | :--- |
| **Frontend Framework** | React 18, JSX |
| **Build Tool & Environment** | Vite 5.x, Node.js (npm) |
| **Routing** | React Router v6 (`HashRouter`) |
| **State Management** | React Context API, Custom Hook (`useTodo`) |
| **Performance Optimization** | `React.memo`, `useCallback`, `useMemo` |
| **Visualization** | Chart.js, react-chartjs-2 |
| **PWA & Caching** | `vite-plugin-pwa`, Workbox, Service Worker |
| **Styling & Icons** | Vanilla CSS, Flexbox, Keyframe Animations |
| **Deployment** | GitHub Pages (`gh-pages`) |

---

## 📂 프로젝트 구조 (Directory Structure)

```text
my-react-todo/
├── public/
│   └── favicon.ico
├── src/
│   ├── context/
│   │   └── TodoContext.jsx      # todos, filter, searchQuery, dark mode, PWA online, backup 핸들러 전역 관리
│   ├── components/
│   │   ├── Navigation.jsx       # 📋 메인 / 📊 상세 통계 탭 링크
│   │   ├── DarkModeToggle.jsx   # 다크모드 ☀️/🌙 토글 버튼 (React.memo)
│   │   ├── Quote.jsx            # 명언 API 연동, 🔄 새로고침 버튼, 80px 고정 레이아웃
│   │   ├── TodoInput.jsx        # 신규 할 일 및 카테고리 셀렉트 폼
│   │   ├── TodoSearch.jsx       # 🔍 돋보기 토글형 실시간 검색창
│   │   ├── FilterButtons.jsx    # 전체 / 진행 중 / 완료 필터 탭
│   │   ├── CategoryFilter.jsx   # 카테고리별 배지 필터 버튼
│   │   ├── TodoList.jsx         # 할 일 목록, completion 체크, 인라인 수정 폼, 타임스탬프
│   │   ├── ClearCompleted.jsx   # 완료 항목 일괄 삭제 버튼
│   │   ├── TodoChart.jsx        # Chart.js 기반 진행률 도넛 차트
│   │   ├── DataBackup.jsx       # JSON 백업 내보내기 & 불러오기 컴포넌트
│   │   ├── PwaInstallPrompt.jsx # PWA 앱 설치 권유 배너 & 오프라인 상태 표시 바
│   │   └── Toast.jsx            # 0.2s 등장 & 0.5s 소멸 스르륵 토스트 알림
│   ├── pages/
│   │   ├── MainPage.jsx         # 메인 할 일 관리 통합 페이지
│   │   └── StatsPage.jsx        # 상세 수치 통계 카드, 차트, 카테고리 분포 및 데이터 백업 페이지
│   ├── App.jsx                  # Header Nav, DarkModeToggle, Router Routes, Toast
│   ├── App.css                  # 440px 모던 카드 레이아웃, 다크모드, 토스트 Keyframes
│   └── main.jsx                 # HashRouter 적용 및 최상위 렌더링
├── index.html                   # PWA 모바일 메타 태그 및 앱 스펙 지정
├── vite.config.js               # Vite PWA 플러그인 및 GitHub Pages Base Path 설정
└── package.json
