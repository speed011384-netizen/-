# 🚕 맨즈펫 펫택시 (Menz Pet Taxi) - 호스팅 가이드

본 애플리케이션은 **React v19, Vite, Tailwind CSS v4, Motion**을 기반으로 한 고성능 SPA(Single Page Application)입니다. 빌드 시 생성되는 모든 결과물은 완전히 정적인 HTML/JS/CSS 파일들이므로, 어떠한 정적 파일 호스팅 서비스에서도 비용 없이 손쉽게 호스팅하실 수 있습니다.

---

## 🛠️ 로컬 빌드 방법

애플리케이션을 배포용 파일로 컴파일하려면 루트 경로에서 아래 배포 명령어를 실행합니다:

```bash
# 의존성 패키지 설치 (최초 1회)
npm install

# 배포용 정적 파일 빌드
npm run build
```

빌드가 성공적으로 완료되면 루트 폴더에 **`dist`** 디렉토리가 생성됩니다. 이 `dist` 폴더 내부의 파일들이 웹서버에 업로드될 최종 결과물입니다.

---

## 🚀 플랫폼별 간편 호스팅 안내

대표적인 정적 웹 호스팅 서비스로 완전 무료로 손쉽게 호스팅하는 방법입니다.

### 1. Vercel (강력 추천 - 가장 간편함)
Vercel은 깃허브 저장소와 연동 시 코드 푸시만으로 자동 무중단 배포를 지원합니다.

1. [Vercel](https://vercel.com/) 계정을 가입 후 생성합니다 (GitHub 연동 권장).
2. AI Studio **Settings(설정) 메뉴**에서 프로젝트를 **GitHub 저장소로 Export(내보내기)** 합니다.
3. Vercel 대시보드에서 `Import Project`를 누르고, 내보낸 저장소를 선택합니다.
4. 설정값은 자동으로 인식됩니다:
   - **Framework Preset:** `Vite` 또는 `Other`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. `Deploy` 단추를 누르면 1분 내로 커스텀 도메인과 상시 무료 보안 주소(SSL)가 발급됩니다.

### 2. Netlify (무료 배포용)
파일 드래그 앤 드롭만으로 즉시 배포할 수 있어 가장 빠릅니다.

1. AI Studio 우측 상단이나 설정에서 프로젝트를 **ZIP 파일로 다운로드**하거나 `npm run build` 후 `dist` 폴더만 챙깁니다.
2. [Netlify](https://www.netlify.com/)에 로그인합니다.
3. **Sites** 메뉴 최하단의 "Drag and drop your site folder here" 영역에 빌드된 **`dist`** 폴더를 통째로 마우스로 끌어서 놓습니다.
4. 즉시 고유 주소로 라이브 배포가 완료됩니다.

### 3. GitHub Pages
코드가 있는 GitHub 레포지토리를 통해 무료로 배포할 수 있습니다.

1. 프로젝트가 업로드된 GitHub 레포지토리의 **Settings > Pages**로 이동합니다.
2. **Build and deployment** 섹션의 Source를 `GitHub Actions`로 설정합니다.
3. 프로젝트에 `.github/workflows/deploy.yml`을 추가하면 푸시할 때마다 자동으로 배포됩니다.

---

## 🔒 24시간 보안 및 캐싱 최적화
- **정적 빌드 완료**: 이미지 에셋 및 컴포넌트 최적화가 완료되어 페이지 로딩 속도가 극대화되어 있습니다.
- **Client-Side Routing**: 로컬에서 수동 서버(Apache, Nginx)를 직접 연동하시는 경우, 404 에러 방지를 위해 모든 경로 서빙을 `index.html`로 리다이렉트 처리(Fallback) 해주시면 좋습니다. (Vercel, Netlify 등은 자동으로 지원합니다)
