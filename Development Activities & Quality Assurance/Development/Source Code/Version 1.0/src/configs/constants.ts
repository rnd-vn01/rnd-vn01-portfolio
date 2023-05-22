export const MERIDIANS_COLOR = {
  1: "#F38342",
  2: "#B4CB3C",
  3: "#CCA443",
  4: "#C5CC43",
  5: "#43A6CC",
  6: "#B343CC",
  7: "#44A668",
  8: "#4377CC",
  9: "#5643CC",
  10: "#68CC43",
  11: "#4DC2BA",
  12: "#CC4370",
}

export const EXTRA_MERIDIAN_COLORS = {
  1: "#618888",
  2: "#885C88"
}

export const APP_NAME = "Acupuncture 3D"

export enum QUIZ_QUESTION_TYPE {
  MULTIPLE_CHOICE = 0,
  PRACTICAL = 1
}

export const ALPHABET_LISTS = {
  VI: ["A", "Ă", "Â", "B", "C", "D", "Đ", "E", "Ê", "G", "H", "I", "K", "L", "M", "N", "O", "Ô", "Ơ",
    "P", "Q", "R", "S", "T", "U", "Ư", "V", "X", "Y"],
  EN: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
    "T", "U", "V", "W", "X", "Y", "Z"]
}

export const BASIC_FIELDS = {
  point: [{
    field: "code",
    critical: true
  },
  {
    field: "name",
    critical: true
  },
  {
    field: "description",
    critical: true
  },
  {
    field: "anatomy",
    critical: false
  },
  {
    field: "functionalities",
    critical: true
  },
  {
    field: "technique",
    critical: false,
  },
  {
    field: "caution",
    critical: false
  }],
  meridian: [{
    field: "code",
    critical: true
  },
  {
    field: "name",
    critical: true
  },
  {
    field: "description",
    critical: true
  },
  {
    field: "diseases",
    critical: true
  },
  {
    field: "points",
    critical: true
  }]
}
