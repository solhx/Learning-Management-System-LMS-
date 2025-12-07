import React, { FC, useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, Clock, CheckCircle2, Lock } from 'lucide-react';

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set<string>());

  // Find unique video sections
  const videoSections: string[] = [
    ...new Set<string>(props.data?.map((item: any) => item.videoSection))
  ];
  
  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div className={`w-full ${!props.isDemo ? "sticky top-24 left-0 z-30" : ""}`}>
      <div className="space-y-3">
        {videoSections.map((section: string, sectionIndex: number) => {
          const isSectionVisible = visibleSections.has(section);
          const sectionVideos: any[] = props.data.filter(
            (item: any) => item.videoSection === section
          );

          const sectionVideoCount: number = sectionVideos.length;
          const sectionVideoLength: number = sectionVideos.reduce(
            (totalLength: number, item: any) => totalLength + item.videoLength,
            0
          );

          const sectionStartIndex: number = totalCount;
          totalCount += sectionVideoCount;
          const sectionContentHours: number = sectionVideoLength / 60;

          return (
            <div
              key={sectionIndex}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Section Header */}
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                onClick={() => toggleSection(section)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center transition-all
                    ${isSectionVisible 
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                      : 'bg-gray-200 dark:bg-gray-700'
                    }
                  `}>
                    <span className={`font-bold ${isSectionVisible ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                      {sectionIndex + 1}
                    </span>
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {section}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <PlayCircle className="w-4 h-4" />
                        {sectionVideoCount} Lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {sectionContentHours < 1 
                          ? `${sectionVideoLength} min` 
                          : `${sectionContentHours.toFixed(1)} hrs`
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center transition-all
                  ${isSectionVisible 
                    ? 'bg-blue-100 dark:bg-blue-900/30 rotate-180' 
                    : 'bg-gray-200 dark:bg-gray-700'
                  }
                `}>
                  {isSectionVisible ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
              </button>

              {/* Section Videos - Collapsible Content */}
              <div className={`
                overflow-hidden transition-all duration-300
                ${isSectionVisible ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <div className="px-4 pb-4 space-y-2">
                  {sectionVideos.map((item: any, index: number) => {
                    const videoIndex: number = sectionStartIndex + index;
                    const contentLength: number = item.videoLength / 60;
                    const isActive = videoIndex === props.activeVideo;
                    const isLocked = props.isDemo && index > 0; // Demo mode: only first video unlocked

                    return (
                      <div
                        key={item._id}
                        className={`
                          group relative p-4 rounded-lg border transition-all duration-300
                          ${isActive 
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-blue-300 dark:border-blue-700 shadow-md' 
                            : 'bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800/50'
                          }
                          ${!props.isDemo && !isLocked ? 'cursor-pointer' : ''}
                          ${isLocked ? 'opacity-75' : ''}
                        `}
                        onClick={() =>
                          !props.isDemo && !isLocked ? props?.setActiveVideo?.(videoIndex) : null
                        }
                      >
                        {/* Active Indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-l-lg"></div>
                        )}

                        <div className="flex items-center gap-3">
                          {/* Video Icon/Number */}
                          <div className={`
                            w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                            ${isActive 
                              ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg' 
                              : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
                            }
                          `}>
                            {isLocked ? (
                              <Lock className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`} />
                            ) : isActive ? (
                              <PlayCircle className="w-5 h-5 text-white" />
                            ) : (
                              <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                                {index + 1}
                              </span>
                            )}
                          </div>

                          {/* Video Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className={`
                                font-semibold break-words line-clamp-2 transition-colors
                                ${isActive 
                                  ? 'text-blue-700 dark:text-blue-300' 
                                  : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                }
                              `}>
                                {item.title}
                              </h4>
                              
                              {/* Completed Badge */}
                              {!props.isDemo && !isLocked && videoIndex < (props.activeVideo || 0) && (
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                              )}
                            </div>

                            <div className="flex items-center gap-3 mt-1">
                              <span className={`
                                text-sm flex items-center gap-1 transition-colors
                                ${isActive 
                                  ? 'text-blue-600 dark:text-blue-400' 
                                  : 'text-gray-600 dark:text-gray-400'
                                }
                              `}>
                                <Clock className="w-4 h-4" />
                                {item.videoLength > 60
                                  ? `${contentLength.toFixed(1)} hrs`
                                  : `${item.videoLength} min`}
                              </span>

                              {isLocked && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-medium">
                                  Preview Locked
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Play Arrow (on hover) */}
                          {!isLocked && !props.isDemo && (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg 
                                className="w-5 h-5 text-blue-600 dark:text-blue-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M9 5l7 7-7 7" 
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      {props.isDemo && (
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                Unlock Full Course Content
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Purchase this course to access all {totalCount} lessons and earn your certificate
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentList;