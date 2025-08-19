
import React from 'react';

export const OfferCardSkeleton: React.FC = () => {
    return (
        <div className="bg-surface rounded-2xl border border-border flex flex-col overflow-hidden">
            <div className="p-5 flex items-center space-x-4 border-b border-border">
                <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="h-8 w-2/5 bg-gray-200 rounded-full animate-pulse mb-5"></div>
                <div className="mt-auto pt-4 border-t border-border">
                    <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default OfferCardSkeleton;
