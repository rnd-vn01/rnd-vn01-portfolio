import './AboutPage.scss'
import React, { useEffect, useState } from 'react';
import {
  AboutPageSection,
  FullPageTitleBar,
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';

//Images
import Logo from "src/assets/images/Logo.svg";
import LogoHCMUS from "src/assets/images/about/HCMUS.png"
import LogoAUT from "src/assets/images/about/AUT.jpg"
import PhotoNhan from "src/assets/images/about/members/Nhan.jpg"
import PhotoTan from "src/assets/images/about/members/Tan.jpg"
import PhotoTrang from "src/assets/images/about/members/Trang.jpg"
import PhotoChuong from "src/assets/images/about/members/Chuong.jpg"
import LogoLinkedIn from "src/assets/images/about/LinkedIn.png"
import PhotoDrMinh from "src/assets/images/about/doctors/DrMinh.jpg"
import PhotoDrVan from "src/assets/images/about/doctors/DrVan.png"
import PhotoDrNhan from "src/assets/images/about/DrNhan.jpg"
import PhotoDHYD from "src/assets/images/about/University.jpg"
import PhotoEngBook from "src/assets/images/about/EngBook.jpg"
import PhotoViBook from "src/assets/images/about/ViBook.jpg"
import PhotoModel from "src/assets/images/about/Model.png"
import { MobileTitleBar, SideMenu } from 'src/components/common/responsive';
import { useMediaQuery } from 'react-responsive';

export const AboutPage: React.FC<IAboutPage> = ({

}) => {
  const { t } = useTranslation();
  document.title = `${APP_NAME} | ${t('about_page.title')}`

  // RESPONSIVE
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div
      role="div"
      aria-label="about-us-page"
      className="about-us-page grid grid-cols-7">
      <div className="about-us-page__content">
        {isDesktop ? <FullPageTitleBar
          pageCode="about-us"
          translateCode="about_us"
        />
          :
          <MobileTitleBar
            translateCode={"about_us"}
            isShowingSideMenu={isShowingSideMenu}
            callbackSetIsShowingSideMenu={setIsShowingSideMenu} />}

        {!isDesktop && <>
          <SideMenu
            isShowing={isShowingSideMenu}
            callbackSetIsShowing={setIsShowingSideMenu}
          />
        </>}

        <div className='w-full'>
          <div className='about-us-page__head flex items-center justify-center'>
            <img className='about-us-page__head--logo mr-4' src={Logo} />
            <h1 className='about-us-page__head--project-name'>
              {t('hometitle.project_name')}
            </h1>
          </div>
        </div>

        <div className='about-us-page__description'>
          <b>{t("about_page.sections.description")}</b>
          <p>{t("about_page.description.project")}</p>
        </div>

        <AboutPageSection
          showContent={
            <div className='py-10'>
              <div className='flex items-center justify-center'>
                <img className='about-page-section__school-logo mr-4' src={LogoAUT} />
                <img className='about-page-section__school-logo ml-4' src={LogoHCMUS} />
              </div>

              <p className='text-justify mt-6'>
                {t("about_page.description.rnd")}
              </p>
            </div>}
          isCollapsable={true}
          sectionName={`${t('about_page.sections.rnd')}:`}
          information={`HCMUS - AUT · cycle 13`}
          index={0}
        />

        {/* <AboutPageSection
          showContent={<></>}
          isCollapsable={false}
          sectionName={`${t('about_page.sections.client')}:`}
          information={`${t('about_page.sections.dr')} William Liu`}
        /> */}

        <AboutPageSection
          sectionName={`${t('about_page.sections.supervisor')}:`}
          information={``}
          showContent={<div className='py-6 flex justify-around'>
            <div className='about-page-section__member about-page-section__doctor flex items-center flex-col'>
              <img className='about-page-section__member--avatar about-page-section__doctor--avatar'
                src={PhotoDrNhan} />
              <h1>{t('about_page.sections.dr')}{' '}{t('about_page.sections.nhan_le_thi')}
              </h1>

              <p className='mt-5 text-center'>
                {t('about_page.sections.lecturer_hcmus')}
              </p>
            </div>
          </div>}
          index={5}
          isCollapsable={true}
        />

        <AboutPageSection
          showContent={<div className={`grid ${!isMobile ? "grid-cols-4" : "grid-cols-2"} py-6`}
            style={{ gridColumnGap: isDesktop ? "7rem" : "3rem" }}>
            <div className='col-span-1 about-page-section__member'>
              <img className='col-span-1 about-page-section__member--avatar' src={PhotoNhan} />
              <h1>{t('about_page.sections.members.nhan_nguyen_cao')}
                <img
                  className='ml-1'
                  onClick={() => {
                    window.open(`https://www.linkedin.com/in/nhannguyen2712/`, "_blank").focus()
                  }}
                  src={LogoLinkedIn} style={{ width: "12px", display: "inline-block" }}
                  data-testid="logo-linkedin-member1" />
              </h1>

              <p>
                {t('about_page.sections.roles.business_analyst')}
              </p>
              <p>
                {t('about_page.sections.roles.front_end_dev')}
              </p>
            </div>

            <div className='col-span-1 about-page-section__member'>
              <img className='col-span-1 about-page-section__member--avatar' src={PhotoTan} />
              <h1>{t('about_page.sections.members.tan_le_tran_ba')}
                <img
                  className='ml-1'
                  onClick={() => {
                    window.open(`https://www.linkedin.com/in/tanleeb01/`, "_blank").focus()
                  }}
                  src={LogoLinkedIn} style={{ width: "12px", display: "inline-block" }}
                  data-testid="logo-linkedin-member2" />
              </h1>

              <p>
                {t('about_page.sections.roles.project_manager')}
              </p>
              <p>
                {t('about_page.sections.roles.designer')}
              </p>
            </div>

            <div className='col-span-1 about-page-section__member'>
              <img className='col-span-1 about-page-section__member--avatar' src={PhotoTrang} />
              <h1>{t('about_page.sections.members.trang_ho_ngoc_thao')}
                <img
                  className='ml-1'
                  onClick={() => {
                    window.open(`https://www.linkedin.com/in/h%E1%BB%93-trang-956940210/`, "_blank").focus()
                  }}
                  src={LogoLinkedIn} style={{ width: "12px", display: "inline-block" }}
                  data-testid="logo-linkedin-member3" />
              </h1>

              <p>
                {t('about_page.sections.roles.back_end_dev')}
              </p>
            </div>

            <div className='col-span-1 about-page-section__member'>
              <img className='col-span-1 about-page-section__member--avatar' src={PhotoChuong} />
              <h1>{t('about_page.sections.members.chuong_pham_dinh')}
                <img
                  className='ml-1'
                  onClick={() => {
                    window.open(`https://www.facebook.com/profile.php?id=100086637858961`, "_blank").focus()
                  }}
                  src={LogoLinkedIn} style={{ width: "12px", display: "inline-block" }}
                  data-testid="logo-linkedin-member4" />
              </h1>
              <p>
                {t('about_page.sections.roles.quality_engineer')}
              </p>
            </div>
          </div>}
          isCollapsable={true}
          sectionName={`${t('about_page.sections.development_team')}:`}
          information={`VN01`}
          index={1}
        />

        <AboutPageSection
          showContent={<div className='py-6 flex justify-around'>
            <div className='col-span-1 about-page-section__member about-page-section__doctor flex items-center flex-col'>
              <img className='col-span-1 about-page-section__member--avatar about-page-section__doctor--avatar'
                src={PhotoDrMinh} />
              <h1>{t('about_page.sections.mmed')}{' '}{t('about_page.sections.consultants.minh_ma_hoang')}
              </h1>

              <p className='mt-2 text-center'>
                {t('about_page.sections.consultants.acupuncturist')}<br />
                {t('about_page.sections.consultants.visiting_lecturer')}
              </p>
            </div>

            <div className='col-span-1 about-page-section__member about-page-section__doctor flex items-center flex-col'>
              <img className='col-span-1 about-page-section__member--avatar about-page-section__doctor--avatar'
                src={PhotoDrVan} />
              <h1>{t('about_page.sections.mmed')}{' '}{t('about_page.sections.consultants.van_le_thi_tuong')}
              </h1>

              <p className='mt-2 text-center'>
                {t('about_page.sections.consultants.acupuncturist')}<br />
                {t('about_page.sections.consultants.lecturer')}
              </p>
            </div>
          </div>}
          isCollapsable={true}
          sectionName={`${t('about_page.sections.consultants.title')}:`}
          information={``}
          index={2}
        />

        <AboutPageSection
          showContent={<div className={`py-6 flex ${!isMobile ? "flex-row" : "flex-col"}`}>
            <img style={{ width: "500px" }} src={PhotoDHYD} />
            <div className='flex flex-column justify-center items-center'>
              <h1 className={
                `${!isMobile ? "ml-4" : "mt-3 text-center"}`
              } style={{ fontSize: "1.5rem" }}>{t('about_page.sections.users.description')}</h1>
            </div>
          </div>}
          isCollapsable={true}
          sectionName={`${t('about_page.sections.users.title')}:`}
          information={``}
          index={3}
        />

        <AboutPageSection
          showContent={<div className={`py-6 flex ${!isMobile ? "flex-row" : "flex-col"}`}>
            <div className='about-page-section__reference mr-4'>
              <img src={PhotoViBook} />
              <h1
              >Học châm cứu bằng hình ảnh</h1>
            </div>
            <div className='about-page-section__reference mr-4'>
              <img src={PhotoEngBook} />
              <h1
              >Anatomical atlas of Chinese acupuncture points</h1>
            </div>
            <div className='about-page-section__reference mr-4'>
              <img
                onClick={() => {
                  window.open(`https://sketchfab.com/3d-models/study-human-male-sculpt-65836fbba6974f3cbe8fbd7bc6bebc4d`, "_blank").focus()
                }}
                src={PhotoModel}
                style={{
                  objectFit: "cover"
                }}
                data-testid="img-model-asset" />
              <h1
              >{t('about_page.sections.model')}</h1>
            </div>
          </div>}
          isCollapsable={true}
          sectionName={`${t('about_page.sections.resources')}:`}
          information={``}
          index={4}
        />
      </div>
    </div >
  );
};
