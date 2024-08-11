import { useMutation } from "@tanstack/react-query";
import { imageUplaodAPI, updateProfileImageAPI } from "../apiservices/api";
import { useGetMe } from "../utils/utils";

export function useProfileImageUplaod() {
  const { updateImageUrl, updatingImageUrl } = useUpdateProofileImage();
  const key = "1aed1d376c24b1fcd746e2f521eb40b7";
  const {
    mutate: uplaodFile,
    isPending,
    data,
    isSuccess,
  } = useMutation({
    mutationFn: ({ data }: { data: FormData }) => imageUplaodAPI(key, data),
    onSuccess(data) {
      updateImageUrl({ url: data?.data?.data?.display_url });
    },
  });
  return { isPending, data, isSuccess, uplaodFile, updateImageUrl };
}

function useUpdateProofileImage() {
  const { emailId } = useGetMe();
  const { mutate: updateImageUrl, isPending: updatingImageUrl } = useMutation({
    mutationFn: ({ url }: { url: string }) =>
      updateProfileImageAPI({ url, emailId }),
  });

  return { updatingImageUrl, updateImageUrl };
}
