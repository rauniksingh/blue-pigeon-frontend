const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full py-10">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;