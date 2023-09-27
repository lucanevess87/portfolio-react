import {
  Files,
  Search,
  GitBranch,
  Settings,
  User,
  Play,
  LayoutGrid,
  Monitor,
  Fish,
} from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between py-3">
      <div className="flex flex-col">
        <button
          type="button"
          className="flex items-center justify-center h-12 border-l-2 border-[#E0DEF2] pl-2"
        >
          <Files strokeWidth={1.5} size={25} className="stroke-white" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-12 pl-2 border-l-2 border-transparent"
        >
          <Search strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-12 pl-2 border-l-2 border-transparent"
        >
          <GitBranch strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-12 pl-2 border-l-2 border-transparent"
        >
          <Play strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-12 pl-2 border-l-2 border-transparent"
        >
          <LayoutGrid strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-12 pl-2 border-l-2 border-transparent"
        >
          <Monitor strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-12 pl-2 border-l-2 border-transparent"
        >
          <Fish strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="flex items-center justify-center h-12 pl-2 border-l-2 border-transparent"
        >
          <User strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-12 pl-2 border-l-2 border-transparent"
        >
          <Settings strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
      </div>
    </div>
  );
};
