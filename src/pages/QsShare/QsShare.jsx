import Loading from "../../components/Loaders/Loading";
import Qs from "../../components/QuestionSheet/Qs";
import { saveAs } from "file-saver";
import QsSearch from "../../components/QsSearch/QsSearch.jsx";
import qsService from "../../api/services/qsService.js";
import Error from "../../components/errors/Error.jsx";
import { useQuery } from "@tanstack/react-query";
import {useDebouncedState} from "../../hooks/useDebouncedState.js";

const QsShare = () => {
  const [searchText, setSearchText] = useDebouncedState("",1000);

  const { isLoading, isError, data, error } = useQuery({queryKey:["qsData",searchText], queryFn: async () => await qsService.searchQs(searchText), enabled: searchText.length > 0, retry: false});
  
  if (isError) {
    console.log(error)
  }
  // console.log(isLoading)

  return (
    <div className="container px-4 mx-auto py-10 md:py-16 ">
      <div className="mx-auto flex flex-col items-center ">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-lightBlack tracking-wider ">
          Sharing is Caring
        </h1>
        <p className="text-center text-sm md:text-lg  text-secondary tracking-widest text-balance ">
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
        {isError && <Error message={error} />}
     
        {data && data.length > 0 &&
          data.map((qs) => (
            <Qs
              key={qs._id}
              uploader={qs.uploadedBy.fullName.split(" ")[0]}
              subName={qs.subName}
              subCode={qs.subCode.toUpperCase().replace(/([a-zA-Z]+)(\d+)/g, '$1-$2')}
              qsUrl={qs.qsUrl}
              DOE={qs.DOE}
              type={qs['type']}
              ctaText="Download"
              ctaFunc = {async () => await saveAs(qsUrl, subCode)}
            />
          ))}
      </div>
    </div>
  );
};

export default QsShare;
