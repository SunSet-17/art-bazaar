import styles from '../styles/global.module.css'
import React, { useState,useEffect } from 'react';
import Image from 'next/image'

let transStyles = [
    // {
    //     id: 0,
    //     name: 'Sample Online',
    //     href: '#',
    //     imageSrc: 'https://s2.loli.net/2021/12/26/ZNVwe5D6pMhY7dQ.png',
    //     imageAlt: 'Sample',
    //     price: '$35',
    //     color: 'Black',
    // },
    // More transStyles...
  ]

// let prefix = 'https://cdn.jsdelivr.net/gh/HsFish1213/PicHost/sample_style'
// 0 - 15
let PicHostUrls = [
    'https://s2.loli.net/2021/12/26/8yIPO4VUgnzZCGT.png',
    'https://s2.loli.net/2021/12/26/JnwVuGpQzOAgDlm.png',
    'https://s2.loli.net/2021/12/26/zbr7p1AxV58QY3I.png',
    'https://s2.loli.net/2021/12/26/8oYvPSDQxOXbAWk.png',
    'https://s2.loli.net/2021/12/26/Hx2UOv1lFWSp3yQ.png',
    'https://s2.loli.net/2021/12/26/mS5sfPG7hKAJ4EY.png',
    'https://s2.loli.net/2021/12/26/ysRtjP6O4p3SHel.png',
    'https://s2.loli.net/2021/12/26/aA4RFwZn6heP2HC.png',
    'https://s2.loli.net/2021/12/26/lkE1RWtXg9Ve6Fn.png',
    'https://s2.loli.net/2021/12/26/mcHJ3kutiXEUyxG.png',
    'https://s2.loli.net/2021/12/26/1A7mC3NUZY9nOpe.png',
    'https://s2.loli.net/2021/12/26/qveiFHCn4Ir6c8j.png',
    'https://s2.loli.net/2021/12/26/62SUMln7Jsti8gb.png',
    'https://s2.loli.net/2021/12/26/vq5NJWsBeD9SzKl.png',
    'https://s2.loli.net/2021/12/26/rGYyigvV5k246D9.png',
    'https://s2.loli.net/2021/12/26/2Teh8EIOXLdCRZW.png',
]


// 16个示例图片
let numOfSamples = 16;
for (let index = 0; index < numOfSamples; index++) {
    transStyles.push({ 
        id: index,
        name: 'Sample '+index,
        href: '#',
        imageSrc: PicHostUrls[index],
        // imageSrc: prefix+'/style'+index+'.png',
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