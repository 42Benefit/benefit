# Benefit

Benefit은 SvelteKit을 사용하여 개발된 혜택 정보를 제공하는 웹 애플리케이션입니다. 다양한 혜택 정보를 쉽게 찾고, 필요한 정보를 한눈에 확인할 수 있는 사용자 친화적인 인터페이스를 제공합니다.

## 기능

- 다양한 혜택 정보를 한눈에 확인할 수 있습니다.
- 혜택 정보를 카테고리별로 분류하여 쉽게 찾을 수 있습니다.
- 원하는 혜택 정보를 저장하여 나중에 확인할 수 있습니다.

## 프로젝트 구조

benefit
├─ src
│ ├─ components: 재사용 가능한 Svelte 컴포넌트들이 위치합니다.
│ ├─ lib: 공통으로 사용되는 함수, 설정 파일, 외부 라이브러리 및 유틸리티들이 위치합니다.
│ ├─ routes: 각 페이지의 구성 요소 및 로직이 구현되어 있는 폴더입니다.
│ ├─ store: Svelte Store를 사용하여 전역 상태를 관리하는 폴더입니다.
│ └─ styles: 전체적인 스타일과 관련된 SCSS 파일들이 위치합니다.
├─ static: 정적 파일들 (이미지, 아이콘 등)이 위치하는 폴더입니다.
└─ svelte.config.js: SvelteKit 프로젝트의 설정 파일입니다.


## 실행 방법

1. 저장소를 클론합니다.
git clone https://github.com/YeonSeong-Lee/benefit.git

2. 프로젝트 폴더로 이동합니다.
cd benefit

3. 필요한 모듈을 설치합니다.
npm install

4. 개발 서버를 실행합니다.
npm run dev

이제 웹 브라우저에서 `http://localhost:3000` 주소로 접속하여 Benefit 애플리케이션을 확인할 수 있습니다.

## 배포 방법

SvelteKit을 사용하여 프로젝트를 빌드한 후, 정적 호스팅 서비스를 통해 배포할 수 있습니다.

1. 프로젝트를 빌드합니다.

npm run build

2. 빌드된 프로젝트를 원하는 정적 호스팅 서비스에 배포합니다. 예를 들어, Firebase를 사용할 경우 다음과 같이 진행할 수 있습니다.

firebase init
firebase deploy

## 기여 방법

1. 저장소를 포크합니다.
2. 새로운 브랜치를 만들어 작업을 진행합니다.
3. 작업이 완료되면 풀 리퀘스트를 생성합니다.
4. 코드 리뷰를 기다린 후, 변경 사항이 승인되면 브랜치가 병합됩니다.

## 사용 기술

- SvelteKit: Svelte 기반의 최신 웹 프레임워크로, 간결한 코드와 높은 성능을 제공합니다.
- SCSS: CSS 전처리기로 스타일 작성을 편리하게 합니다.
- Three.js: WebGL 기반의 3D 그래픽 라이브러리로, 웹에서 쉽게 3D 콘텐츠를 제공할 수 있습니다.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하십시오.

## 개발자 정보

이 프로젝트는 YeonSeong-Lee 팀에 의해 개발되었습니다. 개발자에게 연락하려면 이메일로 연락하십시오.

이메일: example@example.com

## 참고자료 및 더 많은 정보

SvelteKit 및 관련 기술에 대한 자세한 정보는 다음 링크를 참조하십시오.

- [Svelte 공식 문서](https://svelte.dev/)
- [SvelteKit 공식 문서](https://kit.svelte.dev/docs)
- [SCSS 공식 문서](https://sass-lang.com/documentation)
- [Three.js 공식 문서](https://threejs.org/docs/)

## 프로젝트 감사의 글

이 프로젝트를 개발하는 데 도움을 주신 모든 분들께 감사드립니다. 특히, Svelte, SvelteKit, SCSS, Three.js 등 오픈 소스 프로젝트를 제공해 주신 개발자분들께 진심으로 감사드립니다.



