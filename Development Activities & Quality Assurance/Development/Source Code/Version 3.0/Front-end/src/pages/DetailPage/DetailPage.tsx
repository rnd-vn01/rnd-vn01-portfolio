import './DetailPage.scss'
import React, { useEffect, useState } from 'react';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { FullPageTitleBar, ItemDetail, ItemDetailEdit, SearchBarRedirect } from 'src/components/common';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { useQuery } from 'src/helpers/hooks/useQuery';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { capitalizeAndMapInformationField } from 'src/helpers/capitalize';
import { useMediaQuery } from 'react-responsive';
import { MobileTitleBar, SideMenu } from 'src/components/common/responsive';
import {
  getAcupuncturePointByCode,
  getAcupuncturePoints,
  getMeridianByCode,
  getMeridians,
  updateAcupuncturePoint,
  updateMeridian
} from 'src/helpers/api/items';
import { resetToInitialStateDataSlice, resetToInitialStatePointSelectionSlice, setAcupuncturePoints } from 'src/redux/slice';

export const DetailPage: React.FC<IDetailPage> = ({

}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const hookQuery = useQuery();
  const dispatch = useAppDispatch();

  const [isPoint, setIsPoint] = useState<boolean>(false);
  const [itemCode, setItemCode] = useState<string>("");
  const [detail, setDetail] = useState<any>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // RESPONSIVE
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });
  const [mobileCalledEditDetail, setMobileCalledEditDetail] = useState<number>(0);

  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const MySwal = withReactContent(Swal);
  const handleUpdate = async (newItemDetail: any) => {
    if (!isDesktop) {
      setMobileCalledEditDetail(0);
    }

    let formattedDetail = { ...newItemDetail }
    Object.keys(formattedDetail).forEach((field) => {
      Object.defineProperty(formattedDetail, capitalizeAndMapInformationField(isPoint, field, currentLanguage),
        Object.getOwnPropertyDescriptor(formattedDetail, field));
      delete formattedDetail[field];
    })

    MySwal.fire({
      didOpen: () => {
        MySwal.showLoading(null);
      },
      didClose: () => {
        MySwal.hideLoading();
      },
      allowOutsideClick: false,
    })

    let result = false;
    try {
      if (isPoint) {
        result = await updateAcupuncturePoint(currentLanguage, { ...newItemDetail })
      } else {
        result = await updateMeridian(currentLanguage, { ...newItemDetail })
      }

      dispatch(resetToInitialStateDataSlice(null));
      await getAcupuncturePoints(currentLanguage);
      await getMeridians(currentLanguage);
    }
    catch {
      MySwal.fire({
        icon: 'error',
        title: t('error'),
        text: t('edit_page.update_result.failed'),
      })
    }

    MySwal.close()

    if (result) {
      MySwal.fire({
        icon: 'success',
        title: 'Success...',
        text: t('edit_page.update_result.success'),
      })
        .then(() => {
          window.location.replace(location.pathname.replace("?edit", ""))
          return;
        })
    } else {
      MySwal.fire({
        icon: 'error',
        title: t('error'),
        text: t('edit_page.update_result.failed'),
      })
        .then(() => {
          window.location.replace(location.pathname.replace("?edit", ""))
          return;
        })
    }
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
    const getItemInformation = async () => {
      if (isPoint) {
        setIsLoading(true);
        const item = await getAcupuncturePointByCode(currentLanguage, itemCode) as any
        setIsLoading(false);

        if (Object.keys(item).length === 0) {
          //Redirect to home page
          history.push("/advanced-search")
        }

        setDetail(item)
        document.title = `${APP_NAME} | ${item.code} | ${item.name}`
      } else {
        setIsLoading(true);
        const item = await getMeridianByCode(currentLanguage, itemCode) as any
        setIsLoading(false);

        if (Object.keys(item).length === 0) {
          //Redirect to home page
          history.push("/advanced-search")
        }

        setDetail(item)
        document.title = `${APP_NAME} | ${item.code} | ${item.name}`
      }
    }

    if (itemCode) {
      getItemInformation();
    } else {
      document.title = `${APP_NAME}`
    }
  }, [itemCode, isPoint])

  useEffect(() => {
    dispatch(resetToInitialStatePointSelectionSlice());
  }, [])

  return (
    <div
      role="div"
      aria-label="detail-page"
      className="detail-page ">
      <div className="detail-page__content">
        {isDesktop ? <FullPageTitleBar
          pageCode={isEdit ? "data-management" : ""}
          translateCode={isEdit ? "data_management" : ""}
        /> :
          <MobileTitleBar
            translateCode={isEdit ? "data_management" : itemCode}
            isShowingSideMenu={isShowingSideMenu}
            callbackSetIsShowingSideMenu={setIsShowingSideMenu}
            isEdit={isEdit}
            isViewingDetail={!isEdit}
            callbackTriggerEditDetail={() => {
              setMobileCalledEditDetail(mobileCalledEditDetail + 1)
            }}
          />}

        {!isDesktop && <>
          <SideMenu
            isShowing={isShowingSideMenu}
            callbackSetIsShowing={setIsShowingSideMenu}
          />
        </>}

        {
          !isEdit && <SearchBarRedirect />
        }

        {isLoading &&
          <div className='p-4 flex-center'>
            <svg aria-hidden="true" className="w-10 h-10 mt-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>}

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
            mobileCalledEditDetail={mobileCalledEditDetail}
            resetItemDetail={setDetail}
          />
        )}
      </div>
    </div>
  );
};
