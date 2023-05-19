import { useRef, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import ButtonCustom from "../../../components/Button";
import Utils from "../../../Util";

function AddPictureProduct({ listPhoto, setListPhoto }) {
  const choosePhoto = useRef(null);
  const [listPhotoUrl, setListPhotoUrl] = useState([]);
  const Util = new Utils();
  useEffect(() => {
    const handleImage = async () => {
      listPhotoUrl.forEach((photo) => URL.revokeObjectURL(photo.url));
      const newPhotoUrls = await Promise.all(
        listPhoto.map(async (pic) => {
          const result = await Util.processImage(pic?.file);
          if (pic.file) {
            const url = URL.createObjectURL(result);
            return {
              url: url,
              id: pic?.id,
            };
          }
        })
      );
      setListPhotoUrl(newPhotoUrls.filter(Boolean)); // filter out undefined values
      return () => {
        newPhotoUrls.forEach((photo) => URL.revokeObjectURL(photo.url));
      };
    };
    handleImage();
  }, [listPhoto]);

  const handleRemovePhoto = (id) => {
    setListPhoto((prev) => {
      return prev.filter((item) => item.id != id);
    });
    setListPhotoUrl((prev) => {
      return prev.filter((item) => item.id != id);
    });
  };
  return (
    <div className="w-full flex flex-col p-4">
      <h5 className="text-xl font-bold font-barlow">
        Add picture about product
      </h5>
      <h6 className="text-barlow mt-10 mb-1">Product Images</h6>
      <div
        className={`
          rounded-md p-10 cursor-pointer border-solid border-2 border-slate400 hover:border-orange-600
      overflow-auto
      grid grid-cols-2
      gap-10
        `}
        style={{}}
        onClick={(e) => choosePhoto.current.click()}
      >
        {listPhotoUrl.length === 0 && (
          <h5 className="text-xl font-barlow">
            Drop file images here to upload
          </h5>
        )}
        {listPhotoUrl.map((img) => {
          return (
            <div
              key={uuid()}
              className="w-full p-10 rounded-xl center h-60 flex flex-col bg-slate-200 "
            >
              <img
                className="p-2 rounded-xl h-full  object-contain"
                src={img.url}
              ></img>
              <ButtonCustom
                nameButton="Remove"
                style={{
                  marginTop: "1rem",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemovePhoto(img.id);
                }}
              />
            </div>
          );
        })}
      </div>

      <input
        type="file"
        className="hidden"
        ref={choosePhoto}
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            setListPhoto((prev) => {
              return [
                ...prev,
                {
                  id: uuid(),
                  file: e.target.files[0],
                },
              ];
            });
          }
        }}
      />
    </div>
  );
}

export default AddPictureProduct;
