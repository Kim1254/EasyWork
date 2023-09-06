import styles from "./FieldList.module.css";

// 질문에 대한 전반적인 내용을 담은 object 목록
/* 
  order: 질문 순서
  value: 백엔드와 통신할 때 key값으로 사용하기 위한 값
  title: 질문에 대해 설명하는 화면에 표시하기 위한 UI
  title_text: 결과 모달등에 표시할 질문 title
  
*/
export const field_list = [
  {
    order: 1,
    value: "name",
    title: (
      <div>
        <h4 className={styles.subtitle}>안녕하세요!</h4>
        <h2 className={styles.title}>이름을 알려주세요.</h2>
      </div>
    ),
    title_text: "이름을 알려주세요. ",
  },
  {
    order: 2,
    value: "place", // 나이생년월일주소
    title: (
      <div>
        <h2 className={styles.title}>주소를 알려주세요.</h2>
      </div>
    ),
    title_text: "주소를 알려주세요.",
  },
  {
    order: 3,
    value: "birth",
    title: (
      <div>
        <h2 className={styles.title}>생년월일을 알려주세요.</h2>
      </div>
    ),
    title_text: "생년월일을 알려주세요.",
  },
  {
    order: 4,
    value: "phone_number", // 폰넘버
    title: (
      <div>
        <h2 className={styles.title}>연락처를 알려주세요.</h2>
      </div>
    ),
    title_text: "연락처를 알려주세요.",
  },
  {
    order: 5,
    value: "career", // 경력
    title: (
      <div>
        <h2 className={styles.title}>
          그동안 경험하신
          <br />
          일자리가 있을까요?
        </h2>
      </div>
    ),
    title_text: "그동안 경험하신 일자리가 있을까요?",
  },
  {
    order: 6,
    value: "certificate", // 자격증,
    title: (
      <div>
        <h2 className={styles.title}>
          가지고 계신 자격증이
          <br />
          있다면 말씀해주세요.
        </h2>
      </div>
    ),
    title_text: "가지고 계신 자격증이 있다면 말씀해주세요.",
  },
  {
    order: 7,
    value: "self_intro", // 어떤사람인지
    title: (
      <div>
        <h2 className={styles.title}>
          본인이 어떤 사람인지
          <br />
          자유롭게 말씀해주세요.
        </h2>
      </div>
    ),
    title_text: "본인이 어떤사람인지 자유롭게 말씀해주세요.",
  },
];
