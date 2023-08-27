import styles from "./FieldList.module.css";

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
    value: "birth_place", // 나이생년월일주소
    title: (
      <div>
        <h2 className={styles.title}>
          주소와 생년월일을
          <br />
          알려주세요.
        </h2>
      </div>
    ),
    title_text: "주소와 생년월일을 알려주세요.",
  },
  {
    order: 3,
    value: "phone_number", // 폰넘버
    title: (
      <div>
        <h2 className={styles.title}>연락처를 알려주세요.</h2>
      </div>
    ),
    title_text: "연락처를 알려주세요.",
  },
  {
    order: 4,
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
    order: 5,
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
    order: 6,
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
