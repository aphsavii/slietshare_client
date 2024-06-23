/* eslint-disable react/prop-types */
import { useState } from "react";
import BtnPrimary from "../buttons/BtnPrimary";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import qsService from "../../api/services/qsService";
import ButtonLoader from "../Loaders/ButtonLoader";
import {deletePendingQs, deleteUserQs} from "../../redux/slices/qs";
import {toast} from 'react-hot-toast'
import ConformationDialog from "../dialogs/ConformationDialog";
const Qs = ({qsId, uploader, subName, subCode, qsUrl, DOE, type, ctaText, ctaFunc, regno, isPending }) => {
  const [isDeleteting, setisDeleteting] = useState(false);
  const {pathname} = useLocation() ;
const [isDialogOpen, setIsDialogOpen] = useState(true);
  const {  user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const deleteQs = async () => {
    try {
      setisDeleteting(true);
      await qsService.deleteQs(qsId);
      dispatch(deletePendingQs(qsId));
      dispatch(deleteUserQs(qsId));
      setisDeleteting(false);
      toast.success("Question paper deleted successfully");
    } catch (error) {
      toast.error(error.toString());
      setisDeleteting(false);
    }
    
  }

  return (
    <>
  {<ConformationDialog loading= {isDeleteting} open={isDialogOpen}  title="Deleting Question Paper" description="Are you sure you want to delete this question paper?" ctaText="Delete" onConfirm={deleteQs} />}
    <div className=" flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border h-fit rounded-xl w-64 md:w-72">
      <a href={qsUrl} download target="_blank">
        <div className="h-32 md:h-48 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 ">
          <img className={`w-full h-full ${qsUrl.includes('pdf') ? 'object-contain' : 'object-cover'}`} src={qsUrl.includes('pdf') ? '/assets/icons/pdf.svg' : qsUrl} alt="qs" />
        </div>
      </a>
      <div className="px-6 py-3">
        <h5 className="block mb-1  font-sans text-lg md:text-xl antialiased font-semibold leading-normal tracking-normal">
          {subName}
        </h5>

        <div className="font-sans text-xs md:text-sm antialiased font-light leading-relaxed text-inherit flex justify-between ">
          <span> {subCode}</span><Link to={"/user/"+regno}> <span className="italic text-primaryBlue font-medium">By {uploader.split(" ")[0]}</span></Link>
        </div>
        <span className="text-xs md:text-sm text-gray-500">{type} ({DOE.slice(0, 4)})</span>
      </div>
      <div className="p-6 pt-0 flex justify-between">
        {ctaText && <BtnPrimary onClick={ctaFunc} text={ctaText} />}
        {isPending && <span className="cursor-pointer h-5 w-5 mt-2" title="pending">
          <img src="assets/icons/pending.svg" alt="pending" />
          </span>}
        { (( user?.regno == regno || user?.role=="admin") && pathname != '/'  )     && <span onClick={()=>setIsDialogOpen(true)} className="cursor-pointer h-5 w-5 mt-2" title="Delete" > 
         {isDeleteting? <ButtonLoader/>:<img src="/assets/icons/delete.svg" alt="delete" />}
         </span>}
         
      </div>
    </div>
    </>
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
