import styles from '../styles/global.module.css'
import React, { useState,useEffect } from 'react';
import Image from 'next/image'

let transStyles = [
    // {
    //     id: 1,
    //     name: 'Sample '+1,
    //     href: '#',
    //     imageSrc: '/sample_style/style'+1+'.png',
    //     imageAlt: 'Sample '+1,
    //     price: '$35',
    //     color: 'Black',
    // },
    // More transStyles...
  ]

// 16个示例图片
let numOfSamples = 16;
for (let index = 1; index <= numOfSamples; index++) {
    transStyles.push({ 
        id: index,
        name: 'Sample '+index,
        href: '#',
        imageSrc: '/sample_style/style'+index+'.png',
        imageAlt: 'Sample '+index,
        price: '$35',
        color: 'Black',
    })
}
  
export default function StyleGrid(props) {

    //   todo:悬停显示价格
    //   todo:内部滚动条

    return (
        <>
            <div className="max-w-2xl mx-auto py-4 lg:max-w-7xl">
                <div className="grid grid-cols-1 gap-y-2 gap-x-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
                    {transStyles.map((transStyle) => (
                        <div key={transStyle.id} className="group relative">
                            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                                <img
                                    onClick={()=>{props.callback(transStyle)}}
                                    src={transStyle.imageSrc}
                                    alt={transStyle.imageAlt}
                                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                />
                                {/* <Image
                                    src={transStyle.imageSrc} // Route of the image file
                                    alt={transStyle.imageAlt}
                                    height={420} // Desired size with correct aspect ratio
                                    width={420} // Desired size with correct aspect ratio
                                    styles={styles.imgInTheGrid}
                                /> */}
                            </div>
                            <div className="mt-4 flex justify-between"></div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}