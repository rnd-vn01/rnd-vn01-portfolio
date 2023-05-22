import './PersonalRecordsPage.scss'
import React, { useState } from 'react';
import {
  FullPageTitleBar,
  RecordsChart,
  RecordsProgressLog,
  RecordsSummary,
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';

export const PersonalRecordsPage: React.FC<IPersonalRecordsPage> = ({

}) => {
  const { t } = useTranslation();
  document.title = `${APP_NAME} | ${t('data_management_page.title')}`

  return (
    <div
      role="div"
      aria-label="personal-records-page"
      className="personal-records-page grid grid-cols-7">
      <div className="personal-records-page__content">
        <FullPageTitleBar
          pageCode="personal-records"
          translateCode="personal_records"
        />

        <RecordsSummary
          data={{
            "points": 150,
            "meridians": 10,
            "quizzes": 20,
            "accuracy": 67
          }}
        />

        <div className="grid grid-cols-3 pt-3 gap-3">
          <div className="col-span-1">
            <RecordsProgressLog />
          </div>

          <div className="col-span-2">
            <RecordsChart />
          </div>
        </div>
      </div>
    </div>
  );
};
