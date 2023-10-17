'use client';

/** Libs */
import React, { useState, useRef } from 'react';

/** Components */
import { Thumbs, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

/** Styles */
import 'swiper/css';
import './hero-carousel.scss';

/** Constants */
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { configState } from '@/services/store';

const HeroCarousel = ({ dataArray }) => {
  const [config, setConfig] = useRecoilValue(configState);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const refPaused = useRef(false);

  const swiperRef = useRef(null);
  const progressCircle = useRef(null);
  const onAutoplayTimeLeft = (_s, _time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
  };

  const autoplayProgressIcon = (
    <button
      type="button"
      className="autoplay-progress"
      slot="container-end"
      onClick={() => {
        setIsPaused(!isPaused);
        refPaused.current = !refPaused.current;
        if (swiperRef?.current.autoplay.paused) {
          swiperRef.current.autoplay.resume();
        } else {
          swiperRef.current.autoplay.pause();
        }
      }}
    >
      <span className="spinner">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
      </span>
      <span>{isPaused ? <AiFillPlayCircle /> : <AiFillPauseCircle />}</span>
    </button>
  );

  const heroMaskLayer = <div className="hero-mask"></div>;

  if (!dataArray || dataArray.length < 1) {
    return null;
  }

  return (
    <div className="hero-carousel-wrapper">
      <Swiper
        ref={swiperRef}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onBeforeInit={(s) => {
          swiperRef.current = s;
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onAutoplayResume={() => {
          if (refPaused.current) {
            swiperRef.current.autoplay.pause();
          }
        }}
        modules={[Thumbs, Autoplay]}
        // thumbs={{ swiper: thumbsSwiper }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        slidesPerView={1}
      >
        {dataArray.map((data) => (
          <SwiperSlide className="main-slide" key={data.id}>
            <div
              className="content"
              style={{
                backgroundImage: `url(${data.imageUrl})`,
              }}
            >
              {data.type === 'VIDEO' && (
                <div className="video-bg">
                  <iframe
                    title="video-bg"
                    src={`https://www.dailymotion.com/embed/video/${data.id}?autoplay=1&mute=1&loop=1&controls=0`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div
                className="text-box"
                aria-hidden="true"
                onClick={() => onClick(data)}
              >
                <div
                  className="label"
                  style={{
                    backgroundColor: 'red',
                  }}
                >
                  {data.primaryLabel?.toUpperCase() ||
                    getCategoryByKey(
                      data.primaryCategorySlug ||
                        extractCategoryFromTags(data.tags),
                    ).title.toUpperCase()}
                </div>

                <div className="title">{data.title}</div>
                <div className="description">{data.description}</div>
              </div>
              {heroMaskLayer}
            </div>
          </SwiperSlide>
        ))}
        <div style={{ position: 'relative' }}>{autoplayProgressIcon}</div>
      </Swiper>

      <Swiper
        className="thumbs-swiper"
        modules={[Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        slidesPerView="auto"
        spaceBetween={8}
        breakpoints={{
          1280: {
            spaceBetween: 16,
          },
        }}
      >
        {dataArray.map((data) => (
          <SwiperSlide className="thumbs" key={data.id}>
            <img
              alt={data.imageUrl}
              src={data.imageUrl}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
