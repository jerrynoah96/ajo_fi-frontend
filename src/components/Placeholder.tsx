'use client';

export const PlaceholderImage = () => (
  <div className="w-[600px] h-[400px] bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-6">
    <div className="border-2 border-white/20 rounded-lg h-full flex flex-col">
      {/* Mock Header */}
      <div className="border-b border-white/20 p-4 flex justify-between items-center">
        <div className="h-8 w-32 bg-white/20 rounded-md"></div>
        <div className="h-8 w-40 bg-purple-500/40 rounded-md"></div>
      </div>
      
      {/* Mock Content */}
      <div className="flex-1 p-4 grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-white/20 rounded-md"></div>
          <div className="h-24 w-full bg-white/10 rounded-lg"></div>
          <div className="h-8 w-1/2 bg-white/20 rounded-md"></div>
        </div>
        <div className="space-y-4">
          <div className="h-40 w-full bg-purple-500/20 rounded-lg"></div>
          <div className="h-8 w-2/3 bg-white/20 rounded-md"></div>
        </div>
      </div>
    </div>
  </div>
); 