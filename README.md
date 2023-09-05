![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=EASY%20WORK&fontSize=90&animation=fadeIn&fontAlignY=38&desc=목소리로%20만든%20이력서%20,%20"이지웍"&descAlignY=58&descAlign=62)

> ## EasyWork
>
> 사회적 약자를 위한 이력 관리 시스템

---

## 개발 환경 구성

### 프론트엔드(React) 구성

- npm: 9.5.1

- npm 모듈 설치

  ```bash
  cd ${PATH_TO_EASYWORK}/Frontend
  npm -i
  ```

### 백엔드(Django) 구성

- Python: 3.9.0 이상
- Django: 4.1.2 이상

- Python 모듈 설치

  ```bash
  cd ${PATH_TO_EASYWORK}/Backend
  python -m pip install requirements.txt
  ```

- BERT 모델 다운로드
  1. [구글 드라이브](https://drive.google.com/drive/folders/1L9vNo2M6f5SYQU2jz00fQlcW5dY5-nwR?usp=drive_link)(448MB)에서 BERT 모델을 다운로드 받습니다.
  2. 압축 해제한 파일들을 `Backend/bert_korquad` 폴더 내부로 이동합니다.

- Whisper 모델 다운로드
  1.  [구글 드라이브](https://drive.google.com/uc?export=download&id=1u58MG-nl4_pUtMLaTHxJoztpp9YLNQvG)(278MB)에서 다운로드 받습니다.
  2.  `whisper_base.pt`를 `Backend` 폴더 내부로 이동합니다.

- FFmpeg 다운로드

  FFmpeg는 Whisper 실행을 위해 필요합니다. 압축 해제를 위해 7-Zip 등의 별도의 압축 해제 프로그램이 필요합니다.

  - **Windows**: [FFmpeg Full](https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z)

    1. 다운로드 받은 파일을 압축 해제하여 폴더 이름을 `ffmpeg`로 변경합니다.
    2. 폴더를 `C:/`에 붙여 넣습니다.
    3. **관리자 권한으로** 명령 프롬프트를 실행하여 다음 명령어를 입력합니다.
      - `setx /M "C:/ffmpeg/bin;%PATH%"`
  
---

## 서버 실행

### 백엔드

  ```bash
  cd ${PATH_TO_EASYWORK}/Backend
  python manage.py runserver
  ```

### 프론트엔드

  ```bash
  cd ${PATH_TO_EASYWORK}/Frontend
  npm run dev
  ```

---

## 사용 오픈소스 목록

### 백엔드

- [OpenAI/Whisper](https://github.com/openai/whisper)
- [klue/bert-base](https://huggingface.co/klue/bert-base)
- [KorQUAD v1.0](https://korquad.github.io/)
- [Django](https://github.com/django/django)
- [Django Rest Framework](https://github.com/encode/django-rest-framework)

### 프론트엔드

- [samhirtarif/react-audio-voice-recorder](https://github.com/samhirtarif/react-audio-recorder)
- [tailwindcss](https://tailwindcss.com/)
- [framer-motion](https://www.npmjs.com/package/framer-motion)
- [react-spinners](https://www.npmjs.com/package/react-spinners)
- [axios](https://axios-http.com/kr/docs/intro)
- [react](https://ko.legacy.reactjs.org/)
- [react-router-dom](https://reactrouter.com/en/main)
