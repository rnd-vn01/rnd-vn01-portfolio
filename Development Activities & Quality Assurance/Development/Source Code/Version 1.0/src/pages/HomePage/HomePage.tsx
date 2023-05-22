import './HomePage.scss'
import React, { useEffect, useState } from 'react';
import { AuthBar, FooterBar, HomeTitle, InformationBlock, QuickSearchBar } from 'src/components/common';
import DemoImage from "src/assets/images/Demo.png";
import { Canvas } from '@react-three/fiber'
import { Scene } from 'src/components/index';
import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import DEMO_DATA_MERIDIAN_VI from 'src/assets/test_data/meridians_vi.json';
import DEMO_DATA_MERIDIAN_EN from 'src/assets/test_data/meridians_en.json';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { APP_NAME } from 'src/configs/constants';

export const HomePage: React.FC = () => {
  const [isViewingItemInformation, setIsViewItemInformation] = useState<boolean>(false);
  const [itemInformation, setItemInformation] = useState<any>({});
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  document.title = `${APP_NAME}`

  const getRandomPointInfo = () => {
    const DEMO_DATA = currentLanguage === "EN" ? DEMO_DATA_EN : DEMO_DATA_VI
    setItemInformation(DEMO_DATA[Math.floor(Math.random() * DEMO_DATA.length)]);
    setIsViewItemInformation(true);
  };

  useEffect(() => {
    if (isViewingItemInformation) {
      getRandomPointInfo();
    }
  }, [currentLanguage])

  return (
    <div
      role="div"
      aria-label="home-page"
      className="home-page grid grid-cols-7">
      <div
        onClick={() => getRandomPointInfo()}
        className="home-page__section home-page__section--model col-span-5">
        {/* <Canvas shadows>
          <Scene />
        </Canvas> */}
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          src={DemoImage}></img>
      </div>

      <div className="home-page__section home-page__section--side-bar col-span-2">
        <AuthBar />
        <QuickSearchBar />
        <div className="home-page__section--main-content">
          {
            isViewingItemInformation ?
              <InformationBlock
                isPoint={true}
                itemInformation={itemInformation}
                usingLanguage={currentLanguage}
              /> :
              <HomeTitle />
          }
        </div>
        <FooterBar />
      </div>
    </div>
  );
};
