import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";

const DeleteConfirmationToast = ({ onConfirm, onCancel }) => {
  toast.warn(
    <div>
      <p>Are you sure you want to delete?</p>
      <div className="flex justify-end gap-2 mt-2">
        <Button
          onClick={() => {
            onConfirm();
            toast.dismiss();
          }}
          className="bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            onCancel();
            toast.dismiss();
          }}
          className="bg-gray-500 text-white px-3 py-1 rounded-md"
        >
          No
        </Button>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: true,
    }
  );
};

export default DeleteConfirmationToast;
