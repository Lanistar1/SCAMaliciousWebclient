// components/Card.tsx
import Image from "next/image";
import Link from "next/link";
import DateFormatter from "@/app/components/DateFormatter";

interface CardProps {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  date: string;
  title: string;
  keywords: number;
  activeTab: string;
  onViewDetails: () => void;
}

const ReportCard: React.FC<CardProps> = ({
  id,
  firstName,
  lastName,
  role,
  date,
  title,
  keywords,
  activeTab,
  onViewDetails,
}) => {
  let goto;
  const getBackgroundColor = (tab: string) => {
    switch (tab) {
      case "Awaiting Approval":
        goto = "awaiting-approval";
        return "bg-[#DBDDE3] text-[#09192C] ";
      case "Approved":
        goto = "approved";
        return "bg-[#E9EEE3]  text-[#9CC031]";
      case "Declined":
        goto = "declined";
        return "bg-[#F3E9E9] text-[#FF8F6B]";
      case "Revoked":
        goto = "revoked";
        return "bg-[#EADFE2] text-[#A52A2A] ";
      default:
        return "bg-[#D3D3D3] text-[#9CC031]";
    }
  };
  return (
    // <div className={`bg-[#F2F3F7] shadow-lg p-4 rounded-[15px] w-[475px] ${activeTab === "Approved" ? 'h-[250px]': 'h-[200px]'} space-y-4`}>
    <div
      className={`bg-[#F2F3F7] shadow-md p-4 rounded-[15px] w-full space-y-4`}
    >
      {/* Top Section */}
      <div className="flex justify-between">
        <div className="flex items-center">
          {/* <Image
            src="/assets/images/Ellipse 11.png"
            alt={name}
            width={48}
            height={48}
            className="rounded-full "
          /> */}

          <div className="flex h-[40px] w-[40px] bg-[#A52A2A] rounded-full justify-center items-center font-bold">
            {firstName[0]}
            {lastName[0]}
          </div>
          <div className="ml-3">
            <h4 className="text-[#09192CCC] text-sm font-semibold">{firstName} {lastName}</h4>
            <p className="text-gray-500 text-xs">{role}</p>
            <p className="text-gray-400 text-xs">
              <DateFormatter date={date} />
            </p>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div>
        <h5 className="text-[#09192CCC] font-bold text-[12px]">{title}</h5>
      </div>

      {/* Bottom Section */}
      <div className=" flex justify-between items-center md:pr-10">
        <div className="flex items-center gap-2">
          <Image
            src={"/assets/icons/Frame 13.png"}
            alt="image"
            width={26}
            height={2}
          />
          <p className="text-[10px] text-gray-500 md:text-xs">
            {keywords} Keywords
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={"/assets/icons/Frame 14.png"}
            alt="image"
            width={26}
            height={2}
          />
          <Link
            href={`/reports/${activeTab}/${id}`}
            className="text-[10px] text-[#A52A2A] md:text-xs  hover:text-red-700"
          >
            View Details
          </Link>
        </div>
      </div>

      {/*Optional Bottom Section */}
      {activeTab === "Approved" && (
        <div className=" flex justify-between items-center  pr-10">
          <div className="flex items-center gap-2">
            <Image
              src={"/assets/icons/Frame 15.png"}
              alt="image"
              width={26}
              height={2}
            />
            <p className="text-gray-500 text-xs">{keywords} Reports</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={"/assets/icons/Frame 15.png"}
              alt="image"
              width={26}
              height={2}
            />
            <Link
              href={`/reports/${activeTab}/${id}`}
              className="text-[#A52A2A] text-xs  hover:text-red-700"
            >
              View Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCard;
