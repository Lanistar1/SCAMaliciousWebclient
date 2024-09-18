// components/Card.tsx
import Image from "next/image";

interface CardProps {
    name: string;
    role: string;
    date: string;
    title: string;
    keywords: string;
    activeTab:string
    onViewDetails: () => void;
  }
  
  const ContentCard: React.FC<CardProps> = ({ name, role, date, title, keywords,activeTab, onViewDetails }) => {
    const getBackgroundColor = (tab : string) => {
        switch (tab) {
          case 'Awaiting Approval':
            return 'bg-[#DBDDE3] text-[#09192C] '; 
          case 'Approved':
            return 'bg-[#E9EEE3]  text-[#9CC031]';
          case 'Declined':
            return 'bg-[#F3E9E9] text-[#FF8F6B]';
          case 'Revoked':
            return 'bg-[#EADFE2] text-[#A52A2A] ';
          default:
            return 'bg-[#D3D3D3] text-[#9CC031]';
        }
      };
    return (
      <div className={`bg-[#F2F3F7] shadow-lg p-4 rounded-[15px] w-[475px] ${activeTab === "Approved" ? 'h-[250px]': 'h-[200px]'} space-y-4`}>
        {/* Top Section */}
        <div className="flex justify-between">
        <div className="flex items-center">
          <Image
            src="/assets/images/Ellipse 11.png" 
            alt={name}
            width={48}
            height = {48}
            className="rounded-full "
          />
          <div className="ml-3">
            <h4 className="text-[#09192CCC] text-sm font-semibold">{name}</h4>
            <p className="text-gray-500 text-xs">{role}</p>
            <p className="text-gray-400 text-xs">{date}</p>
          </div>
        </div>
        <div className={`w-[150px] h-[30px] rounded-[33px] flex justify-center items-center  ${getBackgroundColor(activeTab)} text-xs  px-4 `}> {activeTab}</div>

        </div>
  
        {/* Middle Section */}
        <div>
          <h5 className="text-[#09192CCC] font-bold text-xl">{title}</h5>
          
        </div>
  
        {/* Bottom Section */}
        <div className=" flex justify-between items-center  pr-10">
            <div className="flex items-center gap-2">
            <Image
            src= {'/assets/icons/Frame 13.png'}
            alt='image'
            width={26} height={2}
            />
          <p className="text-gray-500 text-xs">{keywords} Keywords</p>
          </div>
          <div className="flex items-center gap-2">
          <Image
            src= {'/assets/icons/Frame 14.png'}
            alt='image'
            width={26} height={2}
            />
          <button
            onClick={onViewDetails}
            className="text-[#A52A2A] text-xs  hover:text-red-700"
          >
            View Details
          </button>
          </div>
        </div>

          {/*Optional Bottom Section */}
         { activeTab === "Approved" && <div className=" flex justify-between items-center  pr-10">
            <div className="flex items-center gap-2">
            <Image
            src= {'/assets/icons/Frame 15.png'}
            alt='image'
            width={26} height={2}
            />
          <p className="text-gray-500 text-xs">{keywords} Reports</p>
          </div>
          <div className="flex items-center gap-2">
          <Image
            src= {'/assets/icons/Frame 15.png'}
            alt='image'
            width={26} height={2}
            />
          <button
            onClick={onViewDetails}
            className="text-[#A52A2A] text-xs  hover:text-red-700"
          >
            View Details
          </button>
          </div>
        </div>}
      </div>
    );
  };
  
  export default ContentCard
  