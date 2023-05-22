import './ItemDetailEdit.scss';
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCheck, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { capitalizeAndMapInformationField } from 'src/helpers/capitalize';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BASIC_FIELDS } from 'src/configs/constants';

export const ItemDetailEdit: React.FC<IItemDetailEdit> = ({
  item,
  isPoint,
  usingLanguage,
  query,
  callbackUpdateDetail
}) => {
  const history = useHistory();
  const [itemDetail, setItemDetail] = useState<any>({});
  const [newItemValue, setNewItemValue] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    //Fill if missing some fields
    let listOfFields = isPoint ? BASIC_FIELDS["point"] : BASIC_FIELDS["meridian"];
    let fields = listOfFields.map(item => {
      return item.field
    })
    const currentFields = Object.keys(item)

    let itemDetail = {}
    fields.forEach(field => {
      if (currentFields.includes(field)) {
        itemDetail[field] = item[field]
      } else {
        itemDetail[field] = ""
      }
    })

    setItemDetail(itemDetail)
  }, [item])

  const updateInformation = (newValue: string, type: string, index: number) => {
    newValue = newValue
    if (type === "functionalities" || type === "points") {
      let updatedItem = { ...itemDetail }
      let list = updatedItem[type]
      list[index] = newValue
      updatedItem[type] = list
      setItemDetail(updatedItem)
    } else {
      let updatedItem = { ...itemDetail }
      updatedItem[type] = newValue
      setItemDetail(updatedItem)
    }
  }

  const removeSubItem = (index: number, field: string) => {
    let updatedItem = { ...itemDetail }
    let list = updatedItem[field]
    list.splice(index, 1)
    updatedItem[field] = list
    setItemDetail(updatedItem)
  }

  const addSubItem = (value: string, field: string) => {
    let updatedItem = { ...itemDetail }
    let list = updatedItem[field]
    list.push(value)
    updatedItem[field] = list
    setItemDetail(updatedItem)
  }

  const updateItemDetail = () => {
    let listOfFields = isPoint ? BASIC_FIELDS["point"] : BASIC_FIELDS["meridian"];
    let fields = listOfFields.map(item => {
      return item.field
    })

    let newItemDetail = {}

    Object.keys(itemDetail).forEach(field => {
      const index = fields.indexOf(field)
      if (listOfFields[index].critical) {
        newItemDetail[field] = itemDetail[field]
      } else {
        if (itemDetail[field] !== "") {
          newItemDetail[field] = itemDetail[field]
        }
      }
    })

    callbackUpdateDetail(newItemDetail)
  }

  return (
    <div
      role="div"
      aria-label="item-detail-edit"
      className={`item-detail-edit`}
    >
      <div
        className="item-detail-edit__header">
        <div className="item-detail-edit__flex-block grid grid-cols-2">
          <h1 className="item-detail-edit__header--code col-span-1">
            <input
              className='item-detail-edit__input'
              value={itemDetail?.code}
              placeholder={t(`placeholders.code`)}
              onChange={(e) => updateInformation(e.target.value, "code", -1)} />
          </h1>
          <h1 className="item-detail-edit__header--name col-span-1">
            <input
              className='item-detail-edit__input'
              value={itemDetail?.name}
              placeholder={t(`placeholders.name`)}
              onChange={(e) => updateInformation(e.target.value, "name", -1)}
              style={{ textAlign: "right" }} />
          </h1>
        </div>
      </div>

      <div className="item-detail-edit__information">
        {Object.keys(itemDetail || item).map((field, index) => {
          if (field !== "name" && field !== "code") {
            return (
              <div key={`point-information-${index}`}>
                <div
                  className={`item-detail-edit__category ${field === "caution" ? "item-detail-edit__category--caution" : ""}`}>
                  <span>{capitalizeAndMapInformationField(isPoint, field, usingLanguage)}</span>
                </div>
                <div className="item-detail-edit__info">
                  {isPoint && field === "functionalities" ?
                    <>
                      <div className="pb-2 pt-1">
                        {(itemDetail[field] || []).map((functionality, itemIndex) =>
                        (
                          <p
                            key={`point-functionality-${itemIndex}`}
                          >
                            <span>
                              <span style={{ width: "25px", display: "inline-block" }}>{itemIndex + 1}.{' '}</span>
                              <input
                                className='item-detail-edit__input item-detail-edit__input--inline'
                                value={itemDetail?.functionalities?.[itemIndex]}
                                placeholder={t(`placeholders.functionality`)}
                                onChange={(e) => updateInformation(e.target.value, "functionalities", itemIndex)} />
                              <FontAwesomeIcon
                                className="item-detail-edit__icon-delete"
                                icon={faTrashCan}
                                onClick={() => removeSubItem(itemIndex, field)}></FontAwesomeIcon>
                            </span>
                          </p>
                        ))}
                      </div>
                      <span className="mt-4">
                        <button
                          className='item-detail-edit__btn-add-subitem px-1'
                          onClick={(e) => {
                            if (newItemValue.trim() !== "") {
                              addSubItem(newItemValue.trim(), field)
                              setNewItemValue("");
                            }
                          }}
                        >
                          +
                        </button>
                        <input
                          className='item-detail-edit__input item-detail-edit__input--inline ml-2'
                          value={newItemValue}
                          onChange={(e) => {
                            setNewItemValue(e.target.value);
                          }}
                          placeholder={t(`placeholders.add_new_functionality`)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addSubItem(newItemValue.trim(), field)
                              setNewItemValue("");
                            }
                          }}
                        />
                      </span>
                    </>
                    : <>
                      {
                        !isPoint && field === "points" ?
                          <>
                            <div className="pb-2 pt-1">
                              {(itemDetail[field] || []).map((point, itemIndex) =>
                              (
                                <p
                                  key={`meridian-points-${itemIndex}`}
                                >
                                  <span>
                                    <span style={{ width: "25px", display: "inline-block" }}>{itemIndex + 1}.{' '}</span>
                                    <input
                                      className='item-detail-edit__input item-detail-edit__input--inline'
                                      value={itemDetail?.points?.[itemIndex]}
                                      placeholder={t(`placeholders.point`)}
                                      onChange={(e) => updateInformation(e.target.value, "points", itemIndex)} />
                                    <FontAwesomeIcon
                                      className="item-detail-edit__icon-delete"
                                      icon={faTrashCan}
                                      onClick={() => removeSubItem(itemIndex, field)}></FontAwesomeIcon>
                                  </span>
                                </p>
                              ))}
                            </div>
                            <span className="mt-4">
                              <button
                                className='item-detail-edit__btn-add-subitem px-1'
                                onClick={(e) => {
                                  if (newItemValue.trim() !== "") {
                                    addSubItem(newItemValue.trim(), field)
                                    setNewItemValue("");
                                  }
                                }}
                              >
                                +
                              </button>
                              <input
                                className='item-detail-edit__input item-detail-edit__input--inline ml-2'
                                value={newItemValue}
                                onChange={(e) => {
                                  setNewItemValue(e.target.value);
                                }}
                                placeholder={t(`placeholders.add_new_point`)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    addSubItem(newItemValue.trim(), field)
                                    setNewItemValue("");
                                  }
                                }}
                              />
                            </span>
                          </>
                          :
                          <p className={`item-detail-edit__info--text pb-2 pt-1
                          ${field === "caution" ? "item-detail-edit__info--text-caution" : ""}`}>
                            <textarea
                              className='item-detail-edit__textarea'
                              rows={itemDetail[field].length < 200 ? 2 : itemDetail[field].length < 350 ? 3 : 4}
                              placeholder={t(`placeholders.${field}`)}
                              onChange={(e) => {
                                updateInformation(e.target.value, field, -1);
                              }}
                              value={itemDetail[field]}>
                            </textarea>
                          </p>
                      }
                    </>
                  }
                </div>
              </div>
            )
          }
        })}
      </div>

      <p className='italic item-detail-edit__caution'>{t('edit_page.caution')}</p>

      <div className='item-detail-edit__buttons flex items-center justify-center mt-3'>
        <div
          className='item-detail-edit__buttons--button item-detail-edit__buttons--button-check'
          onClick={() => updateItemDetail()}>
          <FontAwesomeIcon
            icon={faCheck}
          />
        </div>
        <div
          className='item-detail-edit__buttons--button item-detail-edit__buttons--button-multiply'
          onClick={() => {
            history.push(location.pathname.replace("?edit", ""))
          }}>
          <FontAwesomeIcon
            icon={faMultiply}
          />
        </div>
      </div>
    </div>
  );
};
