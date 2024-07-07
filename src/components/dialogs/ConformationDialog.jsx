import React, { useState } from "react";
import { Button } from "@/shadcn/ui/Button";
const ConformationDialog = ({
  open = false,
  title = "",
  description = "",
  ctaText = "confirm",
  onConfirm = () => {},
  loading = false,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-start justify-center z-40 pt-40 md:items-center md:pt-0">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-md mx-auto absolute z-41">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-primaryBlue">
                {title}
              </h3>
            </div>
            <p className="text-gray-700 pr-4 text-justify">{description}</p>
            <div className="mt-5">
                <Button className="px-4 py-2 mr-3" variant="outline" onClick={()=>setIsOpen(false)}> Cancel </Button>
                <Button
                  variant="primary"
                  onClick={onConfirm}
                  className="px-4 py-2"
                  loading={loading}
                >
                  {ctaText}
                </Button>
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConformationDialog;
