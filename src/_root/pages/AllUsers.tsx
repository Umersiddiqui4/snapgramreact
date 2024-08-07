import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UseCard";
import { useGetUsers } from "@/lib/react-query/QueryAndMutation";

const AllUsers = () => {

  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if(isErrorCreators){

  }
  return (
    <div className="container overflow-y-scroll ">
       <div className="w-full mt-8 container">
        <h3 className="h3-bold text-light-1 mt-2 mb-5 ">All Users</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-3 gap-6 ">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AllUsers
