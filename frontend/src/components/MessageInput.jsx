import { useState, useRef } from "react";
import useChatStore from "../store/useChatStore";
import toast from "react-hot-toast";
import { SendIcon, ImageIcon, XIcon } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });

    setText("");
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full p-2 sm:p-3">
      {/* Image Preview */}
      {imagePreview && (
        <div className="relative mb-2 inline-block">
          <img
            src={imagePreview}
            alt="Preview"
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover border border-lilac-200 dark:border-slate-700"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute -right-2 -top-2 rounded-full bg-slate-800 p-1 text-white hover:bg-slate-700"
          >
            <XIcon className="h-3 w-3" />
          </button>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex w-full items-center gap-2"
      >
        {/* Message Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-lilac-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none placeholder-slate-400 focus:border-lilac-400 dark:border-slate-700/50 dark:bg-lilac-500/20 dark:text-slate-100 dark:placeholder-slate-500 sm:px-4 sm:text-base"
          placeholder="Type your message..."
        />

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Gallery Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`shrink-0 rounded-lg border border-lilac-200 bg-white p-2 text-slate-400 transition-colors hover:text-slate-700 dark:border-slate-700/50 dark:bg-lilac-500/20 dark:hover:text-slate-200 sm:p-2.5 ${
            imagePreview
              ? "text-lilac-600 dark:text-lilac-400"
              : ""
          }`}
        >
          <ImageIcon className="h-5 w-5" />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="shrink-0 rounded-lg bg-gradient-to-r from-lilac-500 to-lilac-600 p-2 text-white transition-all hover:from-lilac-600 hover:to-lilac-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-3 sm:py-2"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;