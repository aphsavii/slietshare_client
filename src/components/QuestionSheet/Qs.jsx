import { useState } from "react";
import BtnPrimary from "../buttons/BtnPrimary";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import qsService from "../../api/services/qsService";
import { setError } from "../../redux/slices/appError";
import { setSuccess } from "../../redux/slices/appSuccess";
import ButtonLoader from "../Loaders/ButtonLoader";
import {removeQs} from "../../redux/slices/qs";


const Qs = ({qsId, uploader, subName, subCode, qsUrl, DOE, type, ctaText, ctaFunc }) => {
  const [isDeleteting, setisDeleteting] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log(qsUrl)
  const deleteQs = async () => {
    try {
      setisDeleteting(true);
      await qsService.deleteQs(qsId);
      dispatch(removeQs(qsId));
      setisDeleteting(false);
      dispatch(setSuccess("Question paper deleted successfully"));
    } catch (error) {
      dispatch(setError(error));
      setisDeleteting(false);
    }

  }

  return (
    <div className=" flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border h-fit rounded-xl w-64 md:w-72">
      <a href={qsUrl} download target="_blank">
        <div className="h-32 md:h-48 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 ">
          <img className={`w-full h-full ${qsUrl.includes('pdf') ? 'object-contain' : 'object-cover'}`} src={qsUrl.includes('pdf') ? 'assets/icons/pdf.svg' : qsUrl} alt="qs" />
        </div>
      </a>
      <div className="px-6 py-3">
        <h5 className="block mb-1  font-sans text-lg md:text-xl antialiased font-semibold leading-normal tracking-normal">
          {subName}
        </h5>

        <div className="font-sans text-xs md:text-sm antialiased font-light leading-relaxed text-inherit flex justify-between ">
          <span> {subCode}</span> <span className="italic text-primary font-medium">By {uploader.split(" ")[0]}</span>
        </div>
        <span className="text-xs md:text-sm text-gray-500">{type} ({DOE.slice(0, 4)})</span>
      </div>
      <div className="p-6 pt-0 flex justify-between">
        {ctaText && <BtnPrimary onClick={ctaFunc} text={ctaText} />}
        {isAuthenticated && user?.role=="admin"&& <span onClick={deleteQs} className="cursor-pointer h-5 w-5 mt-2"> 
         {isDeleteting? <ButtonLoader/>:<img src="assets/icons/delete.svg" alt="" />}
         </span>}
      </div>
    </div>
  );
};

Qs.propTypes = {
  uploader: PropTypes.string.isRequired,
  subName: PropTypes.string.isRequired,
  subCode: PropTypes.string.isRequired,
  qsUrl: PropTypes.string.isRequired,
  ctaText: PropTypes.string,
  ctaFunc: PropTypes.func,
}

export default Qs;
