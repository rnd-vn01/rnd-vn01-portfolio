import './DetailPage.scss'
import React, { useEffect, useState } from 'react';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { FullPageTitleBar, ItemDetail, ItemDetailEdit, SearchBarRedirect } from 'src/components/common';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import DEMO_DATA_MERIDIAN_VI from 'src/assets/test_data/meridians_vi.json';
import DEMO_DATA_MERIDIAN_EN from 'src/assets/test_data/meridians_en.json';
import { useQuery } from 'src/helpers/hooks/useQuery';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { capitalizeAndMapInformationField } from 'src/helpers/capitalize';

export const DetailPage: React.FC<IDetailPage> = ({

}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const hookQuery = useQuery();

  const [isPoint, setIsPoint] = useState<boolean>(false);
  const [itemCode, setItemCode] = useState<string>("");
  const [detail, setDetail] = useState<any>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const MySwal = withReactContent(Swal);
  const handleUpdate = (newItemDetail: any) => {
    let formattedDetail = { ...newItemDetail }
    Object.keys(formattedDetail).forEach((field) => {
      Object.defineProperty(formattedDetail, capitalizeAndMapInformationField(isPoint, field, currentLanguage),
        Object.getOwnPropertyDescriptor(formattedDetail, field));
      delete formattedDetail[field];
    })

    MySwal.fire({
      icon: 'warning',
      title: `${t('edit_page.warning')}...`,
      html: `<p>${t('edit_page.demo_caution')}</p>
      <pre style="text-align: left; white-space: pre-wrap;">${JSON.stringify(formattedDetail, null, "\t")}</pre>
      `,
    })
      .then(() => {
        history.push(location.pathname.replace("?edit", ""))
      })
  }

  useEffect(() => {
    let pathParts = location.pathname.split("/")
    if (pathParts.length === 4) {
      setIsPoint(pathParts[2] === "point")
      setItemCode(pathParts[3])
    } else {
      history.push("/", { isRedirect: true })
    }
    setIsEdit(hookQuery.get("edit") === "")
  }, [location])

  useEffect(() => {
    if (itemCode) {
      if (isPoint) {
        const DEMO_DATA = currentLanguage === "EN" ? DEMO_DATA_EN : DEMO_DATA_VI

        DEMO_DATA.forEach((item) => {
          if (item.code.toUpperCase() === itemCode.toUpperCase()) {
            setDetail(item)
            document.title = `${APP_NAME} | ${item.code} | ${item.name}`
          }
        })
      } else {
        const DEMO_DATA_MERIDIAN = currentLanguage === "EN" ? DEMO_DATA_MERIDIAN_EN : DEMO_DATA_MERIDIAN_VI

        DEMO_DATA_MERIDIAN.forEach((item) => {
          if (item.code.toUpperCase() === itemCode.toUpperCase()) {
            setDetail(item)
            document.title = `${APP_NAME} | ${item.code} | ${item.name}`
          }
        })

      }

    } else {
      document.title = `${APP_NAME}`
    }
  }, [itemCode, isPoint])

  return (
    <div
      role="div"
      aria-label="detail-page"
      className="detail-page ">
      <div className="detail-page__content">
        <FullPageTitleBar
          pageCode={isEdit ? "data-management" : ""}
          translateCode={isEdit ? "data_management" : ""}
        />

        <SearchBarRedirect />

        {Object.keys(detail).length > 0 && (
          !isEdit ? <ItemDetail
            item={detail}
            usingLanguage={currentLanguage}
            isPoint={isPoint}
            query={hookQuery.get('query')}
          /> : <ItemDetailEdit
            item={detail}
            usingLanguage={currentLanguage}
            isPoint={isPoint}
            query={hookQuery.get('query')}
            callbackUpdateDetail={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};
