import Image from "next/image";
import React from "react";

const DetailsSide = () => {
  const keywords = ["hate", "joy", "love", "kiss"];
  const show = !true;
  return (
    <section className="pl-24 text-[#3A4756]">
      {/* keyword */}
      {show && (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl ">Flagged Keywords</h1>
            <div>
              <p>Add new keyword</p>
              <textarea
                id="description"
                placeholder="E.g nigga, fuck, bitch"
                className="h-[148px] w-[500px] rounded-[5px] bg-[#FBFBFB] border-[2px] p-5 resize-none"
              />
            </div>
            <div className="flex gap-3 mt-2 flex-wrap">
              {keywords.map((keyword, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center bg-[#F3F4F4] text-[#09192C] px-4 py-2 rounded-[10px] border border-[#F3E9E9]"
                  >
                    <span className="mr-2">{keyword}</span>
                    <Image
                      src="/assets/icons/Icon.png"
                      width={10}
                      height={10}
                      alt="cancel"
                      className="cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center ">
            <button className="w-[500px] h-[50px] rounded-[5px] bg-[#A52A2A] text-white">
              Add Keywords
            </button>
          </div>
        </div>
      )}

      {/* restriction */}
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl ">Flagged Keywords</h1>
          <div>
            <p className="text-[12px] text-[#09192CCC]">Add a new keyword</p>
            <textarea className="mt-1 block w-[500px] h-[50px]  border-[#F3E9E9] rounded-[5px] px-2 border-[1px] shadow-sm  sm:text-sm" />
          </div>
        </div>
        <button className="rounded-[10px] text-[14px] flex justify-center items-center bg-gray-300 text-[#ffffff]  h-[40px]">
          Add keyword
        </button>
      </div>
    </section>
  );
};

export default DetailsSide;
