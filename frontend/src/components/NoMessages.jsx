import ChatShatLogo from "./ChatShatLogo";

const NoMessages = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center p-6">
      <ChatShatLogo className="w-[clamp(10rem,28vh,18rem)] h-auto mx-auto mb-[clamp(0.5rem,2vh,1rem)]" />
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Select a conversation</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md">
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
    </div>
  );
};

export default NoMessages;