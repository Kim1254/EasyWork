> ## EasyWork
>
> 사회적 약자를 위한 이력 관리 시스템

---

### 프론트엔드(React) 구성 환경

- npm: 9.5.1

### 백엔드(Django) 구성 환경

- Python: 3.9.0
- Django: 4.1.2


- Python 모듈 설치

   ```bash
   cd ${Path_to_EasyWork/Backend}
   python -m pip install -r requirements.txt
   ```
  
- BERT 모델 구동 시

   1. [구글 드라이브](https://drive.google.com/drive/folders/1L9vNo2M6f5SYQU2jz00fQlcW5dY5-nwR?usp=drive_link)(448MB)에서 BERT 모델을 다운로드 받습니다.
   3. 압축 해제한 파일들을 `Backend/bert_korquad` 폴더 내부로 이동합니다.

- Whisper 모델 구동 시

   FFmpeg를 다운로드합니다.
   압축 해제를 위해 7-Zip 등의 별도의 압축 해제 프로그램이 필요합니다.

   - **Windows**: [FFmpeg Full](https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z)

      1. 다운로드 받은 파일을 압축 해제하여 폴더 이름을 `ffmpeg`로 변경합니다.
      2. 폴더를 `C:/`에 붙여 넣습니다.
      3. **관리자 권한으로** 명령 프롬프트를 실행하여 다음 명령어를 입력합니다.
         - `setx /M "C:/ffmpeg/bin;%PATH%"`

- Whisper Base 모델 다운로드
   1.  [구글 드라이브](https://drive.google.com/uc?export=download&id=1u58MG-nl4_pUtMLaTHxJoztpp9YLNQvG)(278MB)에서 다운로드 받습니다.
   2.  `whisper_base.pt`를 `Backend` 폴더에 넣습니다.

---

### 사용 오픈소스 목록

#### 백엔드

- [OpenAI/Whisper](https://github.com/openai/whisper)
- [klue/bert-base](https://huggingface.co/klue/bert-base)
- [KorQUAD v1.0](https://korquad.github.io/)
- [Django](https://github.com/django/django)
- [Django Rest Framework](https://github.com/encode/django-rest-framework)

#### 프론트엔드

- [samhirtarif/react-audio-voice-recorder](https://github.com/samhirtarif/react-audio-recorder)
- [tailwindcss](https://tailwindcss.com/)
- [framer-motion](https://www.npmjs.com/package/framer-motion)
- [react-spinners](https://www.npmjs.com/package/react-spinners)

---

### 실행 화면
#### 1. 접속 시 메인 화면
<img width="960" alt="image" src="https://github.com/dudtlstm/EasyWork/assets/102219328/a714bc45-6217-4b64-ae3d-f7a41ce27365">
<br>

###### - 다른 부가적인 것 없이 사용 방법에 대한 안내 모달창
<br>
<br>

#### 2. 이력서 내용 녹음 화면
<br>

   ##### 2-1. 녹음 재생 전
   <img width="960" alt="image" src="https://github.com/dudtlstm/EasyWork/assets/102219328/96c4c5dd-d5ce-4aa7-ac64-b0dcae96ebc7">
   <br>
   <br>
  
   ##### 2-2. 녹음 중
   <img width="960" alt="image" src="https://github.com/dudtlstm/EasyWork/assets/102219328/752c2d94-d577-4c47-8b2c-2187ba2700b4">
   <br>
   <br>
  
   ##### 2-3. 녹음 완료
   <img width="960" alt="image" src="https://github.com/dudtlstm/EasyWork/assets/102219328/e3956966-8d91-430b-a309-f728dc205bbd">
   <br>
  
   ###### - 질문 내용 변경과 동시에 녹음이 저장되었다는 문구 표시
   <br>
   <br>
   <img width="960" alt="image" src="https://github.com/dudtlstm/EasyWork/assets/102219328/b885c6da-2e24-4582-837c-27f21398fa1e">
   <br>
  
   ###### - 질문 진행도 표시
<br>
<br>

#### 3. 이력서 제작 중 안내 화면
<img width="960" alt="image" src="https://github.com/dudtlstm/EasyWork/assets/102219328/e0173036-23d8-421d-9b72-dd743d3c37da">

<br>
<br>

#### 4. 이력서 제작
<img width="960" alt="image" src="https://github.com/dudtlstm/EasyWork/assets/102219328/81992876-d5ad-4144-9148-024767d53536">

###### 녹음된 내용을 바탕으로 이력서 내용을 저장

