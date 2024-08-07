import Loading from "../../components/Loaders/Loading";
import Qs from "../../components/QuestionSheet/Qs";
import { saveAs } from "file-saver";
import QsSearch from "../../components/QsSearch/QsSearch.jsx";
import qsService from "../../api/services/qsService.js";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedState } from "../../hooks/useDebouncedState.js";
import toast from "react-hot-toast";
import { Button } from "@/shadcn/ui/Button.jsx";
import { useEffect } from "react";
import CtaSticky from "@/components/cta/CtaSticky";

const QsShare = () => {
  const [searchText, setSearchText] = useDebouncedState("", 1000);
  const { isLoading, isError, data, error } = useQuery({ queryKey: ["qsData", searchText], queryFn: async () => await qsService.searchQs(searchText), enabled: searchText.length > 0, retry: false });

  useEffect(() => {
    if (isError) {
      console.log(error);
      toast.error("Error fetching data");
    }
  }, [isError]);
  
  const copyToClipBoard = (qsUrl) => {
    toast.success("Link copied to clipboard");
    navigator.clipboard.writeText(qsUrl);
  }

  return (
    <>
    <div className="container px-4 mx-auto py-10 md:py-16 ">
      <div className="mx-auto flex flex-col items-center ">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-lightBlack tracking-wider ">
          Sharing is Caring
        </h1>
        <p className="text-center text-sm md:text-lg  text-grayish tracking-widest text-balance ">
          Share your question papers and help others
        </p>
        <div className="py-5">
          <QsSearch
            searchText={searchText}
            setSearchText={setSearchText}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* QS Container */}
      <div className="relative pt-5 md:pt-10 qs-container w-full flex flex-wrap justify-center lg:justify-normal gap-8 md:gap-14 min-h-96 md:min-h-[500px]">
        {isLoading && <Loading />}

        {data && data.length > 0 &&
          data.map((qs) => (
            <Qs
              qsId={qs._id}
              key={qs._id}
              uploader={qs.uploadedBy.fullName.split(" ")[0]}
              subName={qs.subName}
              subCode={qs.subCode.toUpperCase().replace(/([a-zA-Z]+)(\d+)/g, '$1-$2')}
              qsUrl={qs.qsUrl}
              DOE={qs.DOE}
              type={qs['type']}
              ctaText={qs.qsUrl.includes('pdf') ? 'Copy Pdf Link' : 'Download'}
              regno={qs.uploadedBy.email.slice(0, qs.uploadedBy.email.indexOf('@'))}
              ctaFunc={() => {
                if (qs.qsUrl.includes('pdf')) {
                  copyToClipBoard(qs.qsUrl);
                }
                else
                  saveAs(qs.qsUrl, qs.subCode)
              }}
            />
          ))}
      </div>
      <Button variant="primary" size="default" className="mt-10" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to Top</Button>
      { <CtaSticky></CtaSticky>}
    </div>
    </>
  );
};

export default QsShare;
