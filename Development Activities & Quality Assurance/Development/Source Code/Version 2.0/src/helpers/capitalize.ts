export const capitalize = (inputString) => {
  if (inputString.length > 0) {
    inputString = inputString[0].toUpperCase() + inputString.substring(1)
  }

  return inputString;
}

export const capitalizeEachWord = (inputString) => {
  if (inputString) {
    let words = inputString.split(" ")

    for (let i = 0; i < words.length; i++)
      words[i] = capitalize(words[i])

    return words.join(" ");
  }

  return ""
}

export const capitalizeAndMapInformationField = (isPoint, inputField, usingLanguage) => {
  const pointDictMap = usingLanguage === "EN" ? {
    "name": "Point name",
    "code": "Point code",
    "description": "Point description",
    "anatomy": "Point location",
    "functionalities": "Point functionalities",
    "technique": "Point triggering method",
    "caution": "Triggering Caution"
  } : {
    "name": "Tên huyệt",
    "code": "Mã huyệt",
    "description": "Mô tả huyệt",
    "anatomy": "Vị trí huyệt",
    "functionalities": "Chức năng huyệt",
    "technique": "Phương pháp châm huyệt",
    "caution": "Lưu ý khi châm huyệt"
  }

  const meridianDictMap = usingLanguage === "EN" ? {
    "name": "Meridian name",
    "code": "Meridian code",
    "description": "Meridian path description",
    "diseases": "Meridian main related diseases",
    "points": "Acupuncture points belong"
  } : {
    "name": "Tên kinh lạc",
    "code": "Mã kinh lạc",
    "description": "Mô tả đường đi kinh lạc",
    "diseases": "Các bệnh liên quan chính của kinh lạc",
    "points": "Huyệt thuộc kinh lạc"
  }

  const usingDictMap = isPoint ? pointDictMap : meridianDictMap;
  return capitalizeEachWord(usingDictMap[inputField])
}
