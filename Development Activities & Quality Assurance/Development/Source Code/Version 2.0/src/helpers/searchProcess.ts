import { ALPHABET_LISTS } from "src/configs/constants";

export enum SEARCH_BY {
  ALL = 0,
  CODE = 1,
  NAME = 2,
  DESCRIPTION = 3,
  LOCATION = 4,
  FUNCTIONALITIES = 5,
  METHOD = 6
}

export const passFilter = (item: any, query: string, isPoint: boolean, searchBy: SEARCH_BY) => {
  query = query.trim()
  let passed = false;

  const isAll = searchBy === SEARCH_BY.ALL
  let keyToFilter = "";
  if (!isAll) {
    switch (searchBy) {
      case SEARCH_BY.NAME:
        keyToFilter = "name";
        break;
      case SEARCH_BY.CODE:
        keyToFilter = "code";
        break;
      case SEARCH_BY.DESCRIPTION:
        keyToFilter = "description";
        break;
      case SEARCH_BY.LOCATION:
        keyToFilter = "anatomy";
        break;
      case SEARCH_BY.FUNCTIONALITIES:
        keyToFilter = isPoint ? "functionalities" : "diseases";
        break;
      case SEARCH_BY.METHOD:
        keyToFilter = "method";
        break;
    }
  }

  if (isAll) {
    Object.keys(item).forEach((key) => {
      if (key !== "points") {
        if ((key === "functionalities" && isPoint)) {
          item[key]?.forEach((subitem) => {
            if (subitem.toUpperCase().includes(query.toUpperCase())) {
              passed = true;
            }
          })
        } else {
          if (item[key]?.toUpperCase().includes(query.toUpperCase())) {
            passed = true;
          }
        }
      }
    })
  } else if (keyToFilter === "functionalities" || keyToFilter === "points") {
    item[keyToFilter]?.forEach((subitem) => {
      if (subitem.toUpperCase().includes(query.toUpperCase())) {
        passed = true;
      }
    })
  } else {
    if (item[keyToFilter]?.toUpperCase().includes(query.toUpperCase())) {
      passed = true;
    }
  }

  return passed
}

export const filterByAlphabet = (items: Array<any>, alphabet: number, usingLanguage: string) => {
  const usingAlphabet = ALPHABET_LISTS[usingLanguage]

  if (alphabet === -1) {
    return items
  }

  return items.filter(e => replaceVietnameseNotation(e.name.toUpperCase()[0]) === usingAlphabet[alphabet])
}

export const replaceVietnameseNotation = (character: string) => {
  return character.replace("Á", "A").replace("À", "A").replace("Ả", "A").replace("Ã", "A").replace("Ạ", "A")
    .replace("Ắ", "Ă").replace("Ằ", "Ă").replace("Ẳ", "Ă").replace("Ẵ", "Ă").replace("Ặ", "Ă")
    .replace("Ấ", "Â").replace("Ầ", "Â").replace("Ẩ", "Â").replace("Ẫ", "Â").replace("Ậ", "Â")
    .replace("É", "E").replace("È", "E").replace("Ẻ", "E").replace("Ẽ", "E").replace("Ẹ", "E")
    .replace("Ế", "Ê").replace("Ề", "Ê").replace("Ể", "Ê").replace("Ễ", "Ê").replace("Ệ", "Ê")
    .replace("Í", "I").replace("Ì", "I").replace("Ỉ", "I").replace("Ĩ", "I").replace("Ị", "I")
    .replace("Ó", "O").replace("Ò", "O").replace("Ỏ", "O").replace("Õ", "O").replace("Ọ", "O")
    .replace("Ố", "Ô").replace("Ồ", "Ô").replace("Ổ", "Ô").replace("Ỗ", "Ô").replace("Ộ", "Ô")
    .replace("Ớ", "Ơ").replace("Ờ", "Ơ").replace("Ở", "Ơ").replace("Ỡ", "Ơ").replace("Ợ", "Ơ")
    .replace("Ú", "U").replace("Ù", "U").replace("Ủ", "U").replace("Ũ", "U").replace("Ụ", "U")
    .replace("Ứ", "Ư").replace("Ừ", "Ư").replace("Ử", "Ư").replace("Ữ", "Ư").replace("Ự", "Ư")
}
