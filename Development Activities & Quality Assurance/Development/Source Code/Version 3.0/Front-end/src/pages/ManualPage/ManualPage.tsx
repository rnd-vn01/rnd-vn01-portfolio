import './ManualPage.scss'
import React, { useEffect, useState } from 'react';
import {
  FullPageTitleBar,
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';

import { MobileTitleBar, SideMenu } from 'src/components/common/responsive';
import { useMediaQuery } from 'react-responsive';

//Assets
import Logo from "src/assets/images/Logo.svg";
import DesktopHover from "src/assets/images/manual/desktop/hover.mp4";
import DesktopPanning from "src/assets/images/manual/desktop/panning.mp4";
import DesktopRotate from "src/assets/images/manual/desktop/rotate.mp4";
import DesktopSelect from "src/assets/images/manual/desktop/select.mp4";
import DesktopZoom from "src/assets/images/manual/desktop/zoom.mp4";
import DesktopMenu from 'src/assets/images/manual/desktop/menu.png';
import MobilePanning from 'src/assets/images/manual/mobile/panning.mp4';
import MobileRotate from 'src/assets/images/manual/mobile/rotate.mp4';
import MobileSelectMeridian from 'src/assets/images/manual/mobile/select meridian.mp4';
import MobileSelectPoint from 'src/assets/images/manual/mobile/select point.mp4';
import MobileZoom from 'src/assets/images/manual/mobile/zoom.mp4';

export const ManualPage: React.FC = () => {
  const { t } = useTranslation();
  document.title = `${APP_NAME} | ${t('manual_page.title')}`

  // RESPONSIVE
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div
      role="div"
      aria-label="manual-page"
      className="manual-page">
      <div className="manual-page__content">
        {isDesktop ? <FullPageTitleBar
          pageCode="manual"
          translateCode="manual"
        />
          :
          <MobileTitleBar
            translateCode={"manual"}
            isShowingSideMenu={isShowingSideMenu}
            callbackSetIsShowingSideMenu={setIsShowingSideMenu} />}

        {!isDesktop && <>
          <SideMenu
            isShowing={isShowingSideMenu}
            callbackSetIsShowing={setIsShowingSideMenu}
          />
        </>}

        <div className='w-full mb-3'>
          <div className='manual-page__head flex items-center justify-center'>
            <img className='manual-page__head--logo mr-4' src={Logo} />
            <h1 className='manual-page__head--project-name'>
              {t('hometitle.project_name')}
            </h1>
          </div>

          {isDesktop &&
            <div className='manual-page__desktop mt-3'>
              <h2 className='text-center mb-2'>{t('manual_page.interactions')}</h2>
              <div className='grid grid-cols-2 gap-2'>
                <div className='col-span-1'>
                  <video
                    src={DesktopRotate}
                    autoPlay
                    loop
                    muted
                    playsInline
                  ></video>
                  <p className='manual-page__instruction'>
                    {t('manual_page.desktop.rotate')}
                  </p>
                </div>

                <div className='col-span-1'>
                  <video
                    src={DesktopPanning}
                    autoPlay
                    loop
                    muted
                    playsInline
                  ></video>
                  <p className='manual-page__instruction'>
                    {t('manual_page.desktop.pan')}
                  </p>
                </div>

                <div className='col-span-2'>
                  <div style={{ width: '50%', marginLeft: '25%' }}>
                    <div className='col-span-1'>
                      <video
                        src={DesktopZoom}
                        autoPlay
                        loop
                        muted
                        playsInline
                      ></video>
                      <p className='manual-page__instruction'>
                        {t('manual_page.desktop.zoom')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className='text-center mt-8 mb-2'>{t('manual_page.itemInteraction')}</h2>
              <div className='grid grid-cols-2 gap-2'>
                <div className='col-span-1'>
                  <video
                    src={DesktopHover}
                    autoPlay
                    loop
                    muted
                    playsInline
                  ></video>
                  <p className='manual-page__instruction'>
                    {t('manual_page.desktop.hover')}
                  </p>
                </div>

                <div className='col-span-1'>
                  <video
                    src={DesktopSelect}
                    autoPlay
                    loop
                    muted
                    playsInline
                  ></video>
                  <p className='manual-page__instruction'>
                    {t('manual_page.desktop.select')}
                  </p>
                </div>

                <p className='manual-page__instruction col-span-2'>
                  {t('manual_page.desktop.deselect')}
                </p>
              </div>

              <h2 className='text-center mt-8 mb-2'>{t('manual_page.quickMenu')}</h2>
              <div className='grid'>
                <img src={DesktopMenu} style={{ width: '50%', marginLeft: '25%' }}></img>
                <p className='manual-page__instruction'>
                  {t('manual_page.desktop.selectMeridian')}
                </p>
              </div>
            </div>}

          {!isDesktop &&
            <div className='manual-page__mobile'>
              <h2 className='text-center mb-2 mt-3'>{t('manual_page.interactions')}</h2>

              <video
                src={MobileRotate}
                autoPlay
                loop
                muted
                playsInline
              ></video>
              <p className='manual-page__instruction mb-4'>
                {t('manual_page.mobile.zoom')}
              </p>

              <video
                src={MobilePanning}
                autoPlay
                loop
                muted
                playsInline
              ></video>
              <p className='manual-page__instruction mb-4'>
                {t('manual_page.mobile.pan')}
              </p>

              <video
                src={MobileZoom}
                autoPlay
                loop
                muted
                playsInline
              ></video>
              <p className='manual-page__instruction mb-4'>
                {t('manual_page.mobile.zoom')}
              </p>

              <video
                src={MobileSelectPoint}
                autoPlay
                loop
                muted
                playsInline
              ></video>
              <p className='manual-page__instruction mb-4'>
                {t('manual_page.mobile.selectPoint')}
              </p>

              <video
                src={MobileSelectMeridian}
                autoPlay
                loop
                muted
                playsInline
              ></video>
              <p className='manual-page__instruction mb-4'>
                {t('manual_page.mobile.selectMeridian')}
              </p>
            </div>}
        </div>
      </div>
    </div >
  );
};
