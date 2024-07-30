import { useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const Upload = ({ setLoader, notifySuccess, notifyError, setPdf }) => {
  const uploadToIPFS = async (file) => {
    if (file) {
      try {
        setLoader(true);

        const formData = new FormData();
        formData.append("file", file);

        const { data } = await axios.post("/api/upload/file", formData);

        setPdf(data.url);
        setLoader(false);
        notifySuccess("Cover Image Uploade Successfully");
      } catch (error) {
        console.log(error.message);
        setLoader(false);
        notifyError("Unable to upload image to Pinata");
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToIPFS(acceptedFile[0]);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    maxSize: 500000000000,
  });
  return (
    <div
      {...getRootProps()}
      className="w-full h-10 mb-4 items-center justify-between bg-[#2d2d2d] px-4 rounded-lg border border-[#3f3f3f] focus-within:border-[#6e6e6e]"
    >
      <div className="w-full h-full flex items-center justify-between font-[Arial]">
        <label
          className="cursor-pointer w-full h-fit flex items-center justify-between relative group"
          htmlFor="file"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 337 337"
            style={{ height: 18 }}
          >
            <circle
              strokeWidth="20"
              stroke="#fff"
              fill="none"
              r="158.5"
              cy="168.5"
              cx="168.5"
              className="transition-all duration-300 group-hover:stroke-white group-hover:fill-[#3c3c3c]"
            />
            <path
              strokeLinecap="round"
              strokeWidth="25"
              stroke="#fff"
              d="M167.759 79V259"
              className="transition-all duration-300 group-hover:stroke-white"
            />
            <path
              strokeLinecap="round"
              strokeWidth="25"
              stroke="#fff"
              d="M79 167.138H259"
              className="transition-all duration-300 group-hover:stroke-white"
            />
          </svg>
          <span className="group-hover:block group-hover:opacity-100">
            Upload PDF Document
          </span>
        </label>
        <input
          {...getInputProps()}
          className="hidden"
          type="file"
          id="file"
          name="file"
        />
      </div>
    </div>
  );
};

export default Upload;
