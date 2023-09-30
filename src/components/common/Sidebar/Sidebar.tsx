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
    <div className="flex flex-col justify-between">
      <div className="flex flex-col px-2">
        <button type="button" className="flex items-center justify-center h-12 ">
          <Files strokeWidth={1.5} size={25} className="stroke-white" />
        </button>
        <button type="button" className="flex items-center justify-center h-12 ">
          <Search strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
        <button type="button" className="flex items-center justify-center h-12 ">
          <GitBranch strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
        <button type="button" className="flex items-center justify-center h-12 ">
          <Play strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
        <button type="button" className="flex items-center justify-center h-12 ">
          <LayoutGrid strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
        <button type="button" className="flex items-center justify-center h-12 ">
          <Monitor strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
        <button type="button" className="flex items-center justify-center h-12 ">
          <Fish strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <button type="button" className="flex items-center justify-center h-12 ">
          <User strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
        <button type="button" className="flex items-center justify-center h-12 ">
          <Settings strokeWidth={1.5} size={25} className="stroke-brand-text" />
        </button>
      </div>
    </div>
  );
};
