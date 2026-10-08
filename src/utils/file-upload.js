import fileUpload from "../../config/multerConfig.js";

export const profilePicUpload = (req, res, next) => {
  const userID = req.user?.id?.toString();
  const upload = fileUpload(`public/profile-images/${userID}`);
  return upload.fields([{ name: "profile_image", maxCount: 1 }])(
    req,
    res,
    next,
  );
};
