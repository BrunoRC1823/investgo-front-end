export const PATTERN_NAME_LASTNAME = "^[A-Z](['][A-Za-z]?[áéíóú]?)?[A-Za-z]*( [A-Z](['][A-Za-z]?[áéíóú]?)?[A-Za-z]*)*$";
export const PATTERN_PHONE = "^(9\\d{8})$";
export const PATTERN_DNI = "^(\\d{8})$";
export const PATTERN_PASSWORD = "^(?=.*[A-Z])(?=.*[\\d])(?=.*[@#$%^&+=!])(?!.*\\s).{8,}$";
export const PATTERN_NUMBER = "^[\\d]+$";
export const PATTERN_NRO_CUENTA_BANCARIA = "^[A-Z]{2}[\\d]{2}-[\\d]{4}-[\\d]{4}-[\\d]{2}-[\\d]{10}$";
export const PATTERN_NRO_CCI = "^[\\d]{3}-[\\d]{3}-[\\d]{12}-[\\d]{2}$";
export const PATTERN_RUC = "^(10|20|17|15)[0-9]+$";
export const PATTERN_RAZON_SOCIAL = "^[A-Z](['][A-Za-z]?[áéíóú]?)?[A-Za-z]*( [A-Z](['][A-Za-z]?[áéíóú]?)?[A-Za-z]*)* (S.A.C.S|S.A.C|S.A|S.A.A|S.R.L|E.I.R.L)$";
export const PATTERN_MES ="^(0?[1-9]|1[0-2])$";
export const PATTERN_YEAR ="^(20)[1|2]\\d{1}$";
export const PATTERN_EMAIL = "^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";