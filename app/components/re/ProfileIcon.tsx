import { useProfileImageUplaod } from "@/app/hooks/appHooks";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";

interface ProfileIconInerface {}

function ProfileIcon({}: ProfileIconInerface) {
  const { isPending, uplaodFile, data } = useProfileImageUplaod();
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  useEffect(() => {
    if (data?.data) {
      setImageUrl(data?.data?.data?.display_url);
    }
  }, [data]);

  function handleFileChange(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    uplaodFile({
      data: formData,
    });
  }

  function handleProfileClick() {
    document?.getElementById("FILE")?.click();
  }

  return (
    <div className="relative">
      <div onClick={handleProfileClick}>
        <div
          className="border border-purple-900 bg-purple-50
           rounded-full h-12 w-12 shadow-lg"
        >
          {!imageUrl ? (
            <BiUser className="w-full h-full p-2" />
          ) : (
            <img src={imageUrl} className="w-full h-full object-fill rounded-full" />
          )}
        </div>
        <input
          onChange={(e) => {
            if (e?.target?.files) handleFileChange(e?.target?.files[0]);
          }}
          type="file"
          className="hidden"
          id="FILE"
        />
      </div>
    </div>
  );
}
export default ProfileIcon;
