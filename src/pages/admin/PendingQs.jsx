import { useState, useEffect } from 'react'
import Qs from '../../components/QuestionSheet/Qs';
import adminService from '../../api/services/adminService';
import Loading from '../../components/Loaders/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../redux/slices/appError';
import { setSuccess } from '../../redux/slices/appSuccess';
import OverlayLoading from '../../components/Loaders/OverlayLoading';
import { removeQs, updatePendingQs } from '../../redux/slices/qs';

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
        dispatch(setError(error.toString()));
        console.log(error);
      });
  },[]);

  // Approve Qs 
  const approveQs = async (id) => {
    try {
      setIsOverlayLoading(true);
      await adminService.approveQs(id);
      setIsOverlayLoading(false);
      dispatch(removeQs(id));
      dispatch(setSuccess('Question approved successfully'));
    } catch (error) {
      setIsOverlayLoading(false);
      dispatch(setError(error.toString()));
      console.log(error);
    }
  }
  // Delete Qs

  return (
    <>
      {loading && <Loading />}
      {isOverlayLoading && <OverlayLoading />}
      <div className=''>
        <h1 className="text-2xl font-bold text-center text-primary pb-10">Pending Questions</h1>
        <div className="flex gap-5 flex-wrap justify-center">
          { pendingQs.length >0 && pendingQs.map((qs, index) => {
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