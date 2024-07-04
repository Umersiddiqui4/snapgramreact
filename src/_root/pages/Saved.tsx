
import   Loader  from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/QueryAndMutation";
import Gridsaves from "@/components/shared/Gridsaves";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  
  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col w-full flex-1 explore-container ">
    <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Saves Posts</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>
      {currentUser.save.length && currentUser.save.length === 0 && (
        <p className="text-light-4">No saves posts</p>
      )}

      <Gridsaves posts={currentUser.save} showStats={false} />
    </div>
  );
};

export default Saved
