import React from 'react'
import Skeleton from 'react-loading-skeleton'

const CardSkeleton = () => {
    return (
        <div className="w-full h-[90%] space-y-3 ">
            <Skeleton className="relative w-full h-60 mb-5  p-3">
            </Skeleton>
            <div className="w-full space-y-2">
                <Skeleton className="w-full h-3 text-base font-light italic tracking-widest rounded" />
                <Skeleton className="w-full h-3 text-base font-light italic tracking-widest rounded" />
                <Skeleton className="w-full h-3 text-base font-light italic tracking-widest rounded" />
                <Skeleton className="w-full h-3 text-base font-light italic tracking-widest rounded" />
                <div className="w-full flex flex-row justify-between items-center">
                    <Skeleton className="w-full h-3 text-base font-light italic tracking-widest rounded" />
                    <Skeleton className="w-full h-3 text-base font-light italic tracking-widest rounded" />

                </div>
            </div>
        </div>
    )
}

export default CardSkeleton