import React from 'react'
import { useEffect, useState } from 'react';
import Qs from '../../components/QuestionSheet/Qs';
import { useSelector, useDispatch } from 'react-redux';
import qsService from '../../api/services/qsService';
import { setError } from '../../redux/slices/appError';
import Loading from '../../components/Loaders/Loading';
import { updateUserQs } from '../../redux/slices/qs';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function UserQs() {
  const dispatch = useDispatch();
  const userQs = useSelector((state) => state.qs.userQs);
  const [loading, setLoading] = useState(false);
  let { regno } = useParams();
  useEffect(() => {
    setLoading(true);
    const userQs = qsService.getUserQs(regno).then((res) => {
      setLoading(false);
      dispatch(updateUserQs(res));
    }).catch((e) => {
      setLoading(false);
      dispatch(setError(error.toString()));
    })
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="container py-10 px-4  items-center justify-center min-h-[600px] md:min-h-[800px] mx-auto">
        <h2 className='w-full text-center text-xl md:text-3xl font-bold text-primary my-5'>Questions Uploaded </h2>
        <div className='w-full flex  gap-5 flex-wrap justify-center'>
          {!loading && userQs.length > 0 && userQs.map((qs) => {
            return (
              <div key={qs._id}>
                <Qs
                  qsId={qs._id}
                  uploader={qs.uploadedBy.fullName.split(" ")[0]}
                  subName={qs.subName}
                  subCode={qs.subCode.toUpperCase().replace(/([a-zA-Z]+)(\d+)/g, '$1-$2')}
                  qsUrl={qs.qsUrl}
                  DOE={qs?.DOE}
                  type={qs['type']}
                  regno={qs.uploadedBy.regno}
                />
              </div>
            )
          })}

        </div>
        {userQs.length == 0 && !loading && <h2 className='text-center text-lg md:text-xl font-normal text-alert my-5'>No Questions Uploaded</h2>}
        {userQs.length == 0 && !loading &&
          <div className="flex justify-center">
            <span className="mx-auto text-sm md:text-lg text-white bg-primary py-1.5 px-2 md:py-2 md:px-3 rounded-md">
              <Link to={'/qs/upload'}>Upload Now</Link>
            </span>
          </div>}
      </div>

    </>
  )
}

export default UserQs;