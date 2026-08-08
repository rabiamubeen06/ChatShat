import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-16 h-16 bg-gradient-to-br from-lilac-200 to-lilac-100 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center mb-5">
        <MessageCircleIcon className="size-8 text-lilac-600 dark:text-lilac-300" />
      </div>
      <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-3">
        Start your conversation with {name}
      </h3>
      <div className="flex flex-col space-y-3 max-w-md mb-5">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          This is the beginning of your conversation. Send a message to start chatting!
        </p>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-lilac-300 dark:via-slate-600 to-transparent mx-auto"></div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button className="px-4 py-2 text-xs font-medium text-lilac-700 dark:text-lilac-300 bg-lilac-100 dark:bg-slate-800 rounded-full hover:bg-lilac-200 dark:hover:bg-slate-700 transition-colors">
          👋 Say Hello
        </button>
        <button className="px-4 py-2 text-xs font-medium text-lilac-700 dark:text-lilac-300 bg-lilac-100 dark:bg-slate-800 rounded-full hover:bg-lilac-200 dark:hover:bg-slate-700 transition-colors">
          🤝 How are you?
        </button>
        <button className="px-4 py-2 text-xs font-medium text-lilac-700 dark:text-lilac-300 bg-lilac-100 dark:bg-slate-800 rounded-full hover:bg-lilac-200 dark:hover:bg-slate-700 transition-colors">
          📅 Meet up soon?
        </button>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;