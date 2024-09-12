import Gear from '@/assets/gear.svg';
import thumbnail from '@/assets/thumbnail_team.png';

interface TeamHeaderProps {
  teamName: string;
}

const TeamHeader = ({ teamName }: TeamHeaderProps) => {
  return (
    <div
      className="px-6 py-5 bg-background-secondary rounded-xl shadow-md border border-border-primary-10 mb-6 mt-2"
      style={{
        backgroundImage: `url(${thumbnail})`,
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">{teamName}</h1>
          <Gear className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;
