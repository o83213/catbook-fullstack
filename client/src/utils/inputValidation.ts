const textValidation = (text: string) => {
  const globalRegex = new RegExp(/^[a-zA-Z0-9\u4E00-\u9FFF]+$/, "g");
  if (!globalRegex.test(text)) {
    return "不能有標點符號或空白!";
  }
  return true;
};

const numberValidation = (number: string) => {
  const globalRegex = new RegExp(/^\d+$/, "g");
  if (!globalRegex.test(number)) {
    return "請輸入純數字!";
  }
  return true;
};

const emailValidation = (email: string) => {
  const globalRegex = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([A-Za-z]{2,6})$/,
    "g"
  );
  if (!globalRegex.test(email)) {
    return "請輸入有效的Email信箱!";
  }
  return true;
};

const phoneValidation = (phone: string) => {
  const globalRegex = new RegExp(/^09\d{2}-?\d{3}-?\d{3}$/, "g");
  if (!globalRegex.test(phone)) {
    return "電話格式必須09開頭10碼!";
  }
  return true;
};

const passwordValidation = (password: string) => {
  const globalRegex = new RegExp(
    /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    "g"
  );
  if (!globalRegex.test(password)) {
    return "日期格式必須為yyyy-mm-dd";
  }
  return true;
};

const dateFormatValidation = (date: string) => {
  const globalRegex = new RegExp(
    /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    "g"
  );
  if (!globalRegex.test(date)) {
    return "日期格式必須為yyyy-mm-dd";
  }
  return true;
};

export {
  textValidation,
  numberValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
  dateFormatValidation
};
