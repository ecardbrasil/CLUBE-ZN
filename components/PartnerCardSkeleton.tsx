
import React from 'react';

export const PartnerCardSkeleton: React.FC = () => {
    return (
        <div className="bg-surface rounded-2xl border border-border flex flex-col overflow-hidden">
            <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    );
};

export default PartnerCardSkeleton;
