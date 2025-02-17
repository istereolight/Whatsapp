import { credentials } from "@/app/services/credentialsSlice";
import { useLazyGetAccountSettingsQuery } from "@/app/services/serviceApi";
import { useState } from "react";
import { useDispatch } from "react-redux";


export const ModalStartUp = ({
  setIsModalStartUpOpen,
  setIsCorrectAccount
}) => {
  const [idInstanceValue, setIdIndstanceValue] = useState('');
  const [apiTokenInstanceValue, setApiTokenInstanceValue] = useState('');
  const [getAccountSettings] = useLazyGetAccountSettingsQuery();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(credentials({
      idInstance: idInstanceValue,
      apiTokenInstance: apiTokenInstanceValue
    }));
    try {
      await getAccountSettings({ apiTokenInstance: apiTokenInstanceValue }).unwrap();
      setIsCorrectAccount(true);
      setIsModalStartUpOpen(false);
    } catch (err) {
      setIsModalStartUpOpen(false);
      setIsCorrectAccount(false);
      console.log(err);
    }
  }
  return (
    <div className='absolute top-[200px] left-[500px] z-10 text-white bg-[#49575f] w-[450px] h-[200px] rounded-xl'>
      <div className="p-2">
        <h3 className="mx-5 my-2">Enter your login details</h3>
        <input 
          className="w-full h-8 my-1 bg-[#293538] rounded-sm p-2 mt-[1px] focus:outline-none"
          type="text"
          placeholder="idInstance"
          value={idInstanceValue}
          onChange={(e) => setIdIndstanceValue(e.target.value)}
        />
        <input 
          className="w-full h-8 bg-[#293538] rounded-sm p-2 mt-[1px] focus:outline-none"
          type="text"
          placeholder="apiTokenInstance"
          value={apiTokenInstanceValue}
          onChange={(e) => setApiTokenInstanceValue(e.target.value)}
        />
        <div className="w-full flex justify-end">
          <button onClick={handleSubmit} className="my-5 mr-5 w-[120px] border-2 border-gray-500 rounded-lg px-4 py-2 hover:bg-gray-500">
            Submit
          </button>
        </div>
      </div>
      
    </div>
  )
}

