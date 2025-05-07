# India-Pakistan Conflict Map

A web application for mapping and visualizing the India-Pakistan conflict, inspired by LiveUAMap. This application provides real-time data visualization of conflict events, political developments, and humanitarian situations in the contested regions between India and Pakistan.

## Project Structure

This project is organized as a monorepo with the following components:

- **Frontend**: React application with Leaflet for interactive mapping
- **Backend**: Node.js/Express API server
- **Database**: MongoDB for storing conflict events and related data

## Features

- Interactive map showing conflict events
- Filtering by event type, date range, and region
- Timeline slider for historical data exploration
- Real-time updates of new events
- Categorization of events (military clashes, protests, diplomatic events, etc.)
- User authentication for admin features

## 기능 상세 설명 (Features in Detail)

### 지도 시각화 (Map Visualization)
인도-파키스탄 분쟁 지도는 Leaflet 라이브러리를 활용하여 분쟁 지역의 다양한 이벤트를 시각적으로 표현합니다. 각 이벤트는 유형에 따라 다른 아이콘으로 표시되며, 사용자가 마커를 클릭하면 해당 이벤트에 대한 상세 정보를 볼 수 있습니다.

### 이벤트 필터링 (Event Filtering)
사용자는 다음과 같은 다양한 기준으로 지도에 표시되는 이벤트를 필터링할 수 있습니다:
- **이벤트 유형**: 군사 충돌, 외교적 사건, 시위, 인도주의적 상황 등
- **지역**: 카슈미르, 펀자브, 신드, 발루치스탄, 길기트-발티스탄, 통제선(LoC) 등
- **날짜 범위**: 특정 기간 동안 발생한 이벤트만 표시
- **키워드 검색**: 제목이나 설명에 특정 키워드가 포함된 이벤트 검색

### 타임라인 슬라이더 (Timeline Slider)
타임라인 슬라이더를 통해 사용자는 시간에 따른 이벤트의 변화를 시각적으로 탐색할 수 있습니다. 재생 버튼을 누르면 시간 순서대로 이벤트가 지도에 표시되어 분쟁의 진행 과정을 이해하는 데 도움이 됩니다.

### 실시간 업데이트 (Real-time Updates)
백엔드 서버는 새로운 이벤트 데이터를 수집하고 처리하여 프론트엔드에 실시간으로 전달합니다. 이를 통해 사용자는 최신 정보를 지속적으로 받아볼 수 있습니다.

### 이벤트 분류 (Event Categorization)
모든 이벤트는 다음과 같은 카테고리로 분류됩니다:
- **군사 충돌 (Military)**: 교전, 포격, 공습 등 군사적 행동
- **외교 (Diplomatic)**: 정상회담, 평화회담, UN 결의안 등 외교적 활동
- **시위 (Protest)**: 시민 시위, 데모, 파업 등 대중 행동
- **인도주의 (Humanitarian)**: 난민 이동, 구호 활동, 인도적 위기 상황
- **기타 (Other)**: 다른 카테고리에 속하지 않는 중요 이벤트

### 사이드 패널 (Side Panel)
좌측의 사이드 패널에서는 최근 이벤트 목록을 확인할 수 있으며, 특정 이벤트를 선택하면 해당 이벤트의 상세 정보를 볼 수 있습니다. 이 패널은 지도와 함께 사용하여 더 많은 컨텍스트 정보를 제공합니다.

### 사용자 인증 (User Authentication)
관리자와 편집자 역할을 위한 사용자 인증 시스템이 구현되어 있습니다:
- **일반 사용자**: 이벤트 조회만 가능
- **편집자 (Editor)**: 새 이벤트 추가 및 기존 이벤트 수정 가능
- **관리자 (Admin)**: 모든 기능에 접근 가능, 사용자 관리 포함

### API 접근 (API Access)
RESTful API를 통해 외부 애플리케이션에서도 분쟁 데이터에 접근할 수 있습니다. API는 다양한 필터링 옵션을 제공하여 필요한 데이터만 선택적으로 가져올 수 있습니다.

## Tech Stack

- **Frontend**: React, Leaflet, Redux, Material UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Getting Started

1. Clone the repository
2. Install dependencies: `npm run install:all`
3. Start the development servers: `npm start`

## API Documentation

The backend provides a RESTful API for accessing conflict data. Documentation is available at `/api/docs` when the server is running.

## License

MIT
