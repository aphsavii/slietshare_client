import { useState } from 'react'
import { useForm } from "react-hook-form";
import Select from "../../components/inputs/Select";
import { PROGRAMMES, TRADES } from "../../constant.js";
import { QUESTION_TYPES } from "../../constant.js";
import BtnPrimary from '../../components/buttons/BtnPrimary';
import qsService from '../../api/services/qsService.js';
import toast from 'react-hot-toast';

function UploadQs() {

  const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm();
  const [programme, setProgramme] = useState("");

  const onSubmit = async (data) => {
    try {
      if (!isValid) return;
      const formData = new FormData();
      for (let key in data) {
        if(key === 'qs') formData.append('qs', data[key][0]);
        else
        formData.append(key, data[key]);
      }
      await qsService.uploadQs(formData);
      toast.success("Question uploaded successfully");
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error.toString());
    }
  }

  return (
    <div className="container px-4 flex items-center justify-center min-h-[600px] md:min-h-[800px] mx-auto py-10">
      <div className="max-w-sm bg-white p-6 rounded-lg shadow-md w-full md:max-w-md lg:max-w-lg mx-auto ">
        <h2 className="text-xl md:text-2xl font-bold text-primaryBlue mb-2">
          Upload the Question Paper
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Select title={'Programme'} options={PROGRAMMES} register={register} setValue={setProgramme} />
            {
              errors?.programme &&
              (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
                {errors?.programme?.message}
              </p>)
            }
          </div>
          <div className="mb-4">
            <Select title={'Trade'} options={TRADES[programme] ?? []} register={register} />
            {
              errors?.trade &&
              (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
                {errors?.trade?.message}
              </p>)
            }
          </div>
          <div className="mb-4">
            <Select title={'Question type'} name="type" options={QUESTION_TYPES} register={register} />
            {
              errors['type'] &&
              (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
                {errors['type']?.message}
              </p>)
            }
          </div>
          <div className="mb-4">
            <Select title={'Semester'} name="sem" options={programme == 'ICD' ? ['1', '2', '3', '4', '5', '6'] : ['1', '2', '3', '4', '5', '6', '7', '8']} register={register} />
            {
              errors['sem'] &&
              (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
                {errors['sem']?.message}
              </p>)
            }
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="subName">
              Subject Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
              id="subName"
              type="text"
              placeholder="Name of the subject" autoComplete="off"
              {...register("subName", {
                required: "Subject Name is required",

              })} />
            {
              errors?.subName &&
              (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
                {errors?.subName?.message}
              </p>)
            }
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="subCode">
              Subject Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
              id="subCode"
              type="text"
              placeholder="Subject Code"
              {...register("subCode", { required: "Subject Code is required" })}
            />
            {
              errors?.subCode &&
              (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
                {errors?.subCode?.message}
              </p>)
            }
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="qs">
              Upload Question Paper
            </label>
            <input className='text-xxs md:text-sm' type="file" name="qs" id='qs' {...register(
              "qs", {
              required: "Question Paper is required",
              validate: (value) => {
                const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
                return allowedTypes.includes(value[0]?.type) || "Invalid file format only jpg/jpeg and png allowed";
              }
            }
            )} />
            {
              errors?.qs &&
              (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
                {errors?.qs?.message}
              </p>)
            }
          </div>
          <div className='mb-4'>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="DOE">
              Date of Examination
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
              id="DOE"
              type="date"
              placeholder="Date of Examination"
              {...register("DOE", { required: "Date of Examination is required" })}
            />
            {
              errors?.DOE &&
              (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
                {errors?.DOE?.message}
              </p>)
            }
          </div>
          <div className="flex items-center justify-end w-full mt-6">
            <BtnPrimary
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              text="Upload"
              onClick={() => null}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadQs