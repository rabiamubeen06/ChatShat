function UsersLoading() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-lilac-50 dark:bg-lilac-500/20 p-4 rounded-lg animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-lilac-200 bg-lilac-500/20 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-lilac-200 bg-lilac-500/20 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-lilac-200/70 bg-lilac-500/20 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default UsersLoading;