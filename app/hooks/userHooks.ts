import { useMutation } from "@tanstack/react-query";
import { getUserDataAPI } from "../apiservices/api";
import { useAppContext } from "../utils/AppContext";

export function useGetAndSetUserData() {
    const {dispatch} = useAppContext()
    const { isPending, data, mutate: getUserData } = useMutation({
        mutationFn: ({ emailId }: { emailId: string }) => getUserDataAPI(emailId),
        onSuccess(data) {
            if(data?.data?.message === "SUCCESS"){
                dispatch({
                    type:"setUser",
                    payload:data?.data?.user
                })
            }
            
        },
    })
    return { isPending, data, getUserData }
}