> ## EasyResume
>
> 사회적 약자를 위한 이력 관리 시스템

### 프론트엔드(React) 구성 환경

- npm: 9.5.1

### 백엔드(Django) 구성 환경

- Python: 3.9.0
- Django: 4.1.2

- Python dependencies installation: 아래 코드를 실행하세요.

  ```bash
  cd ${Path_to_EasyWork/Backend}
  python -m pip install requirements.txt
  ```

- FFmpeg 다운로드

  참고: 압축 해제를 위한 별도의 압축 해제 프로그램(7-Zip 등) 사용을 권장합니다.

  - **Windows**: [FFmpeg Full](https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z)

    1. 다운로드 받은 파일을 압축 해제하여 폴더 이름을 `ffmpeg`로 변경합니다.
    2. 폴더를 `C:/`에 붙여 넣습니다.
    3. **관리자 권한으로** 명령 프롬프트를 실행하여 다음 명령어를 입력합니다: `setx /M "C:/ffmpeg/bin;%PATH%"`

- Whisper: base model
  1.  [구글 드라이브](https://drive.google.com/uc?export=download&id=1u58MG-nl4_pUtMLaTHxJoztpp9YLNQvG)(278MB)에서 다운로드 받습니다.
  2.  `whisper_base.pt`를 Backend 폴더에 넣습니다.

### 사용 오픈소스 목록

#### 백엔드

- [OpenAI/Whisper](https://github.com/openai/whisper)
- [Django](https://github.com/django/django)
- [Django Rest Framework](https://github.com/encode/django-rest-framework)

#### 프론트엔드

- [samhirtarif/react-audio-voice-recorder](https://github.com/samhirtarif/react-audio-recorder)
- [tailwindcss](https://tailwindcss.com/)
- [framer-motion](https://www.npmjs.com/package/framer-motion)
- [react-spinners](https://www.npmjs.com/package/react-spinners)
- [axios](https://axios-http.com/kr/docs/intro)
- [react](https://ko.legacy.reactjs.org/)
- [react-router-dom](https://reactrouter.com/en/main)
