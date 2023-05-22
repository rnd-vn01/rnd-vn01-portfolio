import './PersonalRecordsPageDesktop.scss'
import React, { useEffect, useState } from 'react';
import {
  FullPageTitleBar,
  RecordsChart,
  RecordsProgressLog,
  RecordsSummaryDesktop,
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useHistory } from 'react-router-dom';
import { getQuizzesOfUsers } from 'src/helpers/api/quizRecords';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export const PersonalRecordsPageDesktop: React.FC<IPersonalRecordsPage> = ({

}) => {
  const { t } = useTranslation();
  document.title = `${APP_NAME} | ${t('personal_records_page.title')}`

  const {
    user
  } = useSelector(
    (state: RootState) => state.authSlice,
  );
  const [quizzesList, setQuizzesList] = useState<any>([]);
  const [render, setRender] = useState<number>(0);
  const history = useHistory();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        MySwal.fire({
          title: t('getting_records'),
          didOpen: () => {
            MySwal.showLoading(null);
          },
          didClose: () => {
            MySwal.hideLoading();
          },
          allowOutsideClick: false,
        })

        const result = await getQuizzesOfUsers(user.firebaseId)
        MySwal.close();
        setQuizzesList(result)
      } catch {
        MySwal.fire({
          title: "Error...",
          text: t('login_page.messages.save_quiz_error'),
          icon: "error"
        }).then(() => {
          history.push("/", { isRedirect: true })
        })
      }
    }

    getQuizzes();
  }, [])

  useEffect(() => {
    if (quizzesList.length) {
      setRender(render + 1);
    }
  }, [quizzesList])

  // RESPONSIVE
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  return (
    <div
      role="div"
      aria-label="personal-records-page-desktop"
      key={render}
      className="personal-records-page-desktop grid grid-cols-7">
      <div className="personal-records-page-desktop__content">
        <FullPageTitleBar
          pageCode="personal-records"
          translateCode="personal_records"
        />

        <RecordsSummaryDesktop
          data={quizzesList}
        />

        <div className={`grid pt-3 gap-3 grid-cols-3`}>
          <div className="col-span-1">
            <RecordsProgressLog
              quizzesList={quizzesList}
            />
          </div>

          <div className={`col-span-2`}>
            <RecordsChart
              quizzesList={quizzesList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
