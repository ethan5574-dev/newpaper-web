'use client';
import React from 'react';

const Loading = () => {
  return (
    <div className='scale_layout fixed inset-0 z-[99999] flex h-[var(--100vh)] w-full flex-col items-center justify-center gap-[0.5rem] bg-white bg-[url("/images/bg-loading.webp")] bg-cover bg-center max-sm:px-[16px]'>
      <img
        src='/images/dragon-loading.webp'
        className='animateDragon w-[150px] sm:w-[267px]'
        // width={267}
        // height={267}
        alt='er'
      />
      <img
        className='w-[700px] sm:w-[855px]'
        src='/images/loading-text.png'
        // width={855}
        // height={42}
        alt='er'
      />
      <p className='mt-[24px] text-center text-[16px] font-[400] text-[#8F3A2D] sm:text-[20px]'>
        Please wait as {`you'`}re being transitioned to the Dragark World of Sky
        Islands
      </p>
    </div>
  );
};

export default Loading;
