import { useState, useEffect } from 'react'
import Qs from '../../components/QuestionSheet/Qs';
import adminService from '../../api/services/adminService';
import Loading from '../../components/Loaders/Loading';
import { useDispatch, useSelector } from 'react-redux';
import OverlayLoading from '../../components/Loaders/OverlayLoading';
import { deletePendingQs, updatePendingQs } from '../../redux/slices/qs';
import toast from 'react-hot-toast';

function PendingQs() {
  const [loading, setLoading] = useState(false);
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);
  const {pendingQs} = useSelector(state => state.qs);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    adminService.getPendingQs()
      .then((response) => {
        dispatch(updatePendingQs(response));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.toString());
        console.log(error);
      });
  }, [dispatch]);

  // Approve Qs 
  const approveQs = async (id) => {
    try {
      setIsOverlayLoading(true);
      await adminService.approveQs(id);
      setIsOverlayLoading(false);
      dispatch(deletePendingQs(id));
      toast.success('Question approved successfully');
    } catch (error) {
      setIsOverlayLoading(false);
      toast.error(error.toString());
      console.log(error);
    }
  }
  // Delete Qs

  return (
    <>
      {loading && <Loading />}
      {isOverlayLoading && <OverlayLoading />}
      <div className=''>
        <h1 className="text-2xl font-bold text-center text-primaryBlue pb-10">Pending Questions</h1>
        <div className="flex gap-5 flex-wrap justify-center">
          { pendingQs.length >0 && pendingQs.map((qs) => {
            return (<div key={qs._id}>
              <Qs
              qsId={qs._id}
              uploader={qs.uploadedBy.fullName.split(" ")[0]}
              subName={qs.subName}
              subCode={qs.subCode.toUpperCase().replace(/([a-zA-Z]+)(\d+)/g, '$1-$2')}
              qsUrl={qs.qsUrl}
              DOE={qs?.DOE}
              type={qs['type']} 
              ctaText="Approve"
              ctaFunc={() => approveQs(qs._id)}
              />
            </div>);
          })
          }
        </div>
      </div>
    </>
  )
}

export default PendingQs