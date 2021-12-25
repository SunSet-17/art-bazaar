import styles from '../styles/global.module.css'
import React, { useState,useEffect } from 'react';

let products = [
    // {
    //     id: 1,
    //     name: 'Sample '+1,
    //     href: '#',
    //     imageSrc: '/sample_style/style'+1+'.png',
    //     imageAlt: 'Sample '+1,
    //     price: '$35',
    //     color: 'Black',
    // },
    // More products...
  ]

let numOfSamples = 16;
for (let index = 1; index <= numOfSamples; index++) {
    products.push({ 
        id: index,
        name: 'Sample '+index,
        href: '#',
        imageSrc: '/sample_style/style'+index+'.png',
        imageAlt: 'Sample '+index,
        price: '$35',
        color: 'Black',
    })
}
  
export default function StyleGrid() {

    //   todo:悬停显示价格

    return (
        <>
            <div className="max-w-2xl mx-auto py-4 lg:max-w-7xl">
                <div className="grid grid-cols-1 gap-y-2 gap-x-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between"></div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}